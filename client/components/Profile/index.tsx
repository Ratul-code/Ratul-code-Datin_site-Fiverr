import Image from "next/image";
import React from "react";
import MainNavbar from "../MainNavbar";
import {GrFormPrevious} from "react-icons/gr";
import ProfileImage from "./ProfileImage";
import ProfileIntro from "./ProfileIntro";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {GiHappySkull} from "react-icons/gi";
import Button from "../Button";
import { setIsOpen } from "../../redux/slices/modalSlice";
import Modal from "../Modal";
import ProfileModal from "./ProfileModal";
import { setProfileModalState } from "../../redux/slices/profileSlice";


const Profile = () => {
  const router = useRouter();
  const {user:{user},profile:{myProfile,profile}} = useAppSelector(state=>state);
  const dispatch = useAppDispatch(); 
  console.log(profile);
  return (
    <>
      <MainNavbar />
      <main className={`w-full max-w-[1200px] mt-[70px] mx-auto`}>
        <Modal >
          <ProfileModal/>
        </Modal>

      <div onClick={()=>router.back()} className='flex items-center gap-1 text-xl cursor-pointer mt-[80px] mb-4 w-max text-gray-500 font-semibold '>
                <GrFormPrevious size={25}/>
                <p>Back</p>
      </div>
        {(!profile && myProfile)?
        <div className="flex flex-col justify-between gap-5 items-center w-full py-7 px-6 rounded-lg shadow-2xl bg-gray-100">
          <div>
            <GiHappySkull size={45} color={"#000"} />
          </div>
          <div>
            <p className="text-2xl font-semibold   tracking-wider">Hey There <span className="text-secondary" >{user.firstname} {user.lastname} !</span> </p>
          </div>
          <div className="text-xl font-semibold text-center space-y-2 capitalize">
            <p>Welcome To the most successfull dating website. You currently have no profile.</p>
            <p>Create an awesome profile and expand your beauty and capability.</p>
          </div>
          <Button onClick={()=>{
            dispatch(setIsOpen(true));
            dispatch(setProfileModalState("CREATING"));
          }} bg="#000">CREATE A PROFILE</Button>
        </div>
        :<div className="flex flex-col md:flex-row justify-between w-full px-3 gap-10">
          <div className="flex flex-col gap-6 md:gap-5 md:w-auto w-full">
            <ProfileImage />
          </div>
          <div className="w-full px-5">
            <ProfileIntro />
          </div>
        </div>
        }
      </main>
    </>
  );
};

export default Profile;
