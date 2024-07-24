import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const ShowUserName = () => {
    const { userData, isUserInfoActive, setIsUserInfoActive, updateProfilePic } = useContext(AppContext);
  return (
    <div className={`border-2 border-transparent rounded-sm cursor-pointer`}
        onMouseEnter={() =>  setIsUserInfoActive(true)}
        onMouseLeave={() =>  setIsUserInfoActive(false)}
    >
        <div className='flex gap-2 justify-center items-center max-sm:gap-1 max-sm:justify-between'>
            <div className='w-[45px] h-[45px] border-2 border-green-500 rounded-full max-sm:w-[35px] max-sm:h-[35px]'>
                <img src={updateProfilePic} alt='Not Found' className='w-full h-full rounded-full object-cover'/>
            </div>
            <div className='flex flex-col justify-center'>
                <p className='text-xs font-medium text-black'>Hello, {userData.user.name.split(' ')[0]}</p>
                <div className='flex items-center text-sm font-semibold text-black'>
                    <div className='max-sm:text-sm'>Account & Lists</div>
                    {
                        isUserInfoActive ? 
                        (<IoMdArrowDropup className='text-xl'/>):
                        (<IoMdArrowDropdown className='text-xl'/>)
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShowUserName