import Image from "next/image";
import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import profileStyle from "./Profile.module.css";
const ProfileImage = () => {
    const [imgIndex,setImgIndex] = useState<number>(0);
    const {profile:{profile}} = useAppSelector(state=>state);
  const srcSet = [
    // "/assets/democard1.jpg",
    // "/assets/democard2.jpg",
    // "/assets/democard3.jpg",
    // "/assets/democard6.jpg",
  ];
  return (
    <>
      <div
        className={`bg-[#f9f9f9] relative mx-auto w-[320px] min-h-[270px] md:min-h-[320px] rounded-xl overflow-hidden shadow-2xl ${profileStyle.bigImage}`}
      >
        {/* <Image
          src={srcSet[imgIndex]}
          layout="fill"
          objectFit="cover"
          objectPosition={"top"}
        /> */}
        <img src={profile?.profileImage?.name?`https://ave-dating-site.herokuapp.com/images/${profile.profileImage.name}`:undefined || "/assets/blankcard.png"} alt="sdsd" className="w-full h-full object-cover object-top" />
      </div>
      <div className="flex gap-5 justify-center px-2">
        {/* {srcSet.map((src,index) => (
          <div key={index}
          onClick={()=>setImgIndex(index)}
            className={`${profile.bigImage} relative w-[60px] h-[70px] rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-200 ease-out shadow-2xl border-[1px] border-solid border-gray-300 shadow-black ${index===imgIndex && `scale-110 translate-y-[-9px] ${profile.selected} `}`}
          >
            <Image
              src={src}
              layout="fill"
              objectFit="cover"
              objectPosition={"top"}
            />
          </div>
        ))} */}
      </div>
    </>
  );
};

export default ProfileImage;
