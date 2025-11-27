const { default: mongoose } = require("mongoose")


const databaseConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('database is connected')
    } catch (error) {
        console.error('Database connection error', error)
    }
}

module.exports = databaseConnection