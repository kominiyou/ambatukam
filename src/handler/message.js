'use strict';

import { isJidGroup, downloadMediaMessage, getContentType } from 'baileys';
import { exec } from 'child_process';
import util from 'util';

import { msToTime } from '../helper/utils.js';

function logCommand(m, hisoka, command) {
        if (process.env.BOT_LOG_MESSAGE !== 'true') return;
        const location = m.isGroup ? `"${hisoka.getName(m.from)}"` : 'Private Chat';
        console.log(`\x1b[32m[CMD]\x1b[39m \x1b[36m.${command}\x1b[39m - ${m.pushName} @ ${location}`);
}

function extractMediaFromMessage(quotedMsg) {
        let targetMessage = quotedMsg;
        let foundViewOnce = false;

        if (quotedMsg.ephemeralMessage?.message) {
                targetMessage = quotedMsg.ephemeralMessage.message;
        }

        if (targetMessage.viewOnceMessage?.message) {
                targetMessage = targetMessage.viewOnceMessage.message;
                foundViewOnce = true;
        }

        if (targetMessage.viewOnceMessageV2?.message) {
                targetMessage = targetMessage.viewOnceMessageV2.message;
                foundViewOnce = true;
        }

        if (targetMessage.viewOnceMessageV2Extension?.message) {
                targetMessage = targetMessage.viewOnceMessageV2Extension.message;
                foundViewOnce = true;
        }

        const mediaTypes = [
                'imageMessage',
                'videoMessage',
                'audioMessage',
                'documentMessage',
                'stickerMessage'
        ];

        for (const mediaType of mediaTypes) {
                if (targetMessage[mediaType]) {
                        return {
                                mediaMessage: targetMessage[mediaType],
                                mediaType: mediaType,
                                isViewOnce: foundViewOnce || 
                                        targetMessage[mediaType].viewOnce === true ||
                                        quotedMsg.viewOnceMessage ||
                                        quotedMsg.viewOnceMessageV2 ||
                                        quotedMsg.viewOnceMessageV2Extension
                        };
                }
        }

        return null;
}

function isViewOnceMessage(quotedMsg) {
        if (quotedMsg.viewOnceMessage) return true;
        if (quotedMsg.viewOnceMessageV2) return true;
        if (quotedMsg.viewOnceMessageV2Extension) return true;

        if (quotedMsg.ephemeralMessage?.message) {
                const ephemeralContent = quotedMsg.ephemeralMessage.message;
                if (ephemeralContent.viewOnceMessage) return true;
                if (ephemeralContent.viewOnceMessageV2) return true;
                if (ephemeralContent.viewOnceMessageV2Extension) return true;

                const mediaTypes = ['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage', 'stickerMessage'];
                for (const type of mediaTypes) {
                        if (ephemeralContent[type]?.viewOnce) return true;
                }
        }

        const mediaTypes = ['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage', 'stickerMessage'];
        for (const type of mediaTypes) {
                if (quotedMsg[type]?.viewOnce) return true;
        }

        return false;
}

