require('dotenv').config()
const { io } = require("socket.io-client");
const { launchBrowser } = require('../handler/browserLauncher');
const { closeBrowser } = require('../handler/browserCloser');

const hostConnection = io(process.env.BASE_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 10,
    timeout: 20000,
    transports: ['websocket', 'polling']
})


hostConnection.on('connect', () => {
    console.log('Connected to host')
})

hostConnection.on("message", (message) => {
    console.log('Message from host:', message)
})

hostConnection.on("disconnect", () => {
    console.log('Disconnected from host')
})

hostConnection.on("error", (error) => {
    console.log('Error:', error)
})

hostConnection.on("rcGptAccount", async(account) => {
    console.log('Gpt account:', account)
    if(process.env.RDP_ID === account.rdpId){
        console.log('Rdp id is correct')
        if(account.action === "open"){
            console.log("opening browser", account.gptAccount)
            await launchBrowser(account.gptAccount)
        }else if(account.action === "close"){
            console.log("closing browser", account.gptAccount)
            await closeBrowser(account.gptAccount)
        }
    }else{
        console.log('Rdp id is incorrect')
    }
})


module.exports = { hostConnection }