import React, { useContext } from 'react'
import { LuHome, LuPercent, LuMegaphone } from "react-icons/lu";
import { HiOutlineFire } from "react-icons/hi2";
import { FiPhone } from "react-icons/fi";
import { AppContext } from '../../context/AppContext';
import { GoHomeFill } from "react-icons/go";
import { BsFire } from "react-icons/bs";
import { RiPercentFill } from "react-icons/ri";


const Header = () => {
    const {menuItemsDetector, setMenuItemsDetector} = useContext(AppContext);

  return (
        <div className='w-full h-[60px] flex justify-between items-center px-10 bg-white max-lg:px-4 max-sm:h-[43px] max-lg:bg-green-100'>
            <div className='bg-green-600 flex justify-center items-center px-3 py-2 gap-2 max-lg:hidden'>
                <div className='w-[22px] h-[22px] grid grid-rows-2 grid-cols-2 justify-start items-center'>
                    <div className='w-[9px] h-[9px] border-[1.6px] border-white'></div>
                    <div className='w-[9px] h-[9px] border-[1.6px] border-white'></div>
                    <div className='w-[9px] h-[9px] border-[1.6px] border-white'></div>
                    <div className='w-[9px] h-[9px] border-[1.6px] border-white'></div>
                </div>
                <div className='text-sm font-semibold text-gray-200'>Brows all Categories</div>
            </div>

            <div className='flex items-center justify-between gap-8 max-md:w-full'>
                <div className={`flex items-center gap-1 cursor-pointer py-4 max-sm:py-2 max-lg:flex-col max-lg:gap-0 ${menuItemsDetector[0] ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-600'}`} onClick={() => setMenuItemsDetector([true, false, false, false])}>
                    <div className='text-lg max-sm:text-2xl'>
                        {menuItemsDetector[0] ? (<GoHomeFill/>) : (<LuHome/>)}
                    </div>
                    <div className='text-base font-semibold max-sm:hidden'>Home</div>
                </div>

                <div className={`flex items-center gap-1 cursor-pointer py-4 max-sm:py-2 max-lg:flex-col max-lg:gap-0 ${menuItemsDetector[1] ? 'text-green-500  border-b-2 border-green-500' : 'text-gray-600'}`} onClick={() => setMenuItemsDetector([false, true, false, false])}>
                    <div className='text-lg max-sm:text-2xl'>
                        {menuItemsDetector[1] ? (<BsFire/>) : (<HiOutlineFire/>)}
                    </div>
                    <div className='text-base font-semibold max-sm:hidden'>Hot deals</div>
                </div>

                <div className={`flex items-center gap-1 cursor-pointer py-4 max-sm:py-2 max-lg:flex-col max-lg:gap-0 ${menuItemsDetector[2] ? 'text-green-500  border-b-2 border-green-500' : 'text-gray-600'}`} onClick={() => setMenuItemsDetector([false, false, true, false])}>
                    <div className='text-lg max-sm:text-2xl'>
                        {menuItemsDetector[2] ? (<RiPercentFill/>) : (<LuPercent/>)}
                    </div>
                    <div className='text-base font-semibold max-sm:hidden'>Permontions</div>
                </div>

                <div className={`flex items-center gap-1 cursor-pointer py-4 max-sm:py-2 max-lg:flex-col max-lg:gap-0 ${menuItemsDetector[3] ? 'text-green-500  border-b-2 border-green-500' : 'text-gray-600'}`} onClick={() => setMenuItemsDetector([false, false, false, true])}>
                    <LuMegaphone className='text-lg max-sm:text-2xl'/>
                    <div className='text-base font-semibold max-sm:hidden'>New Products</div>
                </div>
            </div>

            <div className='flex items-center gap-2  max-lg:flex-col max-lg:gap-0 max-md:hidden'>
                <div className='flex text-green-600 items-center gap-1 text-lg font-semibold cursor-pointer'>
                    <FiPhone/>
                    <div className='text-lg'>1233-7777</div>
                </div>
                <div className='text-base font-semibold text-gray-600 '>24/7 support center</div>
            </div>
        </div>
  )
}

export default Header