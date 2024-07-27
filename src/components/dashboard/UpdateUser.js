import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { MdSaveAs } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Spinner from '../Spinner';

const UpdateUser = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5050/api/v1';
    const {userData, setUserData} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [newPass, setNewPass] = useState(false);
    const [confPass, setConfPass] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [sucess, setSucess] = useState('');
    const [formData, setFormData] = useState({
        name:userData.user.name,
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

    const updateUserDetail = async() => {
        if(formData.newPassword !== formData.confirmPassword){
            setSubmitError('Password not match to conform password');
            return;
        }
        try{
            setIsLoading(true);
            setSucess('');
            setSubmitError('');
            const url = `${baseUrl}/user/update`;
            const response = await fetch(url, {
                method: 'PUT', // Specify the request method
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer your-token',
                },
                body: JSON.stringify({
                    user_id:userData.user._id,
                    name:formData.name,
                    mobile_no:`${formData.usdCode} ${formData.mobileNumber}`,
                    dob:`${formData.month}-${formData.day}-${formData.year}`,
                    address:`${formData.address}, ${formData.city}, ${formData.state}, ${formData.PineCode}`,
                    curr_password:formData.currPassword, 
                    new_password: formData.confirmPassword, 
                    gender:formData.gender
                })
            });

            const data = await response.json();
            if(data.success){
                setSubmitError('');
                setSucess(data.message);
                setUserData(data);
            }
            else{
                setSucess('');
                setSubmitError(data.message);
            }
        } catch(err){
            setSubmitError('something went wrong');
        }
        finally{
            setIsLoading(false);
        }
    }

  return (
    <div className='w-full h-[90vh] flex flex-col gap-4 px-12 py-8 overflow-y-scroll max-sm:px-4 max-sm:py-4 max-sm:h-full max-sm:overflow-y-hidden'>
        <h2 className='text-2xl font-bold max-sm:text-md'>Update your profile</h2>
        {
            submitError !== '' && (
                <div className='w-full border border-red-700 bg-red-200 text-sm font-semibold px-4 py-1'>{submitError}</div>
            )
        }

        {
            sucess !== '' && (
                <div className='w-full border border-green-600 bg-green-200 text-sm font-semibold px-4 py-1'>{sucess}</div>
            )
        }
        <div className='w-full flex justify-between gap-10 px-8 max-lg:gap-6 max-lg:px-0 max-md:flex-col'>
            <div className='w-full flex flex-col items-center gap-4'>
                <div className='w-full flex flex-col gap-1'>
                    <p className='text-base text-gray-400'>User ID</p>
                    <div
                        className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none bg-gray-200 cursor-not-allowed'
                    >{userData.user.user_id}</div>
                </div>

                <div className='w-full flex flex-col gap-1'>
                    <p className='text-base text-gray-400'>Email</p>
                    <div
                        className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none bg-gray-200 cursor-not-allowed'
                    >{userData.user.email}</div>
                </div>

                <label className='w-full flex flex-col gap-1'>
                    <p className='text-base text-gray-400'>Full Name</p>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={inputHandler}
                        className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                    />
                </label>

                <label className='w-full flex flex-col gap-1'>
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

                <label className='w-full flex flex-col gap-1'>
                    <p className='text-base text-gray-400'>Address</p>
                    <input
                        type='text'
                        name='address'
                        value={formData.address}
                        onChange={inputHandler}
                        className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                    />
                </label>

                <label className='w-full flex flex-col gap-1'>
                    <p className='text-base text-gray-400'>City</p>
                    <input
                        type='text'
                        name='city'
                        value={formData.city}
                        onChange={inputHandler}
                        className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                    />
                </label>

                <label className='w-full flex flex-col gap-1'>
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
            </div>

            <div className='w-full flex flex-col items-center gap-4'>
                <label className='w-full flex flex-col gap-1'>
                    <p className='text-base text-gray-400'>Current Password</p>
                    <input
                        type='text'
                        name='currPassword'
                        value={formData.currPassword}
                        onChange={inputHandler}
                        className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                    />
                </label>

                <label className='w-full flex flex-col gap-1 relative'>
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

                <label className='w-full flex flex-col gap-1 relative'>
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

                <label className='w-full flex flex-col gap-1'>
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

                <label className='w-full flex flex-col gap-1'>
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

                <label className='w-full flex flex-col gap-1'>
                    <p className='text-base text-gray-400'>Pine Code</p>
                    <input
                        type='number'
                        name='PineCode'
                        value={formData.PineCode}
                        onChange={inputHandler}
                        className='w-full border-2 border-gray-300 px-4 py-2 rounded-md outline-none focus:border-gray-700'
                    />
                </label>

                <button
                    className='w-full flex justify-center items-center gap-3 text-xl text-white font-semibold border-2 border-gray-700 bg-gray-500 py-1 px-4 rounded-md lg:mt-6'
                    onClick={() => updateUserDetail()}
                >Save Changes {isLoading ? (<Spinner/>) : (<MdSaveAs/>)}</button>
            </div>
        </div>
    </div>
  )
}

export default UpdateUser