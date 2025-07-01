import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema ({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    profileImage : {
        type : String,
    }
})

userSchema.pre("save",function(next){
    const salt =  bcrypt.hash(10);
    this.password = bcrypt.hash(this.password,salt);

    next()
})

userSchema.pre("save",function(next){
    if(!this.profileImage){
        this.profileImage = this.username.charAt(0)
    }
    next()
})

const User = mongoose.model("user",userSchema)

export default User;