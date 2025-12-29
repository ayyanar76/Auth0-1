import  { useContext, useEffect, useRef, useState } from 'react'
import { Appcontext } from '../Appcontext';
import {  useNavigate } from 'react-router-dom'

import axios from 'axios';
import { toast } from 'react-toastify';


const Forget = () => {



    const {backendUrl} = useContext(Appcontext)
     const [email,setemail] = useState()
     const [otp,setOtp] = useState()
     const [password,setpassword] = useState()
     const [step,setStep] = useState(0)
     
     const navigate = useNavigate()
 
     
   const inputRefs = useRef([]);
   useEffect(() => {
  inputRefs.current[0]?.focus();
}, []);
   
  const handleChange = (e, index) => {
    const value = e.target.value;

    // allow only numbers
    if (!/^[0-9]?$/.test(value)) return;

    // move to next input
 
  };

  const handleKeyDown = (e, index) => {
    // move back on backspace
       if (e.key === "Enter" ||index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const getOtp = () => {
    return setOtp(inputRefs.current.map((input) => input.value).join(""))
    
 
  };
     
     const forget = async(e)=>{
        e.preventDefault()
        try {
             await axios.post(`${backendUrl}/reset-otp`,{email},{withCredentials:true})
             toast.success("Otp sent Your email")
             setStep(p=>p+1)
        } catch (error) {
            toast.error(error.message);   
        }
     }
     const verifyOtp = async(e)=>{
        e.preventDefault()
        try {
             await axios.post(`${backendUrl}/verify-otp`,{email,otp,password},{withCredentials:true})
              toast.success("Password Changed")
             navigate('/login')
            
        } catch (error) {
             toast.error(error.message);  
        }
     }
 
     

  return (
    <div className="w-full h-screen flex justify-center items-center">
        
        {
            step == 0 &&  <>
             <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
            <h1 className='w-full text-center'>EMAIL</h1>
          <input id="email" className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="email" placeholder="Enter your email" required  onChange={(e)=>{setemail(e.target.value)}} value={email}/>
           <button   className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white" onClick={forget}>Submit</button>
           </div>
            </>
        }
        {
          step == 1 && <>
                      <div className="flex flex-col items-center md:max-w-[423px] w-[380px] bg-white rounded-2xl shadow-lg p-6 sm:p-10">
                <p className="text-2xl font-semibold text-gray-900">Email Verify OTP</p>
                <p className="mt-2 text-sm text-gray-900/90 text-center">Enter the 6-digit code sent to your email ID.</p>
        
               
                  <div className="flex gap-2 justify-center">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            className="mt-8 w-full max-w-80 h-11 rounded-xl text-center outline-none text-gray-900 text-sm bg-indigo-100 hover:opacity-90 transition-opacity"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>       
         <button type="button" className="mt-8 w-full max-w-80 h-11 rounded-full text-white text-sm bg-indigo-500 hover:opacity-90 transition-opacity" onClick={() =>{getOtp();setStep(p=>p+1)}}>
                    Verify Otp
                </button>
            </div>

            </>
        }
        {
            step == 2 &&  <>
             <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
            <h1 className='w-full text-center'>New Password</h1>
          <input id="pass" className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="email" placeholder="Enter your New password" required  onChange={(e)=>{setpassword(e.target.value)}} value={password}/>
           <button   className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white" onClick={verifyOtp}>Submit</button>
           </div>
            </> 
        }
        </div>

  )
}

export default Forget