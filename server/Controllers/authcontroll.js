import bcrypt from 'bcrypt'
import usermodel from '../Config/usermodel.js';
import transporter from '../Config/transport.js';
import jwt from 'jsonwebtoken'
import { generateOTP, genrateAccesstoken, genrateRefreshtoken } from '../Config/genratetoken.js';


export const reguser = async(req,res)=>{
   try {
     const{name,email,password}=req.body

    if(!name || !email ||!password){
        res.status(403).json({
            success:"false",
            msg:"Fileds Requires"
        })
    }
    
    const user = await usermodel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
       const hashpassword =await bcrypt.hash(password,10)
       await usermodel.create({
      name,
      email,
      password: hashpassword,
      isVerified: true,
    });
    

    await transporter.sendMail({
                   from:"AUTH_APP <ayyanarmurugan896@gmail.com>",
                   to:email,
                   subject:`Your account is Regiester with this ${email}`
                })
 res.status(201).json({ success: true, msg: "Registered successfully" });
   } catch (error) {
     res.status(500).json({ msg: error.message });
   }


}



export const loguser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Email and password are required",
      });
    }

    // 2️⃣ Find user
    const user = await usermodel
      .findOne({ email })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials",
      });
    }

    // 3️⃣ Compare password (NOT hash)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials",
      });
    }

    // 4️⃣ Generate tokens
    const accessToken = genrateAccesstoken(user._id);
    const refreshToken = genrateRefreshtoken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    // 5️⃣ Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    // 6️⃣ Success response
    res.status(200).json({
      success: true,
      msg: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const forgetOtp = async(req,res)=>{
  try {
    const {email} = req.body;
    if(!email){
      return res.status(403).json({
        success:false,
        msg:"Email not found"
      })
    }
    const otp = generateOTP()
    const otpExipre = Date.now()+15*60*1000
  
    const user = await usermodel.findOneAndUpdate({email},
     {
       otp:otp,
       otpExpire:otpExipre
     }
    )
    await user.save()
    await transporter.sendMail({
      from:`Auth <ayyanarmurugan896@gmail.com>`,
      to:email,
      subject:"Password reset otp",
      html:`
      <h1>Otp-verfication</h1>
      <p>Reset password use this ${otp} valid only 15min</p>
      `
    })
    res.status(200).json({
     msg:"Otp-sent your Mail"
    })
   

  } catch (error) {
     res.status(403).json({
      success:false,
      msg:error.message
     })
  }
}

export const verifyOtp = async(req,res)=>{
  try {
    const {email,otp,password} = req.body;
    if(!email || !otp || !password){
      return res.status(403).json({
        success:false,
        msg:"Fields are required"
      })
    }

  
    const user = await usermodel.findOneAndUpdate({email})
    if(user.otp !== otp || user.otpExpire < Date.now()){
      return res.status(403).json({
        msg:"Invalied Otp"
      })
    }
 
    const newpassword =await bcrypt.hash(password,10)
     user.otp = null
     user.otpExipre = null
     user.password = newpassword
   
      await transporter.sendMail({
      from:`Auth <ayyanarmurugan896@gmail.com>`,
      to:email,
      subject:"Password Changed Successfully",
      html:`
      <h1>Password changed</h1>
      <p>Tour password is changed please login to Continue</p>
      `
    })

     

    await user.save()
   
    res.status(200).json({
     msg:"Password Changed"
    })
   

  } catch (error) {
     res.status(403).json({
      success:false,
      msg:error.message
     })
  }
}
// POST /api/auth/refresh
export const refresh = (req, res) => {
 try {
   const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_REFKEY, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_KEY,
      { expiresIn: "15m" }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "lax",
    });
  });


 } catch (error) {
   console.log(error.message);
   
 }
};






export const logout  = async (req, res) => {
  const token = req.cookies.refreshToken;
 
  if (!token) {
   return res.status(403).json({
    msg:"Token not found"
   })
  }
   
 await usermodel.findOneAndUpdate(
      { refreshToken: token },
      { refreshToken: "" }
    );
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json({ success: true, msg: "Logged out" });
};


export const userdata = async (req, res) => {
  try {
    // 1️⃣ Get token from cookies
    const token = req.cookies.refreshToken;
  console.log(token)
    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "Not authenticated",
      });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFKEY
    );

    // 3️⃣ Get user
    const user = await usermodel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    // 4️⃣ Success
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: error.message,
    });
  }
};
