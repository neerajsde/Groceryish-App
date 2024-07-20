import React, { useContext, useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { RiAppleFill } from "react-icons/ri";
import { AppContext } from '../context/AppContext';
import Spinner from '../components/Spinner';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdClose } from "react-icons/md";
import toast from 'react-hot-toast';
import Logo from '../components/Logo';


const Login = () => {
  const {fetch_data, isLoading, emailError,setEmailError, passError,setPassError, error, setError} = useContext(AppContext);
  const [isVisiable, setIsVisiable] = useState(false);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email:'',
    password:''
  });

  function inputHandler(event){
    setLoginData((prevData) => ({
      ...prevData,
      [event.target.name]:event.target.value
    }))
  }

  let unfilled;
  function checkIfAllFieldsFilled() {
    // Iterate over all keys in formData object
    for (let key in loginData) {
      // If any field is empty, return false
      if (loginData[key] === '') {
        unfilled = key;
        return false;
      }
    }
    // If all fields are filled, return true
    return true;
  }

  function loginHandler(){
    if(!checkIfAllFieldsFilled()){
      toast.error(`Please fill the ${unfilled}.`);
      setError(`Please fill the ${unfilled}.`);
      return;
    }

    const url = 'https://groceyish-app-backend.onrender.com/api/v1/login';
    fetch_data(url, loginData)
  }

  useEffect(() => {
    setEmailError('');
  },[loginData.email]);

  useEffect(() => {
    setPassError('');
  },[loginData.password]);

  return (
    <div className='w-screen h-screen flex flex-col justify-center login'>
      <div className='w-full h-[80px] flex justify-between items-center px-4'>
          <Logo/>

          <div 
            className='text-base uppercase font-medium text-slate-700 cursor-pointer hover:underline'
            onClick={() => navigate('/signup')}>
            create account
          </div>
      </div>

      <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
        <div className='w-full text-center text-2xl font-semibold'>
          Log into Grocery App
        </div>

        <div className='flex justify-center items-center gap-8'>
          <div className='w-[350px] flex flex-col items-center justify-center text-gray-400 p-4 gap-6'>
            <label className='w-full flex flex-col uppercase font-medium text-base'>
              email address
              <input
                type='email'
                name='email'
                value={loginData.email}
                placeholder='name@example.com'
                onChange={inputHandler}
                className='border-b border-gray-500 outline-none font-normal text-slate-950 px-1 py-2'
              />
              {
                emailError && (
                  <div className='text-red-500 text-sm font-medium lowercase'>
                    {emailError}
                  </div>
                )
              }
            </label>

            <label className='w-full flex flex-col uppercase font-medium text-base relative'>
              password
              <input
                type={isVisiable ? 'text': 'password'}
                name='password'
                placeholder='Password'
                value={loginData.password}
                onChange={inputHandler}
                className='border-b border-gray-500 outline-none font-normal text-slate-950 px-1 py-2'
              />
              <div 
                className='absolute top-8 right-1 text-2xl text-slate-900 cursor-pointer'
                onClick={() => setIsVisiable(!isVisiable)}
              >
                {
                  !isVisiable ? (<FaEye/>) : (<FaEyeSlash/>)
                }
              </div>
              {
                passError && (
                  <div className='text-red-500 text-sm font-medium lowercase'>
                    {passError}
                  </div>
                )
              }
            </label>

            {
              error && (
                <div className='w-full flex justify-between items-center gap-3 text-red-500 text-sm font-medium lowercase border border-red-500 py-1 px-3'>
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

            <div 
              className='transition duration-200 ease-in hover:underline hover:text-black cursor-pointer'
            >Forgot Password?</div>

            <button
              className='flex justify-center items-center gap-4 text-base font-semibold uppercase bg-gray-300 w-full rounded-sm py-2 transition ease-in duration-300 hover:bg-slate-700'
              onClick={loginHandler}
            >log in {isLoading && (<Spinner/>)}
            </button>
          </div>

          <div className='h-full flex flex-col justify-between items-center py-4 gap-4'>
            <div className='w-[1px] h-full bg-gray-300'></div>
            <div className='text-base text-gray-500 font-semibold'>OR</div>
            <div className='w-[1px] h-full bg-gray-300'></div>
          </div>

          <div className='flex flex-col justify-center items-center gap-6'>
            <div className='w-full h-[40px] flex justify-between items-center border-2 border-gray-500 font-semibold gap-4 px-4 py-6 cursor-pointer'>
              <FcGoogle className='text-2xl'/>
              <p>Continue with Google</p>
            </div>
            <div className='w-full h-[40px] flex justify-between items-center border-2 border-gray-500 font-semibold gap-4 px-4 py-6 cursor-pointer'>
              <RiAppleFill className='text-2xl'/>
              <p>Continue with Apple</p>
            </div>
            <div className='w-full h-[40px] flex justify-between items-center border-2 border-gray-500 font-semibold gap-4 px-4 py-6 cursor-pointer'>
              <BsFacebook className='text-2xl text-blue-700'/>
              <p>Continue with Facebook</p>
            </div>
          </div>
        </div>

        <div 
          className='text-base font-semibold uppercase text-slate-600 cursor-pointer hover:underline'
          onClick={() => navigate('/')}
        >
          can't log in?
        </div>

        <div className='w-full flex flex-col justify-center items-center text-gray-500'>
          <div className='text-sm font-medium'>Secure Login with reCAPTCHA subject to Google</div>
          <div className='flex justify-center items-center gap-2 text-sm'>
            <button className='underline'>Terms</button>
            <p className='font-medium'>&</p>
            <button className='underline'>Privacy</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login