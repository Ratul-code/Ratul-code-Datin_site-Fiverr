import React, { useEffect, useState } from 'react'
import Image from "next/image";
import {FaFemale,FaMale} from "react-icons/fa";
import {BsFillSuitHeartFill} from "react-icons/bs";
import {HiChatAlt} from "react-icons/hi";
import {FaUserFriends} from "react-icons/fa";
import Button from"../Button";
import procard from "./ProfileCard.module.css";
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsOpen } from '../../redux/slices/modalSlice';
import instance from '../../utils/axios';

interface ProfileCardProps{
    profile:any
}
const ProfileCard = ({profile}:ProfileCardProps) => {
    const {firstname,lastname,gender,age,bio,interests:{seeking,minAge,maxAge}} = profile
    const router = useRouter();
    const [liked,setLiked] = useState<boolean>(false);
    const [checklikedStatus,setChecklikedStatus] = useState<string>("IDLE");
    const {user} = useAppSelector(state=>state);
    const dispatch = useAppDispatch()
    const handleLike = async()=>{

        if(!user.plan){
            dispatch(setIsOpen(true))
        }else{
            setLiked(state=>!state);
            await instance.get(`/profile/likeprofile/${profile.profileUser}`,{
                headers:{
                    Authorization:user.token
                }
            }).then((res)=>{
            }).catch(err=>setLiked(state=>!state))
        }
    }
    const handleViewProfile = ()=>{
        router.push(`user/${profile.profileUser}`)  
    }

    const checkLike = async ()=>{
        await instance.get(`/profile/checkLike/${profile.profileUser}`,{
            headers:{
                Authorization:user.token
            }
        }).then(res=>{
            setLiked(res.data.liked)
            setChecklikedStatus("SUCCESS");
        })
    }
    useEffect(()=>{
        if(checklikedStatus==="IDLE") {checkLike();}
    },[])
  return (
    <div  className='relative transition-all ease-in-out duration-200 w-full max-w-[600px] sm:w-full h-auto border-[0px] border-solid border-[#684007] rounded-2xl overflow-hidden shadow-2xl shadow-[#0000006b] flex flex-col justify-start pb-6 gap-4 '>
        <div  className={`${procard.procard_image} relative flex justify-center w-full h-[280px] items-center bg-[#00000036]`}>

            <img src={profile?.profileImage?.name?`https://ave-dating-site.herokuapp.com/images/${profile.profileImage.name}`:undefined || "/assets/blankcard.png"} alt="sss" className='w-full h-full object-cover object-top' />
             
        </div>
        <div className='px-4'>
        <div onClick={()=>{handleViewProfile()}} className='transition-all duration-200 ease-in-out hover:scale-[1.001] cursor-pointer flex py-1 gap-4 items-center justify-between my-2 shadow-xl px-2 ml-[-0.5rem] rounded-fsull'>
            <h1  className='text-2xl mb-2 capitalize cursor-pointer font-serif hover:underline font-bold tracking-wider text-black'>{firstname}{" "}{lastname}</h1>
            {gender==="Male"?<FaMale className='cursor-pointer' size={38} color='#2a4bb9fb'/>:<FaFemale className='cursor-pointer' size={38} color='#ec0d45f9'/>}
        </div>
        <div className='flex items-center mt-2 h-[83px]'>
            <p className='text-black font-bold text-xl'>{age}{" . "}<span className='text-lg ml-1 text-[#000000b7]' >{bio}</span> </p>
        </div>
        <div className='my-2 text-[18px]'>
            <p className='text-[#000000ea] font-semibold my-1 tracking-wide'>Seeking: {seeking}: {minAge} - {maxAge}</p>
            <p className='text-[#000000c7] text-sm font-semibold mt-[-4px] '>{"4 hours ago"}</p>
        </div>
        </div>
        <div className='flex justify-around flex-wrap justify-self-end items-center gap-2 px-2'>
            <BsFillSuitHeartFill onClick={handleLike}  className={`text-[34px] hover:scale-110 ${liked?"text-female":"text-[#000000ab]"} hover:text-female cursor-pointer`} />
            <HiChatAlt  className='text-[34px] hover:scale-110 text-[#000000ab] hover:text-blue-700 cursor-pointer' />
            <FaUserFriends className='text-[34px] hover:scale-110 text-[#000000ab] hover:text-red-900 cursor-pointer' />
            <Button onClick={()=>handleViewProfile()}  bg='#000' size='sm' >View Profile</Button>
        </div>
    </div>
  )
}

export default ProfileCard