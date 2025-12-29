import passport from "passport";
import dotenv from 'dotenv'
dotenv.config()
import { Strategy as Google } from "passport-google-oauth20";

import usermodel from "./usermodel.js";
import   transporter  from "./transport.js";

passport.use(
    new Google(
    {
        clientID:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECERET,
        callbackURL:'https://backend-auth-z8ke.onrender.com/api/auth/google/callback'
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            const email = profile.emails[0].value
            const user = await usermodel.findOne({email})
             if(!user){
                return await usermodel.create({
                    name:profile.displayName,
                    email,
                    provider:"google",
                    isVerifyed:true,
                    googleId:profile.id,
                    avatar:profile.photos[0].value
                })
             }
            await transporter.sendMail({
                from:"AUTH_APP <ayyanarmurugan896@gmail.com>",
                to:email,
                subject:`Your account is Regiester with this ${email}`
             })
             return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

export default passport
