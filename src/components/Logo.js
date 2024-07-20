import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className='w-[180px] flex justify-center items-center cursor-pointer' onClick={() => navigate('/')}>
      <img 
          src='https://res.cloudinary.com/do1xweis7/image/upload/v1721220647/groceryish_dq5btv.png'
          className='w-[70px]'
      />
      <div className='flex flex-col justify-center logo'> 
          <div className='text-green-600 font-bold text-xl'>Groceyish</div>
          <div className='uppercase text-sm text-gray-400 font-medium'>Grocery</div>
      </div>
  </div>
  )
}

export default Logo