const getCookies = require("./getCookies")
const perseCookies = require("./normalizeCookies")

const openChatGpt = async (gptAccount, page) => {

    const cookies = await getCookies(gptAccount)

    const normalizeCookies = await perseCookies(cookies)

    const failedSet = [];
    for (const cookie of normalizeCookies) {
        try {
            await page.setCookie(cookie);
        } catch (error) {
            console.log(`Error setting cookie ${cookie.name} for account ${gptAccount}:`, error.message);
            failedSet.push({ name: cookie.name, error: error.message });
            // Continue with other cookies even if one fails
        }
    }

    if (failedSet.length > 0) {
        console.log(`Failed to set ${failedSet.length} cookies for account ${gptAccount}:`, failedSet);
    }

    await page.goto("https://chatgpt.com")
}

module.exports = openChatGpt