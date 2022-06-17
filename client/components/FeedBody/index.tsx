
import React, { useState } from 'react'
import {AiOutlineCaretDown} from "react-icons/ai";
import {GrFormPrevious,GrFormNext} from "react-icons/gr";
import { useOutsideClick } from '../../hooks/OutsideClickhandler';
import Modal from '../Modal';
import ProfileCard from '../ProfileCard';
import FeedModal from './FeedModal';
const FeedBody = () => {
    const [isOrderBy,setIsOrderBy] = useState(false);
    const [orderBy,setOrderBy] = useState<string>("Relevance")
    const orderByRef = useOutsideClick(()=>{
        setIsOrderBy(false)
    })
  return (
    <div className='p-5'>
        <Modal>
            <FeedModal/>
        </Modal>
        <div className='flex justify-between items-center relative'>
            <p className='text-gray-500'>1-10 of 1000+</p>
            <p onClick={()=>setIsOrderBy(true)} className='text-gray-500 flex justify-between gap-4 cursor-pointer'>Order By : {orderBy} <span><AiOutlineCaretDown size={20}/></span></p>
            <ul ref={orderByRef} className={`absolute top-6 right-1 flex flex-col gap-2 shadow-xl rounded-md py-3 z-[1000] bg-gray-100 text-black ${!isOrderBy && "hidden"}`}>
                <li onClick={()=>{
                    setOrderBy("Newest Member")
                    setIsOrderBy(false);
                    }} className='hover:bg-gray-300 cursor-pointer px-4'>Newest Member</li>
                <li onClick={()=>{
                    setOrderBy("Last Active")
                    setIsOrderBy(false);
                    }}className='hover:bg-gray-300 cursor-pointer px-4'>Last Active</li>
            </ul>
        </div>
        <div className='mt-4 grid  grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-wrap mb-4'>
                    <ProfileCard src="/assets/democard1.jpg" username='Mileng' age={20} address="Cagayan de Oro, Misamis Oriental," seeking=' Male 22 - 54' active='4 hours ago'/>
                    <ProfileCard username='Mileng' age={20} address="Cagayan de Oro, Misamis Oriental," seeking=' Male 22 - 54' active='4 hours ago'/>
                    <ProfileCard src="/assets/democard5.jpg" username='Mileng' age={20} address="Cagayan de Oro, Misamis Oriental," seeking=' Male 22 - 54' active='4 hours ago'/>
                    <ProfileCard src="/assets/democard2.jpg" username='Mileng' age={20} address="Cagayan de Oro, Misamis Oriental," seeking=' Male 22 - 54' active='4 hours ago'/>
                    <ProfileCard src="/assets/democard4.jpg" username='Mileng' age={20} address="Cagayan de Oro, Misamis Oriental," seeking=' Male 22 - 54' active='4 hours ago'/>
                    <ProfileCard src="/assets/democard3.jpg" username='Mileng' age={20} address="Cagayan de Oro, Misamis Oriental," seeking=' Male 22 - 54' active='4 hours ago'/>
                    <ProfileCard src="/assets/democard6.jpg" username='Mileng' age={20} address="Cagayan de Oro, Misamis Oriental," seeking=' Male 22 - 54' active='4 hours ago'/>
        </div>
        <div className='flex justify-between items-center px-4 py-4 text-lg text-gray-500 cursor-pointer font-semibold'>
            <div className='flex items-center gap-2 hover:scale-105'>
                <GrFormPrevious size={20}/>
                <p>Previous</p>
            </div>
            <div className='flex items-center gap-2 hover:scale-105'>
                <p>Next</p>
                <GrFormNext size={20}/>
            </div>
        </div>
    </div>
  )
}

export default FeedBody