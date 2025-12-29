import dotenv from 'dotenv'
dotenv.config()
import express from 'express'

import cors from 'cors'
import router from './Routes/authroutes.js'
import { ConnectDB } from './Config/Db.js'
import cookieParser from 'cookie-parser'
import passport from  "./Config/passport.js";




const port = process.env.PORT
const app = express()


app.use(express.json())
app.use(cookieParser())

app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
))
ConnectDB()

app.use(passport.initialize())



app.get('/',(req,res)=>{
    res.status(200).json({ 
        msg:"Api is Working"
    })
})
app.use("/api/auth",router)
app.listen(port,()=>{
    console.log(`server is Running on http://localhost:${port}`);
    
})




