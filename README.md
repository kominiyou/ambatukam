# 🤖 AutoReactionStory WhatsApp Bot

<div align="center">

<!-- Animated Header -->
<img src="https://img.shields.io/badge/🚀_Self_Bot_WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
<img src="https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
<img src="https://img.shields.io/badge/Status-ACTIVE-00AA00?style=for-the-badge&logo=github" alt="Status">
<img src="https://img.shields.io/badge/License-MIT-FF6600?style=for-the-badge" alt="License">

<!-- Visitor Badge -->
<img src="https://visitor-badge.laobi.icu/badge?page_id=kominiyou.ambatukam" alt="Visitors">

```
╔══════════════════════════════════════════════════════════════╗
║    🎭 SELF BOT DENGAN REAL-TIME MEMORY MONITORING 🎭         ║
║       Baileys • Node.js 20+ • Multi-Device Support           ║
╚══════════════════════════════════════════════════════════════╝
```

⭐ **Star repo ini jika bermanfaat!** ⭐

</div>

---

## 🎬 Video Tutorial

<div align="center">

### 📺 Cara Setup & Run Bot

<table>
<tr>
<td align="center">
<b>🖥️ Regular Terminal</b><br>
<a href="https://www.youtube.com/results?search_query=nodejs+whatsapp+bot+setup">
<img src="https://img.youtube.com/vi/hqdefault.jpg" width="200" height="120" alt="Terminal Setup">
</a>
<p><code>YouTube: Node.js WhatsApp Bot Setup</code></p>
</td>
<td align="center">
<b>📱 Termux Setup</b><br>
<a href="https://www.youtube.com/results?search_query=termux+whatsapp+bot+nodejs">
<img src="https://img.youtube.com/vi/hqdefault.jpg" width="200" height="120" alt="Termux Setup">
</a>
<p><code>YouTube: Termux WhatsApp Bot</code></p>
</td>
<td align="center">
<b>☁️ Panel Hosting</b><br>
<a href="https://www.youtube.com/results?search_query=pterodactyl+panel+nodejs+bot">
<img src="https://img.youtube.com/vi/hqdefault.jpg" width="200" height="120" alt="Panel Setup">
</a>
<p><code>YouTube: Pterodactyl Panel Bot</code></p>
</td>
</tr>
</table>

</div>

---

## 📌 Navigation Menu

<div align="center">

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃        📋 QUICK NAVIGATION MENU         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

| 🎬 | ⚙️ | ⌨️ | 🆘 | 📚 |
|:---:|:---:|:---:|:---:|:---:|
| **[START](#-quick-start)** | **[CONFIG](#-konfigurasi)** | **[COMMANDS](#-command-list)** | **[HELP](#-troubleshooting)** | **[DOCS](#-panduan-lengkap)** |

| 🔧 | 💾 | 🔐 | 📱 | ☁️ |
|:---:|:---:|:---:|:---:|:---:|
| **[SETUP](#-instalasi)** | **[MONITOR](#-monitoring--status)** | **[SECURITY](#-security--best-practices)** | **[TERMUX](#-tutorial-termux)** | **[PANEL](#-tutorial-panel)** |

</div>

---

## 🎯 Fitur Unggulan

<div align="center">

```
╔═══════════════════════════════════════════════════════════╗
║           ✨ FITUR-FITUR YANG TERSEDIA ✨                 ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  ✅ 🔌 Koneksi WhatsApp Real-time (Multi-Device)        ║
║  ✅ 🎮 Full Command System dengan Dynamic Prefix        ║
║  ✅ 💾 Auto Session Save & Recovery                     ║
║  ✅ 📱 Media Download & Processing Support              ║
║  ✅ 👥 Advanced Group Management Tools                  ║
║  ✅ 🏷️  View Once Message Handler                       ║
║  ✅ ⚡ Real-time RAM & CPU Monitoring                   ║
║  ✅ 🛡️  Console Log Auto-Filter                        ║
║  ✅ 🔄 Smart Auto-Reconnect Protection                 ║
║  ✅ 📊 Memory Limit Protection System                   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

</div>

---

## ⚙️ Requirements

<details open>
<summary><b>📋 System Requirements (Click to expand)</b></summary>

| Requirement | Minimum | Recommended | Status |
|------------|---------|-------------|--------|
| **OS** | Linux / Windows / macOS | Linux (Ubuntu 20+) | ✅ |
| **Node.js** | **v20.0.0+** | v22 LTS | ✅ |
| **npm** | 8.0.0+ | Latest | ✅ |
| **WhatsApp** | Personal Account | No VOIP | ✅ |
| **Internet** | 1 Mbps | 5+ Mbps | ✅ |
| **RAM** | 256MB min | 512MB+ | ✅ |
| **Storage** | 100MB | 500MB+ | ✅ |

```bash
# Verify versions
node --version    # >= v20.0.0 ⭐ REQUIRED
npm --version     # latest version
```

</details>

---

## 🚀 Quick Start

<table align="center" border="0">
<tr>
<td width="50%">

### 🟢 Clone & Setup

```bash
git clone https://github.com/kominiyou/ambatukam.git
cd ambatukam
npm install
cp .env.example .env
nano .env
```

</td>
<td width="50%">

### 🟡 Run Bot

```bash
# Development
npm run dev

# Production
npm start

# Debug Mode
BOT_LOGGER_LEVEL=info npm start
```

</td>
</tr>
</table>

---

## ⚡ Konfigurasi

<details open>
<summary><b>🔑 Environment Variables (.env)</b></summary>

```env
# ════════════════════════════════════════
# 🔧 BOT CORE CONFIG
# ════════════════════════════════════════

BOT_LOGGER_LEVEL=silent          # Level: info|warn|error|fatal|silent
BOT_LOG_MESSAGE=true             # Log all messages (true/false)
BOT_MAX_RETRIES=3                # Retry attempts (1-10)

# ════════════════════════════════════════
# 📱 WHATSAPP CONNECTION
# ════════════════════════════════════════

BOT_NUMBER_PAIR=6289681008411    # Nomor untuk Pairing Code
BOT_NUMBER_OWNER=6289681008411   # Owner (multiple: 62XX,62YY)
BOT_SESSION_NAME=hisoka          # Session name

# ════════════════════════════════════════
# 💬 COMMAND CONFIG
# ════════════════════════════════════════

BOT_PREFIX="(?:[°•π÷×¶∆£¢€¥®™+✓=|/~!?@#%^&.©^])"
BOT_ALLOWED_NO_PREFIX=true
BOT_REACT_STATUS=❤️,💀,😋,😊,😒,🔥

# ════════════════════════════════════════
# 📡 EXTERNAL (Optional)
# ════════════════════════════════════════

TELEGRAM_TOKEN=
TELEGRAM_CHAT_ID=
```

</details>

---

## 📖 Panduan Lengkap

### ▶️ Jalankan Bot

| Mode | Command | Gunakan |
|------|---------|---------|
| 🔄 Development | `npm run dev` | Development & Testing |
| 🎯 Production | `npm start` | Running Live 24/7 |
| 🐛 Debug | `BOT_LOGGER_LEVEL=info npm start` | Troubleshooting |

### 🔗 Connect WhatsApp

<details open>
<summary><b>📱 Connection Methods (Click to expand)</b></summary>

#### 🟢 Method 1: QR Code Scan

```bash
# Step 1: Run bot
npm start

# Step 2: Scan QR code dari console dengan WhatsApp
# Step 3: Bot connect otomatis ✅

⚡ Kelebihan: Cepat & mudah
❌ Kekurangan: Session terbatas 7 hari
```

#### 🟡 Method 2: Pairing Code ⭐ RECOMMENDED

```bash
# Step 1: Edit .env
BOT_NUMBER_PAIR=6289681008411

# Step 2: Run bot
npm start

# Step 3: Copy code dari console
# Step 4: WhatsApp > Settings > Linked Devices > Link Device
# Step 5: Paste code
# Step 6: Done! ✅

⚡ Kelebihan: Stabil & aman
⏱️ Duration: Session berlaku selama device terpasang
```

</details>

---

## 💻 Command List

<div align="center">

```
╔════════════════════════════════════════════════════════════╗
║              📋 DAFTAR LENGKAP COMMAND                    ║
╚════════════════════════════════════════════════════════════╝
```

</div>

### 🎯 Basic Commands

<details open>
<summary><b>📌 Command Dasar (Click to expand)</b></summary>

#### ⏱️ Ping & Status

```
.p  |  .ping
├─ Check latency & uptime
└─ Output: Pong! Latency: 145ms | Uptime: 2h 34m
```

#### 📊 Memory Monitor

```
.cekram  |  .checkram  |  .ramcheck
├─ Quick RAM check (simple)
└─ Output: Process & System Memory Status

.memory  |  .ram  |  .mem
├─ Detailed memory status
└─ Output: Heap, Heap Usage, Monitor Config
```

#### 📋 Menu & Help

```
.menu  |  .help  |  .info
├─ Show all commands
└─ Output: Command list dengan deskripsi
```

</details>

### 👥 Group Commands

<details>
<summary><b>👨‍👩‍👧 Group Management (Click to expand)</b></summary>

```
.ht @text  |  .hidetag @text  |  .everyone @text
├─ Tag semua members dengan pesan
├─ Contoh: .ht mari diskusi
└─ Output: Hidetag mention ke semua member

.groups  |  .listgroups
├─ Show all groups yang diikuti
└─ Output: Total groups & participant stats

.contacts  |  .listcontacts
├─ Show contacts statistics
└─ Output: Saved/Not Saved/Total count
```

</details>

### 📱 Media Commands

<details>
<summary><b>🎬 Media & File (Click to expand)</b></summary>

```
.rvo  |  .viewonce  |  .vo
├─ Buka pesan view once
├─ Format: Image, Video, Audio, Document, Sticker
└─ Cara: Reply ke view once → .rvo

.q  |  .quoted
├─ Quote & forward message
└─ Cara: Reply ke message → .q
```

</details>

### ⚡ Advanced Commands

> [!WARNING]
> **⚠️ OWNER ONLY - Advanced Tools!**

<details>
<summary><b>💻 Developer Tools (Click to expand)</b></summary>

```
.eval code  |  .> code
├─ Execute JavaScript
├─ Contoh: .eval return process.version
└─ ⚠️ Gunakan untuk debug saja

.exec command  |  .bash command  |  .$ command
├─ Execute bash/system command
├─ Contoh: .bash ls -la
└─ ⚠️ Admin tasks saja
```

</details>

---

## 📊 Monitoring & Status

<div align="center">

```
╔════════════════════════════════════════════════════════════╗
║          💾 REAL-TIME MONITORING SYSTEM                   ║
╚════════════════════════════════════════════════════════════╝
```

</div>

### 💾 RAM Monitor

<details open>
<summary><b>🔍 Memory Status (Click to expand)</b></summary>

#### Quick Check: .cekram

```
╭━━━『 *RAM STATUS* 』━━━┄
┃ Process Memory: 88.18 MB / 50.24 GB (0.2%)
┃ System Memory: 17.50 GB / 62.80 GB (27.8%)
╰━━━━━━━━━━━━━━━┄
```

#### Detailed: .memory

```
╭━━━『 *💾 MEMORY STATUS* 』━━━┄⊱
┃ 📊 Process Memory
┃   • Current: 121.61 MB
┃   • Limit: 50.24 GB
┃   • Usage: 0.2%
┃
┃ 🔧 Heap Memory
┃   • Total: 2.15 GB
┃   • Used: 45.82 MB
┃
┃ 🖥️ System Memory
┃   • Total: 62.80 GB
┃   • Used: 20.07 GB
┃   • Free: 42.73 GB
┃
┃ ⚙️ Monitor Config
┃   • Enabled: ✅ Yes
┃   • Check: 30s
┃   • Uptime: 2h 34m 12s
┃
╰━━━━━━━━━━━━━━━┄⊱

🟢 Status: HEALTHY (Usage < 50%)
```

</details>

### 🛡️ Auto-Protection

```
✅ Real-time monitoring (30s interval)
✅ Auto-restart jika exceed limit
✅ Warning notification at 80% usage
✅ Clean logging (no noise)
✅ System crash protection
✅ Stability monitoring 24/7
```

---

## 📱 Tutorial Termux

<div align="center">

```
╔════════════════════════════════════════════════════════════╗
║         📱 RUN BOT DI TERMUX (Android Phone)              ║
╚════════════════════════════════════════════════════════════╝
```

</div>

### 🔧 Setup Termux

<details open>
<summary><b>📱 Instalasi Step-by-Step (Click to expand)</b></summary>

#### Step 1: Install Termux

1. Download Termux dari F-Droid (lebih aman dari Play Store)
2. Buka Termux
3. Grant storage permission:
   ```bash
   termux-setup-storage
   ```

#### Step 2: Install Dependencies

```bash
# Update packages
pkg update && pkg upgrade -y

# Install required tools
pkg install bash curl wget git -y
pkg install nodejs npm -y
pkg install ffmpeg imagemagick -y
pkg install libwebp -y
```

#### Step 3: Clone & Setup Bot

```bash
# Clone repository
git clone https://github.com/kominiyou/ambatukam.git
cd ambatukam

# Install dependencies
npm install

# Create .env
cp .env.example .env

# Edit .env
nano .env
# Save: Ctrl+X → Y → Enter
```

#### Step 4: Run Bot

```bash
# Simple run
npm start

# Or dengan screen (keep running in background)
pkg install screen -y
screen -S botwa npm start

# Detach: Ctrl+A then D
# Resume: screen -r botwa
```

#### Step 5: Keep Bot 24/7

```bash
# Install PM2
npm install -g pm2

# Start bot with PM2
pm2 start index.js --name "whatsapp-bot"

# Save config
pm2 save

# Enable startup
pm2 startup
```

#### Common Issues di Termux

```
❌ "node not found" → pkg install nodejs -y
❌ "Permission denied" → chmod +x install.sh
❌ "Module not found" → npm install
❌ "Storage access" → termux-setup-storage
```

**Video Tutorial:**
- Search: "Termux Node.js WhatsApp Bot Setup"
- YouTube: Look for 2024-2025 tutorials

</details>

---

## ☁️ Tutorial Panel

<div align="center">

```
╔════════════════════════════════════════════════════════════╗
║    ☁️ RUN BOT DI PTERODACTYL PANEL (Server Hosting)      ║
╚════════════════════════════════════════════════════════════╝
```

</div>

### 🖥️ Setup Panel Hosting

<details>
<summary><b>☁️ Panel Setup Guide (Click to expand)</b></summary>

#### Prerequisites

```
✅ Panel account access
✅ Node.js server created
✅ SSH access (optional)
✅ Bot token ready
```

#### Step 1: Export dari Replit/Local

```bash
# Export project
git clone https://github.com/kominiyou/ambatukam.git
cd ambatukam

# Create ZIP
zip -r ambatukam.zip . -x "node_modules/*" "sessions/*" ".env*"
```

#### Step 2: Upload ke Panel

1. Login ke **Panel Dashboard**
2. Select bot server → **Files** tab
3. Click **Upload** → Select ambatukam.zip
4. Right-click ZIP → **Unarchive**

#### Step 3: Install Dependencies

1. Go to **Startup** or **Console** tab
2. Run:
   ```bash
   npm install
   ```
3. Wait for completion

#### Step 4: Set Environment Variables

1. **Startup** or **Variables** section
2. Add variables:
   ```
   BOT_NUMBER_OWNER = 6289681008411
   BOT_SESSION_NAME = hisoka
   BOT_LOGGER_LEVEL = silent
   ```

#### Step 5: Configure Startup

1. **Startup Settings** → Set command:
   ```
   node index.js
   ```
2. Or with PM2:
   ```
   pm2 start index.js --name "wa-bot"
   ```

#### Step 6: Start Bot

1. Click **Start** button
2. Watch console for:
   ```
   Bot connected! ✅
   ```

**Popular Panels:**

| Panel | Price | Node.js | Storage |
|-------|-------|---------|---------|
| **Pterodactyl** | $1-5/mo | ✅ v20+ | 10GB+ |
| **Minehut** | Free/Paid | ✅ Yes | Variable |
| **Replit** | Free/Paid | ✅ Yes | Limited |

**Video Tutorial:**
- Search: "Pterodactyl Panel Node.js Bot Setup"
- YouTube: Panel hosting guides 2024-2025

</details>

---

## 🔧 Troubleshooting

<div align="center">

```
╔════════════════════════════════════════════════════════════╗
║              🆘 SOLVING PROBLEMS                          ║
╚════════════════════════════════════════════════════════════╝
```

</div>

### 🚨 Bot Tidak Connect

<details>
<summary><b>❌ Solusi (Click to expand)</b></summary>

```bash
# 1. Reset session
rm -rf sessions/

# 2. Verify .env
cat .env | grep BOT_

# 3. Debug mode
BOT_LOGGER_LEVEL=info npm start

# 4. Try pairing code
# Edit .env: BOT_NUMBER_PAIR=YOUR_NUMBER
# npm start
```

</details>

### 🔌 Connection Keep Dropping

<details>
<summary><b>❌ Solusi (Click to expand)</b></summary>

```bash
# 1. Increase retries
BOT_MAX_RETRIES=10 npm start

# 2. Check internet
ping 8.8.8.8

# 3. Fresh session
rm -rf sessions/*/
npm start

# 4. Monitor RAM
.cekram
```

</details>

### 💾 Memory Usage Tinggi

<details>
<summary><b>❌ Solusi (Click to expand)</b></summary>

```bash
# 1. Quick check
.cekram

# 2. Clear cache
rm -rf sessions/*/
rm -rf node_modules/.cache/

# 3. Restart
npm start

# 4. What's consuming?
.eval console.log(process.memoryUsage())
```

</details>

---

## 📁 Project Structure

<div align="center">

```
ambatukam/
├── 📂 src/
│   ├── index.js               ← Entry Point
│   ├── 📂 handler/
│   │   ├── message.js        ├─ Commands
│   │   └── event.js          └─ Events
│   ├── 📂 helper/
│   │   ├── inject.js         ├─ Injector
│   │   ├── memoryMonitor.js  ├─ RAM Monitor
│   │   ├── utils.js          ├─ Utils
│   │   └── collect.js        └─ Collection
│   └── 📂 db/
│       └── json.js           └─ Database
├── 📂 sessions/              ← Auto-generated
├── config.json               ← Config
├── .env                      ← Secrets
├── package.json              ← Dependencies
└── README.md                 ← Docs
```

</div>

---

## 🔐 Security & Best Practices

<details open>
<summary><b>🛡️ Security Checklist (Click to expand)</b></summary>

### ❌ JANGAN SHARE

```
❌ .env file       → API keys & tokens
❌ sessions/       → WhatsApp session data
❌ API Keys        → Sensitive credentials
```

### ✅ GUNAKAN

```
✅ Pairing Code    → Lebih aman
✅ Strong Owner    → Whitelist numbers
✅ .env variables  → Hide config
✅ Regular backup  → Encrypt sessions
✅ Monitor logs    → Track activity
```

### 🔄 MAINTENANCE

```
🔄 Update regularly → npm update
🔄 Monitor memory   → .memory command
🔄 Clear sessions   → rm -rf sessions/*
🔄 Rotate tokens    → Update periodically
```

</details>

---

## 📝 License & Credits

<div align="center">

```
╔════════════════════════════════════════════════════════════╗
║            📜 LICENSE & CONTRIBUTORS                      ║
╚════════════════════════════════════════════════════════════╝
```

**MIT License** - Free & Open Source

---

**🙏 Credits:**
- **Original:** Dika Ardnt
- **Fork:** kominiyou
- **Library:** Baileys
- **Made with:** Node.js 20+ & ❤️

---

### 🌟 Support Project

- ⭐ Star jika bermanfaat
- 🍴 Fork untuk development
- 📢 Share ke teman
- 📝 Contribute PR

---

**Questions?** Create [Issue](https://github.com/kominiyou/ambatukam/issues)  
**Contribute?** Send [PR](https://github.com/kominiyou/ambatukam/pulls)

---

**Made with ❤️ by [kominiyou](https://github.com/kominiyou)**

[⬆ Back to Top](#-autoreactionstory-whatsapp-bot)

</div>
