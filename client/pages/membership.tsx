import axios from 'axios'
import React from 'react'
import MainLayout from '../components/MainLayout'
import Pricing from '../components/Pricing'
import { useAppSelector } from '../redux/hooks'

const Membership = ({prices}:any) => {
  const {user} = useAppSelector(state=>state);
  return (
    <MainLayout>
        {prices && <Pricing prices={prices}/>}
    </MainLayout>
  )
}

export default Membership


export async function getStaticProps() {
  const plans = await axios.get("https://ave-dating-site.herokuapp.com/subs/prices")
const activePlans = plans.data.data.filter((plan:any)=>plan.active===true)
  return {
    props: {prices:activePlans}, 
  }
}