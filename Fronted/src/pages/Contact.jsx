import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/frontend_assets/assets'
import NewsLetter from '../components/NewsLetter'
function Contact() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
      <Title text1={'CONTACT'} text2={'US'}></Title>
    </div>

    <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
      <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />

      <div className='flex flex-col justify-center items-center gap-6'>
        <p className='font-semibold text-xl text-gray-600'>Our Store</p>
        <p className='text-gray-500'> 244k Garden colony, <br/>Chandigarh 1411001,India</p>
        <p className='text-gray-500'>Tel : {91} 555-789-7065<br/> Email : fashion@gamil.com</p>
        <p className='font-semibold text-xl text-gray-600'>Careers at Fashion</p>
        <p className='text-gray-500'>Learn more about teams and job openings </p>
        <button className='border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
      </div>
    </div>

    <NewsLetter></NewsLetter>
    </div>
  )
}

export default Contact