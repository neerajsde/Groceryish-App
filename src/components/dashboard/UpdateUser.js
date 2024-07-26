import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { MdSaveAs } from "react-icons/md";
import Spinner2 from '../Spinner';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UpdateUser = () => {
    const {userData, isLoading} = useContext(AppContext);
    const [newPass, setNewPass] = useState(false);
    const [confPass, setConfPass] = useState(false);
    const [formData, setFormData] = useState({
        email:userData.user.email,
        usdCode:'+91',
        mobileNumber:'',
        currPassword:'',
        newPassword:'',
        confirmPassword:'',
        month:'January',
        day:'1',
        year:'2001',
        gender:'male',
        address:'',
        city:'',
        state:'Bihar',
        PineCode:'',
        language:'english'
    })

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const statesOfIndia = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
        "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    function inputHandler(event){
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]:event.target.value
        }))
    }

  return (
    <div className='w-full h-[90vh] flex flex-col gap-8 px-12 py-8 overflow-y-scroll'>
        <h2 className='text-2xl font-bold'>User Profile</h2>
        <div className='w-full flex flex-wrap items-end justify-evenly gap-y-4'>
            <div className='w-full max-w-[40%] flex flex-col gap-1'>
                <p className='text-base text-gray-400'>Username</p>
                <div
                    className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none bg-gray-200 cursor-not-allowed'
                >{userData.user.name}</div>
            </div>

            <label className='w-full max-w-[40%] flex flex-col gap-1'>
                <p className='text-base text-gray-400'>Current Password</p>
                <input
                    type='text'
                    name='currPassword'
                    value={formData.currPassword}
                    onChange={inputHandler}
                    className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                />
            </label>

            <div className='w-full max-w-[40%] flex flex-col gap-1'>
                <p className='text-base text-gray-400'>Email</p>
                <div
                    className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none bg-gray-200 cursor-not-allowed'
                >{userData.user.email}</div>
            </div>

            <label className='w-full max-w-[40%] flex flex-col gap-1 relative'>
                <p className='text-base text-gray-400'>New Password</p>
                <input
                    type={newPass ? 'text' : 'password'}
                    name='newPassword'
                    value={formData.newPassword}
                    onChange={inputHandler}
                    className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                />
                <div
                    onClick={() => setNewPass(!newPass)}
                    className='absolute bottom-3 right-2 text-2xl text-gray-400 cursor-pointer transition duration-300 ease-in hover:text-gray-700'
                >{newPass ? (<FaEyeSlash/>) : (<FaEye/>)}</div>
            </label>

            <label className='w-full max-w-[40%] flex flex-col gap-1'>
                <p className='text-base text-gray-400'>Mobile Number</p>
                <div
                    className='w-full flex items-center gap-2'
                >
                    <select
                        name='usdCode'
                        value={formData.usdCode}
                        onChange={inputHandler}
                        className='w-[150px] border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                    >
                        <option value='+91'>+91</option>
                    </select>
                    
                    <input
                        type='number'
                        name='mobileNumber'
                        value={formData.mobileNumber}
                        onChange={inputHandler}
                        className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                    />
                </div>
            </label>

            <label className='w-full max-w-[40%] flex flex-col gap-1 relative'>
                <p className='text-base text-gray-400'>Confirm Password</p>
                <input
                    type={confPass ? 'text' : 'password'}
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={inputHandler}
                    className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                />
                <div
                    onClick={() => setConfPass(!confPass)}
                    className='absolute bottom-3 right-2 text-2xl text-gray-400 cursor-pointer transition duration-300 ease-in hover:text-gray-700'
                >{confPass ? (<FaEyeSlash/>) : (<FaEye/>)}</div>
            </label>

            <label className='w-full max-w-[40%] flex flex-col gap-1'>
                <p className='text-base text-gray-400'>Birthday</p>
                <div
                    className='w-full flex items-center gap-2'
                >
                    <select name='month'
                        value={formData.month}
                        onChange={inputHandler}
                        className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                    >
                        {months.map((month, index) => {
                            return (
                                <option key={index} value={month}>{month}</option>
                            )
                        })}
                    </select>

                    <select name='day'
                        value={formData.day}
                        onChange={inputHandler}
                        className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                    >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>

                    <select name='year'
                        value={formData.year}
                        onChange={inputHandler}
                        className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                    >
                        {Array.from({ length: 2030 - 1900 + 1 }, (_, i) => 1900 + i).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </label>

            <label className='w-full max-w-[40%] flex flex-col gap-1'>
                <p className='text-base text-gray-400'>Gender</p>
                <select
                    name='gender'
                    onChange={inputHandler}
                    value={formData.gender}
                    className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                >
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                </select>
            </label>

            <label className='w-full max-w-[40%] flex flex-col gap-1'>
                <p className='text-base text-gray-400'>Address</p>
                <input
                    type='text'
                    name='address'
                    value={formData.address}
                    onChange={inputHandler}
                    className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                />
            </label>

            <label className='w-full max-w-[40%] flex flex-col gap-1'>
                <p className='text-base text-gray-400'>City</p>
                <input
                    type='text'
                    name='city'
                    value={formData.city}
                    onChange={inputHandler}
                    className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                />
            </label>

            <label className='w-full max-w-[40%] flex flex-col gap-1'>
                <p className='text-base text-gray-400'>State</p>
                <select name='state'
                    value={formData.state}
                    onChange={inputHandler}
                    className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                >
                    {
                        statesOfIndia.map((state) => {
                            return (
                            <option value={state}>{state}</option>
                            )
                        })
                    }
                </select>
            </label>

            <label className='w-full max-w-[40%] flex flex-col gap-1'>
                <p className='text-base text-gray-400'>Pine Code</p>
                <input
                    type='text'
                    name='PineCode'
                    value={formData.PineCode}
                    onChange={inputHandler}
                    className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                />
            </label>

            <label className='w-full max-w-[40%] flex flex-col gap-1'>
                <p className='text-base text-gray-400'>Language</p>
                <select name='language'
                    value={formData.language}
                    onChange={inputHandler}
                    className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                >
                    <option value='english'>English</option>
                    <option value='hindi'>Hindi</option>
                </select>
            </label>

            <button
                className='w-full max-w-[40%] flex justify-center items-center gap-3 text-xl text-white font-semibold border-2 border-gray-700 bg-gray-500 py-1 px-4 rounded-md'
            >Save Changes {isLoading ? (<Spinner2/>) : (<MdSaveAs/>)}</button>
        </div>
    </div>
  )
}

export default UpdateUser