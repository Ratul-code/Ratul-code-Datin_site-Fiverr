import React from 'react'
import Image from "next/image";
import {FaFemale} from "react-icons/fa";
import {BsFillSuitHeartFill} from "react-icons/bs";
import {HiChatAlt} from "react-icons/hi";
import {FaUserFriends} from "react-icons/fa";
import Button from"../Button";
import procard from "./ProfileCard.module.css";
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsOpen } from '../../redux/slices/modalSlice';

interface ProfileCardProps{
    src?:string,
    username:string,
    age:number,
    address:string
    seeking:string,
    active:string,
}
const ProfileCard = ({src="/assets/blankcard.png",username,age,address,seeking,active}:ProfileCardProps) => {
    const router = useRouter();
    const {user} = useAppSelector(state=>state);
    const dispatch = useAppDispatch()
    const handleViewProfile = ()=>{
        if(!user.plan){
            dispatch(setIsOpen(true));
        }else{
            router.push("user/2")
        }
    }
  return (
    <div  className='relative transition-all ease-in-out duration-200 w-full max-w-[600px] sm:w-full h-auto border-[2px] border-solid border-[#684007] rounded-2xl overflow-hidden shadow-2xl shadow-[#0000006b] flex flex-col justify-start pb-6 gap-4 '>
        <div  className={`${procard.procard_image} relative flex justify-center w-full h-[280px] items-center bg-[#00000036]`}>

            <Image src={src} layout={"fill"} objectPosition="top" objectFit={"cover"} />
             
        </div>
        <div className='px-4'>
        <div className='flex gap-1 items-center'>
            <h1 onClick={()=>{router.push("/user/2")}} className='text-xl cursor-pointer font-sans hover:underline font-bold tracking-wider text-[#684007]'>{username}</h1>
            <FaFemale size={26} color='#684007'/>
        </div>
        <div className=''>
            <p className='text-[#00000093] font-semibold text-lg'>{age}<span>,{" "}</span><span>{address}</span> </p>
        </div>
        <div className='my-2 text-[18px]'>
            <p className='text-[#000000dc] font-[500] my-1 tracking-wide'>Seeking: {seeking}</p>
            <p className='text-[#000000ab] text-sm mt-[-4px] '>{active}</p>
        </div>
        </div>
        <div className='flex justify-around flex-wrap justify-self-end items-center gap-2 px-2'>
            <BsFillSuitHeartFill  className='text-[34px] hover:scale-110 text-[#000000ab] hover:text-female cursor-pointer' />
            <HiChatAlt  className='text-[34px] hover:scale-110 text-[#000000ab] hover:text-blue-500 cursor-pointer' />
            <FaUserFriends className='text-[34px] hover:scale-110 text-[#000000ab] hover:text-red-900 cursor-pointer' />
            <Button onClick={()=>handleViewProfile()}  bg='#684007' size='sm' >View Profile</Button>
        </div>
    </div>
  )
}

export default ProfileCard