import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Profile from '../../components/Profile';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProfile } from '../../redux/slices/profileSlice';
import { fetchUserPlan } from '../../redux/slices/userSlice';

const User = () => {
    const router = useRouter();
    const {user,profile} = useAppSelector(state=>state);
    const dispatch = useAppDispatch();
    const {id} = router.query;
    const [renderCount,setRenderCount] = useState(0);
  console.log({id,path:router.pathname})
    useEffect(()=>{
        dispatch(fetchUserPlan(user.token));

        dispatch(fetchProfile({token:user.token,userId:id}))
    },[id]);
    if(!user.token){
      router.replace("/login");
      return <></>
    }
  return (
    <>

        {profile.profilesStatus!=="LOADING"?<Profile/>: <div className='w-screen py-10'><h1 className='text-3xl text-center text-black font-bold'>Loading...</h1></div>  }

    </>
  )
}

export default User