export default async function ({ message, type: messagesType }, hisoka) {
        try {
                const { injectMessage } = await import('../helper/inject.js?v=' + Date.now());

                const m = await injectMessage(hisoka, message);

                if (!m || !m.message) {
                        return;
                }

                const { default: listenEvent } = await import('./event.js?v=' + Date.now());
                await listenEvent(m, hisoka);

                const quoted = m.isMedia ? m : m.isQuoted ? m.quoted : m;
                const text = m.text;
                const query = m.query || quoted.query;

                if (!m.message) return;
                if (!m.key) return;
                if (m.isBot) return;

                if (messagesType === 'append') return;

                if (!m.isOwner) {
                        return;
                }

                switch (m.command) {
                        case 'hidetag':
                        case 'ht':
                        case 'everyone':
                        case 'all': {
                                if (m.isGroup) return;

                                const group = hisoka.groups.read(m.from);
                                const participants = group.participants.map(v => v.phoneNumber || v.id);

                                const msg = await hisoka.messageModify(m.from, /text|conversation/i.test(m.type) && query ? m : quoted, {
                                        quoted: undefined,
                                        text: `@${m.from}\n\n${query}`.trim(),
                                        mentions: participants.map(v => ({ id: v })).concat({ id: m.from, name: 'everyone' }),
                                });

                                await hisoka.relayMessage(m.from, msg.message);
                                logCommand(m, hisoka, 'hidetag');
                                break;
                        }

                        case 'q':
                        case 'quoted': {
                                if (!m.isQuoted) {
                                        await m.reply('No quoted message found.');
                                        return;
                                }

                                const message = hisoka.cacheMsg.get(m.quoted.key.id);
                                if (!message) {
                                        await m.reply('Quoted message not found.');
                                        return;
                                }

                                const IMessage = await injectMessage(hisoka, message);
                                if (!IMessage.isQuoted) {
                                        await m.reply('Quoted message not found.');
                                        return;
                                }

                                await m.reply({ forward: IMessage.quoted });
                                logCommand(m, hisoka, 'quoted');
                                break;
                        }

                        case 'p':
                        case 'ping': {
                                try {
                                        const msg = await m.reply('Pong!');
                                        const latency = Math.abs(Date.now() - m.messageTimestamp * 1000);
                                        const uptime = process.uptime();
                                        await m.reply({
                                                edit: msg.key,
                                                text: `Pong! Latency: ${latency}ms\nUptime: ${msToTime(uptime * 1000)}`,
                                        });
                                        logCommand(m, hisoka, 'ping');
                                } catch (err) {
                                        console.error('\x1b[31mPing error:\x1b[39m', err.message);
                                }
                                break;
                        }

                        case '>':
                        case 'eval': {
                                let result;
                                try {
                                        const code = query || text;
                                        result = /await/i.test(code) ? await eval('(async() => { ' + code + ' })()') : await eval(code);
                                } catch (error) {
                                        result = error;
                                }

                                await m.reply(util.format(result));
                                logCommand(m, hisoka, 'eval');
                                break;
                        }

                        case '$':
                        case 'exec':
                        case 'bash': {
                                try {
                                        exec(query, (error, stdout, stderr) => {
                                                if (error) {
                                                        return m.throw(util.format(error));
                                                }
                                                if (stderr) {
                                                        return m.throw(stderr);
                                                }
                                                if (stdout) {
                                                        return m.reply(stdout);
                                                }
                                                return m.throw('Command executed successfully, but no output.');
                                        });
                                        logCommand(m, hisoka, 'bash');
                                } catch (error) {
                                        await m.reply(util.format(error));
                                        return;
                                }
                                break;
                        }

                        case 'groups':
                        case 'group':
                        case 'listgroups':
                        case 'listgroup': {
                                const groups = Object.values(await hisoka.groupFetchAllParticipating());
                                groups.map(g => hisoka.groups.write(g.id, g));

                                let text = `*Total ${groups.length} groups*\n`;
                                text += `\n*Total Participants in all groups:* ${Array.from(groups).reduce(
                                        (a, b) => a + b.participants.length,
                                        0
                                )}\n\n`;
                                groups
                                        .filter(group => isJidGroup(group.id))
                                        .forEach((group, i) => {
                                                text += `${i + 1}. *${group.subject}* - ${group.participants.length} participants\n`;
                                        });

                                await m.reply(text.trim());
                                logCommand(m, hisoka, 'groups');
                                break;
                        }

                        case 'contacts':
                        case 'contact':
                        case 'listcontacts':
                        case 'listcontact': {
                                const contacts = Array.from(hisoka.contacts.values()).filter(c => c.id);
                                let text = '*Total:*\n\n';
                                text += `- All Contacts: ${contacts.length}\n`;
                                text += `- Saved Contacts: ${contacts.filter(v => v.isContact).length}\n`;
                                text += `- Not Saved Contacts: ${contacts.filter(v => !v.isContact).length}\n`;
                                await m.reply(text.trim());
                                logCommand(m, hisoka, 'contacts');
                                break;
                        }

                        case 'menu':
                        case 'help':
                        case 'info': {
                                let text = '*📋 Bot Command Menu*\n\n';
                                text += '*Basic Commands:*\n';
                                text += '• `p` / `ping` - Check bot latency & uptime\n';
                                text += '• `memory` / `ram` - Check memory usage (detailed)\n';
                                text += '• `cekram` - Check RAM realtime (simple)\n\n';
                                text += '*Group Commands:*\n';
                                text += '• `ht` / `hidetag` - Tag all members (group only)\n\n';
                                text += '*Message Commands:*\n';
                                text += '• `q` / `quoted` - Forward quoted message\n';
                                text += '• `rvo` / `viewonce` - Open view once message\n\n';
                                text += '*List Commands:*\n';
                                text += '• `groups` - Show all groups\n';
                                text += '• `contacts` - Show all contacts\n\n';
                                text += '*Advanced Commands:*\n';
                                text += '• `>` / `eval` - Execute JavaScript code\n';
                                text += '• `$` / `bash` - Execute bash command\n';
                                await m.reply(text.trim());
                                logCommand(m, hisoka, 'menu');
                                break;
                        }

                        case 'memory':
                        case 'ram':
                        case 'mem': {
                                try {
                                        const memMonitor = global.memoryMonitor;
                                        if (!memMonitor) {
                                                await m.reply('Memory monitor tidak tersedia.');
                                                break;
                                        }

                                        const status = memMonitor.getStatus();
                                        const uptime = process.uptime();

                                        let text = `╭━━━『 *💾 MEMORY STATUS* 』━━━┄⊱\n`;
                                        text += `┃\n`;
                                        text += `┃ *📊 Process Memory*\n`;
                                        text += `┃ • Current: ${status.currentFormatted}\n`;
                                        text += `┃ • Limit: ${status.limitFormatted}\n`;
                                        text += `┃ • Usage: ${status.percentage}%\n`;
                                        text += `┃\n`;
                                        text += `┃ *🔧 Heap Memory*\n`;
                                        text += `┃ • Total: ${status.heap.totalFormatted}\n`;
                                        text += `┃ • Used: ${status.heap.usedFormatted}\n`;
                                        text += `┃\n`;
                                        text += `┃ *🖥️ System Memory (Server)*\n`;
                                        text += `┃ • Total: ${status.system.totalFormatted}\n`;
                                        text += `┃ • Used: ${status.system.usedFormatted}\n`;
                                        text += `┃ • Free: ${status.system.freeFormatted}\n`;
                                        text += `┃\n`;
                                        text += `┃ *⚙️ Monitor Config*\n`;
                                        text += `┃ • Enabled: ${status.enabled ? '✅ Yes' : '❌ No'}\n`;
                                        text += `┃ • Auto Detect: ${status.autoDetect ? '✅ ' + status.autoDetectPercentage + '%' : '❌ Manual'}\n`;
                                        text += `┃ • Check Interval: ${status.checkInterval / 1000}s\n`;
                                        text += `┃ • Log Usage: ${status.logUsage ? '✅ Yes' : '❌ No'}\n`;
                                        text += `┃ • Uptime: ${msToTime(uptime * 1000)}\n`;
                                        text += `┃\n`;
                                        text += `╰━━━━━━━━━━━━━━━━━┄⊱`;

                                        if (parseFloat(status.percentage) >= 80) {
                                                text += `\n\n⚠️ *Warning:* Memory usage tinggi! Auto-restart akan terjadi jika mencapai limit.`;
                                        }

                                        await m.reply(text);
                                        logCommand(m, hisoka, 'memory');
                                } catch (error) {
                                        console.error('\x1b[31m[Memory] Error:\x1b[39m', error.message);
                                        await m.reply(`Error: ${error.message}`);
                                }
                                break;
                        }

                        case 'rvo':
                        case 'viewonce':
                        case 'vo': {
                                try {
                                        if (!m.isQuoted) {
                                                await m.reply(`*📱 Cara Penggunaan View Once*

*Command:* .rvo / .viewonce / .vo
*Action:* Reply pesan view once yang ingin dibuka

*Format yang Didukung:*
• 🖼️ Gambar View Once
• 🎥 Video View Once
• 🎵 Audio View Once
• 📄 Dokumen View Once
• 🏷️ Sticker View Once

*Contoh Penggunaan:*
1. Reply pesan view once
2. Ketik: .rvo
3. Media akan dikirim ulang tanpa view once`);
                                                break;
                                        }

                                        const quotedMsg = m.content?.contextInfo?.quotedMessage;
                                        if (!quotedMsg) {
                                                await m.reply('Tidak ada pesan yang di-reply.');
                                                break;
                                        }

                                        const mediaInfo = extractMediaFromMessage(quotedMsg);

                                        if (!mediaInfo) {
                                                await m.reply('Media tidak ditemukan dalam pesan yang di-reply.');
                                                break;
                                        }

                                        if (!mediaInfo.isViewOnce) {
                                                await m.reply('Pesan ini bukan view once. Gunakan command ini hanya untuk pesan view once.');
                                                break;
                                        }

                                        await hisoka.sendMessage(m.from, { react: { text: '⏳', key: m.key } });

                                        const contextInfo = m.content?.contextInfo;
                                        const quotedParticipant = contextInfo?.participant;
                                        const quotedStanzaId = contextInfo?.stanzaId;

                                        const messageKey = {
                                                remoteJid: m.from,
                                                fromMe: quotedParticipant ? false : (contextInfo?.fromMe || false),
                                                id: quotedStanzaId,
                                                participant: isJidGroup(m.from) ? quotedParticipant : undefined
                                        };

                                        let downloadMessage = {};
                                        downloadMessage[mediaInfo.mediaType] = mediaInfo.mediaMessage;

                                        const buffer = await downloadMediaMessage(
                                                {
                                                        message: downloadMessage,
                                                        key: messageKey
                                                },
                                                'buffer',
                                                {},
                                                {
                                                        logger: hisoka.logger,
                                                        reuploadRequest: hisoka.updateMediaMessage
                                                }
                                        );

                                        const jakartaTime = new Date().toLocaleString('id-ID', {
                                                timeZone: 'Asia/Jakarta',
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit'
                                        });

                                        const caption = mediaInfo.mediaMessage.caption || '';
                                        let mediaTypeDisplay = '';
                                        let sendOptions = {};

                                        const formatCaption = (type, originalCaption = '') => {
                                                return `╭━━━『 *📱 VIEW ONCE MEDIA* 』━━━┄⊱
┃
┃ *🎯 Type:* ${type}
┃ *📅 Waktu:* ${jakartaTime} WIB
┃ *💬 Caption:* ${originalCaption || 'No caption'}
┃ *📱 Sender:* ${m.quoted?.pushName || m.pushName || 'Unknown'}
┃ *✅ Status:* Berhasil dibuka
┃
╰━━━━━━━━━━━━━━━━━┄⊱

_📱 View once berhasil dibuka!_`;
                                        };

                                        switch (mediaInfo.mediaType) {
                                                case 'imageMessage':
                                                        mediaTypeDisplay = '🖼️ Image';
                                                        sendOptions = {
                                                                image: buffer,
                                                                caption: formatCaption(mediaTypeDisplay, caption)
                                                        };
                                                        break;

                                                case 'videoMessage':
                                                        mediaTypeDisplay = '🎥 Video';
                                                        sendOptions = {
                                                                video: buffer,
                                                                caption: formatCaption(mediaTypeDisplay, caption)
                                                        };
                                                        break;

                                                case 'audioMessage':
                                                        mediaTypeDisplay = '🎵 Audio';
                                                        sendOptions = {
                                                                audio: buffer,
                                                                mimetype: mediaInfo.mediaMessage.mimetype || 'audio/ogg; codecs=opus',
                                                                ptt: mediaInfo.mediaMessage.ptt || false
                                                        };
                                                        break;

                                                case 'documentMessage':
                                                        mediaTypeDisplay = '📄 Document';
                                                        sendOptions = {
                                                                document: buffer,
                                                                caption: formatCaption(mediaTypeDisplay, caption),
                                                                mimetype: mediaInfo.mediaMessage.mimetype || 'application/octet-stream',
                                                                fileName: mediaInfo.mediaMessage.fileName || 'ViewOnce_Document'
                                                        };
                                                        break;

                                                case 'stickerMessage':
                                                        mediaTypeDisplay = '🏷️ Sticker';
                                                        sendOptions = {
                                                                sticker: buffer
                                                        };
                                                        break;

                                                default:
                                                        throw new Error(`Unsupported media type: ${mediaInfo.mediaType}`);
                                        }

                                        const myNumber = hisoka.user.id.split(':')[0] + '@s.whatsapp.net';
                                        await hisoka.sendMessage(myNumber, sendOptions);

                                        await hisoka.sendMessage(m.from, { react: { text: '✅', key: m.key } });

                                        logCommand(m, hisoka, 'rvo');
                                } catch (error) {
                                        console.error('\x1b[31m[RVO] Error:\x1b[39m', error.message);
                                        await hisoka.sendMessage(m.from, { react: { text: '❌', key: m.key } });
                                        await m.reply(`Gagal membuka view once: ${error.message}`);
                                }
                                break;
                        }

                        case 'cekram':
                        case 'checkram':
                        case 'ramcheck': {
                                try {
                                        const { formatBytes, getCurrentMemoryUsage, getSystemMemoryInfo } = await import('../helper/memoryMonitor.js');
                                        
                                        const memUsage = getCurrentMemoryUsage();
                                        const systemMem = getSystemMemoryInfo();
                                        const memLimit = global.memoryMonitor?.memoryLimit || systemMem.total;
                                        const percentage = ((memUsage.rss / memLimit) * 100).toFixed(1);
                                        const systemPercentage = ((systemMem.used / systemMem.total) * 100).toFixed(1);
                                        
                                        let text = `╭━━━『 *RAM STATUS* 』━━━┄\n`;
                                        text += `┃\n`;
                                        text += `┃ *Process Memory*\n`;
                                        text += `┃ ${formatBytes(memUsage.rss)} / ${formatBytes(memLimit)}\n`;
                                        text += `┃ Usage: ${percentage}%\n`;
                                        text += `┃\n`;
                                        text += `┃ *System Memory*\n`;
                                        text += `┃ ${formatBytes(systemMem.used)} / ${formatBytes(systemMem.total)}\n`;
                                        text += `┃ Usage: ${systemPercentage}%\n`;
                                        text += `┃\n`;
                                        text += `╰━━━━━━━━━━━━━━━┄`;
                                        
                                        await m.reply(text);
                                        logCommand(m, hisoka, 'cekram');
                                } catch (error) {
                                        console.error('\x1b[31m[CekRAM] Error:\x1b[39m', error.message);
                                        await m.reply(`Error: ${error.message}`);
                                }
                                break;
                        }

                        default:
                                break;
                }
        } catch (error) {
                console.error(`\x1b[31mError in message handler:\x1b[39m\n`, error);
        }
}
