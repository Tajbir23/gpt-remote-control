require('dotenv').config()
const { io } = require("socket.io-client");
const os = require('os')
const { launchBrowser } = require('../handler/browserLauncher');
const { closeBrowser } = require('../handler/browserCloser');


const hostname = os.hostname()


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
    console.log('Hostname:', hostname)
    console.log('Rdp id:', account.rdpId)
    
    if(hostname === account.rdpId){
        console.log('Rdp id is correct')
        
        try {
            if(account.action === "open"){
                console.log("opening browser", account.gptAccount)
                await launchBrowser(account.gptAccount, account.location)
                console.log(`✅ Browser ${account.gptAccount} opened successfully`)
            }
            else if(account.action === "close"){
                console.log("closing browser", account.gptAccount)
                const result = await closeBrowser(account.gptAccount)
                if(result){
                    console.log(`✅ Browser ${account.gptAccount} closed successfully`)
                }else{
                    console.log(`⚠️ Browser ${account.gptAccount} was not running`)
                }
            }
        } catch (error) {
            console.error(`❌ Error handling ${account.action} for ${account.gptAccount}:`, error.message)
        }
        
    }else{
        console.log('Rdp id is incorrect')
    }
})


module.exports = { hostConnection }