import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

const router = express.Router()

const generateToken = (userId) => {
    return jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: "15d"})
}

router.post("/register",async (req,res)=>{
    try{

        console.log(req.body)
        
        const {email,username,password} = await req.body;
        
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

        const existingUser = await User.findOne({email:email})
        
        if(existingUser){
            return res.status(400).json({
                message:"Email already taken"
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

        res.status(201).json({
            token,
            user : {
                _id : user._id,
                username : user.username,
                email : user.email,
                profileImage : user.profileImage
            }
        })
    }catch(e){
        console.log("Error in Register Route",e)
    }
})

router.post("/login",(req,res)=>{
    res.send("login")
})

export default router;