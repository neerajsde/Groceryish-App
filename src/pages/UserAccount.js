import React, { useContext, useState } from 'react'
import Navbar from '../components/sections/navbar/Navbar'
import Login from '../pages/Login'
import { AppContext } from '../context/AppContext';
import { FaRegUser, FaUser, FaRegHeart, FaHeart } from "react-icons/fa";
import { HiOutlineClipboardCopy, HiClipboardCopy } from "react-icons/hi";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { LuPen } from "react-icons/lu";
import UpdateUser from '../components/user-info/UpdateUser';
import Dashboard from '../components/dashboard/Dashboard';
import Favourites from '../components/dashboard/Favourites';
import Settings from '../components/dashboard/Settings';
import UpdateProfilePic from '../components/user-info/UpdateProfilePic';

const UserAccount = () => {
    const {isUserInfoActive,isLoggedIn, isProfilePic, setProfilePic, updateProfilePic} = useContext(AppContext);
    const [isUserInfo, setIsUserInfo] = useState(true);
    const [isDashboard, setIsDashboard] = useState(false);
    const [isFavoruites, setIsFavoruites] = useState(false);
    const [isSettings, setIsSettings] = useState(false);

  return (
    <div className='w-full'>
        {
            isLoggedIn ?
            (
                <div className='w-full relative'>
                    <Navbar/>

                    <div className='w-full flex border relative user-info'>
                        <div className='w-[300px] h-[80vh] flex flex-col justify-center items-center border-r-2 border-gray-300 gap-8'>
                            <div className='w-full flex justify-center items-center'>
                                <div 
                                    title='Update your profile picture'
                                    className='w-[150px] h-[150px] flex justify-center items-center relative cursor-pointer'
                                    onClick={() => setProfilePic(true)}
                                >
                                    <img src={updateProfilePic} alt='not found' className='w-full h-full border-2 border-sky-700 shadow rounded-full object-cover'/>
                                    <div 
                                        className='absolute bottom-1 right-0 w-[30px] h-[30px] bg-slate-700 text-white flex justify-center items-center rounded-full'
                                    ><LuPen/></div>
                                </div>
                            </div>

                            <div className='w-full flex flex-col justify-start items-center gap-2'>
                                <div 
                                    className={`w-full flex justify-start items-center gap-4 border-r-4 pl-4 py-1 transition-all duration-300 ease-in cursor-pointer hover:text-black ${isUserInfo ? 'border-slate-500 text-black' : 'text-gray-400 border-transparent'}`}
                                    onClick={() => {
                                        setIsUserInfo(true);
                                        setIsDashboard(false);
                                        setIsFavoruites(false);
                                        setIsSettings(false);
                                    }}
                                >
                                    <div className='text-xl font-bold'>{isUserInfo ? (<FaUser/>) : (<FaRegUser/>)}</div>
                                    <p className='text-lg font-semibold'>User Info</p>
                                </div>

                                <div 
                                    className={`w-full flex justify-start items-center gap-4 border-r-4 pl-4 py-1 transition-all duration-300 ease-in cursor-pointer hover:text-black ${isDashboard ? 'border-slate-500 text-black' : 'text-gray-400 border-transparent'}`}
                                    onClick={() => {
                                        setIsUserInfo(false);
                                        setIsDashboard(true);
                                        setIsFavoruites(false);
                                        setIsSettings(false);
                                    }}
                                >
                                    <div className='text-xl font-bold'>{isDashboard ? (<HiClipboardCopy/>) : (<HiOutlineClipboardCopy/>)}</div>
                                    <p className='text-lg font-semibold'>Dashboard</p>
                                </div>

                                <div 
                                    className={`w-full flex justify-start items-center gap-4 border-r-4 pl-4 py-1 transition-all duration-300 ease-in cursor-pointer hover:text-black ${isFavoruites ? 'border-slate-500 text-black' : 'text-gray-400 border-transparent'}`}
                                    onClick={() => {
                                        setIsUserInfo(false);
                                        setIsDashboard(false);
                                        setIsFavoruites(true);
                                        setIsSettings(false);
                                    }}
                                >
                                    <div className='text-xl font-bold'>{isFavoruites ? (<FaHeart/>) : (<FaRegHeart/>)}</div>
                                    <p className='text-lg font-semibold'>Favourites</p>
                                </div>

                                <div 
                                    className={`w-full flex justify-start items-center gap-4 border-r-4 pl-4 py-1 transition-all duration-300 ease-in cursor-pointer hover:text-black ${isSettings ? 'border-slate-500 text-black' : 'text-gray-400 border-transparent'}`}
                                    onClick={() => {
                                        setIsUserInfo(false);
                                        setIsDashboard(false);
                                        setIsFavoruites(false);
                                        setIsSettings(true);
                                    }}
                                >
                                    <div className='text-xl font-bold'>{isSettings ? (<IoSettingsSharp/>) : (<IoSettingsOutline/>)}</div>
                                    <p className='text-lg font-semibold'>Settings</p>
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
                <div className='w-full h-full flex items-center justify-center'>
                    <Login/>
                </div>
            )
        }
    </div>
  )
}

export default UserAccount