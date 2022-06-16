import React from 'react'
import banner from "./Banner.module.css"
import Button from "../../Button";
const index = () => {
  return (
    <section className={`${banner.banner} w-screen h-[80vh] px-[1.2rem] sm:px-[3rem] md:px-[6.4rem] py-[1.2rem] md:py-[2.5rem]`}>

        <div className='w-full max-w-[1200px] h-full flex justify-between items-center mx-auto '>
                <div className="flex flex-col gap-9 w-full justify-center">
                    <p className='text-primary text-xl tracking-wide leading-[36px]'>HIGHEST QUALITY DATING PLATFORM</p>
                    <h1 className=" text-[30px] lg:text-[50px] leading-[40px] lg:leading-[60px] text-white font-extrabold tracking-wider uppercase">Behold the power of affluent man meets elegant women</h1>

                    <div className='flex flex-col gap-6 justify-between items-start'>
                        <p className='text-white text-[21px] tracking-wider max-w-[80%]'>Are you a single ?</p>
                        <Button color='#000' btnType='outline' hoverText='#000'>MEET ATTRACTIVE SINGLES NOW</Button>
                    </div>
                </div>
        </div>

    </section>
  )
}

export default index