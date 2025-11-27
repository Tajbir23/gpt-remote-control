const { Schema, model } = require("mongoose");

const gptAccountSchema = new Schema({
    gptAccount: {
        type: String,
        required: true
    },
    cookies: {
        type: Object,
        required: true
    },
    members: {
        type: Array,
        default: [],
        required: true
    },
    server: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
        enum: ['ireland', 'switzerland', 'netherlands']
    },
    isActive: {
        type: Boolean
    },
    openOn: {
        type: Array,
        default: []
    }
})

const gptAccountModel = model('gptAccount', gptAccountSchema)

module.exports = gptAccountModel