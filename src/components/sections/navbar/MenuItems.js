import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../context/AppContext';

const MenuItems = () => {
  const {isLoggedIn} = useContext(AppContext);
  const navigate = useNavigate();
  
  return (
    <div className='w-full flex flex-col items-center gap-6'>
        <div className='text-base font-semibold text-black flex justify-center w-[150px] bg-white border border-gray-300 rounded-md px-4 py-2' onClick={() => navigate('/signup')}>
            Sign Up
        </div>
        {
          isLoggedIn && (
            <div className='text-base font-semibold text-black flex justify-center w-[150px] bg-white border border-gray-300 rounded-md px-4 py-2' onClick={() => navigate('/user-account')}>
              Dashboard
            </div>
          )
        }
    </div>
  )
}

export default MenuItems