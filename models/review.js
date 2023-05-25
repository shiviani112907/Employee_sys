const mongoose = require('mongoose');

// Review Schema
const reviewSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    reviewee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reviewer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps:true
});

// Creating new model and exporting it
const Reviews = mongoose.model('Reviews',reviewSchema);

module.exports = Reviews;