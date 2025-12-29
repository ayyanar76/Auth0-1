import React, { useContext } from 'react'
import { useState } from 'react'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Appcontext } from '../Appcontext'


const Login = () => {
      const {backendUrl,isLoged,setIsLogged} = useContext(Appcontext)
    
      
    const [state,setstate] = useState("Sign up")
    const [name,setName] = useState()
    const [email,setemail] = useState()
    const [password,setpassword] = useState()
    const [load,setLoad] = useState(false)
    const navigate = useNavigate()
  
    
   const register = async(e)=>{
    e.preventDefault()
    try {
        setLoad(true)
          await axios.post(`${backendUrl}/register`,{
        name,email,password
     },{withCredentials:true})
    
        setLoad(false)
        setstate("sign in")

    } catch (error) {
        console.log(error.message);    
    }
   }
   const login = async(e)=>{
    e.preventDefault()
    try {
        setLoad(true)
      await axios.post(`${backendUrl}/login`,{
        email,password
      },{withCredentials:true})
      setLoad(false)
      setIsLogged(true)
      navigate("/")
        
    } catch (error) {
         console.log(error.message);    
    }
   }
   const googleLogin = async(e) => {
          e.preventDefault()
   try {
  
     window.location.href = "https://backend-auth-z8ke.onrender.com/api/auth/google";
   
    } catch (error) {
    console.log(error.message);
   }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
         <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
          {
            load ? <div className="flex flex-col gap-3 justify-center items-center"><p className='text-xl '>Please wait</p>
            <div className="w-3 h-8 border-3 border-blue-500  animate-spin rounded-full"></div>
            </div>  :<>
            
              {
                state === "Sign in" ?<h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Welcome back</h2>:<h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Welcome </h2>
            }
            <form >
                {
                    state === "Sign up" &&  <input id="Name" className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="Name" placeholder="Enter your Name" value={name} onChange={(e)=>{setName(e.target.value)}} required />
  
                }
                <input id="email" className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="email" placeholder="Enter your email" required  onChange={(e)=>{setemail(e.target.value)}} value={email}/>
                <input id="password" className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="password" placeholder="Enter your password" required value={password} onChange={(e)=>setpassword(e.target.value)} />
                {
                    state === "Sign in" ? <div className="text-right py-4">
                    <Link to={'/forgetpassword'} className="text-blue-600 underline" >Forgot Password</Link>
                </div>:<div className="text-right py-4">
                   
                </div>
                }
              {
                state ==="Sign up"?   <button  onClick={register} className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white">Sign up</button> :  <button className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full  text-white" onClick={login}>Sign in</button>
              }
            </form>
           {
            state === "Sign in" ?  <p className="text-center mt-4">Don’t have an account? <span onClick={()=>setstate("Sign up")} className="text-blue-500 underline">Signup</span></p>
 :<> <p className="text-center mt-4">Already have an account? <span onClick={()=>setstate("Sign in")} className="text-blue-500 underline">Sign in</span></p>
 </>
           }        
            <button type="button" className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800" onClick={googleLogin} >
                <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
                {state}  with Google
            </button></> 
          }
        </div>
    </div>
  )
}

export default Login
