import React from 'react'
import { IoPricetags } from "react-icons/io5";
import { BiRefresh } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { LuMapPin, LuPhone } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { WiTime9 } from "react-icons/wi";
import { FaRegCopyright, FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";

import Logo from './Logo';

const Footer = () => {
  return (
    <div className='w-full flex flex-col items-center px-12 pt-8'>
        <div className='w-full flex items-center justify-between py-6'>
            <div className='flex items-center gap-2'>
                <div className='text-5xl text-green-500'><IoPricetags/></div>
                <div className='flex flex-col'>
                    <h2 className='text-xl text-slate-700 font-bold'>Best Prices & Deals</h2>
                    <p className='text-base font-semibold text-gray-400'>Don't miss our daily amazing <br/>deals and prices</p>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <div className='text-5xl text-green-500'><BiRefresh/></div>
                <div className='flex flex-col'>
                    <h2 className='text-xl text-slate-700 font-bold'>Refundable</h2>
                    <p className='text-base font-semibold text-gray-400'>If your items have damage <br/>we agree to refund it</p>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <div className='text-5xl text-green-500'><FaShippingFast/></div>
                <div className='flex flex-col'>
                    <h2 className='text-xl text-slate-700 font-bold'>Free Delivery</h2>
                    <p className='text-base font-semibold text-gray-400'>Do purchase over $50 and <br/>get free delivery anywhere</p>
                </div>
            </div>
        </div>

        <div className='w-full flex justify-between py-10 border-t-2 border-t-gray-200 border-b-2 border-b-gray-200'>
            <div className='flex flex-col gap-6'>
                <Logo/>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center text-md font-bold text-gray-600 gap-1'><span className='text-green-500 text-lg'><LuMapPin/></span> Address:</div>
                    <div className='text-md font-semibold text-gray-400'>1762 School House Road</div>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center text-md font-bold text-gray-600 gap-1'><span className='text-green-500 text-lg'><LuPhone/></span> Call Us:</div>
                    <div className='text-md font-semibold text-gray-400'>123-777</div>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center text-md font-bold text-gray-600 gap-1'><span className='text-green-500 text-lg'><HiOutlineMail/></span> Email:</div>
                    <div className='text-md font-semibold text-gray-400'>groceyish@contact.com</div>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center text-md font-bold text-gray-600 gap-1'><span className='text-green-500 text-lg'><WiTime9/></span> Work hours:</div>
                    <div className='text-md font-semibold text-gray-400'>8:00 - 20:00, Monday - Friday</div>
                </div>
            </div>
            <div className='flex flex-col gap-8'>
                <h2 className='text-xl font-bold text-gray-600'>Accounts</h2>
                <div className='flex flex-col gap-4'>
                    <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer'>Whishlist</p>
                    <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer'>Cart</p>
                    <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer'>Track Order</p>
                    <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer'>Shipping Details</p>
                </div>
            </div>
            <div className='flex flex-col gap-8'>
                <h2 className='text-xl font-bold text-gray-600'>Useful links</h2>
                <div className='flex flex-col gap-4'>
                    <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer'>About Us</p>
                    <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer'>Contact</p>
                    <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer'>Hot deals</p>
                    <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer'>Promotions</p>
                    <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer'>New products</p>
                </div>
            </div>
            <div className='flex flex-col gap-8'>
                <h2 className='text-xl font-bold text-gray-600'>Payment</h2>
                <div className='flex flex-col gap-4'>
                    <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer'>Refund</p>
                    <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer'>Checkout</p>
                    <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer'>Shipping</p>
                    <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer'>Q&A</p>
                    <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer'>Privacy Policy</p>
                </div>
            </div>
        </div>

        <div className='w-full flex items-center justify-between py-6'>
            <div className='text-md font-semibold text-gray-500 flex items-center'><FaRegCopyright/> 2024, All rights reserved</div>

            <div className='flex items-center gap-1'>
                <img src='https://res.cloudinary.com/do1xweis7/image/upload/v1721480748/visa_nsaej3.png' alt='visa' className='w-[70px] object-cover'/>
                <img src='https://res.cloudinary.com/do1xweis7/image/upload/v1721480750/master_card_ncd79d.png' alt='master_card' className='w-[70px] object-cover'/>
                <img src='https://res.cloudinary.com/do1xweis7/image/upload/v1721480748/american_express_v8lzdt.png' alt='american_express' className='w-[50px] object-cover'/>
            </div>

            <div className='flex items-center gap-4'>
                <div className='w-[40px] h-[40px] bg-green-500 rounded-full flex items-center justify-center text-2xl text-gray-100 cursor-pointer'><FaFacebookF/></div>
                <div className='w-[40px] h-[40px] bg-green-500 rounded-full flex items-center justify-center text-2xl text-gray-100 cursor-pointer'><FaLinkedinIn/></div>
                <div className='w-[40px] h-[40px] bg-green-500 rounded-full flex items-center justify-center text-2xl text-gray-100 cursor-pointer'><FaInstagram/></div>
                <div className='w-[40px] h-[40px] bg-green-500 rounded-full flex items-center justify-center text-2xl text-gray-100 cursor-pointer'><FaTwitter/></div>
            </div>
        </div>
    </div>
  )
}

export default Footer