import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container w-full px-4 space-y-8">
                <div className="mx-auto w-5/6 border-gray-800 text-muted-foreground flex justify-between">
                    <Link href={"#"}>Privacy Policy</Link>
                    <Link href={"#"}>Terms of Use</Link>
                    <Link href={"#"}>About Us</Link>
                    <Link href={"#"}>Contacts</Link>
                    <Link href={"#"}>FAQs</Link>
                </div>
                <div className="mx-auto w-5/6 border-gray-800 text-muted-foreground flex justify-between">
                    <p>© {new Date().getFullYear()} Wandcorp Private Limited. All rights reserved.</p>
                    <div className='flex space-x-2'>
                        <Link href="#"><FaFacebook className='text-3xl text-muted-foreground' /></Link>
                        <Link href={"#"}><TiSocialInstagram className='text-3xl text-muted-foreground' /></Link>
                        <Link href={"#"}><IoLogoLinkedin className='text-3xl text-muted-foreground' /></Link>
                        <div className='bg-muted-foreground p-0.5 rounded-full w-7 h-7 flex justify-center items-center'>
                            <Link href={"#"}><FaXTwitter className='text-2xl text-gray-900' /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;