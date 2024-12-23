import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import {toast} from 'react-toastify'

function Login({setToken}) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e)=>{
        try {
           e.preventDefault()
    
           const response = await axios.post(backendUrl+'/api/user/admin',{email,password})
           if(response.data.success){
            setToken(response.data.token)
           }
           else{
            toast.error(response.data.message)
           }
        } catch (error) {
            console.log(error)
            toast.error(error.message)  
        }
    }
  return (

    <div className='min-h-screen flex items-center justify-center w-full'>
    <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-32'>
                <p className='text-sm font-medium mb-2 text-gray-700'>Email Address</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required/>
            </div>

            <div className='mb-3 min-w-32'>
                <p className='text-sm font-medium mb-2 text-gray-700'>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded w-full px-3 py-2 border border-gray-300 outline-none'  type="password" placeholder='Enter your Passwrd' required/>
            </div>

            <button type="submit" className=' w-full mt-2 py-2 px-4 rounded-md text-white bg-black'>
                Login
            </button>
        </form>
    </div>
    </div>
  )
}

export default Login