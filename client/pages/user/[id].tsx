import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Profile from '../../components/Profile';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProfile } from '../../redux/slices/profileSlice';
import { fetchUserPlan } from '../../redux/slices/userSlice';

const User = () => {
    const router = useRouter();
    const {user,profile} = useAppSelector(state=>state);
    const {id} = router.query;
    const dispatch = useAppDispatch();
    useEffect(()=>{
      if(profile.profileStatus==="IDLE"){
        dispatch(fetchUserPlan(user.token));
        dispatch(fetchProfile({token:user.token,userId:id}))
      }
    },[id]);
    if(!user.token){
      router.replace("/login");
      return <></>
    }
  return (
    <>
        {profile.profileStatus==="LOADING"?<h1>Loading</h1> :

        <Profile/>

        }
    </>
  )
}

export default User