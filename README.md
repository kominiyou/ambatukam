# 🤖 AutoReactionStory WhatsApp Bot

<div align="center">

<!-- Animated Banner -->
<img src="https://img.shields.io/badge/STATUS-ACTIVE-00AA00?style=for-the-badge&logo=github&logoColor=white" alt="Status">
<img src="https://img.shields.io/badge/VERSION-1.0.0-0066FF?style=for-the-badge&logo=npm" alt="Version">
<img src="https://img.shields.io/badge/Node.js-18%2B-00FF00?style=for-the-badge&logo=node.js" alt="Node.js">
<img src="https://img.shields.io/badge/License-MIT-FF6600?style=for-the-badge" alt="License">

**Self Bot WhatsApp dengan fitur Otomatis Reaction Story & Command Control**

⭐ Star repo ini jika bermanfaat!

</div>

---

## 🎯 Quick Links

<table>
<tr>
<td width="25%" align="center">

### 📖 Dokumentasi
[Baca Selengkapnya ↓](#-panduan-penggunaan)

</td>
<td width="25%" align="center">

### 💬 Fitur
[Lihat Semua ↓](#-fitur-utama)

</td>
<td width="25%" align="center">

### ⌨️ Command
[Command List ↓](#-command-list)

</td>
<td width="25%" align="center">

### 🔧 Setup
[Mulai Sekarang ↓](#-instalasi)

</td>
</tr>
</table>

---

## ✨ Fitur Utama

<details open>
<summary><b>🚀 Klik untuk Melihat Fitur-Fitur</b></summary>

> [!TIP]
> Scroll ke bawah untuk melihat command lengkap

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ✅ FITUR TERSEDIA            ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                 ┃
┃  🔌 Koneksi WhatsApp Langsung   ┃
┃  🎮 Full Command System         ┃
┃  💾 Session Auto-Save           ┃
┃  📱 Media Download Support      ┃
┃  👥 Group Management            ┃
┃  🏷️ View Once Handler           ┃
┃  ⚡ Real-time RAM Monitor      ┃
┃  🛡️ Auto-filter Logs           ┃
┃  🔄 Auto-Reconnect             ┃
┃  📊 Memory Protection           ┃
┃                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

</details>

---

## ⚙️ Requirements

<details open>
<summary><b>📋 System Requirements</b></summary>

| Requirement | Status |
|------------|--------|
| **Node.js** | v18.0.0+ ✅ |
| **npm/yarn** | Latest ✅ |
| **WhatsApp** | Personal Account ✅ |
| **Internet** | Stabil ✅ |
| **RAM** | Min 512MB ✅ |
| **Storage** | Min 200MB ✅ |

```bash
# Check Node.js version
node --version  # harus >= 18.0.0
npm --version   # latest version
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

### ⚙️ Step 3: Setup Environment

```bash
# Copy file template
cp .env.example .env

# Edit dengan text editor
nano .env
```

<details>
<summary><b>🔑 Environment Variables</b></summary>

```env
# Logger Level
BOT_LOGGER_LEVEL=silent
# Pilihan: info, warn, error, fatal, silent

# Log Messages
BOT_LOG_MESSAGE=true

# Max Retries
BOT_MAX_RETRIES=3

# Pairing Mode (optional)
BOT_NUMBER_PAIR=6289681008411

# Owner Number (support multiple: 62XX,62YY)
BOT_NUMBER_OWNER=6289681008411

# Session Name
BOT_SESSION_NAME=hisoka

# Command Prefix
BOT_PREFIX="(?:[°•π÷×¶∆£¢€¥®™+✓=|/~!?@#%^&.©^])"

# No Prefix Commands
BOT_ALLOWED_NO_PREFIX=true

# Reaction Emoji
BOT_REACT_STATUS=❤️,💀,😋,😊,😒,🔥

# Telegram Integration (optional)
TELEGRAM_TOKEN=
TELEGRAM_CHAT_ID=
```

</details>

---

## 🎬 Panduan Penggunaan

### ▶️ Start Bot

<details open>
<summary><b>🔧 Pilih Mode</b></summary>

#### 🔄 Development Mode (Auto-Reload)
```bash
npm run dev
```
Gunakan untuk development & testing

#### 🎯 Production Mode
```bash
npm start
```
Gunakan untuk production

</details>

### 🔗 Connect WhatsApp

<details>
<summary><b>📱 Opsi 1: QR Code</b></summary>

```
1. Run: npm start
2. Scan QR code dari console
3. Bot langsung connect ✅
```

**Kelebihan:** Cepat & mudah  
**Kekurangan:** Session terbatas

</details>

<details>
<summary><b>🔐 Opsi 2: Pairing Code (Recommended)</b></summary>

```
1. Set BOT_NUMBER_PAIR=6289681008411 di .env
2. Run: npm start
3. Copy kode dari console
4. Buka WhatsApp > Settings > Linked Devices
5. Pilih "Link a Device"
6. Paste kode
7. Done! 🎉
```

**Kelebihan:** Lebih stabil & aman  
**Kekurangan:** Butuh extra step

</details>

---

## 💻 Command List

### 🎯 Basic Commands

<details open>
<summary><b>📌 Command Dasar (Click untuk expand)</b></summary>

#### ⏱️ Ping & Latency
```
Syntax: .p atau .ping

Fungsi: Check bot latency & uptime
Output: Pong! Latency: XXms
        Uptime: XXh XXm XXs
```

#### 📊 Memory Monitor
```
Syntax: .cekram / .checkram / .ramcheck

Fungsi: Quick RAM check (simple format)
Output: 
╭━━━『 *RAM STATUS* 』━━━┄
┃ Process Memory: 88.18 MB / 50.24 GB (0.2%)
┃ System Memory: 17.50 GB / 62.80 GB (27.8%)
╰━━━━━━━━━━━━━━━┄

Syntax: .memory / .ram / .mem

Fungsi: Detailed memory status
Output: Full memory breakdown (heap, system, etc)
```

#### 📋 Menu & Info
```
Syntax: .menu / .help / .info

Fungsi: Show all available commands
Output: Formatted command list
```

</details>

### 👥 Group Commands

<details>
<summary><b>👨‍👩‍👧 Group Management (Click untuk expand)</b></summary>

#### 📣 Tag All Members
```
Syntax: .ht @text / .hidetag @text / .everyone @text / .all @text

Cara Pakai:
.ht mari diskusi
.ht @everyone meeting at 3pm

Output: 
Mention semua member dengan pesan yang diberikan
Pesan tidak akan muncul di notifikasi umum (hidetag)
```

#### 📊 List Groups
```
Syntax: .groups / .listgroups

Output:
Total X groups
Total participants: XXX

1. Group Name - XX participants
2. Group Name - XX participants
...
```

#### 👥 List Contacts
```
Syntax: .contacts / .listcontacts

Output:
- All Contacts: XXX
- Saved Contacts: XXX
- Not Saved Contacts: XXX
```

</details>

### 📱 Media Commands

<details>
<summary><b>🎬 Media & File Handling (Click untuk expand)</b></summary>

#### 🖼️ View Once Handler
```
Syntax: .rvo / .viewonce / .vo

Format Support:
  🖼️ Image         🎥 Video
  🎵 Audio         📄 Document
  🏷️ Sticker

Cara Pakai:
1. Reply ke pesan view once
2. Ketik: .rvo
3. Media akan dikirim ulang tanpa view once ✅

Note: Pesan original akan tetap view once
```

#### 📎 Quoted Message
```
Syntax: .q / .quoted

Cara Pakai:
1. Reply ke pesan apapun
2. Ketik: .q
3. Pesan akan di-forward

Gunakan untuk: Backup message penting
```

</details>

### ⚡ Advanced Commands

> [!WARNING]
> **⚠️ HANYA UNTUK OWNER!**  
> Command ini berbahaya & hanya untuk owner yang terpercaya

<details>
<summary><b>💻 Developer Tools (Click untuk expand)</b></summary>

#### 🔧 Execute JavaScript
```
Syntax: .eval code / .> code

Contoh:
.eval return process.version
.> JSON.stringify(global.memoryMonitor?.getStatus())

⚠️ Penggunaan: Debug & troubleshooting saja
```

#### 🖥️ Execute System Command
```
Syntax: .exec command / .bash command / .$ command

Contoh:
.bash ls -la
.$ pwd
.exec whoami

⚠️ Penggunaan: System administration saja
```

</details>

---

## 📊 Monitoring & Status

### 💾 Memory Monitor

<details open>
<summary><b>🔍 Cek Status RAM Real-time</b></summary>

#### Quick Check
```
Command: .cekram

Output Format:
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

#### Detailed Status
```
Command: .memory

Output Format:
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
┃ *🖥️ System Memory*
┃ • Total: 62.80 GB
┃ • Used: 20.07 GB
┃ • Free: 42.73 GB
┃
┃ *⚙️ Monitor Config*
┃ • Enabled: ✅ Yes
┃ • Auto Detect: ✅ 80%
┃ • Check Interval: 30s
┃ • Uptime: 2h 34m 12s
┃
╰━━━━━━━━━━━━━━━┄⊱
```

</details>

### 🛡️ Auto-Protection

```
✅ Real-time monitoring setiap 30 detik
✅ Auto-restart jika memory exceed limit
✅ Warning notification jika usage > 80%
✅ Clean logging tanpa noise
✅ System protection & stability
```

---

## 🔧 Troubleshooting

### 🚨 Bot Tidak Connect

<details>
<summary><b>❌ Solusi (Click untuk expand)</b></summary>

```bash
# 1. Reset session
rm -rf sessions/

# 2. Check .env
cat .env | grep BOT_

# 3. Debug mode
BOT_LOGGER_LEVEL=info npm start

# 4. Try pairing code
# Set BOT_NUMBER_PAIR di .env
```

</details>

### 🔌 Connection Keep Dropping

<details>
<summary><b>❌ Solusi (Click untuk expand)</b></summary>

```bash
# 1. Increase retries
BOT_MAX_RETRIES=10 npm start

# 2. Check internet
ping -c 10 8.8.8.8

# 3. Use pairing code (lebih stable)

# 4. Fresh session
rm -rf sessions/*/
npm start
```

</details>

### 💾 Memory Usage Tinggi

<details>
<summary><b>❌ Solusi (Click untuk expand)</b></summary>

```bash
# 1. Monitor with
.cekram

# 2. Clear old sessions
rm -rf sessions/*/

# 3. Restart bot
npm start

# 4. Check what's consuming memory
.eval console.log(process.memoryUsage())
```

</details>

---

## 📁 Project Structure

```
ambatukam/
│
├── 📁 src/                      ← Source code
│   ├── index.js                 ← Entry point & main logic
│   ├── 📁 handler/
│   │   ├── message.js          ← Command handler
│   │   └── event.js            ← Event listeners
│   ├── 📁 helper/
│   │   ├── inject.js           ← Client injector
│   │   ├── memoryMonitor.js    ← RAM monitoring
│   │   ├── utils.js            ← Utility functions
│   │   └── collect.js          ← Message collection
│   └── 📁 db/
│       └── json.js             ← JSON database
│
├── 📁 sessions/                 ← WhatsApp sessions (auto-generated)
├── ⚙️ config.json               ← Configuration
├── 🔑 .env                      ← Environment variables
├── 📦 package.json              ← Dependencies
└── 📖 README.md                 ← This file
```

---

## 🔐 Security & Best Practices

> [!IMPORTANT]
> **Hal-hal Penting untuk Keamanan:**

<details open>
<summary><b>🔒 Security Checklist (Click untuk expand)</b></summary>

```
⚠️ JANGAN SHARE:
  ❌ File .env (berisi token & credentials)
  ❌ Folder sessions/ (berisi session data)
  ❌ GitHub token atau API keys

✅ GUNAKAN:
  ✅ Pairing Code (lebih aman dari QR)
  ✅ Strong BOT_NUMBER_OWNER
  ✅ Environment variables untuk config
  ✅ Regular session backups
  ✅ Monitor memory & performance

🔄 MAINTENANCE:
  • Update bot regularly
  • Monitor memory usage
  • Clear old sessions
  • Rotate credentials
  • Keep logs clean
```

</details>

---

## 📝 License & Credits

<div align="center">

**MIT License** - Lihat [LICENSE](LICENSE)

---

**Original Author:** Dika Ardnt  
**Fork & Modified by:** kominiyou

---

**Made with ❤️ using Node.js & Baileys**

### 🌟 Jika Bermanfaat, Jangan Lupa Star! ⭐

[⬆ Ke Atas](#-autoreactionstory-whatsapp-bot)

</div>
