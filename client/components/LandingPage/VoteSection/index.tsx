import React from 'react'
import {HiOutlineUser} from "react-icons/hi";
import {BsChatLeftText} from "react-icons/bs";
import Button from  "../../Button";
import {AiOutlineStar} from "react-icons/ai";
import {MdOutlineVerifiedUser} from "react-icons/md";
import router from "next/router";
export const iconList = [
    {Icon:<HiOutlineUser color={"#1769aa"} size={60} />,text1:"5,262,900+",text2:"High-Quality Members"},
    {Icon:<BsChatLeftText color={"#1769aa"} size={60} />,text1:"2,033,000+",text2:"Monthly Conversations"},
    {Icon:<AiOutlineStar color={"#1769aa"} size={60} />,text1:"Exclusive",text2:"VIP Members"},
    {Icon:<MdOutlineVerifiedUser color={"#1769aa"} size={60}  />,text1:"Safe & Secure",text2:"Trusted Dating"},
]

const index = () => {
  return (
    <div className='flex flex-col gap-12 items-center justify-between'>
        <div className='text-center flex flex-col gap-1'>
            {/* <h1 className='text-[#1b1b1b] font-semibold text-[28px] max-w-full tracking-wide'>Voted "Best of the Web" by Forbes.com.</h1> */}
            <h1 className='text-[#1b1b1b]  font-semibold text-[30px] max-w-full uppercase'>
            Find Your Real Love and move on and start something epic.
            </h1>
        </div>
        <div className='flex gap-8 p-3 w-full max-w-[1250px] justify-center flex-wrap'>
            {iconList.map((iconData,index)=>(
            <div key={index} className="flex flex-col justify-center items-center gap-4">
                {iconData.Icon}
                <div className='text-center'>
                <p className='font-semibold text-2xl tracking-wide' >{iconData.text1}</p>
                <p className='mt-2 text-xl text-[#1b1b1b]'>{iconData.text2}</p>
                </div>
            </div>
            ))}
        </div>
        <div className='w-full max-w-[400px]'>
        <Button onClick={()=>{router.push("/register")}} bg='#000' fullWidth size='lg'>Join Now</Button>
        </div>
    </div>
  )
}

export default index