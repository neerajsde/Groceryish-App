import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AppContext } from '../context/AppContext';
import Spinner from '../components/Spinner';
import { MdClose } from "react-icons/md";
import toast from 'react-hot-toast';


const SignUp = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5050/api/v1';
  const {fetch_data, isLoading, emailError,setEmailError, passError, setPassError, error, setError} = useContext(AppContext);
  const navigate = useNavigate();
  const [isPassVisiable, setIsPassVisiable] = useState(false);
  const [isConfPassVisiable, setIsConfPassVisiable] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [formData, setFormData] = useState({
    firstname:'',
    lastname:'',
    email:'',
    mobile_no:'',
    password:'',
    conform_password:'',
    gender:'male',
    address:'',
    city:'',
    state:'Bihar',
    pinecode:'',
    usd_code:'+91'
  });

  function inputHandler(event){
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]:event.target.value
    }))
  }

  useEffect(() => {
    if(formData.conform_password === '' || formData.password === formData.conform_password){
      setIsMatch(true);
    }
    else{
      setIsMatch(false);
    }
  }, [formData.conform_password]);

  let unfilled;
  function checkIfAllFieldsFilled() {
    // Iterate over all keys in formData object
    for (let key in formData) {
      // If any field is empty, return false
      if (formData[key] === '') {
        unfilled = key;
        return false;
      }
    }
    // If all fields are filled, return true
    return true;
  }

  function registerHandler(){
    if(!checkIfAllFieldsFilled()){
      toast.error(`Please enter the ${unfilled}.`);
      setError(`Please enter the ${unfilled}.`);
      return;
    }
    if(formData.password !== formData.conform_password){
      setError('Please correct the confirm password');
      toast.error('Please correct the confirm password');
      return;
    }
    // const url = `${process.env.BASE_URL}user/create`;
    const url = `${baseUrl}/user/create` // this url will be update
    const sendUserData = {
      name:formData.firstname+' '+formData.lastname,
      email:formData.email,
      password:formData.conform_password,
      mobile_no:formData.usd_code+formData.mobile_no,
      gender:formData.gender,
      address:formData.address+', '+formData.city+', '+formData.state+', '+formData.pinecode
    };
    fetch_data(url, sendUserData);
  }

  useEffect(() => {
    setEmailError('');
  },[formData.email]);

  useEffect(() => {
    setPassError('');
  },[formData.password]);

  const statesOfIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];


  return (
    <div className='w-full h-full flex justify-center items-center bg-gray-400 signup-text py-8'>
      <div className='w-[90%] relative max-md:h-screen'>
        <img src='https://res.cloudinary.com/do1xweis7/image/upload/v1717340580/signup-page_xtxyfo.jpg'
          className='w-full h-full rounded-lg'
        />
        
        <div className='w-full h-full absolute top-0 left-0 text-white bg-gray-600 opacity-30 backdrop-blur-xl rounded-lg z-2'></div>

        <div className='w-full h-full max-md:h-screen flex flex-col items-center absolute top-0 left-0 text-white backdrop-blur-xl rounded-lg z-5 p-4 gap-4 max-md:overflow-y-scroll'>
          <div className='w-full flex flex-col justify-center items-center'>
            <h2 className='text-3xl text-gray-100 font-bold'>Create a new account<span className='text-blue-600 text-5xl'>.</span></h2>
            <p className='text-gray-400 text-base'>
              Already a member? 
              <button className='text-blue-600 text-lg font-semibold px-4 hover:underline'
                onClick={() => navigate('/login')}
              >
                Log in.
              </button>
            </p>
          </div>

          <div className='w-full flex flex-wrap justify-center gap-x-8 gap-y-4'>
            <div className='w-full max-w-[400px] flex flex-col'>
              <label className='pl-1 text-gray-400 font-semibold'>Name<sup className='text-red-500'>*</sup></label>
              <div className='flex justify-between items-center gap-4'>
                <input
                  type='text'
                  name='firstname'
                  placeholder='first name'
                  value={formData.firstname}
                  onChange={inputHandler}
                  required
                  className='w-full outline-none py-3 px-4 text-white border-b-2 border-transparent focus:border-blue-600 bg-gray-600 rounded-sm'
                />

                <input
                  type='text'
                  name='lastname'
                  placeholder='last name'
                  value={formData.lastname}
                  onChange={inputHandler}
                  required
                  className='w-full outline-none py-3 px-4 text-white border-b-2 border-transparent focus:border-blue-600 bg-gray-600 rounded-sm'
                />
              </div>
            </div>

            <div className='w-full max-w-[400px] flex flex-col'>
              <label className='pl-1 text-gray-400 font-semibold'>Email<sup className='text-red-500'>*</sup></label>
              <input
                type='email'
                name='email'
                placeholder='name@example.com'
                value={formData.email}
                onChange={inputHandler}
                required
                className={`w-full outline-none py-3 px-4 text-white border-b-2 border-transparent focus:border-blue-600 bg-gray-600 rounded-sm ${emailError !== '' ? 'border-red-500' : 'border-transparent' }`}
              />
              <div className='text-red-400 text-left font-semibold text-sm pl-2'>
                {
                  emailError !== '' && (emailError)
                }
              </div>
            </div>

            <div className='w-full max-w-[400px] flex flex-col'>
              <label className='pl-1 text-gray-400 font-semibold'>Contact Number<sup className='text-red-500'>*</sup></label>
              <div className='flex justify-between items-center gap-4'>
                <select 
                  name='usd_code' 
                  value={formData.usd_code}
                  onChange={inputHandler}
                  required
                  className='w-[150px] outline-none py-3 px-4 text-white border-b-2 border-transparent focus:border-blue-600 bg-gray-600 rounded-sm'>
                  <option value='+91'>+91</option>
                </select>

                <input
                  type='number'
                  name='mobile_no'
                  placeholder='mobile number'
                  value={formData.mobile_no}
                  onChange={inputHandler}
                  required
                  className='w-full outline-none py-3 px-4 text-white border-b-2 border-transparent focus:border-blue-600 bg-gray-600 rounded-sm'
                />
              </div>
            </div>

            <div className='w-full max-w-[400px] flex flex-col relative'>
              <label className='pl-1 text-gray-400 font-semibold'>Password<sup className='text-red-500'>*</sup></label>
              <input
                type={isPassVisiable ? 'text' : 'password'}
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={inputHandler}
                required
                className={`w-full outline-none py-3 px-4 text-white border-b-2 border-transparent focus:border-blue-600 bg-gray-600 rounded-sm ${passError !== '' ? 'border-red-500' : 'border-transparent' }`}
              />
              <div className='absolute top-9 right-2 text-2xl cursor-pointer' onClick={() => setIsPassVisiable(!isPassVisiable)}>
                {
                  !isPassVisiable ? (<FaEye/>) : (<FaEyeSlash/>)
                }
              </div>
              <div className='text-red-400 text-left font-semibold text-sm pl-2'>
                {
                  passError !== '' && (passError)
                }
              </div>
            </div>

            <div className='w-full max-w-[400px] flex flex-col'>
              <label className='pl-1 text-gray-400 font-semibold'>Gender<sup className='text-red-500'>*</sup></label>
              <select 
                name='gender' 
                value={formData.gender}
                onChange={inputHandler}
                required
                className='w-full outline-none py-3 px-4 text-white border-b-2 border-transparent focus:border-blue-600 bg-gray-600 rounded-sm'>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
            </div>

            <div className='w-full max-w-[400px] flex flex-col relative'>
              <label className='pl-1 text-gray-400 font-semibold'>Conform Password<sup className='text-red-500'>*</sup></label>
              <input
                type={isConfPassVisiable ? 'text' : 'password'}
                name='conform_password'
                placeholder='Confirm Password'
                value={formData.conform_password}
                onChange={inputHandler}
                required
                className='w-full outline-none py-3 px-4 pr-10 text-white border-b-2 border-transparent focus:border-blue-600 bg-gray-600 rounded-sm'
              />
              <div className='absolute top-9 right-2 text-2xl cursor-pointer' onClick={() => setIsConfPassVisiable(!isConfPassVisiable)}>
                {
                  !isConfPassVisiable ? (<FaEye/>) : (<FaEyeSlash/>)
                }
              </div>

              <div className='text-red-600 bg-red-100 text-left font-semibold text-sm pl-2'>
                {
                  !isMatch && ('Password not match')
                }
              </div>
            </div>

            <div className='w-full max-w-[400px] flex flex-col'>
              <label className='pl-1 text-gray-400 font-semibold'>Address<sup className='text-red-500'>*</sup></label>
              <input
                type='text'
                name='address'
                placeholder='Enter address'
                value={formData.address}
                onChange={inputHandler}
                required
                className='w-full outline-none py-3 px-4 text-white border-b-2 border-transparent focus:border-blue-600 bg-gray-600 rounded-sm'
              />
            </div>

            <div className='w-full max-w-[400px] flex flex-col'>
              <label className='pl-1 text-gray-400 font-semibold'>City<sup className='text-red-500'>*</sup></label>
              <input
                type='text'
                name='city'
                placeholder='Enter city'
                value={formData.city}
                onChange={inputHandler}
                required
                className='w-full outline-none py-3 px-4 text-white border-b-2 border-transparent focus:border-blue-600 bg-gray-600 rounded-sm'
              />
            </div>

            <div className='w-full max-w-[400px] flex flex-col'>
              <label className='pl-1 text-gray-400 font-semibold'>State<sup className='text-red-500'>*</sup></label>
              <select 
                name='state' 
                value={formData.state}
                onChange={inputHandler}
                required
                className='w-full outline-none py-3 px-4 text-white border-b-2 border-transparent focus:border-blue-600 bg-gray-600 rounded-sm'>
                {
                  statesOfIndia.map((state) => {
                    return (
                      <option value={state}>{state}</option>
                    )
                  })
                }
              </select>
            </div>

            <div className='w-full max-w-[400px] flex flex-col'>
              <label className='pl-1 text-gray-400 font-semibold'>Pine Code<sup className='text-red-500'>*</sup></label>
              <input
                type='number'
                name='pinecode'
                placeholder='pincode'
                value={formData.pinecode}
                onChange={inputHandler}
                required
                className='w-full outline-none py-3 px-4 text-white border-b-2 border-transparent focus:border-blue-600 bg-gray-600 rounded-sm'
              />
            </div>
          </div>

          <div className='w-full h-[60px] flex justify-center items-center'>
            {
              error !== '' &&
              (
                <div className='w-full flex justify-between items-center max-w-[75%] text-red-500 text-left font-semibold text-lg border-2 border-blue-500 bg-red-100 py-2 px-5 rounded-md mt-4'>
                  {error}
                  <div 
                    className='text-xl cursor-pointer'
                    onClick={() => setError('')}
                  >
                    <MdClose/>
                  </div>
                </div>

              )
            }
          </div>


          <button 
            className='w-full max-w-[400px] flex justify-center items-center gap-4 border-2 py-2 border-orange-800 bg-orange-600 text-xl font-semibold uppercase rounded-lg text-gray-400 transition duration-300 ease-in hover:text-white hover:border-orange-900 mt-4'
            onClick={registerHandler}
          >Register here {isLoading && (<Spinner/>)}</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp