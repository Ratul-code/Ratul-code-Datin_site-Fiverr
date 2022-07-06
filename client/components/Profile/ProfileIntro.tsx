import React, { useEffect, useState } from "react";
import profile from "./Profile.module.css";
import { FaMedal, FaHeart, FaUserFriends } from "react-icons/fa";
import { BsChatSquareFill, BsThreeDots } from "react-icons/bs";
import { IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useOutsideClick } from "../../hooks/OutsideClickhandler";
import { setIsOpen } from "../../redux/slices/modalSlice";
import { setProfileModalState } from "../../redux/slices/profileSlice";
import instance from "../../utils/axios";
const ProfileIntro = () => {
  const {
    user,
    profile: { profile, myProfile },
  } = useAppSelector((state) => state);
  const [infoOpen, setInfoOpen] = useState(false);
  const [likedUser, setLikedUser] = useState(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [checklikedStatus, setChecklikedStatus] = useState<string>("IDLE");
  const [noOfLikes, setNoOfLikes] = useState<number | undefined>(
    profile?.likes?.length || 0
  );
  const dispatch = useAppDispatch();
  const infoRef = useOutsideClick(() => {
    setInfoOpen(false);
  });


  let medals;
  if (user.plan.nickname === "Gold") {
    medals = ["#684007", "#684007", "#684007"];
  } else if (user.plan.nickname === "Silver") {
    medals = ["gray", "gray"];
  } else if (user.plan.nickname === "Bronze") {
    medals = ["red"];
  }



  const handleLike = async () => {
      if (myProfile) {
        dispatch(setIsOpen(true));
        dispatch(setProfileModalState("LIKEDUSER"));
      } else {
        if (!user.plan) {
          dispatch(setIsOpen(true));
          dispatch(setProfileModalState("WARNING"));
        } else {
        await instance
          .get(`/profile/likeprofile/${profile.profileUser}`, {
            headers: {
              Authorization: user.token,
            },
          })
          .then((res) => {
            setLiked((state) => !state);
            setNoOfLikes(res.data.noOfLikes);
          })
          .catch((err) => setLiked((state) => !state));
        }
      
    }
  };

  const checkLike = async () => {
    await instance
      .get(`/profile/checkLike/${profile.profileUser}`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        setLiked(res.data.liked);
        setChecklikedStatus("SUCCESS");
        setNoOfLikes(res.data.noOfLikes);
      });
  };

  useEffect(() => {
    if (checklikedStatus === "IDLE" && profile) {
      checkLike();
    }
  }, []);
  console.log(likedUser);
  return (
    <div className="flex flex-col gap-10 justify-start w-full relative">
      <div ref={infoRef} className="absolute top-0 right-0">
        <IconButton>
          <BsThreeDots
            onClick={() => {
              setInfoOpen((prevState) => !prevState);
            }}
            className="text-3xl text-gray-700"
          />
        </IconButton>
        <div
          className={`${
            infoOpen ? "flex" : "hidden"
          } text-[14px] w-max  flex-col py-1 text-gray-500 rounded-lg bg-white shadow-xl absolute top-10 right-2`}
        >
          <div className="px-3 text-left block cursor-pointer py-2 hover:bg-gray-100">
            <p className="">Mark Favourite </p>
          </div>
          {!myProfile && (
            <>
              <div className="px-3 text-left block cursor-pointer py-2 hover:bg-gray-100">
                <p className="">Hide User</p>
              </div>
              <div className="px-3 text-left block cursor-pointer py-2 hover:bg-gray-100">
                <p className="">Block User </p>
              </div>
            </>
          )}
          {myProfile && (
            <div className="px-3 text-left block cursor-pointer py-2 hover:bg-gray-100">
              <p className="text-red-500">Delete Profile </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex gap-4 flex-col ">
          <h1 className="text-[30px] max-w-[359px] font-sans font-bold tracking-wider capitalize">
            {profile?.firstname} {profile?.lastname}
          </h1>
          <div className="flex gap-1">
            <FaMedal size={23} color="#684007 " />
            <FaMedal size={23} color="#684007 " />
            <FaMedal size={23} color="#684007 " />
          </div>
        </div>
        <div className=" mt-4">
          <p className="text-md max-w-[650px] text-gray-600 font-semibold font-sans  leading-[20px]">
            {profile?.bio}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-[-14px]">
        <ul className="flex gap-7 items-center flex-wrap  ">
          <li className="text-xl cursor-pointer font-semibold">Interested</li>
          <li className="text-xl cursor-pointer text-[#853227] underline font-bold">
            About Me
          </li>
        </ul>
        <div className="flex flex-wrap mt-[-10px] ml-[-12px] justify-start w-full gap-3 max-w-[400px] text-black  ">
          {profile?.about &&
            Object.keys(profile.about).map((info, index) => (
              <h3 key={index} className="text-sm mx-3 font-semibold capitalize">
                {info}:{" "}
                <span className=" text-gray-600 ">{profile?.about[info]}</span>
              </h3>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="ml-[-20px] flex-wrap gap-8 flex justify-start px-0 sm:px-4 w-full max-w-[700px]">
          <button
            onClick={handleLike}
            className=" hover:scale-105 transition-all duration-200 ease-in-out ml-[-4px] flex gap-4 items-center  max-w-[150px] py-1 px-6  shadow-xl rounded-full"
          >
            <FaHeart
              className={`text-3xl cursor-pointer ${
                myProfile
                  ? noOfLikes === 0
                    ? "text-gray-400"
                    : "text-female"
                  : liked
                  ? "text-female"
                  : "text-gray-400"
              } hover:scale-105`}
            />
            <p className="text-md font-sans font-semibold text-female">
              {noOfLikes}
            </p>
          </button>
          {myProfile || (
            <button className=" hover:scale-105 transition-all duration-200 ease-in-out ml-[-4px] flex gap-4 items-center  py-1 px-6  shadow-xl rounded-full">
              <BsChatSquareFill className="text-3xl cursor-pointer text-blue-500 hover:scale-105" />
              <p className="text-md font-sans font-semibold">Send Message</p>
            </button>
          )}
          {myProfile || (
            <button className=" hover:scale-105 transition-all duration-200 ease-in-out ml-[-4px] flex gap-4 items-center  py-1 px-6  shadow-xl rounded-full">
              <FaUserFriends className="text-3xl cursor-pointer text-red-900 hover:scale-105" />
              <p className="text-md font-sans font-semibold">Send Request</p>
            </button>
          )}
        </div>
        <div className="w-full h-[1px] bg-gray-400 "></div>
      </div>
    </div>
  );
};

export default ProfileIntro;
