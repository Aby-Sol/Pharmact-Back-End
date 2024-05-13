const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")


//Register (creating a new user)
router.post("/register", async (req, res) => {
    try {
        //checking if the email already exists
        const emailExisting = await User.findOne({ email: req.body.email })
        if (emailExisting) {
            // error
            return res.status(400).json({ error: "email_taken", message: "This e-mail address is already taken, try a different email" });
        }

        //checking if the username already exists
        const userExisting = await User.findOne({ username: req.body.username })
        if (userExisting) {
            // error
            return res.status(400).json({ error: "username_taken", message: "This username has been taken. I guess great minds really do think alike." });
        }

        //hashing our password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        //create the user with hashed password
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ error: "server_error", message: "Something went wrong. Please try again later." });
    }
});

//Login 

router.post("/login", async(req, res)=>{
    try{
        //Checking if the username exists
        const user = await User.findOne({username:req.body.username})
        if(!user){throw new Error("This username does not exist, please try again")}

        //checking if the password is correct (hashed)
        const validated = await bcrypt.compare(req.body.password, user.password)
        if(!validated){throw new Error("Wrong password, please try again")}
        
        // Sending the login info without the password 
        const {password, ...others} = user._doc;
        res.status(200).json(others);   // Sending only the "other" informations
    }
    catch (err){
        return res.status(500).json(err)
    }
})

module.exports = router