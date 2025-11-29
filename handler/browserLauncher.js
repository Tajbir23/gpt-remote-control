/**
 * Browser launch functionality
 */

const os = require('os')
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const path = require("path");
const { BROWSER_CONFIG, BROWSER_ARGS } = require("./browserConfig");
const browserStore = require("./browserStore");
const gptAccountModel = require("../model/gptAccountSchema");
const openChatGpt = require("./handleTeam/openChatGpt");
const { closeBrowser } = require('./browserCloser');
const extractCookiesFromPage = require('./handleCookies/extractCookiesFromPage');
const updateCookies = require('./handleCookies/updateCookies');


puppeteer.use(StealthPlugin());

const hostname = os.hostname()
/**
 * Launch browser with specific profile
 */
const launchBrowser = async (gptAccount, location) => {
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

        let proxyHost, proxyPort
        console.log(process.env.LOCATION, location)
        if(process.env.LOCATION !== location){
            proxyHost = '127.0.0.1'
            proxyPort = 60010
            BROWSER_ARGS.push(`--proxy-server=http://${proxyHost}:${proxyPort}`);
        }
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
        
        // Store browser instance BEFORE opening ChatGPT
        // This ensures browser is in store even if navigation fails
        browserStore.add(gptAccount, { browser, page });
        
        // Monitor browser close/disconnect
        browser.on('disconnected', async () => {
            console.log(`⚠️ Browser ${gptAccount} was closed manually or crashed`);
            
            // Try to save cookies
            try {
                const { success, formattedCookies } = await extractCookiesFromPage(page, gptAccount);
                if(success){
                    await updateCookies(formattedCookies, gptAccount);
                }
            } catch (error) {
                console.log(`⚠️ Could not save cookies: ${error.message}`);
            }
            
            // Cleanup
            try {
                browserStore.remove(gptAccount);
                await gptAccountModel.updateOne(
                    {gptAccount},
                    {$pull: {openOn: hostname}}
                );
                console.log(`✅ Cleanup completed for ${gptAccount}`);
            } catch (error) {
                console.error(`❌ Error during cleanup: ${error.message}`);
            }
        });

        // Open ChatGPT (after browser is stored)
        await openChatGpt(gptAccount, page);
        
        console.log(`Browser ${gptAccount} launched successfully`);
        await gptAccountModel.updateOne({gptAccount},{$addToSet: {openOn: hostname}});

    } catch (error) {
        console.error(`Error launching browser ${gptAccount}:`, error.message);
        
        // Cleanup on error
        if (browser) {
            try {
                await browser.close();
            } catch (e) {
                console.error(`Error closing browser: ${e.message}`);
            }
        }
        
        browserStore.remove(gptAccount);
        await gptAccountModel.updateOne({gptAccount},{$pull: {openOn: hostname}});
        
        throw error;
    }
};

module.exports = { launchBrowser };
