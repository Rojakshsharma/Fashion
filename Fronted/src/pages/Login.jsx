import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
function Login() {
  const [currentState,setCurrentState]=useState('Login')
  const {token,setToken,navigate,backend_url} = useContext(ShopContext)
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  
  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    try {
      if(currentState==='Sign up'){
        const response = await axios.post(backend_url+'api/user/register',{name,email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }

        else{
          toast.error(response.data.message)
        }

      }
      else{
        const response = await axios.post(backend_url+'api/user/login',{email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }

        else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message) 
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  // useEffect(()=>{
  //   if(!token && localStorage.getItem('token')){
  //     setToken(localStorage.getItem('token'))
  //   }
  // })
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>

      </div>

      {currentState==='Login'?'':<input onChange={(e)=>setName(e.target.value)} type="text" placeholder='Name' className='w-full px-3 py-2 border border-gray-800'required />}
      <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Email' className='w-full px-3 py-2 border border-gray-800' required />
      <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password' className='w-full px-3 py-2 border border-gray-800' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
       {currentState==='Sign up'?'': <p className='cursor-pointer'>Forgot Your Password</p>}
        {
          currentState==='Login'?
          <p onClick={()=>setCurrentState('Sign up')} className='cursor-pointer'>Create account</p>
          :<p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login here</p>
        }
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState==='Login'?'Sign In':'Sign Up'}</button>
    </form>
  )
}

export default Login