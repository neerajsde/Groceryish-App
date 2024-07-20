import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { IoSearch, IoClose } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import Logo from './Logo';
import UserInfo from './UserInfo';

const Navbar = () => {
    const { isLoggedIn, cartItem, userData, isUserInfoActive, setIsUserInfoActive, updateProfilePic } = useContext(AppContext);
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState({
        search: '',
        category: 'all'
    });

    function inputHandler(event) {
        setSearchInput((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    function handleSearch() {
        // Implement your search logic here
        console.log("Search term:", searchInput.search);
        console.log("Selected category:", searchInput.category);
    }

    const category = ['Vegitables','Fruits', 'Coffe & teas','Baby', 'Beauty', 'Gift Cards', 'Toys & Gaming'];

    return (
        <nav className='w-full h-[80px] flex justify-evenly items-center bg-white text-slate-600 border border-b-[1.5px] border-slate-200'>
            <Logo/>

            <div className='w-[500px] h-[45px] flex justify-center items-center rounded-lg relative'>
                <select name='category' className=' h-full rounded-l-md bg-gray-200 border-none outline-none px-1 text-sm font-semibold text-black' onChange={inputHandler}>
                    <option value='all'>All Categories</option>
                    {
                        category.map((item, index) => {
                            return (
                                <option key={index} value={item}>{item}</option>
                            )
                        })
                    }
                </select>
                <div className='h-full flex items-center bg-gray-200 px-1'><div className='w-[2px] h-[50%] bg-gray-400 border border-gray-400 rounded-full'></div></div>
                <input
                    type='text'
                    name='search'
                    placeholder='Search for items...'
                    value={searchInput.search}
                    onChange={inputHandler}
                    className='w-full h-full text-black outline-none px-2 pr-8 text-base font-semibold bg-gray-200'
                />
                {searchInput.search && (
                    <div
                        className='absolute top-[0.65rem] right-[3.2rem] text-2xl font-bold cursor-pointer text-blue-500'
                        onClick={() => setSearchInput((prevData) => ({
                            ...prevData,
                            search: ''
                        }))}
                    >
                        <IoClose />
                    </div>
                )}
                <button
                    className='w-[80px] h-full text-white bg-green-600 flex justify-center items-center text-2xl rounded-r-md transition duration-300 ease-in hover:bg-green-600'
                    onClick={handleSearch}
                >
                    <IoSearch />
                </button>
            </div>
            
            <div className='flex justify-center items-center gap-2 cursor-pointer'>
                <div className='font-bold text-black relative'>
                    <FaRegHeart className='text-3xl'/>
                    {
                        isLoggedIn && (
                            <div className='absolute top-[-8px] right-[-10px] w-[20px] h-[20px] border-2 border-white rounded-full bg-green-600 flex items-center justify-center'>
                                <div className='text-xs text-white'>2</div>
                            </div>
                        )
                    }
                </div>
                <p className='text-base font-semibold text-black'>Wishlist</p>
            </div>
            <div 
                className=' cursor-pointer'
                onClick={() => navigate('/cart')}
            >
                <div className='flex items-center gap-2'>
                    <div className='relative'>
                        <LuShoppingCart className='text-3xl text-black' />
                        {
                            isLoggedIn && cartItem !== 0 && (
                                <div className='absolute top-[-8px] right-[-10px] w-[20px] h-[20px] border-2 border-white rounded-full bg-green-600 flex items-center justify-center'>
                                    <div className='text-xs text-white font-semibold'>{cartItem}</div>
                                </div>
                            )
                        }
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-base font-semibold text-black'>My cart</div>
                        {
                            isLoggedIn && cartItem !== 0 && (
                                <div className='text-xs font-medium text-green-500'>$200</div>
                            )
                        }
                    </div>
                </div>
            </div>

            {isLoggedIn ? 
            (
                <div className={`border-2 border-transparent rounded-sm cursor-pointer`}
                    onMouseEnter={() =>  setIsUserInfoActive(true)}
                    onMouseLeave={() =>  setIsUserInfoActive(false)}
                >
                    <div className='flex gap-2 justify-center items-center'>
                        <div className='w-[45px] h-[45px] border-2 border-green-500 rounded-full'>
                            <img src={updateProfilePic} alt='Not Found' className='w-full h-full rounded-full object-cover'/>
                        </div>
                        <div className='flex flex-col justify-center'>
                            <p className='text-xs font-medium text-black'>Hello, {userData.user.name.split(' ')[0]}</p>
                            <div className='flex items-center text-sm font-semibold text-black'>
                                <div>Account & Lists</div>
                                {
                                    isUserInfoActive ? 
                                    (<IoMdArrowDropup className='text-xl'/>):
                                    (<IoMdArrowDropdown className='text-xl'/>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ) : 
            (
                <button
                    className='text-gray-600 border rounded border-gray-400 px-3 py-1 text-lg font-semibold'
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
            )}


            {
                isUserInfoActive && 
                (
                    <div className='absolute top-[65px] right-[10px] z-10'>
                        <UserInfo/>
                    </div>
                )
            }
        </nav>
    );
};

export default Navbar;