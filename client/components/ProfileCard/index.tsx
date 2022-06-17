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
    <div  className='relative transition-all ease-in-out duration-200 max-w-[500px] sm:w-full h-auto border-[1px] border-solid border-gray-300 hover:border-female rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-start pb-6 gap-4'>
        <div  className={`${procard.procard_image} relative flex justify-center w-full h-[400px] items-center bg-[#00000036]`}>

            <Image src={src} layout={"fill"} objectPosition="top center" objectFit={"cover"} />
            {/* <div className='absolute bottom-1 left-3 z-[1000]'> 
                <h1 className='text-white  text-[28px] capitalize font-sans font-bold m-0 p-0' >{username} ,</h1>
                <h1 className='text-white  text-[28px] capitalize font-sans font-bold mt-[-12px] p-0' >{age}</h1>
             </div> */}
             
        </div>
        <div className='px-4'>
        <div className='flex gap-1 items-center'>
            <h1 className='text-xl font-sans font-bold tracking-wider text-female'>{username}</h1>
            <FaFemale size={26} color='#e72a53e3'/>
        </div>
        <div className='my-2'>
            <p className='text-[#000000ab] font-semibold text-lg'>{age}<span>,{" "}</span><span>{address}</span> </p>
        </div>
        <div className='my-3 text-[18px]'>
            <p className='text-secondary my-1 tracking-wide'>Seeking: {seeking}</p>
            <p className='text-[#000000ab] text-sm mt-[-4px] '>{active}</p>
        </div>
        </div>
        <div className='flex justify-around justify-self-end items-center gap-3 px-2'>
            <BsFillSuitHeartFill  className='text-[34px] hover:scale-110 text-[#000000ab] hover:text-female cursor-pointer' />
            <HiChatAlt  className='text-[34px] hover:scale-110 text-[#000000ab] hover:text-female cursor-pointer' />
            <FaUserFriends className='text-[34px] hover:scale-110 text-[#000000ab] hover:text-female cursor-pointer' />
            <Button onClick={()=>handleViewProfile()}  bg='#e72a53e3' size='sm' >View Profile</Button>
        </div>
    </div>
  )
}

export default ProfileCard