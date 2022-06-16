import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import FeedBody from '../components/FeedBody'
import FilterPaper from '../components/FilterPaper'
import MainLayout from '../components/MainLayout'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { fetchUserPlan } from '../redux/slices/userSlice'
import instance from '../utils/axios'
const Feed = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state=>state);
  useEffect(()=>{
    dispatch(fetchUserPlan(user.token));
  },[])
  console.log(user.plan);
  if(!user.token){
    router.replace("/login");
    return 
  }
  return (
    <MainLayout>
      <FilterPaper/>
      <FeedBody/>
    </MainLayout>
  )
}

export default Feed