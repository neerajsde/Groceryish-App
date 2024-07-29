import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/sections/navbar/Navbar';
import Footer from '../components/sections/Footer';
import { AppContext } from '../context/AppContext';
import { FaRegUser, FaUser, FaRegHeart, FaHeart } from "react-icons/fa";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { MdOutlineDashboard, MdDashboard } from "react-icons/md";
import { LuPen } from "react-icons/lu";
import UpdateUser from '../components/dashboard/UpdateUser';
import Dashboard from '../components/dashboard/Dashboard';
import Favourites from '../components/dashboard/Favourites';
import Settings from '../components/dashboard/Settings';
import UpdateProfilePic from '../components/user-info/UpdateProfilePic';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';

const UserAccount = () => {
    const {isUserInfoActive,isLoggedIn, isProfilePic, setProfilePic, updateProfilePic} = useContext(AppContext);
    const [isDashboard, setIsDashboard] = useState(true);
    const [isUserInfo, setIsUserInfo] = useState(false);
    const [isFavoruites, setIsFavoruites] = useState(false);
    const [isSettings, setIsSettings] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Dashboard';
    },[]);

  return (
    <div className='w-full'>
        <Navbar/>
        <SearchBar/>
        {
            isLoggedIn ?
            (
                <div className='w-full relative'>

                    <div className='w-full flex border relative user-info max-sm:flex-col'>
                        <div className='w-[300px] h-[90vh] flex flex-col justify-center items-center border-r-2 border-gray-300 gap-8 max-sm:w-full max-sm:h-full max-sm:gap-4 max-sm:pt-4'>
                            <div className='w-full flex justify-center items-center'>
                                <div 
                                    title='Update your profile picture'
                                    className='w-[150px] h-[150px] flex justify-center items-center relative cursor-pointer max-lg:w-[120px] max-lg:h-[120px]'
                                    onClick={() => setProfilePic(true)}
                                >
                                    <img src={updateProfilePic} alt='not found' className='w-full h-full border-2 border-sky-700 shadow rounded-full object-cover'/>
                                    <div 
                                        className='absolute bottom-1 right-0 w-[30px] h-[30px] bg-slate-700 text-white flex justify-center items-center rounded-full'
                                    ><LuPen/></div>
                                </div>
                            </div>

                            <div className='w-full flex flex-col justify-start items-center gap-2 max-sm:flex-row max-sm:border max-sm:py-2 max-sm:bg-green-100'>
                                <div 
                                    className={`w-full flex justify-start items-center gap-4 border-r-4 pl-4 py-1 transition-all duration-300 ease-in cursor-pointer hover:text-black ${isDashboard ? 'border-slate-500 text-black' : 'text-gray-400 border-transparent'} max-sm:border-none max-sm:justify-center`}
                                    onClick={() => {
                                        setIsDashboard(true);
                                        setIsUserInfo(false);
                                        setIsFavoruites(false);
                                        setIsSettings(false);
                                    }}
                                >
                                    <div className='text-xl font-bold'>{isDashboard ? (<MdDashboard/>) : (<MdOutlineDashboard/>)}</div>
                                    <p className='text-lg font-semibold max-sm:hidden'>Dashboard</p>
                                </div>

                                <div 
                                    className={`w-full flex justify-start items-center gap-4 border-r-4 pl-4 py-1 transition-all duration-300 ease-in cursor-pointer hover:text-black ${isUserInfo ? 'border-slate-500 text-black' : 'text-gray-400 border-transparent'} max-sm:border-none max-sm:justify-center`}
                                    onClick={() => {
                                        setIsDashboard(false);
                                        setIsUserInfo(true);
                                        setIsFavoruites(false);
                                        setIsSettings(false);
                                    }}
                                >
                                    <div className='text-xl font-bold'>{isUserInfo ? (<FaUser/>) : (<FaRegUser/>)}</div>
                                    <p className='text-lg font-semibold max-sm:hidden'>User Details</p>
                                </div>

                                <div 
                                    className={`w-full flex justify-start items-center gap-4 border-r-4 pl-4 py-1 transition-all duration-300 ease-in cursor-pointer hover:text-black ${isFavoruites ? 'border-slate-500 text-black' : 'text-gray-400 border-transparent'} max-sm:border-none max-sm:justify-center`}
                                    onClick={() => {
                                        setIsUserInfo(false);
                                        setIsDashboard(false);
                                        setIsFavoruites(true);
                                        setIsSettings(false);
                                    }}
                                >
                                    <div className='text-xl font-bold'>{isFavoruites ? (<FaHeart/>) : (<FaRegHeart/>)}</div>
                                    <p className='text-lg font-semibold max-sm:hidden'>Favourites</p>
                                </div>

                                <div 
                                    className={`w-full flex justify-start items-center gap-4 border-r-4 pl-4 py-1 transition-all duration-300 ease-in cursor-pointer hover:text-black ${isSettings ? 'border-slate-500 text-black' : 'text-gray-400 border-transparent'} max-sm:border-none max-sm:justify-center`}
                                    onClick={() => {
                                        setIsUserInfo(false);
                                        setIsDashboard(false);
                                        setIsFavoruites(false);
                                        setIsSettings(true);
                                    }}
                                >
                                    <div className='text-xl font-bold'>{isSettings ? (<IoSettingsSharp/>) : (<IoSettingsOutline/>)}</div>
                                    <p className='text-lg font-semibold max-sm:hidden'>Settings</p>
                                </div>
                            </div>
                        </div>

                        <div className='w-full'>
                            {isUserInfo && (<UpdateUser/>)}
                            {isDashboard && (<Dashboard/>)}
                            {isFavoruites && (<Favourites/>)}
                            {isSettings && (<Settings/>)}
                        </div>

                        {
                            isUserInfoActive &&
                            (
                                <div className={`w-full min-h-screen absolute top-0 left-0 bg-black opacity-70 backdrop-blur`}></div>
                            )
                        }
                    </div>

                    {isProfilePic && (<UpdateProfilePic/>)}
                </div>
            ): 
            (
                <div className='w-full h-[50vh] flex flex-col items-center justify-center gap-4'>
                    <div className='text-base font-semibold'>Please log in to see your profile...</div>
                    <button className='text-lg font-bold border-2 px-4 border-gray-500 rounded' onClick={() => navigate('/login')}>Login</button>
                </div>
            )
        }
        <Footer/>
    </div>
  )
}

export default UserAccount