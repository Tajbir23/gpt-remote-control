const coerceExpiresSeconds = require("./coerceExpiresSeconds");

const normalizeCookie = (cookie) => {
    try {
        const normalizedCookie = {};

        // Required properties
        // Validate required fields
        if (!cookie || typeof cookie.name !== 'string' || cookie.name.trim() === '') {
            return null;
        }
        if (typeof cookie.domain !== 'string' || cookie.domain.trim() === '') {
            return null;
        }
        const domain = cookie.domain.trim();
        const hostname = domain.startsWith('.') ? domain.slice(1) : domain;
        // Build minimal Chrome cookie shape, using url so we can set before navigation
        normalizedCookie.name = cookie.name.trim();
        normalizedCookie.value = String(cookie.value ?? '');
        normalizedCookie.path = cookie.path || '/';
        normalizedCookie.url = `https://${hostname}`;

        // Optional properties with proper defaults
        if (typeof cookie.secure !== 'undefined') normalizedCookie.secure = !!cookie.secure;
        if (typeof cookie.httpOnly !== 'undefined') normalizedCookie.httpOnly = !!cookie.httpOnly;

        // Expiration handling: support number, string, and Extended JSON shapes
        const rawExpiration = (typeof cookie.expirationDate !== 'undefined') ? cookie.expirationDate : cookie.expires;
        const coercedExpires = coerceExpiresSeconds(rawExpiration);
        if (coercedExpires && coercedExpires > 0) {
            normalizedCookie.expires = coercedExpires;
        }

        // Handle sameSite specially
        if (cookie.sameSite) {
            const sameSiteValue = String(cookie.sameSite).toLowerCase();
            if (sameSiteValue === 'lax') {
                normalizedCookie.sameSite = 'Lax';
            } else if (sameSiteValue === 'strict') {
                normalizedCookie.sameSite = 'Strict';
            } else if (sameSiteValue === 'no_restriction' || sameSiteValue === 'none') {
                normalizedCookie.sameSite = 'None';
                // When sameSite is None, secure must be true
                normalizedCookie.secure = true;
            }
        }

        // Remove any null/undefined values
        Object.keys(normalizedCookie).forEach(key => {
            if (normalizedCookie[key] === null || normalizedCookie[key] === undefined) {
                delete normalizedCookie[key];
            }
        });

        return normalizedCookie;
    } catch (error) {
        console.log('Error normalizing cookie', error);
        return null;
    }
};


const perseCookies = (cookies) => {
    // Ensure cookies is an array (parse JSON string if needed)
    if (typeof cookies === 'string') {
        try {
            cookies = JSON.parse(cookies);
        } catch (e) {
            console.log(`Invalid cookies JSON for account ${gptAccount}`);
            cookies = [];
        }
    }
    if (!Array.isArray(cookies)) {
        console.log(`Cookies is not an array for account ${gptAccount}`);
        cookies = [];
    }

    // Normalize and set cookies for the page
    const normalizedCookies = cookies
        .map(normalizeCookie)
        .filter(cookie => cookie !== null)
        // Keep only cookies intended for chatgpt.com hosts for the initial set
        .filter(cookie => typeof cookie.url === 'string' && /https:\/\/(.+\.)?chatgpt\.com$/i.test(cookie.url));

    return normalizedCookies;
}

module.exports = perseCookies