import React from 'react'
import { useNavigate } from 'react-router-dom'

const MenuItems = () => {
  const navigate = useNavigate();
  
  return (
    <div>
        <div className='text-base font-semibold text-black flex justify-center w-[150px] bg-white border border-gray-300 rounded-md px-4 py-2' onClick={() => navigate('/signup')}>
            Sign Up
        </div>
    </div>
  )
}

export default MenuItems