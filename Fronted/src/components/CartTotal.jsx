import React from 'react'
import { ShopContext } from '../context/ShopContext'
import { useContext } from 'react'
import Title from './Title'

function CartTotal() {
    const {currency,deleivery_fee,getCartAmount}=useContext(ShopContext)
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={"CART"} text2={"TOTAL"}></Title>
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency}{getCartAmount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping</p>
                <p>{currency}{getCartAmount()===0?0:deleivery_fee}</p>
            </div>
            <hr />

            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency}{getCartAmount()===0?0:getCartAmount()+deleivery_fee}</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal