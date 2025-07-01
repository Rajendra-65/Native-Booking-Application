import express from "express";
import User from "../models/User";

const router = express.Router()

const generateToken = (userId) => {
    
}

router.post("/register",async (req,res)=>{
    try{
        const {email,username,password} = req.body;
        if(!username || !email || !password){
            return res.status(200).json({
                message : "All fields are required"
            })
        }
        if(password.length < 6){
            return res.status(500).json({
                message: "Password must be 6 charecters long"
            })
        }
        if(username.length < 3){
            return res.status(400).json({
                message : "username mus t be at least 3 charecters long"
            })
        }

        const exist = awiatUser.findOne({$or:[{email},{username}]})
        const existingUser = await User.findOne({email:email})
        if(existingUser){
            return res.status(400).json({
                message:"Email taken"
            })
        }

        const profileImage = `https://api.dicebar.com/7.x/avatars/avg?seed=${username}`

        const user = new User ({
            email,
            username,
            password,
            profileImage,
        })
        await user.save();

        const token = generateToken(user._id)
    }catch(e){
        console.log(e)
    }
})

router.post("/login",(req,res)=>{
    res.send("login")
})

export default router;