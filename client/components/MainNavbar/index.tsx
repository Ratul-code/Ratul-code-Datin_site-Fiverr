import Image from "next/image";
import React, { useEffect, useState } from "react";
import navbar from "./MainNavbar.module.css";
import Link from "next/link";
import Button from "../Button";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import ProfileAvatar from "../ProfileAvatar";
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const MainNavbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`${navbar.navbar}`}>
      <div className={`${navbar.navbar_inner}`}>
        <Image
          src={"/assets/logo2.jpeg"}
          width={150}
          height={45}
          objectFit="contain"
        />
        <ul className={navbar.linksContainer}>
        <li
              className={`${
                router.pathname.startsWith("/feed") && navbar.active
              }`}
            >
              <Link href="/feed">Feed</Link>
            </li>
          <li
            className={`${
              router.pathname.startsWith("/mydirectory") && navbar.active
            }`}
          >
            <Link href="#">My Directory</Link>
          </li>
          <li
            className={`${
              router.pathname.startsWith("/chat") && navbar.active
            }`}
          >
            <Link href="#">Chat</Link>
          </li>
          <li
            className={`${
              router.pathname.startsWith("/matches") && navbar.active
            }`}
          >
            <Link href="#">Matches</Link>
          </li>
          <li
              className={`${
                router.pathname.startsWith("/membership") && navbar.active
              }`}
            >
              <Link href="/membership">Membership</Link>
            </li>
        </ul>
        <div className="hidden lg:inline-flex">
        <ProfileAvatar  />
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
          <div className="inline-flex lg:hidden">
        <ProfileAvatar/>
        </div>
          <ul
            className={`${navbar.menubarLinks} ${
              isOpen ? navbar.menuOpen : navbar.menuClose
            }`}
          >
            <li
              className={`${
                router.pathname.startsWith("/feed") && navbar.active
              }`}
            >
              <Link href="/feed">Feed</Link>
            </li>
            <li
              className={`${
                router.pathname.startsWith("/mydirectory") && navbar.active
              }`}
            >
              <Link href="#">My Directory</Link>
            </li>
            <li
              className={`${
                router.pathname.startsWith("/chat") && navbar.active
              }`}
            >
              <Link href="#">Chat</Link>
            </li>
            <li
              className={`${
                router.pathname.startsWith("/matches") && navbar.active
              }`}
            >
              <Link href="#">Matches</Link>
            </li>
            <li
              className={`${
                router.pathname.startsWith("/membership") && navbar.active
              }`}
            >
              <Link href="/membership">Membership</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
