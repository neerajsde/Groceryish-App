import React from 'react'
import { IoPricetags } from "react-icons/io5";
import { BiRefresh } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { LuMapPin, LuPhone } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { WiTime9 } from "react-icons/wi";
import { FaRegCopyright, FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";

import Logo from './Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='w-full flex flex-col items-center px-12 pt-3 max-md:px-4'>
        <div className='w-full flex items-center justify-between py-6 max-md:py-4 max-sm:flex-col max-sm:gap-4'>
            <div className='flex items-center gap-2 max-sm:gap-4'>
                <div className='text-5xl text-green-500'><IoPricetags/></div>
                <div className='flex flex-col'>
                    <h2 className='text-xl text-slate-700 font-bold max-lg:text-lg'>Best Prices & Deals</h2>
                    <p className='text-base font-semibold text-gray-400 max-lg:text-sm'>Don't miss our daily amazing <br/>deals and prices</p>
                </div>
            </div>
            <div className='flex items-center gap-2  max-sm:gap-4'>
                <div className='text-5xl text-green-500'><BiRefresh/></div>
                <div className='flex flex-col'>
                    <h2 className='text-xl text-slate-700 font-bold max-lg:text-lg'>Refundable</h2>
                    <p className='text-base font-semibold text-gray-400 max-lg:text-sm'>If your items have damage <br/>we agree to refund it</p>
                </div>
            </div>
            <div className='flex items-center gap-2  max-sm:gap-4'>
                <div className='text-5xl text-green-500'><FaShippingFast/></div>
                <div className='flex flex-col'>
                    <h2 className='text-xl text-slate-700 font-bold max-lg:text-lg'>Free Delivery</h2>
                    <p className='text-base font-semibold text-gray-400 max-lg:text-sm'>Do purchase over $50 and <br/>get free delivery anywhere</p>
                </div>
            </div>
        </div>

        <div className='w-full flex justify-between py-10 gap-4 border-t-2 border-t-gray-200 border-b-2 border-b-gray-200 max-md:flex-col max-sm:py-4'>
            <div className='flex flex-col gap-6 max-md:flex-row max-md:items-start max-sm:flex-col max-sm:gap-3 max-sm:justify-center'>
                <div className='max-sm:w-full flex justify-center'><Logo/></div>
                <div className='flex flex-col pl-6 gap-6 max-sm:gap-3'>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center text-md font-bold text-gray-600 gap-1'><span className='text-green-500 text-lg'><LuPhone/></span> Call Us:</div>
                        <div className='text-md font-semibold text-gray-400'>123-777</div>
                    </div>
                    <div className='flex items-center gap-2 max-sm:flex-col max-sm:items-start max-sm:gap-0'>
                        <div className='flex items-center text-md font-bold text-gray-600 gap-1'><span className='text-green-500 text-lg'><LuMapPin/></span> Address:</div>
                        <div className='text-md font-semibold text-gray-400 max-sm:pl-6 max-sm:text-sm'>1762 School House Road</div>
                    </div>
                    <div className='flex items-center gap-2  max-sm:flex-col max-sm:items-start max-sm:gap-0'>
                        <div className='flex items-center text-md font-bold text-gray-600 gap-1'><span className='text-green-500 text-lg'><HiOutlineMail/></span> Email:</div>
                        <div className='text-md font-semibold text-gray-400 max-sm:pl-6 max-sm:text-sm'>groceyish@contact.com</div>
                    </div>
                    <div className='flex items-center gap-2  max-sm:flex-col max-sm:items-start max-sm:gap-0'>
                        <div className='flex items-center text-md font-bold text-gray-600 gap-1'><span className='text-green-500 text-lg'><WiTime9/></span> Work hours:</div>
                        <div className='text-md font-semibold text-gray-400 max-sm:pl-6 max-sm:text-sm'>8:00 - 20:00, Monday - Friday</div>
                    </div>
                </div>
            </div>
            <div className='flex gap-20 max-lg:gap-5 max-md:w-full max-md:justify-evenly max-sm:gap-0'>
                <div className='flex flex-col gap-8 max-md:gap-4'>
                    <h2 className='text-xl font-bold text-gray-600 max-lg:text-lg max-sm:text-base'>Accounts</h2>
                    <div className='flex flex-col gap-4'>
                        <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer max-sm:text-sm'>Whishlist</p>
                        <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer max-sm:text-sm'>Cart</p>
                        <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer max-sm:text-sm'>Track Order</p>
                        <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer max-sm:text-sm'>Shipping Details</p>
                    </div>
                </div>
                <div className='flex flex-col gap-8 max-md:gap-4'>
                    <h2 className='text-xl font-bold text-gray-600 max-lg:text-lg max-sm:text-base'>Useful links</h2>
                    <div className='flex flex-col gap-4'>
                        <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer max-sm:text-sm'>About Us</p>
                        <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer max-sm:text-sm'>Contact</p>
                        <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer max-sm:text-sm'>Hot deals</p>
                        <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer max-sm:text-sm'>Promotions</p>
                        <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer max-sm:text-sm'>New products</p>
                    </div>
                </div>
                <div className='flex flex-col gap-8 max-md:gap-4'>
                    <h2 className='text-xl font-bold text-gray-600 max-lg:text-lg max-sm:text-base'>Payment</h2>
                    <div className='flex flex-col gap-4'>
                        <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer max-sm:text-sm'>Refund</p>
                        <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer max-sm:text-sm'>Checkout</p>
                        <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer max-sm:text-sm'>Shipping</p>
                        <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer max-sm:text-sm'>Q&A</p>
                        <p className='text-md text-gray-500 font-semibold transition duration-200 ease-in hover:text-black cursor-pointer max-sm:text-sm'>Privacy Policy</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='w-full flex items-center justify-between py-6 max-md:py-2 max-sm:flex-col-reverse max-sm:gap-3'>
            <div className='flex flex-col items-center'>
                <div className='text-md font-bold text-gray-500'>Developed By <Link to='https://neeraj-prajapati-portfolio.netlify.app/' target='true' className='text-blue-500'>Mr. Neeraj</Link></div>
                <div className='flex items-center text-md text-gray-400 font-medium'><FaRegCopyright/> 2024, All rights reserved</div>
            </div>

            <div className='flex items-center gap-1 max-md:gap-0'>
                <img src='https://res.cloudinary.com/do1xweis7/image/upload/v1721480748/visa_nsaej3.png' alt='visa' className='w-[70px] object-cover max-sm:w[40px]'/>
                <img src='https://res.cloudinary.com/do1xweis7/image/upload/v1721480750/master_card_ncd79d.png' alt='master_card' className='w-[70px] object-cover max-sm:w[40px]'/>
                <img src='https://res.cloudinary.com/do1xweis7/image/upload/v1721480748/american_express_v8lzdt.png' alt='american_express' className='w-[50px] object-cover max-sm:w[30px]'/>
            </div>

            <div className='flex items-center gap-4 max-md:gap-2 max-sm:w-full max-sm:justify-evenly'>
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