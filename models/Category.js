//Creating the CategorySchema

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  }
},
    {timestamps: true} //It's going to add updated/created at.. 
);
 
module.exports = mongoose.model("Category", CategorySchema)