import React, { Children } from 'react'
import Navbar from "./Navbar";
import Footer from "../Footer";

interface layoutPropType{
    children:React.ReactNode
}
const index = ({children}:layoutPropType) => {
  return (
    <>
        <Navbar/>
        <main>
            {children}
        </main>
        <Footer/>
    </>
  )
}

export default index