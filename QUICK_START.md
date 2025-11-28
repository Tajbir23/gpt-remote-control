# Quick Start Guide

## 🚀 Setup & Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Install PM2 (if not installed)
```bash
npm install -g pm2
```

### 3. Configure Environment
Create `.env` file:
```env
BASE_URL=http://your-server-url
RDP_ID=your-rdp-id
MONGO_URI=your-mongodb-uri
```

### 4. Start Application

#### Development Mode (with auto-reload)
```bash
npm run dev
```

#### Production Mode (with PM2)
```bash
npm start
```

## 📊 PM2 Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start with PM2 |
| `npm stop` | Stop application |
| `npm restart` | Restart application |
| `npm run logs` | View logs |
| `npm run monit` | Monitor application |
| `npm run delete` | Remove from PM2 |

## 📝 Detailed Commands

### View Logs
```bash
npm run logs
```

### Monitor Resources
```bash
npm run monit
```

### Check Status
```bash
pm2 status
```

### View All Processes
```bash
pm2 list
```

## 🔄 Auto-start on System Boot

```bash
pm2 startup
npm start
pm2 save
```

## 📁 Project Structure

```
gpt-remote-control/
├── handler/              # Browser management
│   ├── browserLauncher.js
│   ├── browserCloser.js
│   ├── browserStore.js
│   ├── browserConfig.js
│   └── handleTeam/       # ChatGPT automation
├── socket/               # Socket.IO connection
├── model/                # Database models
├── db/                   # Database connection
├── logs/                 # PM2 logs
├── browser-profiles/     # Browser profiles (auto-generated)
├── index.js              # Entry point
└── ecosystem.config.js   # PM2 configuration
```

## 🎯 How It Works

1. **Application starts** → Connects to Socket.IO server
2. **Server sends account data** → Checks RDP_ID
3. **If RDP_ID matches** → Launches browser with profile
4. **Browser opens ChatGPT** → Automation begins
5. **On close** → Cleans up profile and updates database

## 🔧 Troubleshooting

### PM2 not found?
```bash
npm install -g pm2
```

### Application not starting?
```bash
pm2 logs gpt-remote-control
```

### Browser not launching?
- Check Chrome path in `handler/browserConfig.js`
- Ensure Chrome is installed

### Database connection error?
- Check `MONGO_URI` in `.env` file
- Ensure MongoDB is running

## 📚 Documentation

- `PM2_GUIDE.md` - Complete PM2 guide
- `BROWSER_HANDLER_GUIDE.md` - Browser handler documentation
- `handler/README.md` - Handler module documentation

## 💡 Tips

- Use `npm run dev` for development (auto-reload)
- Use `npm start` for production (PM2)
- Check logs regularly: `npm run logs`
- Monitor resources: `npm run monit`

## 🎉 You're Ready!

Start the application:
```bash
npm start
```

View logs:
```bash
npm run logs
```

Happy automating! 🚀

