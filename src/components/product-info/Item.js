import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { BiCartAdd } from "react-icons/bi";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import Spinner from '../Spinner';
import toast from 'react-hot-toast';

const Item = ({ data }) => {
    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5050/api/v1';
    const { userData, isLoggedIn, setCartItem, setWishlistLength, setWishlistItems } = useContext(AppContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [isCartItem, setIsCartItem] = useState(false);

    const handleAddToCart = async (product_id) => {
        if (!isLoggedIn) {
            toast.error('Please Login');
            return;
        }

        try {
            setIsLoading(true);
            const url = `${baseUrl}/cart-item/add`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userData.user._id,
                    product_id: product_id
                }),
            });

            const data = await response.json();
            if (data.sucess) {
                toast.success(data.message);
                setCartItem(data.user.cart.length);
                setIsCartItem(true);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(data.error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddToWishList = async (productId) => {
        if(!isLoggedIn){
            toast.error('Please Login');
            return;
        }

        try{
            const url = `${baseUrl}/wishlist-add`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    user_id: userData.user._id,
                    product_id: productId
                })
            });

            const data = await response.json();
            if(data.success){
                setIsLike(true);
                toast.success(data.message);
                setWishlistLength(data.wishlist.length);
                setWishlistItems(data.wishlist);
            }
            else{
                if(data.message === 'Product already added to wishlist'){
                    setIsLike(true);
                }
                toast.error(data.message);
            }
        } catch(err){
            toast.error('error in add to wishlist');
        }
    }

    return (
        <div className='w-full flex flex-col justify-center items-center gap-4 p-2 bg-white transition-all duration-300 hover:scale-105 border border-slate-500 rounded-md hover:shadow-2xl max-lg:gap-0'>
            <div className='w-full flex justify-between items-center relative'>
                <div className='flex flex-col pl-4 max-sm:pl-1'>
                    <div className='text-sm font-semibold text-gray-400 max-md:text-xs'>{data.category}</div>
                    <div className='text-lg text-gray-700 font-semibold max-md:text-base'>{data.name}</div>
                    <div className='text-xs text-gray-400 font-semibold'>By <span className='text-green-500'>{data.username}</span></div>
                    
                    <div className='w-full flex items-center gap-3'>
                        { data.avg_rating > 0 &&
                            <div className='w-[50px] flex items-center gap-1 px-2 py-[2px] border text-xs text-white bg-green-600 rounded'>
                                <p className='font-semibold'>{data.avg_rating}</p>
                                <FaStar/>
                            </div>
                        }

                        {data.ratings.length > 0 && (<div className='text-md font-bold text-gray-400'>{`(${data.ratings.length})`}</div>)}
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='text-md font-semibold text-red-600'>Price: </p>
                        <div className='text-lg font-semibold'>{`₹${data.price}`}</div>
                    </div>
                    <div className='w-full flex items-center gap-2'>
                        <div className='text-base text-gray-500 line-through decoration-gray-600'>{`₹${data.price + (data.price * (parseInt(data.offer, 10) / 100))}`}</div>
                        <div className='text-green-500 text-sm'>{`${data.offer}% off`}</div>
                    </div>
                </div>
                <div className='w-[150px] h-[150px] flex items-center justify-center'>
                    <img src={data.img} className='w-full max-h-full' alt={data.title} />
                </div>
                <div 
                    className='absolute top-1 right-1 text-3xl w-[40px] h-[40px] rounded-full bg-[#6666] flex items-center justify-center cursor-pointer'
                    onClick={() => handleAddToWishList(data._id)}
                >
                    {data.isInWishlist || isLike ? (<FcLike/>) : (<FcLikePlaceholder/>)}
                </div>
            </div>
            <div className='w-full flex justify-evenly items-center max-lg:flex-col max-lg:gap-2'>
                {
                    data.isAddedToCart || isCartItem ?
                        (
                            <button
                                className='w-[170px] flex justify-evenly items-center border-2 border-slate-600 text-slate-600 py-1 rounded-md uppercase text-md font-semibold bg-white transition duration-200 hover:bg-slate-600 hover:text-white max-lg:w-full'
                                onClick={() => navigate('/cart')}
                            >Go to cart</button>
                        ) :
                        (
                            <button
                                className='w-[170px] flex justify-evenly items-center border-2 border-slate-600 py-1 rounded-md uppercase text-md font-semibold bg-slate-500 text-white transition duration-200 hover:bg-slate-600 hover:text-white max-lg:w-full'
                                onClick={() => handleAddToCart(data._id)}
                            >Add to cart {isLoading ? (<Spinner/>) : (<div className='text-xl'><BiCartAdd/></div>)}</button>
                        )
                }
                <button
                    className='w-[150px] border-2 border-orange-600 py-1 rounded-md uppercase text-md font-semibold bg-orange-500 text-white transition duration-200 hover:bg-orange-600 max-lg:w-full'
                >Buy Now</button>
            </div>
        </div>
    )
}

export default Item