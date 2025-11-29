const extractCookiesFromPage = async (page) => {
    try {

        // Get all cookies from the page
        const cookies = await page.cookies();

        // Format cookies to match the exact structure
        const formattedCookies = cookies.map(cookie => ({
            domain: cookie.domain,
            expirationDate: cookie.expires ? cookie.expires : undefined,
            hostOnly: cookie.domain.startsWith('.') ? false : true,
            httpOnly: cookie.httpOnly,
            name: cookie.name,
            path: cookie.path,
            sameSite: cookie.sameSite?.toLowerCase() || "no_restriction",
            secure: cookie.secure,
            session: cookie.session || !cookie.expires,
            storeId: null,
            value: cookie.value
        }));

        return { success: true, formattedCookies }

    } catch (error) {
        console.error(`Error extracting cookies from page: ${error.message}`);
        return { success: false, error: error.message }
    }
}

module.exports = extractCookiesFromPage;