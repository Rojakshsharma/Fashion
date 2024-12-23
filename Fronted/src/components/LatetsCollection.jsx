import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
function LatetsCollection() {
    const {products}=useContext(ShopContext)
    const [latestProducts,setLatest]=useState([])

    useEffect(()=>{
        setLatest(products.slice(0,10))
    },[products])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}></Title>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Discover our newest arrivals, blending style and comfort for your wardrobe. From trendy tops and chic dresses to cozy loungewear and stylish accessories, each piece is crafted with high-quality materials for durability. Refresh your look for any occasion with the latest fashion trends and find your new favorites today!</p>
        </div>

        {/* rendering products */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((item,index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}></ProductItem>
                ))
            }
        </div>
    </div>
  )
}

export default LatetsCollection