# 🤖 AutoReactionStory WhatsApp Bot

<div align="center">

<!-- Animated Header Banner -->
<img width="100%" src="https://img.shields.io/badge/🚀_Self_Bot_WhatsApp_🚀-000?style=for-the-badge&logo=whatsapp&logoColor=25D366" alt="WhatsApp Bot">

<!-- Status Badges -->
| Status | Version | Node.js | License |
|--------|---------|---------|---------|
| ![Status](https://img.shields.io/badge/ACTIVE-00AA00?style=flat-square&logo=github) | ![Version](https://img.shields.io/badge/1.0.0-0066FF?style=flat-square) | ![Node](https://img.shields.io/badge/18%2B-00FF00?style=flat-square&logo=node.js) | ![MIT](https://img.shields.io/badge/MIT-FF6600?style=flat-square) |

</div>

---

## 📌 Navigation Menu

<div align="center">

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃           🎯 QUICK NAVIGATION            ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

| | | | |
|:---:|:---:|:---:|:---:|
| **[🎬 START](#-quick-start)** | **[⚙️ CONFIG](#-konfigurasi)** | **[⌨️ COMMANDS](#-command-list)** | **[🆘 HELP](#-troubleshooting)** |
| **[📚 DOCS](#-panduan-lengkap)** | **[🔧 SETUP](#-instalasi)** | **[💾 MONITOR](#-monitoring--status)** | **[🔐 SECURITY](#-security--best-practices)** |

</div>

---

## 🎬 Quick Start

<table align="center" border="0">
<tr>
<td width="50%">

### 🟢 Clone & Install

```bash
git clone https://github.com/kominiyou/ambatukam.git
cd ambatukam
npm install
```

</td>
<td width="50%">

### 🟡 Setup & Run

```bash
cp .env.example .env
nano .env
npm start
```

</td>
</tr>
</table>

---

## ✨ Fitur Utama

<div align="center">

```
╔════════════════════════════════════════╗
║      ✨ FITUR-FITUR UNGGULAN ✨        ║
╠════════════════════════════════════════╣
║                                        ║
║  🔌  Koneksi WhatsApp Real-time       ║
║  🎮  Full Command System dengan Prefix ║
║  💾  Auto Session Save & Recovery      ║
║  📱  Media Download Support            ║
║  👥  Group Management Tools            ║
║  🏷️   View Once Message Handler        ║
║  ⚡  Real-time RAM Monitoring         ║
║  🛡️  Auto-filter Console Logs         ║
║  🔄  Auto-Reconnect Protection        ║
║  📊  Memory Limit Protection          ║
║                                        ║
╚════════════════════════════════════════╝
```

</div>

---

## ⚙️ Requirements

<details open>
<summary><b>📋 System Requirements</b></summary>

| Item | Requirement | Status |
|------|------------|--------|
| **OS** | Linux / Windows / macOS | ✅ |
| **Node.js** | v18.0.0 or higher | ✅ |
| **npm/yarn** | Latest version | ✅ |
| **WhatsApp** | Personal Account | ✅ |
| **Internet** | Stable Connection | ✅ |
| **RAM** | Minimum 512MB | ✅ |
| **Storage** | Minimum 200MB | ✅ |

```bash
# Verify versions
node --version    # >= v18.0.0
npm --version     # latest
```

</details>

---

## 🚀 Instalasi

### 📥 Step 1: Clone Repository

```bash
git clone https://github.com/kominiyou/ambatukam.git
cd ambatukam
```

### 📦 Step 2: Install Dependencies

```bash
npm install
```

### ⚙️ Step 3: Configure Environment

```bash
cp .env.example .env
nano .env  # atau gunakan text editor favorit
```

<details>
<summary><b>🔑 Konfigurasi Lengkap (.env)</b></summary>

```env
# ════════════════════════════════════════
# 🔧 BOT CONFIGURATION
# ════════════════════════════════════════

# Logger Level: info, warn, error, fatal, silent
BOT_LOGGER_LEVEL=silent

# Log semua messages (true/false)
BOT_LOG_MESSAGE=true

# Max retries sebelum disconnect (1-10)
BOT_MAX_RETRIES=3

# ════════════════════════════════════════
# 📱 WHATSAPP CONNECTION
# ════════════════════════════════════════

# Nomor untuk Pairing Code (format: 62XXXXXXXXXXX)
BOT_NUMBER_PAIR=6289681008411

# Owner Number (support multiple: 62XX,62YY,62ZZ)
BOT_NUMBER_OWNER=6289681008411

# Session name
BOT_SESSION_NAME=hisoka

# ════════════════════════════════════════
# 💬 COMMAND CONFIGURATION
# ════════════════════════════════════════

# Command Prefix (regex pattern)
BOT_PREFIX="(?:[°•π÷×¶∆£¢€¥®™+✓=|/~!?@#%^&.©^])"

# Allow commands tanpa prefix
BOT_ALLOWED_NO_PREFIX=true

# Reaction emoji (untuk auto-reaction)
BOT_REACT_STATUS=❤️,💀,😋,😊,😒,🔥

# ════════════════════════════════════════
# 📡 EXTERNAL SERVICES (Optional)
# ════════════════════════════════════════

# Telegram Bot Token
TELEGRAM_TOKEN=

# Telegram Chat ID
TELEGRAM_CHAT_ID=
```

</details>

---

## 📖 Panduan Lengkap

### ▶️ Jalankan Bot

<div align="center">

| Mode | Command | Gunakan Untuk |
|------|---------|----------------|
| 🔄 **Development** | `npm run dev` | Development & Testing |
| 🎯 **Production** | `npm start` | Running Live |
| 🐛 **Debug** | `BOT_LOGGER_LEVEL=info npm start` | Troubleshooting |

</div>

### 🔗 Connect WhatsApp

<details open>
<summary><b>📱 Connection Methods</b></summary>

#### 🟢 Opsi 1: QR Code Scan

```
✅ Langkah-langkah:
1. Run: npm start
2. Scan QR code dari console
3. Bot langsung connect ✅

⚡ Kelebihan: Cepat & Mudah
❌ Kekurangan: Session terbatas 7 hari
```

#### 🟡 Opsi 2: Pairing Code ⭐ (Recommended)

```
✅ Langkah-langkah:
1. Set BOT_NUMBER_PAIR=6289681008411 di .env
2. Run: npm start
3. Copy code dari console
4. Buka WhatsApp > Settings > Linked Devices
5. Pilih "Link a Device"
6. Paste code yang dicopy
7. Done! Bot connect ✅

⚡ Kelebihan: Session stabil & aman
⏱️ Durasi: Session berlaku selama device terpasang
```

</details>

---

## 💻 Command List

<div align="center">

```
╔════════════════════════════════════════════════╗
║            📋 DAFTAR LENGKAP COMMAND           ║
╚════════════════════════════════════════════════╝
```

</div>

### 🎯 Basic Commands

<details open>
<summary><b>📌 Command Dasar & Status Check</b></summary>

#### ⏱️ Ping & Latency Check

```
Command:  .p  atau  .ping

Fungsi:   Check latency & uptime bot
Output:   
  ✅ Pong! Latency: 145ms
  ✅ Uptime: 2h 34m 12s
```

#### 📊 Memory Monitoring

```
Command:  .cekram / .checkram / .ramcheck

Fungsi:   Quick RAM check (format simple)

Output:   
  ╭━━━『 *RAM STATUS* 』━━━┄
  ┃ Process Memory: 88.18 MB / 50.24 GB
  ┃ Usage: 0.2%
  ┃ System Memory: 17.50 GB / 62.80 GB
  ┃ Usage: 27.8%
  ╰━━━━━━━━━━━━━━━┄
```

#### 📋 Menu & Help

```
Command:  .menu / .help / .info

Fungsi:   Tampilkan semua command yang tersedia
Output:   Command list dengan deskripsi lengkap
```

</details>

### 👥 Group Commands

<details>
<summary><b>👨‍👩‍👧 Group Management & Utilities</b></summary>

#### 📣 Tag All Members (Hidetag)

```
Command:  .ht @text / .hidetag @text / .everyone @text / .all @text

Fungsi:   Tag semua members di grup dengan pesan
Contoh:   
  .ht mari diskusi
  .ht @everyone meeting at 3pm

Output:   
  ✅ Mention semua member
  ✅ Tidak muncul di notifikasi umum
  ✅ Pesan tersampaikan ke semua
```

#### 📊 List Groups & Members

```
Command:  .groups / .listgroups / .group

Fungsi:   Tampilkan semua group yang diikuti
Output:   
  Total Groups: 5
  
  1. 👥 Group A - 23 members
  2. 👥 Group B - 45 members
  3. 👥 Group C - 12 members
```

#### 👤 List Contacts

```
Command:  .contacts / .listcontacts / .contact

Fungsi:   Tampilkan statistik kontak
Output:   
  📋 All Contacts: 256
  ✅ Saved: 189
  ❌ Not Saved: 67
```

</details>

### 📱 Media Commands

<details>
<summary><b>🎬 Media & File Handler</b></summary>

#### 🖼️ View Once Message Opener

```
Command:  .rvo / .viewonce / .vo

Format Support:
  🖼️ Image          🎥 Video
  🎵 Audio          📄 Document
  🏷️ Sticker

Cara Pakai:
  1. Reply ke pesan view once
  2. Ketik: .rvo
  3. Media akan dikirim ulang tanpa view once

⚠️ Note: Pesan original tetap view once
```

#### 📎 Quote & Forward Message

```
Command:  .q / .quoted

Cara Pakai:
  1. Reply ke pesan apapun
  2. Ketik: .q
  3. Pesan akan di-forward

Gunakan untuk: Backup pesan penting
```

</details>

### ⚡ Advanced Commands

> [!WARNING]
> **⚠️ OWNER ONLY - Advanced Tools!**  
> Command ini berbahaya & hanya untuk owner terpercaya

<details>
<summary><b>💻 Developer & System Tools</b></summary>

#### 🔧 Execute JavaScript Code

```
Command:  .eval code / .> code

Contoh:
  .eval return process.version
  .> JSON.stringify(global.memoryMonitor?.getStatus())

⚠️ Penggunaan: Debug & troubleshooting saja
🚨 Bahaya: Bisa merusak bot jika salah
```

#### 🖥️ Execute System Command

```
Command:  .exec command / .bash command / .$ command

Contoh:
  .bash ls -la
  .$ pwd
  .exec whoami

⚠️ Penggunaan: Admin tasks saja
🚨 Bahaya: Bisa akses sensitive files
```

</details>

---

## 📊 Monitoring & Status

<div align="center">

```
╔════════════════════════════════════════════════╗
║          💾 REAL-TIME MONITORING              ║
╚════════════════════════════════════════════════╝
```

</div>

### 💾 RAM Monitor & Memory Status

<details open>
<summary><b>🔍 Memory Monitoring System</b></summary>

#### Quick RAM Check
```
Command: .cekram

Output:
  ╭━━━『 *RAM STATUS* 』━━━┄
  ┃
  ┃ 📊 Process Memory
  ┃ 88.18 MB / 50.24 GB
  ┃ Usage: 0.2%
  ┃
  ┃ 🖥️ System Memory
  ┃ 17.50 GB / 62.80 GB
  ┃ Usage: 27.8%
  ┃
  ╰━━━━━━━━━━━━━━━┄
```

#### Detailed Memory Status
```
Command: .memory

Output:
  ╭━━━『 *💾 MEMORY STATUS* 』━━━┄⊱
  ┃
  ┃ 📊 Process Memory
  ┃ • Current: 121.61 MB
  ┃ • Limit: 50.24 GB
  ┃ • Usage: 0.2%
  ┃
  ┃ 🔧 Heap Memory
  ┃ • Total: 2.15 GB
  ┃ • Used: 45.82 MB
  ┃ • Heap Usage: 2.1%
  ┃
  ┃ 🖥️ System Memory (Server)
  ┃ • Total: 62.80 GB
  ┃ • Used: 20.07 GB
  ┃ • Free: 42.73 GB
  ┃ • Usage: 31.9%
  ┃
  ┃ ⚙️ Monitor Configuration
  ┃ • Status: ✅ Enabled
  ┃ • Auto Detect: ✅ 80%
  ┃ • Check Interval: 30 seconds
  ┃ • Uptime: 2h 34m 12s
  ┃ • Last Check: 5s ago
  ┃
  ╰━━━━━━━━━━━━━━━┄⊱

  🟢 Status: HEALTHY (Usage < 50%)
```

</details>

### 🛡️ Auto-Protection System

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃    🛡️ AUTOMATIC PROTECTION      ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                  ┃
┃  ✅ Real-time monitoring (30s)   ┃
┃  ✅ Auto-restart if exceed limit ┃
┃  ✅ Warning at 80% usage         ┃
┃  ✅ Clean logging (no noise)     ┃
┃  ✅ System crash protection      ┃
┃  ✅ Stability monitoring         ┃
┃                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 🔧 Troubleshooting

<div align="center">

```
╔════════════════════════════════════════════════╗
║              🆘 SOLVING PROBLEMS               ║
╚════════════════════════════════════════════════╝
```

</div>

### 🚨 Bot Tidak Connect / Offline

<details>
<summary><b>❌ Solusi Lengkap</b></summary>

```bash
# 1️⃣ Reset session dan hapus cache
rm -rf sessions/
rm -rf node_modules/.cache/

# 2️⃣ Verify .env configuration
cat .env | grep BOT_

# 3️⃣ Run dengan debug mode
BOT_LOGGER_LEVEL=info npm start

# 4️⃣ Try using pairing code (lebih reliable)
# Set BOT_NUMBER_PAIR=YOUR_NUMBER di .env
# npm start
```

**Jika masih tidak connect:**
- Pastikan WhatsApp sudah login di device
- Check internet connection
- Try pairing code method
- Clear all sessions & restart

</details>

### 🔌 Connection Keep Dropping / Disconnecting

<details>
<summary><b>❌ Solusi Lengkap</b></summary>

```bash
# 1️⃣ Increase max retries
BOT_MAX_RETRIES=10 npm start

# 2️⃣ Check internet stability
ping -c 10 8.8.8.8

# 3️⃣ Use more reliable pairing code
# Edit .env dan set pairing code
# npm start

# 4️⃣ Fresh session creation
rm -rf sessions/*/
npm start

# 5️⃣ Monitor connection
.cekram  # Check RAM & system
```

**Penyebab umum:**
- Koneksi internet tidak stabil
- WhatsApp session expire
- Memory usage terlalu tinggi
- Server overload

</details>

### 💾 Memory Usage Tinggi / Bot Lag

<details>
<summary><b>❌ Solusi Lengkap</b></summary>

```bash
# 1️⃣ Monitor memory realtime
.cekram        # Quick check
.memory        # Detailed check

# 2️⃣ Clear old sessions & cache
rm -rf sessions/*/
rm -rf node_modules/.cache/

# 3️⃣ Restart bot cleanly
npm start

# 4️⃣ Check what's consuming memory
.eval console.log(process.memoryUsage())

# 5️⃣ Kill & restart if needed
pkill -f "node"
npm start
```

**Optimasi:**
- Monitor setiap 1 jam
- Clear cache weekly
- Restart bot daily
- Update dependencies

</details>

---

## 📁 Project Structure

<div align="center">

```
📦 ambatukam/
│
├── 📂 src/                          ← Source Code
│   ├── 📄 index.js                 ├─ Entry point & main logic
│   ├── 📂 handler/
│   │   ├── 📄 message.js          ├─ Command handler
│   │   └── 📄 event.js            └─ Event listeners
│   ├── 📂 helper/
│   │   ├── 📄 inject.js           ├─ Client injector
│   │   ├── 📄 memoryMonitor.js    ├─ RAM monitoring system
│   │   ├── 📄 utils.js            ├─ Utility functions
│   │   └── 📄 collect.js          └─ Message collection
│   └── 📂 db/
│       └── 📄 json.js             └─ JSON database
│
├── 📂 sessions/                     ← WhatsApp Sessions (auto-generated)
├── ⚙️ config.json                   ← Bot configuration
├── 🔑 .env                          ← Environment variables (SECRET)
├── 📦 package.json                  ← Dependencies & scripts
└── 📖 README.md                     ← This documentation
```

</div>

---

## 🔐 Security & Best Practices

<div align="center">

```
╔════════════════════════════════════════════════╗
║            🔒 SECURITY GUIDELINES              ║
╚════════════════════════════════════════════════╝
```

</div>

<details open>
<summary><b>🛡️ Security Checklist</b></summary>

### ❌ JANGAN SHARE - Never Expose:

```
❌ File .env
   └─ Berisi: Tokens, API keys, credentials

❌ Folder sessions/
   └─ Berisi: WhatsApp session data

❌ GitHub Tokens / API Keys
   └─ Berisi: Sensitive credentials

❌ Database backups
   └─ Berisi: User data & messages
```

### ✅ GUNAKAN - Always Use:

```
✅ Pairing Code (bukan QR)
   └─ Lebih aman & stabil

✅ Strong BOT_NUMBER_OWNER
   └─ Whitelist only trusted numbers

✅ Environment variables
   └─ Hide sensitive config

✅ Regular backups
   └─ Encrypt sessions before backup

✅ Monitor activity
   └─ Check logs regularly
```

### 🔄 MAINTENANCE - Regular Tasks:

```
🔄 Update bot regularly
   └─ npm update / npm install

🔄 Monitor memory & CPU
   └─ Use .memory command

🔄 Clear old sessions
   └─ rm -rf sessions/*

🔄 Rotate credentials
   └─ Update tokens periodically

🔄 Keep logs clean
   └─ Archive old logs
```

</details>

---

## 📝 License & Credits

<div align="center">

```
╔════════════════════════════════════════════════╗
║          📜 LICENSE & ATTRIBUTION             ║
╚════════════════════════════════════════════════╝
```

**MIT License** - Open Source & Free to Use

---

**🙏 Credits:**

- **Original Author:** Dika Ardnt
- **Fork & Customized:** kominiyou
- **Library:** Baileys (WhatsApp Web API)
- **Made with:** Node.js & ❤️

---

### 🌟 Support This Project

Jika project ini bermanfaat, jangan lupa:

- ⭐ **Star** repository ini
- 🍴 **Fork** untuk development Anda
- 📢 **Share** ke teman-teman
- 📝 **Contribute** dengan pull request

---

<b>Questions?</b> Create an [Issue](https://github.com/kominiyou/ambatukam/issues)  
<b>Want to help?</b> Send a [Pull Request](https://github.com/kominiyou/ambatukam/pulls)

---

**Made with ❤️ by [kominiyou](https://github.com/kominiyou)**

[⬆ Back to Top](#-autoreactionstory-whatsapp-bot)

</div>
