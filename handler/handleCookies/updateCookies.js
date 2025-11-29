const updateCookies = async (formattedCookies, gptAccount) => {
    await fetch(`${process.env.COOKIE_API}/update_cookies`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cookies: formattedCookies,
            gptAccount: gptAccount
        })
    })
}

module.exports = updateCookies