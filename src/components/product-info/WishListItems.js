import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import toast from 'react-hot-toast';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';

const WishListItems = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5050/api/v1';
    const { wishlistLength, wishlistItems, setWishlistLength, setWishlistItems } = useContext(AppContext);

    function formatCurrency(amount) {
        let parts = amount.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return "₹" + parts.join(".");
    }

    const removeProductFromWishlist = async (userId, productId) => {
        try {
            const url = `${baseUrl}/wishlist-remove`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    product_id: productId
                })
            });

            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                setWishlistLength(data.wishlist.length);
                setWishlistItems(data.wishlist);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error('Error in deleting item from wishlist');
        }
    };

    if (!wishlistItems) {
        return <div className='w-full h-[200px] flex justify-center items-center bg-white'><Spinner/></div>;
    }

    return (
        <div className='w-full bg-white flex flex-col'>
            <div className='w-full py-4 px-6 text-lg font-semibold border-b border-gray-500'>{`My Wishlist (${wishlistLength || 0})`}</div>

            {
                wishlistItems.length > 0 && 
                wishlistItems.map((item, index) => (
                    <div key={index} className='w-full flex items-center py-4 px-6 border-b border-gray-300 gap-6 max-sm:flex-col max-sm:gap-2 max-sm:px-2'>
                        <h2 className='text-base font-medium capitalize sm:hidden text-gray-500'>{item.title}</h2>
                        <Link className='w-[150px] max-sm:w-[120px]' to={`/view-product/${item._id}`}>
                            <img src={item.img} alt={item.name} className='w-full h-full object-cover' />
                        </Link>
                        <div className='w-full flex justify-between gap-4 max-sm:items-center max-sm:gap-0'>
                            <div className='w-full flex flex-col gap-1'>
                                <h2 className='text-md font-medium capitalize text-gray-500 max-sm:hidden'>{item.title}</h2>
                                <div className='text-sm font-semibold text-black'>{item.name}</div>
                                <div className='w-full flex items-center gap-3'>
                                    {item.avg_rating > 0 &&
                                        <div className='flex items-center gap-1 px-2 py-[2px] border text-xs text-white bg-green-600 rounded'>
                                            <p className='font-semibold'>{item.avg_rating}</p>
                                            <FaStar />
                                        </div>
                                    }

                                    {item.ratings.length > 0 && (<div className='text-md font-bold text-gray-400'>{`(${item.ratings.length})`}</div>)}
                                </div>

                                <div className='w-full flex items-center gap-4'>
                                    <div className='text-xl font-semibold text-black'>{formatCurrency(item.price)}</div>
                                    <div className='text-base text-gray-500 line-through decoration-gray-600'>{`₹${item.price + (item.price * (parseInt(item.offer, 10) / 100))}`}</div>
                                    <div className='text-sm font-bold text-green-600'>{`${item.offer}% off`}</div>
                                </div>
                            </div>
                            <div className='w-[35px] h-[35px] rounded-full bg-[#1111] flex items-center justify-center text-lg text-gray-600 cursor-pointer hover:text-black' onClick={() => removeProductFromWishlist(item.user_id, item._id)}><RiDeleteBin5Fill /></div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default WishListItems;