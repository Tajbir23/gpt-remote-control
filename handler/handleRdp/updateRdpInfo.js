const os = require('os');
const rdpInfoModel = require('../../model/rdpInfoSchema');
const updateRdpInfoHandler = async () => {
    const hostname = os.hostname()

    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    console.log("Public IP:", data.ip);

    await rdpInfoModel.findOneAndUpdate({hostname}, {ipAddress: data.ip}, {new: true, upsert: true})
}

module.exports = updateRdpInfoHandler