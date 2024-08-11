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
import { FaArrowLeft } from "react-icons/fa6";
import { BsFillCartCheckFill } from "react-icons/bs";
import Spinner from '../components/Spinner';
import RateProduct from '../components/product-info/RateProduct';
import { VscVerifiedFilled } from "react-icons/vsc";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";

const AboutProduct = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5050/api/v1';
  const {isLoggedIn, userData, setCartItem, setWishlistLength, setWishlistItems, setCartProductIDs,isOpenRate, setIsOpenRate, nowUpdate, setNowUpadate} = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartItem, setIsCartItem] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // convert to array like that
  const [isRating, setIsRating] = useState([]);
  const [ratingCount, setRatingCount] = useState([]);

  useEffect(() => {
    if (productInfo && productInfo.ratings.length > 0) {
      setIsRating(productInfo.ratings.map(() => ({ like: false, dislike: false })));
      setRatingCount(productInfo.ratings.map(() => ({ like: 1, dislike: 0 })));
    }
  }, [productInfo]);
  
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
    setIsOpenRate(false);
  },[])

  useEffect(() => {
    if(nowUpdate){
      fetchProductInfo();
      setNowUpadate(false);
    }
  },[nowUpdate]);

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

  const handleAddToWishList = async (productId, productName) => {
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
                product_id: productId,
                name: productName
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

  const likeTheRate = async(productId, index, isDisLike) => {
    if(isRating[index]?.like){
      return;
    }
    if(isDisLike){
      setIsRating((prevState) => {
        const prevData = prevState.map((item, i) => 
          i === index ? { ...item, dislike: false } : item
        );
        return prevData;
      });
      setRatingCount((prevState) => {
        const prevData = prevState.map((item, i) => 
          i === index ? { ...item, dislike: item.dislike - 1 } : item
        );
        return prevData;
      });
    }
    try{
      const url = `${baseUrl}/rate/like`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            _id: productId
        })
      });
      const data = await response.json();
      if(data.success){
        setIsRating((prevState) => {
          const prevData = prevState.map((item, i) => 
            i === index ? { ...item, like: true } : item
          );
          return prevData;
        });
      
        setRatingCount((prevState) => {
          const prevData = prevState.map((item, i) => 
            i === index ? { ...item, like: data.data.like } : item
          );
          return prevData;
        });
        toast.success(data.message);
      }
      else{
        toast.error('something went wrong');
      }
    } catch(err){}
  }

  const disLikeTheRate = async(productId, index, isLike) => {
    if(isRating[index]?.dislike){
      return;
    }
    if(isLike){
      setIsRating((prevState) => {
        const prevData = prevState.map((item, i) => 
          i === index ? { ...item, like: false } : item
        );
        return prevData;
      });
      setRatingCount((prevState) => {
        const prevData = prevState.map((item, i) => 
          i === index ? { ...item, like: item.like - 1 } : item
        );
        return prevData;
      });
    }
    try{
      const url = `${baseUrl}/rate/dislike`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            _id: productId
        })
      });
      const data = await response.json();
      if(data.success){
        setIsRating((prevState) => {
          const prevData = prevState.map((item, i) => 
            i === index ? { ...item, dislike: true } : item
          );
          return prevData;
        });
      
        setRatingCount((prevState) => {
          const prevData = prevState.map((item, i) => 
            i === index ? { ...item, dislike: data.data.dislike } : item
          );
          return prevData;
        });
        toast.success(data.message);
      }
      else{
        toast.error('something went wrong');
      }
    } catch(err){}
  }

  return (
    <div className='w-full flex flex-col items-center gap-0'>
      <Navbar/>
      <SearchBar/>
      {
        isLoading ? (<div className='w-full min-h-[80vh] flex justify-center items-center'><BlackSpinner/></div>) :
        productInfo ? 
        (
          <div className='w-full flex flex-col items-center bg-gray-300 p-4 relative max-sm:p-2'>
            {isOpenRate && (<div className='absolute top-0 left-0 w-full bg-[#2222] h-full flex justify-center items-start backdrop-blur p-4 z-20 max-sm:p-2'><RateProduct productName={productInfo.name} productId={productInfo._id}/></div>)}

            <div className='w-full flex items-start justify-evenly bg-white gap-4 p-4 relative max-md:flex-col max-sm:p-3'>
              <div className='absolute top-5 left-5 w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ffffff73] backdrop-blur-md z-10 shadow-md text-xl cursor-pointer' onClick={() => navigate(-1)}><FaArrowLeft/></div>
              <div className='w-[500px] p-4 border flex flex-col items-center gap-10 relative max-lg:w-[350px] max-md:w-full'>
                <img src={productInfo.img} alt='product image' className='w-full h-full object-contain max-md:w-[250px] max-sm:w-[170px]'/>
                
                <div className='w-full flex justify-center items-center gap-4 max-lg:flex-col max-md:flex-row max-sm:flex-col'>
                  {
                    productInfo.isAddedToCart || isCartItem ? 
                    (<div className='w-[200px] max-lg:w-full uppercase text-lg font-bold border px-3 py-2 flex items-center justify-center gap-2 bg-yellow-500 border-yellow-500 text-white cursor-pointer transition duration-200 hover:bg-yellow-600' onClick={() => navigate('/cart')}>{btnLoading ? (<Spinner/>) : (<BsFillCartCheckFill/>)} Go to cart</div>)
                    :
                    (<div className='w-[200px] max-lg:w-full uppercase text-lg font-bold border px-3 py-2 flex items-center justify-center gap-2 bg-yellow-500 border-yellow-500 text-white cursor-pointer transition duration-200 hover:bg-yellow-600' onClick={() => handleAddToCart(productInfo._id)}><FaCartPlus/> Add to cart</div>)
                  }
                  <div className='w-[200px] max-lg:w-full uppercase text-lg font-bold border px-3 py-2 flex items-center justify-center gap-2 bg-orange-500 border-orange-500 text-white cursor-pointer transition duration-200 hover:bg-orange-600'><BsLightningChargeFill/> Buy now</div>
                </div>

                <div className='w-[35px] h-[35px] rounded-full absolute top-2 right-2 shadow flex justify-center items-center cursor-pointer backdrop-blur-md' onClick={() => handleAddToWishList(productInfo._id, productInfo.name)}>{productInfo.isAddedToWishList || isLike ? (<FcLike className='text-xl'/>) : (<FcLikePlaceholder className='text-xl'/>)}</div>
              </div>
              <div className='w-full flex flex-col items-start gap-4 p-4 max-sm:p-0'>
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

                <div className='w-full flex flex-col border p-4 gap-4 max-sm:p-2'>
                  <div className='w-full flex items-center justify-between max-sm:flex-col'>
                    <h3 className='text-xl font-bold text-black max-sm:text-lg'>Ratings & Reviews</h3>
                    <button className='w-[150px] text-md font-semibold border py-2 shadow-md rounded-sm max-sm:bg-green-200' onClick={() => setIsOpenRate(true)}>Rate Product</button>
                  </div>
                  <div className='w-full flex flex-col items-start max-sm:items-center'>
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

                  {productInfo.product_images.length > 0 && 
                  (
                    <div className='w-full flex items-center gap-1'>
                      {
                        productInfo.product_images.map((recent_img, index) => {
                          return (
                            <img src={recent_img.image} alt={recent_img.title} className='w-[100px] h-[100px] object-cover rounded cursor-pointer border-2 border-transparent transition duration-200 ease-in hover:border-green-500'/>
                          )
                        })
                      }
                    </div>
                  )}
                  
                  {
                    productInfo.ratings.length > 0 && 
                    productInfo.ratings.map((rate, index) => {
                      return (
                        <div className='w-full flex flex-col gap-1'>
                          <div className='w-full flex items-center justify-start gap-3 max-sm:items-start max-sm:gap-2'>
                            <div className='w-[40px] h-[40px] border-2 rounded-full border-slate-600 max-sm:w-[35px] max-sm:h-[35px] flex justify-center items-center'>
                              <img src={rate.user_img} alt='user-img'  className='w-full h-full object-cover rounded-full bg-cover'/>
                            </div>
                            <div className='w-full flex items-center justify-between max-sm:flex-col'>
                              <div className='w-full flex flex-col max-sm:items-start'>
                                <div className='flex items-center gap-1 text-base text-gray-400 font-semibold'>{rate.user_name} <VscVerifiedFilled className='text-blue-500'/></div>
                                <div className='w-full flex items-center gap-2 max-sm:flex-col-reverse max-sm:items-start max-sm:gap-0'>
                                  <div className='flex items-center gap-1 px-2 py-[2px] border text-xs text-white bg-green-600 rounded'>
                                    <p className='font-semibold'>{rate.noOfStars.toFixed(1)}</p>
                                    <FaStar/>
                                  </div>
                                  <div className='text-md font-semibold text-gray-600'>{rate.title}</div>
                                </div>
                              </div>
                              <div className='flex items-center gap-6 max-sm:w-full max-sm:justify-end'>
                                <div className={`flex items-center gap-1 cursor-pointer ${isRating[index]?.like ? 'text-gray-600': 'text-gray-400'}`} onClick={() => likeTheRate(rate._id, index, isRating[index]?.dislike)}><BiSolidLike/><span className='text-sm font-semibold'>{isRating[index]?.like ? ratingCount[index].like : rate.like}</span></div>
                                <div className={`flex items-center gap-1 cursor-pointer ${isRating[index]?.dislike ? 'text-gray-600': 'text-gray-400'}`} onClick={() => disLikeTheRate(rate._id, index, isRating[index]?.like)}><BiSolidDislike/><span className='text-sm font-semibold'>{isRating[index]?.dislike ? ratingCount[index].dislike : rate.dislike > 0 && rate.dislike }</span></div>
                              </div>
                            </div>
                          </div>

                          <div className='w-full flex flex-col pl-12 max-sm:pl-0'>
                            <div className='text-sm text-medium text-gray-500 max-sm:text-xs max-sm:text-justify'>{rate.description}</div>
                            {
                              rate.image !== '' && 
                              (
                                <div className='w-[150px] max-sm:w-[80px]'>
                                  <img src={rate.image}  className='w-full'/>
                                </div>
                              )
                            }
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