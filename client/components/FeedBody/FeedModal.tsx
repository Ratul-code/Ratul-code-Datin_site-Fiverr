import { useRouter } from 'next/router';
import React from 'react'
import {BsExclamationTriangle} from "react-icons/bs";
import { useAppDispatch } from '../../redux/hooks';
import { setIsOpen } from '../../redux/slices/modalSlice';
import Button from "../Button";

const FeedModal = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-4'>
        <div>
            <BsExclamationTriangle color='#000' size={60} />
        </div>
        <div>
            <p className='text-xl my-2 font-semibold text-center'>
                You can not like others profile. You must be a member first.
            </p>
        </div>

    <div className='w-full px-3 max-w-[300px]'>
        <Button onClick={()=>{
            dispatch(setIsOpen(false))
            router.push("/membership")
    }} bg='black' fullWidth>See our pricing plan</Button>
    </div>
    </div>
  )
}

export default FeedModal