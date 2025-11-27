const gptAccountModel = require("../../model/gptAccountSchema")

const getCookies = async(gptAccount) => {
    const cookies = await gptAccountModel.findOne({gptAccount})
    return cookies.cookies
}

module.exports = getCookies