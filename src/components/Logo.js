import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className='w-[180px] flex justify-center items-center cursor-pointer max-lg:w-[140px] max-sm:[w-110px]' onClick={() => navigate('/')}>
      <img 
          src='https://res.cloudinary.com/do1xweis7/image/upload/v1721220647/groceryish_dq5btv.png'
          className='w-[70px] max-lg:w-[60px] max-sm:w-[40px]'
      />
      <div className='flex flex-col justify-center logo'> 
          <div className='text-green-600 font-bold text-xl max-lg:text-base max-sm:text-sm'>Groceyish</div>
          <div className='uppercase text-sm text-gray-400 font-medium max-lg:text-xs'>Grocery</div>
      </div>
  </div>
  )
}

export default Logo