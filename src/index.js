import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import makeWASocket, {
        delay,
        useMultiFileAuthState,
        DisconnectReason,
        Browsers,
        makeCacheableSignalKeyStore,
        areJidsSameUser,
        isLidUser,
        fetchLatestBaileysVersion,
} from 'baileys';
import pino from 'pino';
import { Boom } from '@hapi/boom';
import qrcode from 'qrcode-terminal';

import JSONDB from './db/json.js';
import { injectClient } from './helper/inject.js';
import { getCaseName } from './helper/utils.js';
import { MemoryMonitor } from './helper/memoryMonitor.js';

if (!process.env.BOT_SESSION_NAME) process.env.BOT_SESSION_NAME = 'default';
if (!process.env.BOT_NUMBER_OWNER) process.env.BOT_NUMBER_OWNER = '1';

const sessionDir = (global.sessionDir = path.join(process.cwd(), 'sessions', process.env.BOT_SESSION_NAME));

if (process.env.BOT_MAX_RETRIES && isNaN(Number(process.env.BOT_MAX_RETRIES))) {
        console.warn('\x1b[33mWarning: BOT_MAX_RETRIES is not a valid number. Disabling max retry limit.\x1b[39m');
        delete process.env.BOT_MAX_RETRIES;
}

const logger = pino({ 
        level: process.env.BOT_LOGGER_LEVEL || 'silent',
        hooks: {
                logMethod(inputArgs, method) {
                        const msg = inputArgs[0];
                        if (typeof msg === 'string' && (msg.includes('Closing session') || msg.includes('SessionEntry'))) {
                                return;
                        }
                        return method.apply(this, inputArgs);
                }
        }
}).child({ class: 'Aja Sendiri' });

const silentLogger = pino({ level: 'silent' });

const filterLogs = (message) => {
        if (typeof message !== 'string') return false;
        const blockedPatterns = [
                'Closing stale open session',
                'Closing session:',
                'Closing session',
                'SessionEntry',
                'prekey bundle',
                'Closing open session',
                '_chains',
                'registrationId',
                'currentRatchet',
                'pendingPreKey',
                'baseKey:',
                'ephemeralKeyPair',
                'lastRemoteEphemeralKey',
                'indexInfo',
                'baseKeyType',
                'Failed to decrypt message',
                'Decrypted message with closed session',
                'Session error',
                'Bad MAC',
                'libsignal/src/crypto.js',
                'libsignal/src/session_cipher.js',
                'verifyMAC',
                'doDecryptWhisperMessage',
                'decryptWithSessions',
                'Message absent from node',
                'chainKey',
                'chainType',
                'messageKeys',
                'previousCounter',
                'rootKey',
                'pubKey',
                'privKey',
                'remoteIdentityKey',
                '<Buffer'
        ];
        return blockedPatterns.some(pattern => message.includes(pattern));
};

const originalConsoleLog = console.log;
console.log = (...args) => {
        const msg = args[0];
        if (typeof msg === 'string' && filterLogs(msg)) return;
        if (typeof msg === 'string' && args.length > 1) {
                const secondArg = args[1];
                if (typeof secondArg === 'object' && secondArg !== null) {
                        if (secondArg._chains || secondArg.registrationId || secondArg.currentRatchet || secondArg.indexInfo || secondArg.pendingPreKey) return;
                }
        }
        if (typeof msg === 'object' && msg !== null) {
                if (msg._chains || msg.registrationId || msg.currentRatchet || msg.indexInfo || msg.pendingPreKey) return;
                if (msg.messageStubParameters?.includes('Message absent from node')) return;
        }
        const fullMessage = args.map(a => typeof a === 'string' ? a : JSON.stringify(a)).join(' ');
        if (filterLogs(fullMessage)) return;
        originalConsoleLog.apply(console, args);
};

const originalConsoleWarn = console.warn;
console.warn = (...args) => {
        const msg = args[0];
        if (typeof msg === 'string' && filterLogs(msg)) return;
        originalConsoleWarn.apply(console, args);
};

const originalConsoleError = console.error;
console.error = (...args) => {
        const msg = args[0];
        if (typeof msg === 'string' && filterLogs(msg)) return;
        originalConsoleError.apply(console, args);
};

let reconnectCount = 0;
let memoryMonitor = null;

