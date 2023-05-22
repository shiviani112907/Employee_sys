const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name :{ 
        type : String,
        required : true,
    },
    email : {
        type :String,
        required: true,
        unique: true
    },
    password : {
        type : String,
        required: true
    },
    isAdmin:{
        type : Boolean,
        required:true
    },
    toReview:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    reviewFrom:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    }]
},{
    timestamps: true,
});

const User = mongoose.model('User',userSchema);

module.exports = User;