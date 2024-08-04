import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { FaRegHeart, FaUserCircle } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { HiMenuAlt3 } from "react-icons/hi";
import Logo from '../../Logo';
import UserInfo from '../../user-info/UserInfo';
import ShowUserName from '../../user-info/ShowUserName';
import Search from '../../search/Search';
import Location from './Location';
import MenuItems from './MenuItems';

const Navbar = () => {
    const { isLoggedIn, cartItem, isUserInfoActive, userData, cartTotalAmount, wishlistLength } = useContext(AppContext);
    const navigate = useNavigate();
    const [showMenuItems, setMenuItems] = useState(false);
    
    return (
        <nav className='w-full h-[80px] flex justify-between items-center pr-8 bg-white text-slate-600 border border-b-[1.5px] border-slate-200 max-lg:h-[70px] max-sm:h-[60px] max-md:pr-4'>
            <Logo/>
            <div className='max-lg:hidden'><Location/></div>
            <div className='max-lg:hidden'><Search/></div>

            <div className='flex items-center gap-6 max-sm:4'>
                <div className={`flex items-center justify-between gap-6 ${showMenuItems ? 'max-md:absolute max-md:flex-col max-md:w-full max-md:h-full max-md:top-[70px] max-md:left-0 max-md:bg-[#1111] max-md:backdrop-blur max-md:z-20 max-md:justify-start max-sm:top-[60px]':'max-md:hidden'}`}>
                    <div className='w-full lg:hidden md:hidden px-4 py-4 flex justify-between'>
                        <div className='text-xl text-red-700 font-bold'>Menu</div>
                        {
                            isLoggedIn && (<div className='text-base text-green-800 font-semibold flex items-center gap-1'><FaUserCircle/> {userData.user.name.split(' ')[0]}</div>)
                        }
                    </div>
                    <div className='flex justify-between items-center gap-6 max-md:flex-col'>

                        <div className='md:hidden'><MenuItems/></div>
                        
                        <div className='flex justify-center items-center gap-2 cursor-pointer  max-md:flex max-md:justify-center max-md:w-[150px] max-md:bg-white max-md:border max-md:border-gray-300 max-md:rounded-md max-md:px-4 max-md:py-2' onClick={() => navigate('/wishlist')}>
                            <div className='font-bold text-black relative'>
                                <FaRegHeart className='text-3xl max-lg:text-2xl'/>
                                {
                                    isLoggedIn && wishlistLength > 0 && (
                                        <div className='absolute top-[-8px] right-[-10px] w-[20px] h-[20px] border-2 border-white rounded-full bg-green-600 flex items-center justify-center max-md:border-green-600 max-md:bg-white'>
                                            <div className='text-xs text-white max-md:text-green-500'>{wishlistLength}</div>
                                        </div>
                                    )
                                }
                            </div>
                            <p className='text-base font-semibold text-black'>Wishlist</p>
                        </div>
                        
                        <div 
                            className='cursor-pointer max-md:hidden'
                            onClick={() => navigate('/cart')}
                        >
                            <div className='flex items-center gap-2 md:gap-3'>
                                <div className='relative'>
                                    <LuShoppingCart className='text-3xl text-black max-lg:text-2xl' />
                                    {
                                        cartItem !== 0 && (
                                            <div className='absolute top-[-8px] right-[-10px] w-[20px] h-[20px] border-2 border-white rounded-full bg-green-600 flex items-center justify-center'>
                                                <div className='text-xs text-white font-semibold'>{cartItem}</div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='flex flex-col items-end'>
                                    <div className='text-base font-semibold text-black'>Cart</div>
                                    {
                                        isLoggedIn && cartItem !== 0 && cartTotalAmount && (
                                            <div className='text-xs font-medium text-green-500'>{`₹${Math.round((cartTotalAmount.totalAmount + cartTotalAmount.discountAmount) * 100) / 100}`}</div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isLoggedIn ? 
                    (
                        <div className='max-lg:hidden'><ShowUserName/></div>
                    ) : 
                    (
                        <button
                            className='text-gray-600 border rounded border-gray-400 px-3 py-1 text-lg font-semibold max-sm:text-sm'
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    )
                }

                <div className={`text-black text-2xl lg:hidden md:hidden`} onClick={() => setMenuItems(!showMenuItems)}>
                    {
                        !showMenuItems ?
                        (<HiMenuAlt3/>) :
                        (<IoClose/>)
                    }
                </div>

                {
                    isLoggedIn && (
                        <div className='relative lg:hidden md:hidden' onClick={() => navigate('/wishlist')}>
                            <FaRegHeart className='text-2xl text-black'/>
                            <div className='absolute top-[-8px] right-[-10px] w-[20px] h-[20px] border-2 border-white rounded-full bg-green-600 flex items-center justify-center'>
                                <div className='text-xs text-white font-semibold'>{wishlistLength}</div>
                            </div>
                        </div>
                    )
                }

                <div className='relative lg:hidden' onClick={() => navigate('/cart')}>
                    <LuShoppingCart className='text-2xl text-black'/>
                    { cartItem > 0 &&
                        <div className='absolute top-[-8px] right-[-10px] w-[20px] h-[20px] border-2 border-white rounded-full bg-green-600 flex items-center justify-center'>
                            <div className='text-xs text-white font-semibold'>{cartItem}</div>
                        </div>
                    }
                </div>

                {
                    isLoggedIn && (<div className='lg:hidden max-sm:hidden'><Location/></div>)
                }
            </div>

            {
                isUserInfoActive && 
                (
                    <div className='absolute top-[65px] right-[10px] z-10 max-sm:top[70px]'>
                        <UserInfo/>
                    </div>
                )
            }
        </nav>
    );
};

export default Navbar;