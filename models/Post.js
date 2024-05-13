//Creating the PostSchema

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
   title:{
    type:String,
    required:true, 
    unique:true,
    min:6
   },
   description:{
    type:String,
    required:true,
    min:12
   },
   picture:{
    type: String,
    default:"https://scontent.ftun20-1.fna.fbcdn.net/v/t1.15752-9/438115800_1594828017724783_3894389129971119792_n.png?stp=dst-png_s2048x2048&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=QeOFNNSLYrcAb4Tu5fN&_nc_ht=scontent.ftun20-1.fna&oh=03_Q7cD1QF5zzBOX92eOLOFovLtVrr5cxIdk46cXLVhYYlhf_qqNA&oe=664FB7D3"
   },
   username:{
    type:String,
    required:true
   },
   categories:{
    type:Array,
    required:true
   }
},
    {timestamps: true} //It's going to add updated/created at.. 
);
 
module.exports = mongoose.model("Post", PostSchema)