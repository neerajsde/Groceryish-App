import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/sections/navbar/Navbar';
import Footer from '../components/sections/Footer'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogin } from "react-icons/ai";
import toast from 'react-hot-toast';
import WishListItems from '../components/product-info/WishListItems';

const Wishlist = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5050/api/v1';
  const {isLoggedIn,setIsLoading, userData,wishlistItems, wishlistLength, setWishlistLength, setWishlistItems} = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
      document.title = 'Wishlist'
      if(isLoggedIn){
        fetchWishListItems();
      }
  },[wishlistLength]);

  const fetchWishListItems = async () => {
    try{
      setIsLoading(true);
      const url = `${baseUrl}/wishlist`;
      const response = await fetch(url, {
        method:'PUT',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.user._id
        })
      });

      const data = await response.json();
      if(data.success){
        setWishlistLength(data.wishlist.length);
        setWishlistItems(data.wishlist);
      }
      else{
        setWishlistLength(0);
        setWishlistItems(null);
      }
    } catch(err){
      toast.error(err.message);
    } finally{
      setIsLoading(false);
    }
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <Navbar/>

      <div className='w-full'>
        { isLoggedIn ?
          wishlistLength > 0 ? 
          (
            <div className='w-full flex justify-center bg-gray-200 p-4'><div className='w-[900px] max-lg:w-full'><WishListItems/></div></div>
          ) : 
          (
            <div className='w-full h-[80vh] flex justify-evenly items-center max-sm:flex-col-reverse'>
              <div className='flex flex-col items-center gap-1'>
                <p className='text-2xl font-bold text-red-500 max-md:text-xl'>No items in the WishList</p>
                <button 
                  className='border-2 border-green-500 py-1 px-4 rounded-md font-semibold text-slate-600 transition-all duration-300 hover:bg-green-400'
                  onClick={() => navigate('/')}
                >Go to home</button>
              </div>
              <img src='https://res.cloudinary.com/do1xweis7/image/upload/v1719326202/Screenshot_2024-06-25_200448_u0bli3.png' className='w-[400px] max-lg:w-[350px] max-md:w-[250px]'/>
            </div>
          ) :
          (
            <div className='w-full h-[80vh] flex justify-evenly items-center max-sm:flex-col'>
              <div className='w-[450px] max-lg:w-[400px] max-md:w-[300px]'>
                <img src='https://res.cloudinary.com/do1xweis7/image/upload/v1719416784/empty_cart_vwcz6t.png' alt=''/>
              </div>
              <div className='w-[400px] flex flex-col justify-center items-center gap-4'>
                <div className='text-2xl font-bold text-slate-700 max-md:text-lg'>Please log in to see your Wish List</div>
                <button
                  onClick={() => navigate('/login')}
                  className='w-[200px] text-lg font-bold uppercase border-2 border-green-600 rounded-md py-1 px-4 flex justify-center items-center gap-2 bg-green-400 text-slate-600 transition duration-300 hover:bg-green-500 max-sm:text-md' ><AiOutlineLogin className='text-2xl max-md:text-lg'/> LOG IN</button>
              </div>
            </div>
          )
        }
      </div>

      <Footer/>
    </div>
  )
}

export default Wishlist