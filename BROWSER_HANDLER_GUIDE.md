# Browser Handler Guide

## 📁 File Structure

```
handler/
├── index.js           # Main entry (import from here)
├── browserLauncher.js # Browser launch logic
├── browserCloser.js   # Browser close logic
├── browserStore.js    # Active browsers storage
├── browserConfig.js   # Browser configuration
└── README.md          # Documentation
```

## 🚀 Quick Start

### 1. Import

```javascript
const { launchBrowser, closeBrowser } = require('./handler');
```

### 2. Launch Browser

```javascript
// Launch browser with ID
const { browser, page } = await launchBrowser('user-123');

// Browser will use profile: browser-profiles/profile-user-123
```

### 3. Use Browser

```javascript
// Navigate to URL
await page.goto('https://example.com');

// Get page title
const title = await page.title();

// Take screenshot
await page.screenshot({ path: 'screenshot.png' });
```

### 4. Close Browser

```javascript
// Close by ID
await closeBrowser('user-123');
```

## 📝 Socket.IO Integration

The handler is already integrated in `socket/socket_io.js`:

### Events:

**1. `rcGptAccount` - Launch browser**
```javascript
// Server sends:
{
    _id: "account-123",
    rdpId: "rdp-456",
    // ... other account data
}

// Client launches browser and responds with:
{
    accountId: "account-123",
    success: true
}
```

**2. `closeBrowser` - Close browser**
```javascript
// Server sends:
{
    browserId: "account-123"
}

// Client closes browser and responds with:
{
    browserId: "account-123",
    success: true
}
```

## 🔧 Configuration

Edit `handler/browserConfig.js`:

```javascript
const BROWSER_CONFIG = {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    timeout: 60000,
    headless: false
};
```

## ✅ Features

- **Unique Profiles**: Each browser ID gets its own profile
- **Duplicate Prevention**: Same ID won't launch twice
- **Auto Storage**: Browser instances stored automatically
- **Error Handling**: Proper error messages and cleanup

## 🧪 Testing

Run the test file:

```bash
node test-browser.js
```

## 📦 Profile Storage

Browser profiles are stored in:
```
browser-profiles/
├── profile-user-123/
├── profile-user-456/
└── profile-account-789/
```

Each profile maintains:
- Cookies
- Local storage
- Session data
- Extensions
- Browser settings

## 🔄 Usage Flow

```
1. Socket receives account data
   ↓
2. Check RDP ID matches
   ↓
3. Launch browser with account._id
   ↓
4. Browser opens with unique profile
   ↓
5. Do automation tasks
   ↓
6. Close browser when done
```

## 💡 Example Usage

```javascript
const { launchBrowser, closeBrowser } = require('./handler');

async function automateTask(accountId) {
    try {
        // Launch
        const { browser, page } = await launchBrowser(accountId);
        
        // Navigate
        await page.goto('https://chat.openai.com');
        
        // Do your automation...
        
        // Close
        await closeBrowser(accountId);
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}
```

## 🛠️ Troubleshooting

**Browser won't launch?**
- Check Chrome path in `browserConfig.js`
- Ensure Chrome is installed
- Check file permissions

**Profile not saving?**
- Check `browser-profiles` folder exists
- Ensure write permissions
- Check disk space

**Browser already running error?**
- Close existing browser first
- Or use different browser ID

