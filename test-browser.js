/**
 * Simple test for browser handler
 */

const { launchBrowser, closeBrowser } = require('./handler/manageBrowser');

async function test() {
    try {
        console.log('Testing browser handler...\n');

        // Test 1: Launch browser
        console.log('1. Launching browser with ID: test-123');
        const { browser, page } = await launchBrowser('test-123');
        console.log('✅ Browser launched successfully\n');

        // Test 2: Navigate to a page
        console.log('2. Navigating to Google...');
        await page.goto('https://www.google.com');
        const title = await page.title();
        console.log(`✅ Page title: ${title}\n`);

        // Wait 3 seconds
        console.log('3. Waiting 3 seconds...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log('✅ Wait complete\n');

        // Test 3: Close browser
        console.log('4. Closing browser...');
        await closeBrowser('test-123');
        console.log('✅ Browser closed successfully\n');

        console.log('🎉 All tests passed!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run test
test();

