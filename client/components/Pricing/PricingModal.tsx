import React from 'react'
import { useRouter } from 'next/router';
import {BsExclamationTriangle} from "react-icons/bs";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsOpen, setMessage } from '../../redux/slices/modalSlice';
import Button from "../Button";

const PricingModal = () => {
    const router = useRouter();
    const {modal} = useAppSelector(state=>state);
    const dispatch = useAppDispatch();
  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-3'>
        <div>
            <BsExclamationTriangle color='#000' size={40} />
        </div>
        <div>
            <p className='text-xl my-2 font-semibold text-center capitalize'>
               {modal.message}
            </p>
        </div>

    <div className='w-full px-3 max-w-[300px]'>
        <Button onClick={()=>{
            dispatch(setIsOpen(false));
    }} bg='black' fullWidth>Close</Button>
    </div>
    </div>
  )
}

export default PricingModal