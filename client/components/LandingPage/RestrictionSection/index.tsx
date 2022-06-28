import Image from 'next/image';
import React from 'react'
import mobileimg from "../../assets/mobile.png";
const index = () => {
  return (
    <div className='flex justify-center w-full max-w-[1250px] mx-auto gap-8 xl:gap-36 xl:justify-between flex-wrap items-center'>
        <div className='max-w-[562px] flex flex-col justify-between gap-7 flex-grow'>
            <div className='flex flex-col gap-5'>
                <h1 className='text-[26px] font-semibold'>CONNECT WITH QUALITY SINGLES NOW!</h1>
                <div className='w-[50%] h-[4px] bg-secondary rounded-[2px]'></div>
            </div>
            <div>
                <p className='text-[24px] text-[#1b1b1b] opacity-90 tracking-wide mt-6'>Searching for a sugar daddy or any other inappropriate relationships is strictly prohibited on <span className="font-semibold uppercase">Affluent Meets Elegant</span>.</p>
                <p className='text-[24px] text-[#1b1b1b] opacity-90 tracking-wide mt-6'>Affluent Meets Elegant is one of the first dating sites for high-quality singles. If you have high expectations, <span className="font-semibold uppercase">Affluent Meets Elegant</span> is the best place for you.</p>
            </div>
        </div>
        <div className='relative'>
            <Image src={"/assets/mobile.png"} alt="no sugar daddies" width={365} objectPosition="right" height={645} objectFit="contain" />
        </div>
    </div>
  )
}

export default index