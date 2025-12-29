import jwt from 'jsonwebtoken'

export const genrateAccesstoken = (userId)=>{
   return jwt.sign({id:userId},process.env.JWT_KEY,{expiresIn:900})
}
export const genrateRefreshtoken = (userId)=>{
   return jwt.sign({id:userId},process.env.JWT_REFKEY,{expiresIn:7*24*60*60*1000})
}
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};