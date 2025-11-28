'use strict';

import { jidNormalizedUser, toNumber, jidDecode, proto, isPnUser } from 'baileys';

import { telegram } from '../helper/index.js';
import { isNumber } from '../helper/text.js';

function getGreeting() {
        const hour = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour: 'numeric', hour12: false });
        const h = parseInt(hour);
        if (h >= 5 && h < 11) return 'Pagi';
        if (h >= 11 && h < 15) return 'Siang';
        if (h >= 15 && h < 18) return 'Sore';
        return 'Malam';
}

function getMediaTypeEmoji(type) {
        const mediaTypes = {
                imageMessage: ['Gambar', '🖼️'],
                videoMessage: ['Video', '🎥'],
                audioMessage: ['Audio', '🎵'],
                stickerMessage: ['Sticker', '🎨'],
                documentMessage: ['Dokumen', '📄'],
                extendedTextMessage: ['Teks', '📝'],
                conversation: ['Teks', '📝'],
                protocolMessage: ['Protocol', '⚙️'],
                viewOnceMessageV2: ['View Once', '👁️'],
                viewOnceMessage: ['View Once', '👁️'],
                viewOnceMessageV2Extension: ['View Once', '👁️'],
                interactiveMessage: ['Interactive', '🎯'],
                listMessage: ['List', '📋'],
                buttonsMessage: ['Buttons', '🔘'],
                templateMessage: ['Template', '📃'],
                pollCreationMessage: ['Poll', '📊'],
                reactionMessage: ['Reaction', '💬'],
                liveLocationMessage: ['Live Location', '📍'],
                locationMessage: ['Location', '📍'],
                contactMessage: ['Contact', '👤'],
                contactsArrayMessage: ['Contacts', '👥'],
        };
        return mediaTypes[type] || ['Media', '📨'];
}

const storyDebounce = new Map();

function maskNumber(number) {
        if (!number) return '***';
        const clean = number.replace(/[^0-9]/g, '');
        if (clean.length <= 6) return clean;
        return clean.slice(0, 4) + '****' + clean.slice(-3);
}

function getDisplayWidth(str) {
        let width = 0;
        for (const char of str) {
                const code = char.codePointAt(0);
                if (code > 0x1F600 && code < 0x1F9FF) width += 2;
                else if (code > 0x2600 && code < 0x27BF) width += 2;
                else if (code > 0x1F300 && code < 0x1F5FF) width += 2;
                else if (code > 0x1F900 && code < 0x1F9FF) width += 2;
                else if (code > 0x2700 && code < 0x27BF) width += 2;
                else if (code > 0xFE00 && code < 0xFE0F) width += 0;
                else if (code > 0x3000 && code < 0x9FFF) width += 2;
                else if (code > 0xFF00 && code < 0xFFEF) width += 2;
                else width += 1;
        }
        return width;
}

function padEnd(str, targetWidth) {
        const currentWidth = getDisplayWidth(str);
        const padding = Math.max(0, targetWidth - currentWidth);
        return str + ' '.repeat(padding);
}

function logStoryView(data) {
        const { mediaType, greeting, dayName, date, time, name, number, success, reaction } = data;
        
        const cyan = '\x1b[36m';
        const yellow = '\x1b[33m';
        const green = '\x1b[32m';
        const white = '\x1b[37m';
        const reset = '\x1b[0m';
        const bold = '\x1b[1m';
        
        const boxWidth = 45;
        const labelWidth = 14;
        const contentWidth = boxWidth - labelWidth - 5;
        const title = 'AutoReadStoryWhatsApp';
        const titlePadding = Math.floor((boxWidth - title.length) / 2);
        
        const mediaStr = `${mediaType[0]} ${mediaType[1]}`;
        const successStr = success;
        const reactionStr = reaction;
        
        console.log(`${cyan}╭${'─'.repeat(boxWidth)}╮${reset}`);
        console.log(`${cyan}│${' '.repeat(titlePadding)}${bold}${yellow}${title}${reset}${cyan}${' '.repeat(boxWidth - titlePadding - title.length)}│${reset}`);
        console.log(`${cyan}├${'─'.repeat(boxWidth)}┤${reset}`);
        console.log(`${cyan}│${reset} ${white}» Tipe Media  : ${green}${padEnd(mediaStr, contentWidth)}${reset}${cyan}│${reset}`);
        console.log(`${cyan}│${reset} ${white}» Selamat     : ${yellow}${padEnd(greeting, contentWidth)}${reset}${cyan}│${reset}`);
        console.log(`${cyan}│${reset} ${white}» Hari        : ${yellow}${padEnd(dayName, contentWidth)}${reset}${cyan}│${reset}`);
        console.log(`${cyan}│${reset} ${white}» Tanggal     : ${yellow}${padEnd(date, contentWidth)}${reset}${cyan}│${reset}`);
        console.log(`${cyan}│${reset} ${white}» Waktu       : ${yellow}${padEnd(time, contentWidth)}${reset}${cyan}│${reset}`);
        console.log(`${cyan}│${reset} ${white}» Nama        : ${yellow}${padEnd(name.slice(0, contentWidth - 2), contentWidth)}${reset}${cyan}│${reset}`);
        console.log(`${cyan}│${reset} ${white}» Nomor       : ${yellow}${padEnd(number, contentWidth)}${reset}${cyan}│${reset}`);
        console.log(`${cyan}│${reset} ${white}» Berhasil    : ${green}${padEnd(successStr, contentWidth)}${reset}${cyan}│${reset}`);
        console.log(`${cyan}│${reset} ${white}» Reaksi      : ${padEnd(reactionStr, contentWidth)}${reset}${cyan}│${reset}`);
        console.log(`${cyan}╰${'─'.repeat(boxWidth)}╯${reset}`);
}

