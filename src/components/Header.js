import React, { useContext } from 'react'
import { LuHome, LuPercent, LuMegaphone } from "react-icons/lu";
import { HiOutlineFire } from "react-icons/hi2";
import { FiPhone } from "react-icons/fi";
import { AppContext } from '../context/AppContext';

const Header = () => {
    const {menuItemsDetector, setMenuItemsDetector} = useContext(AppContext);

  return (
        <div className='w-full h-[60px] flex justify-between items-center px-10 bg-white'>
            <div className='bg-green-600 flex justify-center items-center px-3 py-2 gap-2'>
                <div className='w-[22px] h-[22px] grid grid-rows-2 grid-cols-2 justify-start items-center'>
                    <div className='w-[9px] h-[9px] border-[1.6px] border-white'></div>
                    <div className='w-[9px] h-[9px] border-[1.6px] border-white'></div>
                    <div className='w-[9px] h-[9px] border-[1.6px] border-white'></div>
                    <div className='w-[9px] h-[9px] border-[1.6px] border-white'></div>
                </div>
                <div className='text-sm font-semibold text-gray-200'>Brows all Categories</div>
            </div>

            <div className='flex items-center justify-between gap-8'>
                <div className={`flex items-center gap-1 cursor-pointer ${menuItemsDetector[0] ? 'text-green-500' : 'text-gray-600'}`} onClick={() => setMenuItemsDetector([true, false, false, false])}>
                    <LuHome className='text-lg'/>
                    <div className='text-base font-semibold'>Home</div>
                </div>

                <div className={`flex items-center gap-1 cursor-pointer ${menuItemsDetector[1] ? 'text-green-500' : 'text-gray-600'}`} onClick={() => setMenuItemsDetector([false, true, false, false])}>
                    <HiOutlineFire className='text-lg'/>
                    <div className='text-base font-semibold'>Hot deals</div>
                </div>

                <div className={`flex items-center gap-1 cursor-pointer ${menuItemsDetector[2] ? 'text-green-500' : 'text-gray-600'}`} onClick={() => setMenuItemsDetector([false, false, true, false])}>
                    <LuPercent className='text-lg'/>
                    <div className='text-base font-semibold'>Permontions</div>
                </div>

                <div className={`flex items-center gap-1 cursor-pointer ${menuItemsDetector[3] ? 'text-green-500' : 'text-gray-600'}`} onClick={() => setMenuItemsDetector([false, false, false, true])}>
                    <LuMegaphone className='text-lg'/>
                    <div className='text-base font-semibold'>New Products</div>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <div className='flex text-green-600 items-center gap-1 text-lg font-semibold cursor-pointer'>
                    <FiPhone/>
                    <div className='text-lg'>1233-7777</div>
                </div>
                <div className='text-base font-semibold text-gray-600'>24/7 support center</div>
            </div>
        </div>
  )
}

export default Header