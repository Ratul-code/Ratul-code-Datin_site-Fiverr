import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import Footer from '../Footer'
import MainNavbar from '../MainNavbar'
import Navbar from '../Navbar'
interface mainLayoutprops{
    children:React.ReactNode
}

const MainLayout = ({children}:mainLayoutprops) => {
  const {user} = useAppSelector(state=>state);
  return (
    <>
    {user.token?<MainNavbar/>:<Navbar isBlack />}
    <main className={`w-screen bg-[#f9f9f9]`}>
      <div className='mt-[60px] w-full max-w-[1200px] mx-auto'>
        {children}
      </div>
    </main>
        <Footer/>
    </>
  )
}

export default MainLayout