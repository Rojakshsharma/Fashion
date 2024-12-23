import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { NavLink } from 'react-router-dom'
function Footer() {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} alt="" className='mb-5 w-32' />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, consequuntur harum! Veritatis similique veniam iure velit. Cum, beatae delectus blanditiis, fugiat assumenda consequatur facere fuga, voluptas ducimus temporibus earum! Omnis.

                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <NavLink to="/">HOME</NavLink>
                    <NavLink to="/collection">COLLECTION</NavLink>
                    <NavLink to="/about">ABOUT</NavLink>
                    <NavLink to="/contact">CONTACT</NavLink>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1-212-456-7890</li>
                    <li>contact@fashion.com</li>
                </ul>
            </div>
        </div>

        <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024@ fashion.com - All Rights Reserved</p>
            </div>
        </div>
   
  )
}

export default Footer