import React, { useEffect, useState } from 'react'
import MainLayout from '../components/MainLayout'
import Pricing from '../components/Pricing'
import instance from '../utils/axios'

// const Membership = ({prices=null}:any) => {
const Membership = () => {
  const [prices,setPrices] = useState<any>();
  const fetchUserplan = async ()=>{
    const {data} = await instance.get("/subs/prices");
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