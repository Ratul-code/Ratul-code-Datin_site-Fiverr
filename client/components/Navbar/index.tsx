import Image from "next/image";
import React, { useEffect, useState } from "react";
import navbar from "./Navbar.module.css";
import Link from "next/link";
import Button from "../Button";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
interface navbarProps{
  isBlack:boolean
}
const Navbar = ({isBlack=false}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [bgBlack,setBgBlack] = useState(isBlack);

  useEffect(()=>{
    const handleScroll = (e:Event)=>{
      if(window.scrollY>250 && !bgBlack){
        setBgBlack(true)
      }
      else {
        setBgBlack(false);
    }
    }
    if(!isBlack){
      console.log("hello")
      window.addEventListener("scroll",handleScroll)
      return ()=>{
        window.removeEventListener("scroll",handleScroll)
      }
    }
  },[])
  return (
    <nav className={`${navbar.navbar} ${bgBlack && "bg-black"}`}>
      <div className={`${navbar.navbar_inner}`}>
        <Image src={"/assets/logo2.jpeg"} width={200} height={55} objectFit="contain" />
        <ul className={navbar.linksContainer}>

        <li className={`${router.pathname==="/" && navbar.active}`}><Link href="/">Home</Link></li>

          <li className={`${router.pathname.startsWith("/successtories") && navbar.active}`}><Link href="#">Succes Stories</Link></li>

          <li className={`${router.pathname.startsWith("/membership") && navbar.active}`}><Link href="/membership">Membership</Link></li>

        </ul>

        <div className={navbar.buttonContainer}>
          <Button color="#000" hoverText="#000" onClick={()=>router.push("/login")}  btnType="outline">
            SIGN IN
          </Button>
          <Button onClick={()=>router.push("/register")} color="#000" hoverText="#000" btnType="fill">
            SIGN UP
          </Button>
        </div>

        <div className={navbar.menubar}>
          <div
            onClick={() => {
              setIsOpen((prevState) => !prevState);
            }}
            className={navbar.menubarIcon}
          >
            {!isOpen ? (
              <AiOutlineMenu size={30} color="#ADD8E6" />
            ) : (
              <AiOutlineClose size={30} color="#ADD8E6" />
            )}
          </div>
          <ul
            className={`${navbar.menubarLinks} ${
              isOpen ? navbar.menuOpen : navbar.menuClose
            }`}
          >

            <li className={`${router.pathname==="/" && navbar.active}`}><Link href="/">Home</Link></li>

            <li className={`${router.pathname.startsWith("/successtories") && navbar.active}`}><Link href="#">Succes Stories</Link></li>

            <li className={`${router.pathname.startsWith("/membership") && navbar.active}`}><Link href="/membership">Membership</Link></li>

            <Button onClick={()=>router.push("/login")} hoverText="#000" color="#000" fullWidth btnType="outline">
              SIGN IN
            </Button>
            <Button onClick={()=>router.push("/register")} fullWidth color="#000" btnType="fill">
              SIGN UP
            </Button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
