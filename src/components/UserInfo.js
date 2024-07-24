import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { FaUserEdit } from "react-icons/fa";
import { MdLogout, MdSwitchAccount } from "react-icons/md";
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { IoMdAddCircleOutline } from "react-icons/io";

const UserInfo = () => {
  const {setIsLoggedIn, setUserData, setIsUserInfoActive, setIsSellProduct} = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className='w-[300px] border border-black bg-white rounded-sm flex justify-center items-center shadow-lg max-lg:mt-[3rem]'
      onMouseEnter={() =>  setIsUserInfoActive(true)}
      onMouseLeave={() =>  setIsUserInfoActive(false)}
    >
      <div className='w-full p-4 text-sm gap-3'>

        <div 
          className='w-full border border-gray-500 flex justify-between items-center py-2 px-4 text-base font-medium bg-gray-300 rounded cursor-pointer transition duration-200 ease-in hover:bg-gray-400'
          onClick={() => navigate('/user-account')}
        >
          <div>Your Account</div>
          <div className='text-xl'><FaUserEdit/></div>
        </div>

        <div className='pl-1 hover:underline hover:text-red-500 cursor-pointer'>Your Orders</div>
        <div className='pl-1 hover:underline hover:text-red-500 cursor-pointer'>Your Address</div>
        <div className='pl-1 hover:underline hover:text-red-500 cursor-pointer'>Payment Options</div>

        <div className='pl-1 hover:underline hover:text-red-500 cursor-pointer'>Your Recommendecations</div>

        <div className='pl-1 hover:underline hover:text-red-500 cursor-pointer'>Your History</div>

        <div className='w-full h-[1px] bg-gray-400 mt-3 mb-3'></div>
        <div className='w-full flex flex-col items-center gap-3'>
          <div 
            className='flex items-center gap-2 border-2 border-green-600 rounded-sm bg-green-500 py-1 px-4 text-lg font-semibold text-white hover:underline cursor-pointer'
            onClick={() => setIsSellProduct(true)}
          ><IoMdAddCircleOutline className='text-2xl'/> Sell your product</div>

          <div 
            className='w-full border border-gray-500 flex justify-between items-center py-2 px-4 text-base font-medium rounded cursor-pointer transition duration-200 ease-in hover:bg-gray-400 gap-1'
            onClick={() => {
              setIsUserInfoActive(false);
              navigate('/login');
            }}>
            <div>Switch Accounts</div>
            <div className='text-xl'><MdSwitchAccount/></div>
          </div>
          
          <div 
            className='w-full text-red-500 border border-gray-500 flex justify-between items-center py-2 px-4 text-base font-medium rounded cursor-pointer transition duration-200 ease-in hover:bg-gray-200 gap-1'
            onClick={() => {
              setIsLoggedIn(false);
              setUserData(null);
              setIsUserInfoActive(false);
              navigate('/');
              toast.success('signed out successfully');
            }}
          >
            <div>Sign Out</div>
            <div className='text-xl'><MdLogout/></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo