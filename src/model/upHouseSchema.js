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
            required: true
        },   
        topography: {
            type: Boolean,
            required: true
        },         
        fundation: {
            type: Boolean,
            required: true
        },
        electrical: {
            type: Boolean,
            required: true
        },
        hydraulic: {
            type: Boolean,
            required: true
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