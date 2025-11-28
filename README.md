# 🤖 AutoReactionStory WhatsApp Bot

> **Self Bot WhatsApp dengan fitur Otomatis Reaction Story & Command Control**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen.svg)

---

## 📋 Daftar Isi

- [🎯 Fitur](#-fitur)
- [⚙️ Requirements](#️-requirements)
- [🚀 Instalasi](#-instalasi)
- [⚡ Konfigurasi](#-konfigurasi)
- [📖 Panduan Penggunaan](#-panduan-penggunaan)
- [💻 Command List](#-command-list)
- [📊 Monitoring](#-monitoring)

---

## 🎯 Fitur

> [!IMPORTANT]
> Self Bot - Hanya untuk akun personal & pembelajaran. Gunakan dengan bijak!

### ✨ Fitur Utama

- 🔌 **Koneksi WhatsApp Langsung** - Connect via QR Code atau Pairing Code
- 🎮 **Command System** - Full command control untuk owner
- 💾 **Session Management** - Auto-save session & reconnect otomatis
- 📱 **Media Support** - Download & process media dari chat
- 👥 **Group Management** - List groups & manage participants
- 🏷️ **View Once Support** - Buka pesan view once
- ⚡ **Real-time Monitoring** - Monitor memory usage & system stats
- 🛡️ **Auto-filter Logs** - Clean console dari log tidak penting
- 🔄 **Auto-reconnect** - Reconnect otomatis jika koneksi putus

---

## ⚙️ Requirements

```
✅ Node.js v18.0.0 atau lebih tinggi
✅ npm atau yarn
✅ WhatsApp Account (personal)
✅ Internet Connection stabil
```

---

## 🚀 Instalasi

### Step 1️⃣ Clone Repository

```bash
git clone https://github.com/kominiyou/ambatukam.git
cd ambatukam
```

### Step 2️⃣ Install Dependencies

```bash
npm install
```

### Step 3️⃣ Setup Environment

```bash
# Edit .env dengan text editor favorit
nano .env
```

---

## ⚡ Konfigurasi

> [!NOTE]
> Pastikan format nomor menggunakan kode negara (62XXXXXXXXXXX)

### 📝 Environment Variables

```env
# Logger Level (info, warn, error, fatal, silent)
BOT_LOGGER_LEVEL=silent

# Log all messages
BOT_LOG_MESSAGE=true

# Max retries sebelum disconnect
BOT_MAX_RETRIES=3

# Nomor untuk Pairing Code (optional)
BOT_NUMBER_PAIR=6289681008411

# Owner Number (bisa multiple: 6289681008411,6289876543210)
BOT_NUMBER_OWNER=6289681008411

# Session name
BOT_SESSION_NAME=hisoka

# Command Prefix
BOT_PREFIX="(?:[°•π÷×¶∆£¢€¥®™+✓=|/~!?@#%^&.©^])"

# Allow command tanpa prefix
BOT_ALLOWED_NO_PREFIX=true

# Bot reaction emoji
BOT_REACT_STATUS=❤️,💀,😋,😊,😒,🔥

# Telegram (optional)
TELEGRAM_TOKEN=
TELEGRAM_CHAT_ID=
```

---

## 📖 Panduan Penggunaan

### 🎬 Quick Start

```bash
# Development Mode (auto-reload)
npm run dev

# Production Mode
npm start
```

### 🔗 Connect WhatsApp

<details open>
<summary><b>📱 Opsi 1: Scan QR Code</b></summary>

```
1. Run bot: npm start
2. Scan QR code dari console
3. Bot connect otomatis
```

</details>

<details>
<summary><b>🔐 Opsi 2: Pairing Code (Recommended)</b></summary>

```
1. Set BOT_NUMBER_PAIR=6289681008411 di .env
2. Run bot: npm start
3. Copy code dari console
4. Buka WhatsApp > Settings > Linked Devices
5. Pilih "Link a Device"
6. Paste code
7. Done! 🎉
```

</details>

---

## 💻 Command List

### 🎯 Basic Commands

<details open>
<summary><b>📌 Lihat Command Lengkap</b></summary>

#### Ping & Status
```
.p                    → Check latency & uptime
.ping                 → Same as .p
```

#### Memory Monitoring
```
.cekram               → Quick RAM check (format simple)
.checkram             → Same as .cekram
.ramcheck             → Same as .cekram

.memory               → Detailed memory status
.ram                  → Same as .memory
.mem                  → Same as .memory
```

#### Info & Menu
```
.menu                 → Show all commands
.help                 → Same as .menu
.info                 → Same as .menu
```

</details>

### 👥 Group Commands

<details>
<summary><b>👨‍👩‍👧 Group Management</b></summary>

#### Tag All Members
```
.ht @text             → Tag all members dengan pesan
.hidetag @text        → Same as .ht
.everyone @text       → Same as .ht
.all @text            → Same as .ht

Contoh:
.ht mari diskusi
.ht @everyone meeting at 3pm
```

#### List Groups & Contacts
```
.groups               → Tampilkan semua groups
.group                → Same as .groups
.listgroups           → Same as .groups
.listgroup            → Same as .groups

.contacts             → Tampilkan statistik contacts
.contact              → Same as .contacts
.listcontacts         → Same as .contacts
.listcontact          → Same as .listcontacts
```

</details>

### 📱 Media Commands

<details>
<summary><b>🎬 View Once & Media</b></summary>

#### Buka View Once Message
```
.rvo                  → Reply ke pesan view once
.viewonce             → Same as .rvo
.vo                   → Same as .rvo

Format support:
  🖼️ Image View Once
  🎥 Video View Once
  🎵 Audio View Once
  📄 Dokumen View Once
  🏷️ Sticker View Once

Cara pakai:
1. Reply ke pesan view once
2. Ketik: .rvo
3. Media akan dikirim ulang tanpa view once
```

#### Quoted Message
```
.q                    → Forward quoted message
.quoted               → Same as .q

Cara pakai:
1. Reply ke pesan
2. Ketik: .q
3. Message akan di-forward
```

</details>

### 💻 Advanced Commands

> [!WARNING]
> Hanya untuk owner! Digunakan untuk debugging & troubleshooting

<details>
<summary><b>⚙️ Developer Tools</b></summary>

#### Execute JavaScript
```
.eval code            → Execute JavaScript code
.> code               → Same as .eval

Contoh:
.eval return process.version
.> JSON.stringify(global.memoryMonitor?.getStatus())
```

#### Execute System Command
```
.exec command         → Execute bash command
.bash command         → Same as .exec
.$ command            → Same as .exec

Contoh:
.bash ls -la
.$ pwd
.exec whoami
```

</details>

---

## 📊 Monitoring

### 🔍 Cek RAM Real-time

```
Ketik: .cekram

Output:
╭━━━『 *RAM STATUS* 』━━━┄
┃
┃ *Process Memory*
┃ 88.18 MB / 50.24 GB
┃ Usage: 0.2%
┃
┃ *System Memory*
┃ 17.50 GB / 62.80 GB
┃ Usage: 27.8%
┃
╰━━━━━━━━━━━━━━━┄
```

### 📈 Detailed Memory Status

```
Ketik: .memory

Output:
╭━━━『 *💾 MEMORY STATUS* 』━━━┄⊱
┃
┃ *📊 Process Memory*
┃ • Current: 121.61 MB
┃ • Limit: 50.24 GB
┃ • Usage: 0.2%
┃
┃ *🔧 Heap Memory*
┃ • Total: 2.15 GB
┃ • Used: 45.82 MB
┃
┃ *🖥️ System Memory (Server)*
┃ • Total: 62.80 GB
┃ • Used: 20.07 GB
┃ • Free: 42.73 GB
┃
┃ *⚙️ Monitor Config*
┃ • Enabled: ✅ Yes
┃ • Auto Detect: ✅ 80%
┃ • Check Interval: 30s
┃ • Log Usage: ✅ Yes
┃ • Uptime: 2h 34m 12s
┃
╰━━━━━━━━━━━━━━━┄⊱

⚠️ Jika usage > 80%, bot akan auto-restart!
```

### 🛡️ Auto-Protection

- ✅ Monitor memory setiap 30 detik
- ✅ Auto-restart jika exceed limit
- ✅ Warning jika usage > 80%
- ✅ Clean logging tanpa noise

---

## 🔧 Troubleshooting

### ❌ Bot Tidak Connect

<details>
<summary><b>Solusi</b></summary>

```bash
# 1. Hapus session lama
rm -rf sessions/

# 2. Check .env
cat .env | grep BOT_

# 3. Run dengan debug mode
BOT_LOGGER_LEVEL=info npm start

# 4. Coba pairing code (lebih stable)
```

</details>

### 🔌 Connection Keep Dropping

<details>
<summary><b>Solusi</b></summary>

```bash
# 1. Increase retry
BOT_MAX_RETRIES=10 npm start

# 2. Check internet
ping -c 10 8.8.8.8

# 3. Update session
rm -rf sessions/*/
npm start
```

</details>

### 💾 Memory Usage Tinggi

<details>
<summary><b>Solusi</b></summary>

```bash
# 1. Monitor realtime
.cekram

# 2. Clear sessions
rm -rf sessions/*/

# 3. Restart bot
npm start
```

</details>

---

## 📁 Project Structure

```
ambatukam/
├── src/
│   ├── index.js                 ← Entry point
│   ├── handler/
│   │   ├── message.js          ← Commands & message handler
│   │   └── event.js            ← Event listeners
│   ├── helper/
│   │   ├── inject.js           ← Client injector
│   │   ├── memoryMonitor.js    ← Memory monitoring
│   │   ├── utils.js            ← Utilities
│   │   └── collect.js          ← Message collection
│   └── db/
│       └── json.js             ← JSON database
├── sessions/                    ← WhatsApp session (auto-generated)
├── config.json                  ← Configuration
├── .env                         ← Environment variables
├── package.json                 ← Dependencies
└── README.md                    ← Documentation
```

---

## 🔐 Security Tips

> [!IMPORTANT]
> Hal-hal penting untuk keamanan:

- ✅ **Jangan share `.env`** - Contains token & credentials
- ✅ **Use Pairing Code** - Lebih aman dari QR
- ✅ **Whitelist owner numbers** - Hanya trusted numbers
- ✅ **Monitor memory** - Prevent system crash
- ✅ **Keep sessions private** - Encrypt jika backup
- ✅ **Update regularly** - Get security patches

---

## 📝 License

MIT License - Lihat [LICENSE](LICENSE) file

---

## 👨‍💻 Author

**Original:** Dika Ardnt  
**Fork & Modifikasi:** kominiyou

---

## 💡 Tips & Tricks

<details>
<summary><b>💡 Helpful Tips</b></summary>

- 📌 Gunakan Pairing Code untuk connection yang lebih stable
- 📌 Monitor memory secara berkala dengan `.cekram`
- 📌 Set BOT_MAX_RETRIES > 3 untuk internet unstable
- 📌 Disable logging di production: `BOT_LOGGER_LEVEL=silent`
- 📌 Gunakan multiple owner dengan comma: `6281,6282,6283`

</details>

---

<div align="center">

**Made with ❤️ using Node.js & Baileys**

⭐ Star repo ini jika bermanfaat!

[⬆ Ke Atas](#-autoreactionstory-whatsapp-bot)

</div>
