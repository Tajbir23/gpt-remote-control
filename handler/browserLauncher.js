/**
 * Browser launch functionality
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const path = require("path");
const { BROWSER_CONFIG, BROWSER_ARGS } = require("./browserConfig");
const browserStore = require("./browserStore");
const gptAccountModel = require("../model/gptAccountSchema");
const openChatGpt = require("./handleTeam/openChatGpt");
const { closeBrowser } = require('./browserCloser');


puppeteer.use(StealthPlugin());
/**
 * Launch browser with specific profile
 */
const launchBrowser = async (gptAccount) => {
    // Check if already running
    if (browserStore.has(gptAccount)) {
        console.log(`Browser ${gptAccount} is already running`);
        return browserStore.get(gptAccount);
    }

    let browser;
    let page;

    try {
        // Profile directory path
        const userDataDir = path.join(__dirname, '..', 'browser-profiles', `profile-${gptAccount}`);
        
        console.log(`Launching browser ${gptAccount}...`);

        // Launch browser
        browser = await puppeteer.launch({
            headless: BROWSER_CONFIG.headless,
            executablePath: BROWSER_CONFIG.executablePath,
            userDataDir: userDataDir,
            args: BROWSER_ARGS,
            ignoreDefaultArgs: ['--enable-automation'],
            timeout: BROWSER_CONFIG.timeout
        });

        // Get or create page
        page = await browser.newPage();

        await openChatGpt(gptAccount, page)
        
        // Monitor browser close/disconnect
        browser.on('disconnected', async () => {
            console.log(`⚠️ Browser ${gptAccount} was closed manually or crashed`);
            
            
            // Close browser
            try {
                await closeBrowser(gptAccount)
            } catch (error) {
                console.error(`❌ Error closing browser ${gptAccount}:`, error.message);
            }
        });
        
        // Store browser instance
        browserStore.add(gptAccount, { browser, page });
        console.log(`Browser ${gptAccount} launched successfully`);

        await gptAccountModel.updateOne({gptAccount},{$addToSet: {openOn: process.env.RDP_ID}})

    } catch (error) {
        console.error(`Error launching browser ${gptAccount}:`, error.message);
        await closeBrowser(gptAccount)
        await gptAccountModel.updateOne({gptAccount},{$pull: {openOn: process.env.RDP_ID}})
        throw error;
    }
};

module.exports = { launchBrowser };
