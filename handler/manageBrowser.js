/**
 * Browser Handler - Simple browser launch and close by ID
 */

const { launchBrowser } = require('./browserLauncher');
const { closeBrowser } = require('./browserCloser');

module.exports = {
    launchBrowser,
    closeBrowser
};
