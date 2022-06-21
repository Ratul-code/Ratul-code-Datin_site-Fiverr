import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
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
  const[profiles,setProfiles] = useState<any[]>([]);
  const fetchProfiles = async ()=>{
    const {data} = await instance.get(`/user/getProfiles`,{
      headers:{
          Authorization:user.token,
      }
  });
  setProfiles(data);
  }
  useEffect(()=>{
    dispatch(fetchUserPlan(user.token));
    fetchProfiles();
  },[])
  if(!user.token){
    router.replace("/login");
    return 
  }
  return (
    <MainLayout>
      {/* <FilterPaper/> */}
      <FeedBody profiles={profiles} />
    </MainLayout>
  )
}

export default Feed