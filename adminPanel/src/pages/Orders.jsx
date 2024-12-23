import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {backendUrl} from '../App'
import {toast} from 'react-toastify'
import { assets } from '../assets/admin_assets/assets'
function Orders({token,currency}) {
  const [orders,setOrders] = useState([])
  const fetchAllOrders = async()=>{
    if(!token){
      return null
    }

    try {
      const response = await axios.post(backendUrl+'/api/order/list',{},{headers:{token}})
      if (response.data.success) {
        setOrders(response.data.orders)
      } else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHnalder = async(event,orderId)=>{
    try {
      const response = await axios.post(backendUrl+'/api/order/status',{orderId,status:event.target.value},{headers:{token}})
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[token])

  // useEffect(()=>{
  //   console.log(orders)
  // },[orders])

  return (
    <div>
      <h3>Order page</h3>
      <div>{
        orders.map((order,index)=>(
        
            <div className='grid grid-cols-1sm: grid-cols-[0.5fr_2fr_2fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-2 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
            <img className='w-12' src={assets.parcel_icon} alt="" />
            <div>
            <div>
              {order.items.map((item,index)=>{
                if(index===order.items.length-1){
                  return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span> {item.size}</span></p>
                }

                else{
                  return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span> {item.size}</span> , </p>
                }
              })}
            </div>

            <p className='mt-3 mb-2 font-medium'>{order.address.firstname} {order.address.lastname}</p>
            <div>
              <p>{order.address.street + ","}</p>
              <p>{order.address.city + ", " + order.address.state + ', ' + order.address.country + ', ' + order.address.zipcode}</p>
              <p>{order.address.phone}</p>
            </div>
          </div>

          <div>
            <p className='text-sm sm:text-15px'>Item : {order.items.length}</p>
            <p className='mt-3'>Method : {order.paymentmethod}</p>
            <p>Payment : {order.payment?'Done':'Pending'}</p>
            <p>Date : {new Date(order.date).toLocaleDateString()}</p>
          </div>

          <p className='text-sm sm:text-[15px]'>${order.amount}</p>
          <select onChange={(event)=>statusHnalder(event,order._id)} value={order.status} className='p-2 font-semibold'>
            <option value="Order placed">Order placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
           </div>
          
        ))}
        </div>
    </div>
  )
}

export default Orders