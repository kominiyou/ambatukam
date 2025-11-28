# WhatsApp Bot - Self Bot

## Deskripsi Proyek
WhatsApp Self Bot yang dibuat menggunakan Baileys library. Bot ini dapat dijalankan sebagai bot WhatsApp pribadi dengan command handling dan berbagai fitur otomasi pesan.

## Struktur Proyek

```
src/
├── index.js                  # File utama bot
├── db/
│   └── json.js              # Database JSON sederhana
├── handler/
│   ├── event.js             # Handler event WhatsApp
│   └── message.js           # Handler command pesan
└── helper/
    ├── index.js             # Export helper
    ├── inject.js            # Inject properties ke message
    ├── telegram.js          # Integration Telegram
    ├── text.js              # Text utilities
    └── utils.js             # Helper utilities
```

## Teknologi
- **Language**: JavaScript (Node.js ES6 Modules)
- **Main Library**: Baileys (WhatsApp Bot)
- **Database**: JSON File Storage
- **Package Manager**: NPM

## Dependencies
- `baileys` - WhatsApp Web API
- `dotenv` - Environment variables
- `pino` - Logging
- `qrcode-terminal` - QR code display
- `@hapi/boom` - Error handling

## Setup & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables (Optional)
Buat file `.env` untuk konfigurasi:
```
BOT_SESSION_NAME=default
BOT_NUMBER_OWNER=62xxxxx
BOT_PREFIX=!
BOT_MAX_RETRIES=5
BOT_LOGGER_LEVEL=silent
BOT_LOG_MESSAGE=false
BOT_ALLOWED_NO_PREFIX=false
TELEGRAM_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id
```

### 3. Jalankan Bot
```bash
npm start        # Production mode
npm run dev      # Development mode dengan auto-reload
```

## Features

### Commands
- `!ping` atau `!p` - Check latency dan uptime
- `!memory` atau `!ram` atau `!mem` - Check memory usage dan status monitor
- `!groups` atau `!group` - List semua grup
- `!contacts` - List semua kontak
- `!quoted` atau `!q` - Forward quoted message
- `!hidetag` atau `!ht` - Tag semua member grup (private only)
- `!eval` atau `!>` - Execute JavaScript code
- `!bash` atau `!$` - Execute bash command

### Features
- Auto-save message cache
- Group member tracking
- Contact management
- Ephemeral message support
- Telegram integration
- Protocol message handling
- Private & group detection
- **AutoReadStoryWhatsApp** - Log console yang bagus saat melihat story dengan info lengkap
- **Memory Monitor** - Fitur untuk mencegah penggunaan RAM berlebihan dengan auto-restart

## Code Quality
✅ Semua komentar sudah dihapus
✅ Indentation konsisten (tab)
✅ Formatting rapi dan mudah dibaca
✅ Struktur logis dan terorganisir
✅ Error handling yang proper

## Recent Changes (2025-11-27)
- **Memory Monitor Feature** - Fitur untuk mencegah penggunaan RAM berlebihan dengan auto-restart
  - Konfigurasi di file `config.json` (bukan environment variables)
  - Auto-detect limit berdasarkan RAM server (default 80% dari total RAM)
  - Auto-restart ketika memory menyentuh limit
  - Realtime monitoring setiap 30 detik (configurable)
  - Command `.memory` / `.ram` / `.mem` untuk cek status dari WhatsApp
  - Konfigurasi di `config.json`:
    ```json
    {
      "memoryMonitor": {
        "enabled": true,           // true = aktif, false = mati
        "limitMB": 500,            // limit manual dalam MB
        "checkIntervalMs": 30000,  // interval check (30 detik)
        "logUsage": true,          // tampilkan log memory
        "autoDetectLimit": true,   // auto detect berdasarkan RAM server
        "autoDetectPercentage": 80 // persentase RAM untuk limit
      }
    }
    ```

### Previous (2025-11-27)
- **Removed .rvo (View Once) feature** - Fitur dihapus karena limitasi WhatsApp
  - Removed rvo/antiviewonce/viewonce commands
  - Removed viewOnceCache dari index.js dan inject.js
  - Updated menu command

### Previous (2025-11-27)
- **AutoReadStoryWhatsApp Console Log** - Log console yang bagus dan rapi saat melihat story orang lain
  - Menampilkan kotak dengan border cyan yang rapi
  - Tipe Media dengan emoji (Gambar 🖼️, Video 🎥, Audio 🎵, Teks 📝, dll)
  - Selamat (Pagi/Siang/Sore/Malam) berdasarkan waktu Jakarta
  - Hari dalam bahasa Indonesia (Senin, Selasa, dll)
  - Tanggal format Indonesia (27 Nov 2025)
  - Waktu format 24 jam (05.41)
  - Nama pengirim story
  - Nomor HP yang di-mask (6287****086)
  - Status berhasil (✅Ke Bot Tele atau ✅Dibaca)
  - Reaksi emoji yang digunakan

## Previous Changes (2025-11-26)
- Pembersihan semua komentar dari setiap file
- Formatting ulang seluruh codebase untuk konsistensi
- Default environment variables untuk offline mode
- Perbaikan indentation dan spacing
- Dokumentasi lengkap di replit.md

## Notes
- Bot hanya merespons pesan dari owner (BOT_NUMBER_OWNER)
- QR code akan ditampilkan di console untuk login
- Session tersimpan di folder `sessions/`
- Database JSON tersimpan di `sessions/{SESSION_NAME}/`

## License
MIT
