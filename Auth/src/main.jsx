
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './Appcontext.jsx'
import {ToastContainer} from 'react-toastify'




createRoot(document.getElementById('root')).render(


   <AppContextProvider>
    <ToastContainer/>
    <BrowserRouter>
<App />
</BrowserRouter>
</AppContextProvider>


    

)
