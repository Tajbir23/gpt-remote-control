/**
 * Browser configuration
 */

const BROWSER_CONFIG = {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    timeout: 60000,
    headless: false
};

const BROWSER_ARGS = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--no-first-run',
    '--disable-gpu'
];

module.exports = { BROWSER_CONFIG, BROWSER_ARGS };
