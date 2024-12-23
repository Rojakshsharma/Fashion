import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
function PlaceOrder() {
  const {navigate,backend_url,token,cartItem,setCartItem,getCartAmount,deleivery_fee,products}=useContext(ShopContext)
  const [method,setMethod]=useState('cod')
  const [formData,setFormData]=useState({
    firstname:'',
    lastname:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChnageHnalder = (event)=>{
    const name = event.target.name
    const value=event.target.value

    setFormData(data=>({...data,[name]:value}))
  }

  const onSubmitHanlder = async(event)=>{
    event.preventDefault()
    try {
      let orderItem=[]
      for(const items in cartItem){
        for(const item in cartItem[items]){
          if(cartItem[items][item]>0){
            const itemInfo = structuredClone(products.find(product=>product._id===items))
            if(itemInfo){
              itemInfo.size=item
              itemInfo.quantity=cartItem[items][item]
              orderItem.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address:formData,
        items:orderItem,
        amount:getCartAmount()+deleivery_fee
      }

      switch(method){
        // api calls for cash on delivery orders
        case 'cod':
          const response = await axios.post(backend_url+'api/order/place',orderData,{headers:{token}})
          if(response.data.success){
            setCartItem({})
            navigate('/orders')
          }else{
            console.log(response)
            toast.error(response.data.message)
          }
        break

        case 'stripe':
          const responseStripe=await axios.post(backend_url+'api/order/stripe',orderData,{headers:{token}})
          if (responseStripe.data.success) {
            document.cookie = `token=${token}; path=/; secure; samesite=strict`
            const {session_url} = responseStripe.data
            window.location.replace(session_url)            
          }
          else{
            toast.error(responseStripe.data.message)
          }
        break

        default:
          break
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  
  return (
    <form onSubmit={onSubmitHanlder} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={"INFORMATION"}></Title>
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChnageHnalder} name='firstname'  value={formData.firstname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input required onChange={onChnageHnalder} name='lastname'  value={formData.lastname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>

        <input required onChange={onChnageHnalder} name='email'  value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
        <input required onChange={onChnageHnalder} name='street'  value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />

        <div className='flex gap-3'>
          <input required onChange={onChnageHnalder} name='city'  value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onChnageHnalder} name='state'  value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChnageHnalder} name='zipcode'  value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
          <input required onChange={onChnageHnalder} name='country'  value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Countery' />
        </div>

        <input required onChange={onChnageHnalder} name='phone'  value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='text' />
      </div>

      {/* right side */}

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal></CartTotal>
        </div>

        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"}></Title>

          {/* payment methods */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick= {()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe'?'bg-green-300':''}`}> </p>
                <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>

            <div onClick= {()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-green-300':''}`}> </p>
                <p className='text-gray-500 text-sm  font-medium mx-4'>CASH ON DELIVERY</p>

            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder