const mongoose = require("mongoose")

const upHouseSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    category: { 
        budget: {
            type: Boolean,
            required: false
        },   
        topography: {
            type: Boolean,
            required: false
        },         
        fundation: {
            type: Boolean,
            required: false
        },
        electrical: {
            type: Boolean,
            required: false
        },
        hydraulic: {
            type: Boolean,
            required: false
        },
    },
    description: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model("upHouse", upHouseSchema)