//Creating the userSchema

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true
    }, 
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8  // Length is 8 charachters min
    },
    profilePic:{
        type:String,
        default:"https://pic.onlinewebfonts.com/thumbnails/icons_561543.svg"
    },
    admin:{
        type: Boolean,
        required:true,
        default:false
    } 
},
    {timestamps: true} //It's going to add updated/created at.. 
);
 
module.exports = mongoose.model("User", UserSchema)