import mongoose from "mongoose";
import validator from 'validator'

const userSchema = mongoose.Schema({
  
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validation:[validator.isEmail,"Please Provide valied Email"]
    },
    password:{
       type:String,
       select:false,
       default:null,
        validation:[validator.isStrongPassword,"Set Strong password"]
    },
    googleId:{
       type:String,
       default:null
    },
    provider:{
        type:String,
        enum:["Local","google"],
        default:"Local"
    },
    avatar:{
        type:String,
        default:null
    },
    isVerifyed:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String,
        default:null
    },
    otpExpire:{
        type:Date,
        default:null
    },
    RefreshToken:{
        type:String,
        default:null
    }
},{
    timestamps:true
})



const usermodel =mongoose.model("user",userSchema)
export default usermodel;

