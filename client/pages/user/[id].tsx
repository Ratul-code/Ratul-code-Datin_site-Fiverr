import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Profile from '../../components/Profile';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUserPlan } from '../../redux/slices/userSlice';

const User = () => {
    const router = useRouter();
    const {user} = useAppSelector(state=>state);
    const {id} = router.query;
    const dispatch = useAppDispatch();
    useEffect(()=>{
      dispatch(fetchUserPlan(user.token));
    },[])
    if(!user.token){
      router.replace("/login");
      return <></>
    }
  return (
    <>
        <Profile/>
    </>
  )
}

export default User