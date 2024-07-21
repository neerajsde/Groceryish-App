import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BiCartAdd } from "react-icons/bi";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

const Item = ({ data, index }) => {
    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5050/api/v1';
    const { userData, isLoggedIn, setCartItem, isAddedToCart, setIsAddedToCart } = useContext(AppContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = async (product_id) => {
        setIsLoading(true);
        if (!isLoggedIn) {
            window.alert('Please login');
            navigate('/login');
            toast.error('Please Login Here');
            return;
        }

        try {
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
                setIsAddedToCart((prev) => {
                    console.log('Prev Array: ', [...prev]);
                    const updatedIsAddedToCart = [...prev];
                    updatedIsAddedToCart[index] = true;
                    return updatedIsAddedToCart;
                });
                toast.success(data.message);
                setCartItem(data.user.cart.length);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(data.error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='w-full h-[250px] flex flex-col justify-center items-center gap-4 p-2 bg-white transition-all duration-300 hover:scale-105 border border-slate-500 rounded-md hover:shadow-2xl'>
            <div className='w-full flex justify-between items-center relative'>
                <div className='flex flex-col pl-4'>
                    <div className='text-md uppercase text-gray-600 font-semibold'>{data.name}</div>
                    <div className='text-sm font-semibold text-gray-400'>{data.category}</div>
                    <div className='flex gap-2'>
                        <p className='text-md font-semibold text-red-600'>Price: </p>
                        <div className='text-md font-semibold'>{`₹${data.price}`}</div>
                    </div>
                    <div className='text-green-500'>{`${data.offer}% off`}</div>
                </div>
                <div className='w-[150px] h-[150px] flex items-center justify-center'>
                    <img src={data.img} className='w-full max-h-full' alt={data.title} />
                </div>
                <div className='absolute top-1 right-1 text-3xl w-[40px] h-[40px] rounded-full bg-[#6666] flex items-center justify-center cursor-pointer'>
                    <FcLikePlaceholder/>
                </div>
            </div>
            <div className='w-full flex justify-evenly items-center'>
                {
                    isAddedToCart[index] ?
                        (
                            <button
                                className='w-[170px] flex justify-evenly items-center border-2 border-slate-600 text-slate-600 py-1 rounded-md uppercase text-md font-semibold bg-white transition duration-200 hover:bg-slate-600 hover:text-white'
                                onClick={() => navigate('/cart')}
                            >Go to cart {isLoading && (<div className='btn-spinner'></div>)}</button>
                        ) :
                        (
                            <button
                                className='w-[170px] flex justify-evenly items-center border-2 border-slate-600 py-1 rounded-md uppercase text-md font-semibold bg-slate-500 text-white transition duration-200 hover:bg-slate-600'
                                onClick={() => handleAddToCart(data._id)}
                            >Add to cart {isLoading ? (<div className='btn-spinner'></div>) : (<div className='text-xl'><BiCartAdd/></div>)}</button>
                        )
                }
                <button
                    className='w-[150px] border-2 border-orange-600 py-1 rounded-md uppercase text-md font-semibold bg-orange-500 text-white transition duration-200 hover:bg-orange-600'
                >Buy Now</button>
            </div>
        </div>
    )
}

export default Item