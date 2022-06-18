import React from 'react'
import PricingCard from './PricingCard';

const Pricing = ({prices}:any) => {
  return (
    <div className='flex flex-col bg-[#f9f9f9] items-center gap-8'>
        <div className='mt-7 w-full'>
            <h1 className='text-center text-[35px] tracking-wide font-semibold'>Plans & Pricing</h1>
            <p className='text-[20px] text-center text-secondary tracking-wide font-semibold capitalize'>Be our gold member for 4 consecutive months to become our VIP membership </p>
        </div>
        <div className='flex flex-col-reverse md:flex-row justify-center md:justify-start items-center gap-6 w-full flex-wrap md:flex-nowrap px-4'>
          <PricingCard pricing={prices[1]} />
          <PricingCard pricing={prices[0]} />
          <PricingCard pricing={prices[2]} />
        </div>
    </div>
  )
}

export default Pricing