
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import {LogOut} from 'lucide-react'

import { useContext, useEffect } from 'react'
import { Appcontext } from '../Appcontext.jsx';
import axios from 'axios';

const Hero = () => {
    const {backendUrl,  userdata} = useContext(Appcontext)
     const navigate = useNavigate()

   const logout = async(e)=>{
    e.preventDefault()
    try {
        await axios.post(`${backendUrl}/logout`,{},{withCredentials:true})
        navigate('/login')
        
    } catch (error) {
        console.log(error.message);
        
    }
   }

  return (
   <>
 
   <div className="h-full w-full">

<section class="flex flex-col items-center text-sm bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] bg-cover bg-center bg-no-repeat">
   
    <nav class="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur text-slate-800 text-sm">
        <a >
           <h1 className='text-4xl font-bold text-indigo-700'>AUTH</h1>
        </a>

       <div class=" md:block space-x-3">
           {
            userdata ? <div className='group relative  '>
            <button class="flex   justify-center items-center bg-indigo-600 text-white w-6 cursor-pointer aspect-square  rounded-full">
            {userdata.name[0]}
            </button>
            <div className=" hidden  group-hover:flex ">
                <button className=' py-2 absolute cursor-pointer w-4 text-center'><LogOut onClick={logout} className='text-center'/></button>
            </div>
            </div>:<button onClick={()=>navigate("/login")} class="hover:bg-slate-100 transition px-6 py-2 border border-indigo-600 rounded-md">
                Login
            </button>
            
           }
           
            
        </div>
      
    </nav>
   
    

    <main class="flex flex-col items-center gap-6 justify-center md:mt-20 mt-10 max-md:px-2">
       

           <h1 className='text-xl font-bold'>Hey {userdata? userdata.name : "Devolper"}🖐️</h1>

        <h1 class="text-center text-5xl leading-[68px] md:text-6xl md:leading-[80px] font-semibold max-w-4xl text-slate-900">
            The fastest way to go from idea to impact.
        </h1>
        <p class="text-center text-base text-slate-700 max-w-lg mt-2">
            Our platform helps you build, test, and deliver faster — so you can focus on what matters.
        </p>
        <div class="flex items-center gap-4 mt-8">
          {
            userdata  ?
            <>
            <button class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 rounded-lg px-7 h-11">
                Get started
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button class="border border-slate-600 active:scale-95 hover:bg-white/10 transition text-slate-600 rounded-lg px-8 h-11">
                Pricing
            </button>
            </> :
            <>
            <div onClick={()=>navigate('/login')} className="flex cursor-pointer items-center space-x-2.5 border border-gray-200 rounded-full bg-gray-100/50 p-1 text-sm text-gray-800">
            <div className="bg-white border border-gray-200 rounded-2xl px-3 py-1">
                <p>Version 7.8</p>
            </div>
            <p className="pr-3">Login to continue</p>
        </div>
             
            </>   
          }
        </div>
        
       
    </main>
</section>
   </div>
   </>
  )
}

export default Hero