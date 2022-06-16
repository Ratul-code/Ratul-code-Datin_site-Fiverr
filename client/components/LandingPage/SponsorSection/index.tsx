import React from 'react'
import Image from "next/image";
const index = () => {
  return (
    <div className='flex w-full max-w-[1200px] mx-auto gap-12 flex-wrap justify-center items-center'>
        <div>
        <Image objectFit='contain' width={150} height={50} src={"/assets/forbes.png"} layout="fixed" />
        </div>
        <div>
        <Image objectFit='contain' width={150} height={50} src={"/assets/cnn.png"} layout="fixed" />
        </div>
        <div>
        <Image objectFit='contain' width={150} height={50} src={"/assets/abc.png"} layout="fixed" />
        </div>
        <div>
        <Image objectFit='contain' width={150} height={50} src={"/assets/cbs.jpg"} layout="fixed" />
        </div>
        <div>
        <Image objectFit='contain' width={150} height={50} src={"/assets/wallstreet.png"} layout="fixed" />
        </div>
    </div>
  )
}

export default index