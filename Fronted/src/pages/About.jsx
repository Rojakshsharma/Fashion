import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetter from '../components/NewsLetter'
function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}></Title>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>We are dedicated to providing high-quality clothing that empowers individuals to express their unique style. Our collection features a diverse range of timeless and trendy pieces, designed for every occasion. Committed to inclusivity and sustainability, we carefully source our materials to ensure a positive impact on both people and the planet. Join us in celebrating individuality and confidence through fashion!</p>
        <p>To inspire confidence through fashion while prioritizing ethical practices and sustainability. We carefully source our materials to ensure a positive impact on both people and the planet.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Our mission is to empower individuals through inclusive and sustainable fashion, providing high-quality clothing that celebrates personal style and promotes positive impact on the planet.</p>
        </div>
      </div>

      <div  className='text-xl py-4'>
          <Title text1={"WHY"} text2={"CHOOSE US"}></Title>
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 mdLpx-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance</b>
            <p className='text-gray-600'>We prioritize quality in every stitch, ensuring that our clothing not only looks great but also stands the test of time.</p>
          </div>

          <div className='border px-10 mdLpx-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience</b>
            <p className='text-gray-600'>We carefully source our materials to ensure a positive impact on both people and the planet.</p>
          </div>

          <div className='border px-10 mdLpx-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer  Service</b>
            <p className='text-gray-600'>We are committed to providing exceptional customer service, ensuring that your shopping experience is smooth, enjoyable, and tailored to your needs.</p>
          </div>
        </div>

        <NewsLetter></NewsLetter>
    </div>
  )
}

export default About