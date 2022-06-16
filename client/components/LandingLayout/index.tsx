import React, { Children } from 'react'
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useAppSelector } from '../../redux/hooks';
import MainNavbar from '../MainNavbar';

interface layoutPropType{
    children:React.ReactNode
}
const LandingLayout = ({children}:layoutPropType) => {
  const {user} = useAppSelector(state=>state);
  return (
    <>
        {user.token?<MainNavbar/>:<Navbar/>}
        <main>
            {children}
        </main>
        <Footer/>
    </>
  )
}

export default LandingLayout