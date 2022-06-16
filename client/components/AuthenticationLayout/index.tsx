import React from 'react'
import Image from "next/image";
import router from "next/router";
interface layoutProps{
    children:React.ReactNode
}
const index = ({children}:layoutProps) => {
  return (
    <div className='bg-black'>
    {/* <div onClick={()=>router.replace("/")} className='absolute top-10 left-10 z-10'>
        <Image src={logo} width={200} height={60} />
    </div> */}
    <div onClick={()=>router.replace("/")} className='w-screen bg-black flex justify-center px-8 py-5 mb-[0.1px]'>
        <Image src={"/assets/logo2.jpeg"} width={200} height={60} />
    </div>
    <main className='w-screen min-h-[calc(100vh-100.1px)]'>
        {children}
    </main>
    </div>
  )
}

export default index