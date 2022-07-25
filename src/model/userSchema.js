const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    telephone: {
        type: Number,
        required: true
    },

    problem: {
        type: String,
        required: true        
    },

    password: {
        type: String,
        required: true
    },

    createAt: {
        type: Date,
        default: new Date()
    },


})

module.exports = mongoose.model("user", userSchema)