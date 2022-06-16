import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import FeedBody from '../components/FeedBody'
import FilterPaper from '../components/FilterPaper'
import MainLayout from '../components/MainLayout'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
const Feed = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state=>state);
  useEffect(()=>{
    const fetchUser = async()=>{
      console.log(user.token)
      const data = await axios.get("https://ave-dating-site.herokuapp.com/users/getPlan",{
        headers:{
          Authorization:`${user.token}`
        },
      });
      console.log(data.data);
    } 
    fetchUser()
  },[])
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