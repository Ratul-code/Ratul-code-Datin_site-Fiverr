import React from 'react'
import {Modal as MUIModal} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useOutsideClick } from '../../hooks/OutsideClickhandler';
import { setIsOpen } from '../../redux/slices/modalSlice';
import {ImCross} from "react-icons/im";

interface modalProps{
    children?:React.ReactNode
}
const Modal = ({children}:modalProps) => {
    const {modal} = useAppSelector(state=>state);
    const dispatch = useAppDispatch();
    const modalRef = useOutsideClick(()=>{
        dispatch(setIsOpen(false));
    });
    console.log(modal.message)
  return (
    <MUIModal
        open={modal.isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
>
    <div className='absolute h-screen w-screen bg-[#00000034] z-[100000] flex justify-center items-center'>
    {<div ref ={modalRef} className='bg-white rounded-md w-full max-w-[500px] h-auto py-8 px-2 relative' >
        {children}
        <div onClick={()=>dispatch(setIsOpen(false))} className='absolute top-4 cursor-pointer right-5'>
            <ImCross color='#000' size={25} />
        </div>
    </div>}
    </div>

    </MUIModal>
  )
}

export default Modal