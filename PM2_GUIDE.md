# PM2 Setup Guide

## 📦 Installation

### Install PM2 globally:
```bash
npm install -g pm2
```

## 🚀 Usage

### Start Application
```bash
npm start
# or
pm2 start ecosystem.config.js
```

### Stop Application
```bash
npm stop
# or
pm2 stop gpt-remote-control
```

### Restart Application
```bash
npm restart
# or
pm2 restart gpt-remote-control
```

### Delete from PM2
```bash
npm run delete
# or
pm2 delete gpt-remote-control
```

### View Logs
```bash
npm run logs
# or
pm2 logs gpt-remote-control
```

### Monitor Application
```bash
npm run monit
# or
pm2 monit
```

## 📊 Useful PM2 Commands

### List all processes
```bash
pm2 list
# or
pm2 ls
```

### Show process details
```bash
pm2 show gpt-remote-control
```

### Clear logs
```bash
pm2 flush
```

### Save PM2 process list
```bash
pm2 save
```

### Resurrect saved processes
```bash
pm2 resurrect
```

### Setup PM2 to start on system boot
```bash
pm2 startup
pm2 save
```

## 📁 Log Files

Logs are stored in `./logs/` directory:
- `pm2-error.log` - Error logs
- `pm2-out.log` - Output logs
- `pm2-combined.log` - Combined logs

## ⚙️ Configuration

Edit `ecosystem.config.js` to customize:
- Memory limit
- Number of instances
- Environment variables
- Log file locations
- Auto-restart settings

## 🔄 Auto-restart

PM2 will automatically restart your app if:
- It crashes
- Memory exceeds 1GB
- You run `pm2 restart`

## 💡 Tips

### View real-time logs with colors
```bash
pm2 logs --lines 100
```

### Restart with 0-second downtime
```bash
pm2 reload gpt-remote-control
```

### Update PM2
```bash
npm install -g pm2@latest
pm2 update
```

### Remove from startup
```bash
pm2 unstartup
```

## 🐛 Troubleshooting

### App not starting?
```bash
pm2 logs gpt-remote-control --err
```

### Check process status
```bash
pm2 status
```

### Reset restart counter
```bash
pm2 reset gpt-remote-control
```

## 📝 Example Workflow

```bash
# First time setup
npm install -g pm2
npm start
pm2 save
pm2 startup

# Daily usage
npm run logs     # View logs
npm restart      # Restart app
npm stop         # Stop app
npm start        # Start app

# Monitoring
npm run monit    # Real-time monitoring
```

## 🌐 Web Dashboard (Optional)

PM2 also has a web dashboard:

```bash
pm2 web
```

Then open: http://localhost:9615

