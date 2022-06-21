import React, { useEffect, useState } from 'react'
import MainLayout from '../components/MainLayout'
import Pricing from '../components/Pricing'
import { useAppSelector } from '../redux/hooks'
import instance from '../utils/axios'

// const Membership = ({prices=null}:any) => {
const Membership = () => {
  const [prices,setPrices] = useState<any>();
  const {user} = useAppSelector(state=>state);
  const fetchUserplan = async ()=>{
    const {data} = await instance.get("/subs/prices",{
      headers:{
        Authorization:`${user.token}`
      }
    });
    setPrices(data);
  }
  useEffect(()=>{
    fetchUserplan();
  },[])
  return (
    <MainLayout>
        {prices && <Pricing prices={prices}/>}
    </MainLayout>
  )
}

export default Membership


// export async function getStaticProps() {
//   const {data} = await instance.get("/subs/prices");
//   return {
//     props: {prices:data}, 
//   }
// }