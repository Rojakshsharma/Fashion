import React, { useContext, useState,useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

function RelatedProducts({category,subCategory}) {
    const {products}=useContext(ShopContext)
    const [related,setRelated]=useState([])
    useEffect(()=>{
        if(products.length>0){
            let productsCopy=products.slice()
            // console.log(productsCopy)
            productsCopy=productsCopy.filter((item)=>category===item.category)
            productsCopy=productsCopy.filter((item)=>subCategory===item.subCategory)
            setRelated(productsCopy.slice(0,5))

            
        }
    },[products,category,subCategory])
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={"RELATED"} text2={"PRODUCTS"}></Title>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {related.map((item,index)=>(
                <ProductItem  key={item._id} id={item._id} name={item.name} price={item.price} image={item.image}></ProductItem>

            ))}
        </div>
    </div>
  )
}

export default RelatedProducts