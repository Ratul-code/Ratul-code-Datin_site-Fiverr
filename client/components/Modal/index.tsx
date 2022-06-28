import React from 'react'
import {Modal as MUIModal} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useOutsideClick } from '../../hooks/OutsideClickhandler';
import { setIsOpen } from '../../redux/slices/modalSlice';
import {ImCross} from "react-icons/im";

interface modalProps{
    children?:React.ReactNode,
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
    {<div ref ={modalRef} className='bg-white rounded-md w-max max-w-[900px] max-h-[100%] py-8 px-4 relative overflow-y-scroll modal' >
        {children}
        <div onClick={()=>dispatch(setIsOpen(false))} className='absolute z-[1000] top-4 cursor-pointer right-7'>
            <ImCross color='#000' size={25} />
        </div>
    </div>}
    </div>

    </MUIModal>
  )
}

export default Modal