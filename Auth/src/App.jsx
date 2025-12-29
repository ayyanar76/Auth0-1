import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Forget from './Pages/Forget.jsx'


const App = () => {

  return (
 <>
  
 <Routes>

  <Route path='/' element={<Home/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/forgetpassword' element={<Forget/>}/>
 </Routes>
 </>
  )
}

export default App