import React from 'react'
interface ProfileCardProps{
    src?:string,
    username:string,
    age:number,
    address:string
    seeking:string,
    active:string,
}
import Image from "next/image";
import {FaFemale} from "react-icons/fa";
import {BsFillSuitHeartFill} from "react-icons/bs";
import {HiChatAlt} from "react-icons/hi";
import {FaUserFriends} from "react-icons/fa";
import Button from"../Button";
import { useRouter } from 'next/router';
const ProfileCard = ({src="/assets/blankcard.png",username,age,address,seeking,active}:ProfileCardProps) => {
    const router = useRouter();
  return (
    <div className=' hover:scale-95 transition-all ease-in-out duration-200 w-[250px] h-[400px] bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col gap-2'>
        <div className='flex justify-center items-center bg-[#00000036]'>
            <Image src={src} width={250} height={200} objectPosition="top center" objectFit={"cover"} />
        </div>
        <div className='px-4'>
        <div className='flex gap-1 items-center'>
            <h1 className='text-lg font-semibold text-female'>{username}</h1>
            <FaFemale size={26} color='#e72a53e3'/>
        </div>
        <div>
            <p className='text-[#000000ab]'>{age}<span>,{" "}</span><span>{address}</span> </p>
        </div>
        <div className='mt-1'>
            <p className='text-secondary'>Seeking: {seeking}</p>
            <p className='text-[#000000ab] text-sm mt-[-4px] '>{active}</p>
        </div>
        </div>
        <div className='flex justify-around items-center gap-3 px-4 mt-2'>
            <BsFillSuitHeartFill  className='text-2xl hover:scale-110 text-[#000000ab] hover:text-female cursor-pointer' />
            <HiChatAlt  className='text-2xl hover:scale-110 text-[#000000ab] hover:text-female cursor-pointer' />
            <FaUserFriends className='text-2xl hover:scale-110 text-[#000000ab] hover:text-female cursor-pointer' />
            <Button onClick={()=>router.push("profile/2")}  bg='#e72a53e3' size='sm' >View Profile</Button>
        </div>
    </div>
  )
}

export default ProfileCard