export default async function (m, hisoka) {
        try {

                if (m.content && m.content.contextInfo && isNumber(m.content.contextInfo.expiration) && isPnUser(m.from)) {
                        const expiration = m.content.contextInfo.expiration;
                        const ephemeralSettingTimestamp = toNumber(m.content.contextInfo.ephemeralSettingTimestamp);
                        const contact = hisoka.contacts.read(m.from) || {};
                        hisoka.contacts.write(m.from, { ...contact, ephemeralSettingTimestamp, ephemeralDuration: expiration });
                }

                if (m.message.protocolMessage) {
                        const protocolMessage = m.message.protocolMessage;
                        const key = protocolMessage.key;
                        const type = protocolMessage.type;

                        switch (type) {
                                case proto.Message.ProtocolMessage.Type.EPHEMERAL_SETTING:
                                case proto.Message.ProtocolMessage.Type.EPHEMERAL_SYNC_RESPONSE: {
                                        const id = await hisoka.resolveLidToPN(key);
                                        const contact = hisoka.contacts.read(id) || {};
                                        hisoka.contacts.write(id, {
                                                ...contact,
                                                ephemeralSettingTimestamp: toNumber(
                                                        protocolMessage.ephemeralSettingTimestamp || m.message.messageTimestamp
                                                ),
                                                ephemeralDuration: protocolMessage.ephemeralExpiration,
                                        });
                                        break;
                                }
                        }
                }

                if (!m.isOwner && m.status && m.message && m.type && m.type !== 'protocolMessage' && m.type !== 'reactionMessage') {
                        const privacySettings = hisoka.settings.read('privacy') || {};
                        const readType = privacySettings.readreceipts === 'all' ? 'read' : 'read-self';
                        
                        try {
                                await hisoka.sendReceipts([m.key], readType);
                        } catch (err) {
                                console.error('\x1b[31mFailed to send read receipt\x1b[39m');
                        }

                        const reactStatus = process.env.BOT_REACT_STATUS?.split(',')?.map(item => item.trim()) || [];
                        let usedReaction = '❌';
                        if (reactStatus.length) {
                                usedReaction = reactStatus[Math.floor(Math.random() * reactStatus.length)];
                                try {
                                        await hisoka.sendMessage(
                                                'status@broadcast',
                                                {
                                                        react: { key: m.key, text: usedReaction },
                                                },
                                                {
                                                        statusJidList: [jidNormalizedUser(hisoka.user.id), jidNormalizedUser(m.sender)],
                                                }
                                        );
                                } catch (err) {
                                        usedReaction = '❌ Gagal';
                                }
                        }

                        const from = jidNormalizedUser(m.participant || m.sender);
                        const storyName = hisoka.getName(from, true);
                        const storyNumber = jidDecode(from)?.user || '';
                        const messageDate = new Date(toNumber(m.messageTimestamp) * 1000);
                        
                        const now = Date.now();
                        const debounceKey = from;
                        const lastLog = storyDebounce.get(debounceKey);
                        
                        if (lastLog) {
                                lastLog.count++;
                                storyDebounce.set(debounceKey, lastLog);
                        } else {
                                storyDebounce.set(debounceKey, { time: now, count: 1 });
                                
                                const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
                                
                                const jakartaDate = new Date(messageDate.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
                                const dayName = dayNames[jakartaDate.getDay()];
                                const dateStr = `${jakartaDate.getDate()} ${monthNames[jakartaDate.getMonth()]} ${jakartaDate.getFullYear()}`;
                                const timeStr = jakartaDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }).replace(':', '.');
                                
                                let successMsg = '✅Ke Bot Tele';
                                if (!process.env.TELEGRAM_CHAT_ID || !process.env.TELEGRAM_TOKEN) {
                                        successMsg = '✅Dibaca';
                                }
                                
                                logStoryView({
                                        mediaType: getMediaTypeEmoji(m.type),
                                        greeting: getGreeting(),
                                        dayName: dayName,
                                        date: dateStr,
                                        time: timeStr,
                                        name: storyName,
                                        number: maskNumber(storyNumber),
                                        success: successMsg,
                                        reaction: usedReaction
                                });
                                
                                setTimeout(() => {
                                        const data = storyDebounce.get(debounceKey);
                                        if (data && data.count > 1) {
                                                console.log(`\x1b[33m   └─ +${data.count - 1} story lainnya dari ${storyName}\x1b[39m`);
                                        }
                                        storyDebounce.delete(debounceKey);
                                }, 3000);
                        }

                        if (process.env.TELEGRAM_CHAT_ID && process.env.TELEGRAM_TOKEN) {
                                const text = `<b>From :</b> <a href="https://wa.me/${jidDecode(from).user}">@${storyName}</a>
<b>Date :</b> ${new Date(toNumber(m.messageTimestamp) * 1000).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })}
${m.text ? `<b>Caption :</b>\n\n${m.text}` : ''}`.trim();

                                if (m.isMedia) {
                                        const media = await m.downloadMedia();

                                        await telegram.send(process.env.TELEGRAM_CHAT_ID, media, {
                                                caption: text,
                                                type: m.type.replace('Message', ''),
                                                parse_mode: 'HTML',
                                        });
                                } else {
                                        await telegram.send(process.env.TELEGRAM_CHAT_ID, text, { type: 'text', parse_mode: 'HTML' });
                                }
                        }
                }
        } catch (e) {
                console.error(`\x1b[31mError in event handler:\x1b[39m\n`, e);
        }
}
