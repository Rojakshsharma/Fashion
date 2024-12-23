import React, { useContext, useEffect,useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'
import { ShopContext } from '../context/ShopContext'
function BestSeller() {
    const {products}=useContext(ShopContext)
    const [bestSeller,setBestSeller]=useState([])
    
    useEffect(()=>{
        const bestProduct=products.filter((item)=>(item.bestseller))
        setBestSeller(bestProduct.slice(0,5))
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLER'}></Title>

                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque nam ex reprehenderit iure non unde? Quos ex voluptatibus quis assumenda sit iusto dolorem nobis corrupti quibusdam? Possimus inventore perspiciatis nobis.</p>

            </div>

            {/* products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item,index)=>(
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}></ProductItem>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default BestSeller