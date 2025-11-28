const { Schema, model } = require("mongoose");

const rdpInfoSchema = new Schema({
    hostname: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const rdpInfoModel = model('rdpInfo', rdpInfoSchema)

module.exports = rdpInfoModel