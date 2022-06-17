import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Button from "../Button";
import {useRouter} from "next/router";
import instance from '../../utils/axios';
import { setIsOpen, setMessage } from '../../redux/slices/modalSlice';
import Modal from '../Modal';
import PricingModal from './PricingModal';
const PricingCard = ({pricing}:any) => {
    const router = useRouter();
    const {user} = useAppSelector(state=>state);
    const dispatch = useAppDispatch();
    const [benefits,setBenefits] = useState<string[]>();
    useEffect(()=>{
        let benefits:string[]=[];
        if(pricing.nickname==="Gold"){
            benefits = [
                "including features of Silver",
                "Audio & Video Calls",
                "Sponsored in search",
                "Get Gold Tag",
                "Showing up to 10 ads in a month"
            ]
        }
        if(pricing.nickname==="Silver"){
            benefits = [
                "including features of Bronze",
                "Chating with other users",
                "Rich notification system",
                "Uploading Images and Videos",
                "Showing up to 5 ads in a month"
            ]
        }
        if(pricing.nickname==="Bronze"){
            benefits = [
                "Visit Profile",
                "Liking Other User",
                "Searching By Filteration",
                "Adding Profile Info",
                "Sending/Accepting Friend Request"
            ]
        }
        setBenefits(benefits);
    },[])
  return (
    <div className={`${pricing.nickname==="Silver" && "translate-y-0 md:translate-y-[-30px]"} flex flex-col mt-5 gap-5  max-w-[390px] items-center p-4 border-[1px] border-solid border-gray-300 shadow-lg rounded-xl`}>
        <Modal>
            <PricingModal />
        </Modal>
        <div className='mt-4'>
            <h1 className={`tracking-wider text-center text-[40px] font-sans font-bold `}>{pricing.nickname}</h1>
            <p className=' mt-4 text-lg text-secondary font-sans text-center '>Become a member and enjoy the benefits</p>
            <p className='text-[40px] mt-4 font-[500] text-black text-center'>${pricing.amount/100}/<span className='text-gray-600 text-3xl font-[200]'>mo</span> </p>
            <div className='w-[95%] mt-3 mx-auto h-[1px] bg-gray-300' ></div>
        </div>
        <div>
            <h2 className='text-black font-semibold tracking-wide capitalize text-center'>Benefits you will get :</h2>
            <div className='mt-4 text-gray-600 flex flex-col gap-4 text-center'>
                {benefits?.map((text:string,index:number)=>(
                    <p key={index}>{text}</p>
                ))}
            </div>
        </div>
        <div className='px-5 w-full my-3'>
        <Button onClick={async ()=>{
            try {
                const {data} = await instance.post("/subs/session",{
                    priceId:pricing.id
                },
                {
                    headers:{
                        "Authorization":`${user.token}`
                    }
                }
                )
                window.location.replace(data.url);
            } catch (error:any) {
                if(error.response.data.error){
                    dispatch(setMessage(error.response.data.error));
                    dispatch(setIsOpen(true))
                } else{
                    dispatch(setMessage(error.response.statusText + "! You have to signup or signin"));
                    dispatch(setIsOpen(true))
                }
            }
        }} fullWidth bg='#1769aa' btnType='outline' >BUY PLAN</Button>
        </div>
    </div>
  )
}

export default PricingCard