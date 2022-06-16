import React from 'react'
import Link from "next/link";
import footer from "./Footer.module.css";
import {FaFacebookF,FaPinterestP} from "react-icons/fa";
import {AiOutlineTwitter,AiFillYoutube,AiFillInstagram} from "react-icons/ai";
const Footer = () => {
  return (
    <footer className='bg-[#f9f9f9] py-[2rem] md:py-[4.4rem] px-[1rem] sm:px-[1.5rem] md:px-[3rem] lg:px-[6.4rem]'>
        <div className='flex gap-10 justify-between items-start flex-wrap'>
            <div>
                <h1 className='font-semibold  uppercase'>DATING & RELATIONSHIP</h1>
                <ul className={`mt-6 text-xs flex flex-col gap-2 ${footer.footer_links}`}>
                    <li> <Link href={"#"}>Professional Dating</Link> </li>
                    <li> <Link href={"#"}>Millionaire Datin</Link> </li>
                    <li> <Link href={"#"}>Rich Men Dating</Link> </li>
                    <li> <Link href={"#"}>Rich Women Dating</Link> </li>
                    <li> <Link href={"#"}>Millionaire Matchmaking</Link> </li>
                    <li> <Link href={"#"}>Millionaire Matchmake</Link> </li>
                    <li> <Link href={"#"}>Luxury Lifestyle Blog</Link> </li>
                    <li> <Link href={"#"}>MM Upscale Guides</Link> </li>
                </ul>
            </div>
            <div>
                <h1 className='font-semibold  uppercase'>TOP COUNTRIES</h1>
                <ul className={`mt-6 text-xs flex flex-col gap-2 ${footer.footer_links}`}>
                    <li> <Link href={"#"}>United States</Link> </li>
                    <li> <Link href={"#"}>Canada</Link> </li>
                    <li> <Link href={"#"}>United Kingdom</Link> </li>
                    <li> <Link href={"#"}>Germany</Link> </li>
                </ul>
            </div>
            <div>
                <h1 className='font-semibold  uppercase'>LOCAL DATING</h1>
                <ul className={`mt-6 text-xs flex flex-col gap-2 ${footer.footer_links}`}>
                    <li> <Link href={"#"}>Los Angeles</Link> </li>
                    <li> <Link href={"#"}>London</Link> </li>
                    <li> <Link href={"#"}>Dallas</Link> </li>
                    <li> <Link href={"#"}>Chicago</Link> </li>
                </ul>
            </div>
            <div>
                <h1 className='font-semibold  uppercase'>COMPANY</h1>
                <ul className={`mt-6 text-xs flex flex-col gap-2 ${footer.footer_links}`}>
                    <li> <Link href={"#"}>Community Guidelines</Link> </li>
                    <li> <Link href={"#"}>About Us</Link> </li>
                    <li> <Link href={"#"}>Contact Us</Link> </li>
                    <li> <Link href={"#"}>Help / FAQ</Link> </li>
                    <li> <Link href={"#"}>Service Agreement</Link> </li>
                    <li> <Link href={"#"}>Privacy Policy</Link> </li>
                </ul>
            </div>
            <div>
                <h1 className='font-semibold  uppercase'>UNIQUE FEATURES</h1>
                <ul className={`mt-6 text-xs flex flex-col gap-2 ${footer.footer_links}`}>
                    <li> <Link href={"#"}>Spark</Link> </li>
                    <li> <Link href={"#"}>CERTIFIED MILLIONAIRE™</Link> </li>
                    <li> <Link href={"#"}>Live MM Counselor</Link> </li>
                    <li> <Link href={"#"}>Members Luxuries</Link> </li>
                    <li> <Link href={"#"}>Celebrity Interviews</Link> </li>
                    <li> <Link href={"#"}>24/7 Phone Service</Link> </li>
                    <li> <Link href={"#"}>How to Succeed in Business / Career</Link> </li>
                    <li> <Link href={"#"}>How to Keep Your Body in Shape</Link> </li>
                    <li> <Link href={"#"}>Volunteer Opportunities</Link> </li>
                </ul>
            </div>
            <div>
                <h1 className='font-semibold  uppercase mb-6'>Follow us</h1>
                <div className='mt-6 flex justify-between'>
                    <div className='cursor-pointer'>
                    <FaFacebookF/>
                    </div>
                    <div className='cursor-pointer'>
                    <AiOutlineTwitter/>
                    </div>
                    <div className='cursor-pointer'>
                    <FaPinterestP/>
                    </div>
                    <div className='cursor-pointer'>
                    <AiFillInstagram/>
                    </div>
                    <div className='cursor-pointer'>
                    <AiFillYoutube/>
                    </div> 
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer