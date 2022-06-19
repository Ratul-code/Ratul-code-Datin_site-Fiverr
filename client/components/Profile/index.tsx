import Image from "next/image";
import React from "react";
import MainNavbar from "../MainNavbar";
import {GrFormPrevious} from "react-icons/gr";
import ProfileImage from "./ProfileImage";
import ProfileIntro from "./ProfileIntro";
import { useRouter } from "next/router";
const Profile = () => {
  const router = useRouter();
  return (
    <>
      <MainNavbar />
      <main className={`w-full max-w-[1200px] mt-[70px] mx-auto`}>

      <div onClick={()=>router.back()} className='flex items-center gap-1 text-xl cursor-pointer mt-[80px] mb-4 w-max text-gray-500 font-semibold '>
                <GrFormPrevious size={25}/>
                <p>Back</p>
      </div>
        <div className="flex flex-col md:flex-row justify-between w-full px-3 gap-10">
          <div className="flex flex-col gap-6 md:gap-5 md:w-auto w-full">
            <ProfileImage />
          </div>
          <div className="w-full px-5">
            <ProfileIntro />
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
