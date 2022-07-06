import React, { useEffect, useState } from 'react'
import {BsFillSuitHeartFill} from "react-icons/bs"
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Button from "../Button";
import { useRouter } from 'next/router';
import { setIsOpen } from '../../redux/slices/modalSlice';
import instance from '../../utils/axios';
import { profile } from 'console';

type Props = {}

const LikedUserModal = (props: Props) => {
    const {user,profile:{profile}} = useAppSelector(state=>state);
    const [likedUser, setLikedUser] = useState<any>();
    const dispatch = useAppDispatch();

    const fetchLikedUser = async()=>{
        await instance
          .get("/profile/getLikedUser", {
            headers: {
              Authorization: user.token,
            },
          })
          .then((res) => {
            setLikedUser(res.data);
            console.log(res.data)
          });
    }
    useEffect(()=>{
        fetchLikedUser();
    },[])
    console.log(likedUser)
  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-4'>
    <div className='flex gap-3 ml-[-18px] items-center'>
        <BsFillSuitHeartFill className='text-female mt-1' size={40} />
        <h2 className='text-2xl font-semibold' >Liked By <span className='text-female'>{profile.likes.length}</span> People</h2>
    </div>
    <div className='py-3 w-[600px] space-y-3'>
        {likedUser?.map((user:any,index:number)=>(
            <SingleLikedUser key={index} likedUser={user.givenBy} />
        ))}
        {/* {likedUser?.map((user:any,index:number)=>(
            <SingleLikedUser key={index} likedUser={user.givenBy} />
        ))} */}
    </div>
</div>
  )
}

export default LikedUserModal


const SingleLikedUser = ({likedUser}:any)=>{
    const router = useRouter();
    const [imgUrl,setImgUrl] = useState<string>("")
    const {user} = useAppSelector(state=>state);
    const dispatch = useAppDispatch();
    const fetchImgUrl = async()=>{
        await instance.get(`/profile/getProfileImage/${likedUser._id}`,{
            headers:{
                Authorization:user.token
            }
        }).then(res=>setImgUrl(res.data))
    }
    useEffect(()=>{
        fetchImgUrl();
    },[])
    return(
        <div className='w-full flex py-1 justify-between items-center px-4 cursor-pointer hover:bg-[#00000073] bg-[#0000003d] transition-all duration-200 ease-in-out rounded-md min-h-[50px]'>
        <div className='w-[70px] h-[70px] p-1 bg-[#fff] rounded-full overflow-hidden'>
            {imgUrl&&<img className='w-full h-full rounded-full object-cover object-center' src={`https://ave-dating-site.herokuapp.com/images/${imgUrl}`} alt="profileImage" />}
        </div>
        {likedUser&&<h1 className="text-black text-lg font-semibold">{likedUser.firstname} {likedUser.lastname}</h1>}
        <Button onClick={()=>{
            dispatch(setIsOpen(false))
            router.push(`/user/${likedUser._id}`)
        }} size='sm' bg='#3f1910f3' color='#fff' >View Profile</Button>
    </div>
    )
}