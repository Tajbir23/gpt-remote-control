/**
 * Browser close functionality
 */

const browserStore = require("./browserStore");
const gptAccountModel = require("../model/gptAccountSchema");
const path = require("path");
const fs = require("fs");
const os = require('os')

const hostname = os.hostname()
/**
 * Delete profile folder recursively
 */
const deleteProfileFolder = (profilePath) => {
    if (fs.existsSync(profilePath)) {
        fs.rmSync(profilePath, { recursive: true, force: true });
        console.log(`🗑️ Profile folder deleted: ${profilePath}`);
    }
};

/**
 * Close specific browser
 */
const closeBrowser = async (gptAccount) => {
    if (!browserStore.has(gptAccount)) {
        console.log(`Browser ${gptAccount} not found`);
        return false;
    }

    try {
        const { browser } = browserStore.get(gptAccount);
        
        // Close browser
        await browser.close();
        
        // Remove from store
        browserStore.remove(gptAccount);
        
        // Update database
        await gptAccountModel.updateOne(
            {gptAccount}, 
            {$pull: {openOn: hostname}}
        );
        
        // Delete profile folder
        const profilePath = path.join(__dirname, '..', 'browser-profiles', `profile-${gptAccount}`);
        deleteProfileFolder(profilePath);
        
        console.log(`✅ Browser ${gptAccount} closed successfully`);
        return true;

    } catch (error) {
        console.error(`❌ Error closing browser ${gptAccount}:`, error.message);
        browserStore.remove(gptAccount);
        throw error;
    }
};

module.exports = { closeBrowser };
