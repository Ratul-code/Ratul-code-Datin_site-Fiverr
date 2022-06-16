import React from 'react'
import Footer from '../Footer'
import MainNavbar from './MainNavbar'
interface mainLayoutprops{
    children:React.ReactNode
}

const MainLayout = ({children}:mainLayoutprops) => {
  return (
    <>
    <MainNavbar/>
    <main className='w-screen bg-[#f9f9f9]'>
      <div className='mt-[60px] w-full max-w-[1200px] mx-auto'>
        {children}
      </div>
    </main>
        <Footer/>
    </>
  )
}

export default MainLayout