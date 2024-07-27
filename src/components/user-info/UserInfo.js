import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { FaUserEdit } from "react-icons/fa";
import { MdLogout, MdSwitchAccount } from "react-icons/md";
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { IoMdAddCircleOutline } from "react-icons/io";

const UserInfo = () => {
  const {setIsLoggedIn, setUserData, setIsUserInfoActive, setIsSellProduct} = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className='w-[300px] border border-black bg-[rgba(223,250,239,0.5)] backdrop-blur rounded-2xl flex justify-center items-center shadow-lg max-lg:mt-[3rem]'
      onMouseEnter={() =>  setIsUserInfoActive(true)}
      onMouseLeave={() =>  setIsUserInfoActive(false)}
    >
      <div className='w-full p-4 text-sm flex flex-col items-start gap-2 text-black font-semibold'>

        <div 
          className='w-full border-b border-gray-600 flex justify-between items-center py-2 px-1 text-base font-medium cursor-pointer'
          onClick={() => navigate('/user-account')}
        >
          <div className='text-black font-semibold hover:underline'>Your Account</div>
          <div className='text-xl'><FaUserEdit/></div>
        </div>

        <div className='pl-1 hover:underline cursor-pointer'>Your Orders</div>
        <div className='pl-1 hover:underline cursor-pointer'>Your Address</div>
        <div className='pl-1 hover:underline cursor-pointer'>Payment Options</div>

        <div className='pl-1 hover:underline cursor-pointer'>Your Recommendecations</div>

        <div className='pl-1 hover:underline cursor-pointer'>Your History</div>
        <div className='w-full flex flex-col items-center gap-2 border-t border-black py-2 px-1'>
          <div 
            className='w-full flex justify-between items-center text-base font-semibold rounded cursor-pointer hover:underline'
            onClick={() => setIsSellProduct(true)}
          >Sell your product<IoMdAddCircleOutline className='text-xl'/></div>

          <div 
            className='w-full flex justify-between items-center text-base font-semibold rounded cursor-pointer hover:underline'
            onClick={() => {
              setIsUserInfoActive(false);
              navigate('/login');
            }}>
            <div>Switch Accounts</div>
            <div className='text-xl'><MdSwitchAccount/></div>
          </div>
          
          <div 
            className='w-full flex justify-between items-center text-base font-semibold rounded cursor-pointer hover:underline'
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