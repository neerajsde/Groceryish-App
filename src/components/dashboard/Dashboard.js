import React from 'react'
import { BsBoxes, BsBoxSeamFill } from "react-icons/bs";
import { FaMapLocationDot, FaHeadset } from "react-icons/fa6";
import { IoMdWallet } from "react-icons/io";
import { FaCcAmazonPay } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className='w-full flex flex-col items-center gap-8 p-8'>
      <div className='w-full flex flex-wrap justify-start items-center gap-4'>
        <div className='w-full max-w-[300px] flex justify-between items-start border border-gray-300 gap-4 p-4 rounded-md cursor-pointer transition duration-200 ease-in hover:bg-gray-200'>
          <div className='text-5xl text-yellow-600'>
            <BsBoxes/>
          </div>
          <div className=''>
            <h2 className='text-lg font-semibold'>Your Orders</h2>
            <p className='text-md font-normal'>Track, return, or buy things again</p>
          </div>
        </div>

        <div className='w-full max-w-[300px] flex justify-between items-start border border-gray-300 gap-4 p-4 rounded-md cursor-pointer transition duration-200 ease-in hover:bg-gray-200'>
          <div className='text-5xl text-red-600'>
            <BsBoxSeamFill/>
          </div>
          <div className=''>
            <h2 className='text-lg font-semibold'>Prime</h2>
            <p className='text-md font-normal'>View benefits and payment settings</p>
          </div>
        </div>

        <div className='w-full max-w-[300px] flex justify-between items-start border border-gray-300 gap-4 p-4 rounded-md cursor-pointer transition duration-200 ease-in hover:bg-gray-200'>
          <div className='text-5xl text-blue-500'>
            <IoMdWallet/>
          </div>
          <div className=''>
            <h2 className='text-lg font-semibold'>Your Wallets</h2>
            <p className='text-md font-normal'>Edit Addresses for orders and gifts</p>
          </div>
        </div>

        <div className='w-full max-w-[300px] flex justify-between items-start border border-gray-300 gap-4 p-4 rounded-md cursor-pointer transition duration-200 ease-in hover:bg-gray-200'>
          <div className='text-5xl text-slate-500'>
            <FaCcAmazonPay/>
          </div>
          <div className=''>
            <h2 className='text-lg font-semibold'>Payment Options</h2>
            <p>Edit or add payment methods</p>
          </div>
        </div>

        <div className='w-full max-w-[300px] flex justify-between items-start border border-gray-300 gap-4 p-4 rounded-md cursor-pointer transition duration-200 ease-in hover:bg-gray-200'>
          <div className='text-5xl text-orange-500'>
            <FaMapLocationDot/>
          </div>
          <div className=''>
            <h2 className='text-lg font-semibold'>Your Addresses</h2>
            <p className='text-md font-normal'>Edit Addresses for orders and gifts</p>
          </div>
        </div>

        <div className='w-full max-w-[300px] flex justify-start items-start border border-gray-300 gap-4 p-4 rounded-md cursor-pointer transition duration-200 ease-in hover:bg-gray-200'>
          <div className='text-5xl text-green-500'>
            <FaHeadset/>
          </div>
          <div className=''>
            <h2 className='text-lg font-semibold'>Contact Us</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard