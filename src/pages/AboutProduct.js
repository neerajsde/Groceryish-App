import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BlackSpinner from '../components/BlackSpinner';
import Navbar from '../components/sections/navbar/Navbar';
import Footer from '../components/sections/Footer';
import SearchBar from '../components/search/SearchBar';
import { FaStar } from "react-icons/fa";
import { AppContext } from '../context/AppContext';
import { FaCartPlus } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { BsFillCartCheckFill } from "react-icons/bs";
import Spinner from '../components/Spinner';

const AboutProduct = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5050/api/v1';
  const {isLoggedIn, userData, setCartItem, setWishlistLength, setWishlistItems, setCartProductIDs} = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartItem, setIsCartItem] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  
  const fetchProductInfo = async () => {
    try{
      setIsLoading(true);
      const product_id = location.pathname.split('/').at(-1);
      const url = `${baseUrl}/about-product`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
          product_id: product_id,
          user_id: isLoggedIn ? userData.user._id : ''
        })
      });

      const data = await response.json();
      if(data.success){
        setProductInfo(data.data);
      }
      else{
        toast.error(data.message);
      }
    } catch(err){
      toast.error(err.message);
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProductInfo();
  },[])

  useEffect(() => {
    document.title = `${productInfo?.name} - ${productInfo?.title}`;
  }, [productInfo]);


  const handleAddToCart = async (product_id) => {
    if (!isLoggedIn) {
      // Add item to cart Data
      setCartProductIDs((prevData) => {
        let oldData = [...prevData];
        oldData.push({ productId: product_id, count: 1, isSelected: false });
        return oldData;
      });

      setCartItem((prevLength) => prevLength + 1);
      setIsCartItem(true);
      toast.success("Item added to cart");
      return;
    }

    try {
        setBtnLoading(true);
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
        toast.error(err.message);
    } finally {
        setBtnLoading(false);
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
    <div className='w-full flex flex-col items-center gap-0'>
      <Navbar/>
      <SearchBar/>
      {
        isLoading ? (<div className='w-full min-h-[80vh] flex justify-center items-center'><BlackSpinner/></div>) :
        productInfo ? 
        (
          <div className='w-full flex flex-col items-center bg-gray-300 p-4'>
            <div className='w-full min-h-[80vh] flex items-start justify-evenly bg-white gap-4 p-4'>
              <div className='w-[500px] p-4 border flex flex-col items-center gap-10 relative'>
                <img src={productInfo.img} alt='product image' className='w-full h-full'/>
                
                <div className='w-full flex justify-center items-center gap-4'>
                  {
                    productInfo.isAddedToCart || isCartItem ? 
                    (<div className='w-[200px] uppercase text-lg font-bold border px-3 py-2 flex items-center justify-center gap-2 bg-yellow-500 border-yellow-500 text-white cursor-pointer transition duration-200 hover:bg-yellow-600' onClick={() => navigate('/cart')}>{btnLoading ? (<Spinner/>) : (<BsFillCartCheckFill/>)} Go to cart</div>)
                    :
                    (<div className='w-[200px] uppercase text-lg font-bold border px-3 py-2 flex items-center justify-center gap-2 bg-yellow-500 border-yellow-500 text-white cursor-pointer transition duration-200 hover:bg-yellow-600' onClick={() => handleAddToCart(productInfo._id)}><FaCartPlus/> Add to cart</div>)
                  }
                  <div className='w-[200px] uppercase text-lg font-bold border px-3 py-2 flex items-center justify-center gap-2 bg-orange-500 border-orange-500 text-white cursor-pointer transition duration-200 hover:bg-orange-600'><BsLightningChargeFill/> Buy now</div>
                </div>

                <div className='w-[35px] h-[35px] rounded-full absolute top-2 right-2 shadow-lg flex justify-center items-center cursor-pointer' onClick={() => handleAddToWishList(productInfo._id)}>{isLike ? (<FcLike className='text-xl'/>) : (<FcLikePlaceholder className='text-xl'/>)}</div>
              </div>
              <div className='w-full flex flex-col items-start gap-4 p-4'>
                <h2 className='text-xl font-semibold capitalize'>{productInfo.title}</h2>
                <Link to={productInfo.img} className='text-base text-blue-700'>{`Vist the ${productInfo.username}`}</Link>
                <div>{productInfo.name}</div>
                <div className='w-full flex items-center gap-4'>
                  {
                    productInfo.avg_rating > 0 ? (
                      <div className='flex items-center gap-1 px-2 py-[2px] border text-xs text-white bg-green-600 rounded'>
                        <p className='font-semibold'>{productInfo.avg_rating}</p>
                        <FaStar/>
                      </div>
                    ) : 
                    (
                      <div className='flex items-center gap-1 px-2 py-[2px] border text-xs text-white bg-green-600 rounded'>
                        <p className='font-semibold'>5</p>
                        <FaStar/>
                      </div>
                    )
                  }
                  {
                    productInfo.ratings.length > 0 ? (
                      <div className='flex items-center gap-2'>
                        <div>{`${productInfo.ratings.length} Ratings`}</div>
                        <div>&</div>
                        <div>{`${productInfo.review} Reviews`}</div>
                      </div>
                    ) :
                    (
                      <div>{`${productInfo.review} Reviews`}</div>
                    )
                  }
                </div>
                <div className='flex items-center gap-4'>
                  <div className='text-2xl font-bold'>{`₹${productInfo.price}`}</div>
                  <div className='text-base text-gray-500 line-through decoration-gray-600'>{`₹${productInfo.price + (productInfo.price * (parseInt(productInfo.offer, 10) / 100))}`}</div>
                  <div className='text-green-500 text-sm'>{`${productInfo.offer}% off`}</div>
                </div>

                <div>{productInfo.description}</div>

                <div className='w-full flex flex-col border p-4 gap-4'>
                  <div className='w-full flex items-center justify-between'>
                    <h3 className='text-xl font-bold text-black'>Ratings & Reviews</h3>
                    <button className='w-[150px] text-md font-semibold border py-2 shadow-md rounded-sm'>Rate Product</button>
                  </div>
                  <div className='w-full flex flex-col items-start'>
                    {
                      productInfo.avg_rating > 0 ? (
                        <div className='flex items-center gap-1 text-lg text-black'>
                          <p className='font-semibold'>{productInfo.avg_rating}</p>
                          <FaStar/>
                        </div>
                      ) : 
                      (
                        <div className='flex items-center gap-1 text-lg text-black'>
                          <p className='font-semibold'>5.0</p>
                          <FaStar/>
                        </div>
                      )
                    }
                    {
                      productInfo.ratings.length > 0 ? (
                        <div className='flex items-center gap-2'>
                          <div>{`${productInfo.ratings.length} Ratings`}</div>
                          <div>&</div>
                          <div>{`${productInfo.review} Reviews`}</div>
                        </div>
                      ) :
                      (
                        <div>{`${productInfo.review} Reviews`}</div>
                      )
                    }
                  </div>
                  {
                    productInfo.ratings.length > 0 && 
                    productInfo.ratings.map((rate, index) => {
                      return (
                        <div className='w-full flex items-center justify-start gap-4'>
                          {
                            rate.image !== '' && 
                            (
                              <div className='w-[100px]'>
                                <img src={rate.image}  className='w-full'/>
                              </div>
                            )
                          }
                          <div className='w-full'>
                            <div className='w-full flex items-center gap-4'>
                              <div className='flex items-center gap-1 px-2 py-[2px] border text-xs text-white bg-green-600 rounded'>
                                <p className='font-semibold'>{rate.noOfStars.toFixed(1)}</p>
                                <FaStar/>
                              </div>
                              <div>{rate.title}</div>
                            </div>
                            <div>{rate.description}</div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        ) : 
        (
          <div>Not Found product</div>
        )
      }
      <Footer/>
    </div>
  )
}

export default AboutProduct