import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function Hero() {
  const images = [
    assets.imageB2,
    assets.imageB3,
    assets.imageB4,
    assets.imageB1,
  ]
  const [image,setImages] = useState(0)

  const onClickHanlderLeft = ()=>{
    const size = images.length
    if(image === size-1){
      setImages(0)
    }else{
      setImages(prev=>prev+1)
    }
  }

  const onClickHanlderRight= ()=>{
    const size = images.length
    if(image === 0){
      setImages(size-1)
    }else{
      setImages(prev=>prev-1)
    }
  }
  return (
    <div className="relative border border-gray-400 group ">

      <div className="hidden group-hover:block w-full text-[white] absolute top-[45%] md:top-[50%]">
        <div className="flex justify-between">
          < IoIosArrowBack onClick={onClickHanlderLeft} className="text-[20px] md:text-[40px] cursor-pointer" />
          <IoIosArrowForward onClick={onClickHanlderRight}  className="text-[20px] md:text-[40px] cursor-pointer" />
        </div>
      </div>

      {/* hero left side */}
      <div className=" absolute bottom-1 right-8 sm:bottom-10   py-10 sm:py-0">
        <div className=" flex flex-col justify-end items-end text-[white] ">
          <div className="flex items-center justify-center gap-2 ">
            <p className="w-8 md:w-11 h-[2px] bg-[white]"></p>
            <p className="text-sm">OUR BESTSELLER</p>
          </div>

          <h1 className="prata-regular text-1xl sm:py-3 sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed">
            OUR BESTSELLER
          </h1>

          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[white]"></p>
          </div>
        </div>
      </div>
      <img className="transition-opacity duration-700 w-[100%] md:h-[90vh]" src={images[image]} alt="" />
      
    </div>
  );
}

export default Hero;
