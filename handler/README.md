# Browser Handler

Simple browser launch and close using browser ID. Each browser ID gets its own profile.

## Usage

```javascript
const { launchBrowser, closeBrowser } = require('./handler');

// Launch browser
const { browser, page } = await launchBrowser('user-123');

// Use browser
await page.goto('https://example.com');

// Close browser
await closeBrowser('user-123');
```

## Features

- ✅ Launch browser with unique profile per ID
- ✅ Close browser by ID
- ✅ Prevents duplicate launches
- ✅ Auto-stores browser instances

## File Structure

```
handler/
├── index.js           # Main entry point
├── browserLauncher.js # Launch logic
├── browserCloser.js   # Close logic
├── browserStore.js    # Browser storage
└── browserConfig.js   # Configuration
```

## Profile Location

Profiles are stored in: `browser-profiles/profile-{browserId}`

