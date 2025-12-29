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
const allowedOrigins = [
  "https://auth0-1front.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.options("*", cors());
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




