import express from 'express'
import passport from 'passport';
import { genrateAccesstoken, genrateRefreshtoken } from '../Config/genratetoken.js';
import usermodel from '../Config/usermodel.js';
import jwt from 'jsonwebtoken'

import { forgetOtp, logout, loguser, reguser, verifyOtp ,userdata, refresh } from '../Controllers/authcontroll.js';

const router = express.Router()

router.get('/google',
    passport.authenticate('google',{
        scope:['profile',"email"]
    })
)
router.get('/google/callback',
    passport.authenticate('google',{
        session:false
    }),
    async(req,res)=>{
        try {
            const accessToken = genrateAccesstoken(req.user._id)
            const refreshToken = genrateRefreshtoken(req.user._id)
   
             await usermodel.findByIdAndUpdate(req.user._id,{
                RefreshToken:refreshToken
             })
           res.cookie("accessToken",accessToken,{
            maxAge:15*60*1000,
            httpOnly:true,
            secure:true,
            sameSite:"none"
           })
            res.cookie("refreshToken",refreshToken,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            secure:true,
            sameSite:"none"
           })
          
           res.redirect(
            "https://backend-auth-z8ke.onrender.com/"
           )
        } catch (error) {
             res.status(403).json({
            success:false,
            msg:error.message
           })
        }
    }
)



router.route("/register").post(reguser)
router.route("/login").post(loguser)
router.route("/logout").post(logout)
router.route("/reset-otp").post(forgetOtp)
router.route("/verify-otp").post(verifyOtp)
router.route("/user").get(userdata)
router.route("/refresh").get(refresh)




export default router;
