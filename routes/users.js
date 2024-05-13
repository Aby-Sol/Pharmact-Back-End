const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require ("../models/Post")

//Update
router.put("/:id", async(req, res)=>{
    if (req.body.userId.toString() === req.params.id.toString()){
            if (req.body.password){
                req.body.password =await bcrypt.hash(req.body.password,10)
            }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set: req.body,},{new:true})
            res.status(200).json(updatedUser)
        }
        catch(error){
            return res.status(500).json(error)
        }
    }
    else {
        res.status(401).json("You can update only your account !")
    }
  
});

//Delete 

router.delete("/:id", async(req, res)=>{
    if (req.body.userId.toString() === req.params.id.toString()){
        try{
            try {
            await Post.deleteMany({username:User.username})
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("This account has been deleted successfully ")
            }
            catch(error){
                return res.status(500).json(error)
            }
        }catch(error){return res.status(404).json("User not found")}
    }
    else {
        res.status(401).json("You can delete only your account !")
    }
  
});

//Get User 

router.get("/:id", async (req,res) =>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc
        res.status(200).json(others)
    }
    catch(error){
        res.status(500).json(error)
    }
})



module.exports = router