async function main() {
        console.log(`\x1b[36mStarting with session directory: ${sessionDir}\x1b[39m`);

        if (memoryMonitor) {
                memoryMonitor.stop();
        }
        memoryMonitor = new MemoryMonitor({
                onLimitReached: () => {
                        console.log('\x1b[33mMemory limit reached. Restarting process...\x1b[39m');
                        process.exit(1);
                }
        });
        memoryMonitor.start();
        global.memoryMonitor = memoryMonitor;

        if (reconnectCount > 0) {
                console.warn(`\x1b[33mReconnecting... Attempt ${reconnectCount}\x1b[39m`);
        }

        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
        const { version, isLatest } = await fetchLatestBaileysVersion();

        console.info(
                `\x1b[32mUsing WhatsApp version: ${version.join('.')}${
                        isLatest ? '' : ' (latest version is recommended)'
                }\x1b[39m`
        );

        const cacheMsg = new Map();
        const groups = new JSONDB('groups', sessionDir);
        const contacts = new JSONDB('contacts', sessionDir);
        const settings = new JSONDB('settings', sessionDir);

        const hisoka = injectClient(
                makeWASocket({
                        version,
                        logger,
                        auth: {
                                creds: state.creds,
                                keys: makeCacheableSignalKeyStore(state.keys, silentLogger),
                        },
                        browser: Browsers.appropriate('Chrome'),
                        generateHighQualityLinkPreview: true,
                        syncFullHistory: true,
                        cachedGroupMetadata: async jid => {
                                const group = groups.read(jid);
                                if (!group || !group.participants.length) {
                                        const metadata = await hisoka.groupMetadata(jid);
                                        groups.write(jid, metadata);
                                        return metadata;
                                }
                                return group;
                        },
                        getMessage: async key => {
                                const msg = cacheMsg.get(key.id);
                                return msg?.message || '';
                        },
                }),
                cacheMsg,
                contacts,
                groups,
                settings
        );

        const pairingNumber = process.env.BOT_NUMBER_PAIR || false;
        if (pairingNumber && !hisoka.authState.creds?.registered) {
                try {
                        let phoneNumber = pairingNumber.replace(/[^0-9]/g, '');
                        await delay(3000);
                        let code = await hisoka.requestPairingCode(phoneNumber);
                        const formattedCode = code?.match(/.{1,4}/g)?.join('-') || code;

                        const cyan = '\x1b[36m';
                        const yellow = '\x1b[33m';
                        const green = '\x1b[32m';
                        const white = '\x1b[37m';
                        const bold = '\x1b[1m';
                        const reset = '\x1b[0m';
                        
                        console.log('');
                        console.log(`${cyan}────────────────────────────────────────${reset}`);
                        console.log(`${bold}${yellow}        PAIRING CODE TUTORIAL${reset}`);
                        console.log(`${cyan}────────────────────────────────────────${reset}`);
                        console.log('');
                        console.log(`${white}  Kode Pairing : ${bold}${green}${formattedCode}${reset}`);
                        console.log('');
                        console.log(`${cyan}────────────────────────────────────────${reset}`);
                        console.log(`${bold}${yellow}  LANGKAH-LANGKAH${reset}`);
                        console.log(`${cyan}────────────────────────────────────────${reset}`);
                        console.log('');
                        console.log(`${white}  1. Buka ${green}WhatsApp${reset} ${white}di HP${reset}`);
                        console.log(`${white}  2. Pergi ke : ${yellow}Pengaturan${reset} ${white}->${reset} ${yellow}Perangkat Tertaut${reset}`);
                        console.log(`${white}  3. Pilih ${yellow}Tautkan Perangkat${reset}`);
                        console.log(`${white}  4. Masukkan kode : ${bold}${green}${formattedCode.replace(/-/g, '')}${reset}`);
                        console.log('');
                        console.log(`${cyan}────────────────────────────────────────${reset}`);
                        console.log(`${green}  Kode Berhasil Dibuat${reset}`);
                        console.log(`${yellow}  Menunggu konfirmasi WhatsApp...${reset}`);
                        console.log(`${cyan}────────────────────────────────────────${reset}`);
                        console.log('');
                } catch {
                        console.error('\x1b[31mFailed to request pairing code. Please check your pairing number.\x1b[39m');
                        process.exit(1);
                }
        }

        hisoka.ev.on('creds.update', saveCreds);

        hisoka.ev.on('connection.update', async ({ connection, lastDisconnect, qr }) => {
                if (qr && !pairingNumber) {
                        qrcode.generate(qr, { small: true }, code => {
                                console.log('\x1b[36mScan this QR code to connect:\x1b[39m\n');
                                console.log(code);
                        });
                }

                if (connection === 'open') {
                        lastDisconnect = 0;
                        console.log(`\x1b[32mConnected successfully! ${JSON.stringify(hisoka.user, null, 2)}\x1b[39m`);

                        console.info('\x1b[36mFetching privacy settings...\x1b[39m');
                        const privacySettings = await hisoka.fetchPrivacySettings();
                        settings.write('privacy', privacySettings);

                        console.info('\x1b[36mLoading command handlers...\x1b[39m');
                        const commands = await getCaseName(path.join(process.cwd(), 'src', 'handler', 'message.js'));
                        hisoka.loadedCommands = commands;
                        console.info(`\x1b[32mLoaded ${commands.length} command handlers.\x1b[39m`);
                }

                if (connection === 'close') {
                        const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode || 0;

                        switch (statusCode) {
                                case DisconnectReason.loggedOut:
                                case DisconnectReason.forbidden:
                                        console.error('\x1b[31mSession expired or logged out. Please re-authenticate.\x1b[39m');
                                        const dirContents = await fs.promises.readdir(sessionDir);
                                        for (const file of dirContents) {
                                                if (file.startsWith('.env')) continue;
                                                await fs.promises.rm(path.join(sessionDir, file), { recursive: true, force: true });
                                        }
                                        process.exit(1);
                                        break;

                                case DisconnectReason.restartRequired:
                                        console.info('\x1b[33mRestart required. Reconnecting...\x1b[39m');
                                        await main();
                                        break;

                                case 408:
                                        if (Number(process.env.BOT_MAX_RETRIES) && reconnectCount >= Number(process.env.BOT_MAX_RETRIES)) {
                                                console.info(`\x1b[33mPairing timeout. Max retries reached. Exiting...\x1b[39m`);
                                                process.exit(1);
                                        }
                                        reconnectCount++;
                                        console.info(`\x1b[33mPairing timeout. Reconnecting... Attempt ${reconnectCount}\x1b[39m`);
                                        await delay(Math.min(5 * reconnectCount, 30) * 1000);
                                        main();
                                        break;

                                default:
                                        if (Number(process.env.BOT_MAX_RETRIES) && reconnectCount >= Number(process.env.BOT_MAX_RETRIES)) {
                                                console.error(`\x1b[31mMax retries reached (${process.env.BOT_MAX_RETRIES}). Exiting...\x1b[39m`);
                                                process.exit(1);
                                        }

                                        reconnectCount++;
                                        console.error(
                                                `\x1b[31mConnection closed unexpectedly. Reconnecting in ${Math.min(
                                                        5 * reconnectCount,
                                                        30
                                                )} seconds... (Attempt ${reconnectCount})\x1b[39m`
                                        );

                                        await delay(Math.min(5 * reconnectCount, 30) * 1000);
                                        main();
                                        break;
                        }
                }
        });

        hisoka.ev.on('contacts.upsert', async contactsData => {
                await Promise.all(
                        contactsData.map(async contact => {
                                const jid = await hisoka.resolveLidToPN({ remoteJid: contact.id, remoteJidAlt: contact.phoneNumber });
                                const existingContact = (await contacts.read(jid)) || {};
                                contacts.write(
                                        jid,
                                        Object.assign(
                                                isLidUser(contact.id) ? { id: jid, lid: contact.id } : {},
                                                { isContact: true },
                                                existingContact,
                                                contact
                                        )
                                );
                        })
                );
        });

        hisoka.ev.on('contacts.update', async contactsData => {
                await Promise.all(
                        contactsData.map(async contact => {
                                const jid = await hisoka.resolveLidToPN({ remoteJid: contact.id, remoteJidAlt: contact.phoneNumber });
                                const existingContact = (await contacts.read(jid)) || {};
                                contacts.write(
                                        jid,
                                        Object.assign(isLidUser(contact.id) ? { id: jid, lid: contact.id } : {}, existingContact, contact)
                                );
                        })
                );
        });

        hisoka.ev.on('groups.upsert', async groupsData => {
                await Promise.all(
                        groupsData.map(group => {
                                const groupId = group.id;
                                const existingGroup = groups.read(groupId) || {};
                                return groups.write(groupId, { ...existingGroup, ...group });
                        })
                );
        });

        hisoka.ev.on('groups.update', async groupsData => {
                await Promise.all(
                        groupsData.map(group => {
                                const groupId = group.id;
                                const existingGroup = groups.read(groupId) || {};
                                return groups.write(groupId, { ...existingGroup, ...group });
                        })
                );
        });

        hisoka.ev.on('group-participants.update', ({ id, author, participants, action }) => {
                const existingGroup = groups.read(id) || {};

                switch (action) {
                        case 'add':
                                existingGroup.participants = [...(existingGroup.participants || []), ...participants];
                                break;
                        case 'remove':
                        case 'modify':
                                existingGroup.participants = (existingGroup.participants || []).filter(p => {
                                        const existId = p.phoneNumber || p.id;
                                        return !participants.some(removed => areJidsSameUser(existId, removed.phoneNumber || removed.id));
                                });
                                break;
                        case 'promote':
                        case 'demote':
                                existingGroup.participants = (existingGroup.participants || []).map(p => {
                                        const existId = p.phoneNumber || p.id;
                                        if (participants.some(modified => areJidsSameUser(existId, modified.phoneNumber || modified.id))) {
                                                return { ...p, admin: action === 'promote' ? 'admin' : null };
                                        }
                                        return p;
                                });
                                break;
                        default:
                                console.warn(`\x1b[33mUnknown group action: ${action}\x1b[39m`);
                                return;
                }

                groups.write(id, existingGroup);
        });

        hisoka.ev.on('messages.upsert', async messagesUpsert => {
                for (const message of messagesUpsert.messages) {
                        if (message.key && message.message) {
                                if (!hisoka.cacheMsg.has(message.key.id)) {
                                        hisoka.cacheMsg.set(message.key.id, message);
                                }
                        }

                        const messageHandler = await import('./handler/message.js?v=' + Date.now());
                        await messageHandler.default({ ...messagesUpsert, message }, hisoka);
                }
        });
}

main().catch(err => {
        console.error('\x1b[31mAn error occurred:\x1b[39m');
        console.error(err);
});
