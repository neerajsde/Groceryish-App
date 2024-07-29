import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/sections/navbar/Navbar';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { TiTick } from "react-icons/ti";
import { AiOutlineLogin } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/sections/Footer';
import { MdVerified } from "react-icons/md";

const Cart = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5050/api/v1';
  const { userData, setIsLoading, isLoggedIn, setCartItem, cartData, setCartData, isUserInfoActive, cartTotalAmount, fetchUserCartTotalAmount } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [productSelect, setProductSelect] = useState([]);
  const [productCount, setProductCount] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Your Cart';
    if (isLoggedIn) {
      fetchCartData();
      fetchUserCartTotalAmount();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (cartData && cartData.length > 0) {
      setProductSelect(new Array(cartData.length).fill(false));
      setProductCount(new Array(cartData.length).fill(1));
    }
  }, [cartData]);

  const fetchCartData = async () => {
    try {
      setIsLoading(true);
      const url = `${baseUrl}/cart`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: userData.user._id,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setCartItem(data.user.cart.length);
        setCartData(data.user.cart);
      } else {
        toast.error('Failed to fetch cart data');
      }
    } catch (err) {
      toast.error('Something went wrong.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  const updateQuantityIncrement = async (productId, index) => {
    try{
      const url = `${baseUrl}/product-count/increment`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.user._id,
          product_id: productId
        }),
      });

      const data = await response.json();
      if(data.success){
        setProductCount(prevState => {
          const updatedProductSelect = [...prevState];
          updatedProductSelect[index] = data.product_info.count;
          return updatedProductSelect;
        });
        fetchUserCartTotalAmount();
      }
      else{
        toast.error(data.message);
      }
    }
    catch(err){
      toast.error(err.message);
    }
  };

  const changeSelectedProduct  = async (productId, index, item) => {
    try{
      setLoading(true);
      const url = `${baseUrl}/product-isSelected`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.user._id,
          product_id: productId
        }),
      });

      const data = await response.json();

      if (data.success) {
        setProductSelect(prevState => {
          const updatedProductSelect = [...prevState];
          updatedProductSelect[index] = data.product_info.isSelected;
          return updatedProductSelect;
        });
        fetchUserCartTotalAmount();
        if(data.product_info.isSelected){
          toast.success(`Successfully selected the ${item.name}.`);
        }
        else{
          toast.success(`Successfully deselected the ${item.name}.`);
        }
      } else {
        toast.error(`Failed to select the ${item.name}.`);
      }
    } catch (err) {
      toast.error(`Failed to select the ${item.name}.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const updateQuantityDerement = async (productId, index) => {
    if(productCount[index] <= 1){
      return;
    }
    try{
      const url = `${baseUrl}/product-count/derement`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.user._id,
          product_id: productId
        }),
      });

      const data = await response.json();
      if(data.success){
        setProductCount(prevState => {
          const updatedProductSelect = [...prevState];
          updatedProductSelect[index] = data.product_info.count;
          return updatedProductSelect;
        });
        fetchUserCartTotalAmount();
      }
      else{
        toast.error(data.message);
      }
    }
    catch(err){
      toast.error(err.message);
    }
  };

  const getProductCount = async (productId, index) => {
    try{
      const url = `${baseUrl}/product-count`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.user._id,
          product_id: productId
        }),
      });

      const data = await response.json();
      if(data.success){
        setProductCount(prevState => {
          const updatedProductSelect = [...prevState];
          updatedProductSelect[index] = data.product_info.count;
          return updatedProductSelect;
        });
      }
      else{
        toast.error(data.message);
      }
    }
    catch(err){
      toast.error(err.message);
    }
  };

  useEffect(() => {
    cartData.map((product, index) => {
      getProductCount(product._id, index);
      getSelectedProduct(product._id, index, product);
    })
  }, [cartData])

  const getSelectedProduct  = async (productId, index, item) => {
    try{
      const url = `${baseUrl}/product-isSelected/get`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.user._id,
          product_id: productId
        }),
      });

      const data = await response.json();

      if (data.success) {
        setProductSelect(prevState => {
          const updatedProductSelect = [...prevState];
          updatedProductSelect[index] = data.product_info.isSelected;
          return updatedProductSelect;
        });
      } else {
        toast.error(`Failed to select the ${item.name}.`);
      }
    } catch (err) {
      toast.error(`Failed to select the ${item.name}.`);
      console.error(err);
    }
  }


  const deleteItem = async (productId) => {
    try{
      const url = `${baseUrl}/cart-item/delete`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.user._id,
          product_id: productId
        }),
      });

      const data = await response.json();
      if(data.success){
        setCartData(data.user.cart);
        setCartItem(data.user.cart.length);
        toast.success(data.message);
        fetchUserCartTotalAmount();
      }
      else{
        toast.error(data.message);
      }
    }
    catch(err){
      toast.error(err.message);
    }
  }

  function formatCurrency(amount) {
    // Convert the number to a string and split it at the decimal point (if any)
    let parts = amount.toString().split(".");
    
    // Add commas as thousands separators to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the integer part and the decimal part (if any)
    return "₹" + parts.join(".");
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <Navbar />

      <div className='w-full h-full cart_design relative'>
        {isLoggedIn ? (
          <div className='flex justify-between p-4 bg-gray-300 gap-4 max-lg:flex-col-reverse'>
            <div className='w-full bg-white flex flex-col p-4'>
              <div className='w-full flex flex-col gap-0'>
                <h2 className='text-3xl font-medium max-sm:text-xl'>Shopping Cart</h2>
                <p
                  className='text-green-700 cursor-pointer'
                  onClick={() => setIsSelectAll(!isSelectAll)}
                >
                  {isSelectAll ? 'Deselect all items' : 'Select all items'}
                </p>
              </div>

              <div className='w-full flex flex-col'>
                <p className='text-right text-gray-500'>Price</p>
                <div className='w-full h-[1px] bg-gray-200'></div>
              </div>

              <div className='w-full'>
                {cartData.length > 0 ? (                  
                  cartData.map((item, index) => (
                    <div key={item._id} className='w-full border-b flex justify-between relative backdrop-blur-md py-4 pl-4 gap-4 max-md:flex-col max-sm:pl-0'>
                      {
                        loading && (
                          <div className='absolute top-0 left-0 w-full h-full bg-black opacity-10'></div>
                        )
                      }
                      <h3 className='text-xl font-semibold max-sm:text-lg uppercase sm:hidden'>{item.title}</h3>
                      <div className='flex items-center gap-2 max-md:justify-evenly'>
                        <div className='w-[30px] flex justify-center items-center'>
                          <div 
                            className={`w-[30px] h-[30px] flex justify-center items-center border border-gray-400 rounded cursor-pointer ${productSelect[index] ? 'bg-blue-500 border-blue-600' : 'border-gray-400'}`} 
                            onClick={() => changeSelectedProduct(item._id, index, item)}
                          >
                            {productSelect[index] && (<TiTick className='text-2xl text-white'/>)}
                          </div>
                        </div>

                        <div className='w-[200px] h-full max-sm:w-[120px]'>
                          <img src={item.img} alt={item.title} className='w-full h-full object-cover' />
                        </div>
                      </div>

                      <div className='flex justify-between items-center gap-0 max-sm:flex-col-reverse'>
                        <div className='flex flex-col gap-1'>
                          <h3 className='text-xl font-semibold max-sm:hidden'>{item.title}</h3>
                          <p className='text-sm text-green-600'>In stock</p>
                          <mark className='w-[200px] text-sm text-gray-200 bg-slate-700 text-center max-sm:text-xs max-sm:w-[170px]'>Eligible for FREE Shipping</mark>
                          <p className='text-base text-black font-medium'>{item.name}</p>
                          <p className='text-xs text-gray-500 text-justify'>{`${item.description.slice(0, 210)}...`}</p>
                          <p className='text-lg font-bold text-slate-600 max-sm:text-base'>{`Quantity: ${item.quantity}`}</p>
                          <div className='w-full flex justify-start items-center gap-4 max-sm:justify-between'>
                            <div className='w-[120px] flex justify-evenly items-center border border-blue-500 bg-blue-100'>
                              <button onClick={() => updateQuantityDerement(item._id, index)} className='text-2xl font-extrabold'>-</button>
                              <div className='border-l-2 border-r-2 border-blue-400 px-4'>{productCount[index]}</div>
                              <button onClick={() => updateQuantityIncrement(item._id, index)} className='text-2xl font-extrabold'>+</button>
                            </div>
                            <div className='w-[1px] bg-gray-400 h-[15px]'></div>
                            <div className='text-sm text-green-700 hover:underline cursor-pointer' onClick={() => deleteItem(item._id)}>delete</div>
                            <div className='w-[1px] bg-gray-400 h-[15px]'></div>
                            <div className='text-sm text-red-700 hover:underline cursor-pointer'>share</div>
                          </div>
                        </div>

                        <div className='w-[60%] h-full flex flex-col items-end justify-start pt-4 gap-1 max-sm:w-full max-sm:flex-row max-sm:justify-between'>
                          <div className='flex flex-col items-end gap-1 max-sm:flex-row'>
                            <div className='border bg-red-600 font-bold text-sm text-white px-2 py-1 rounded max-sm:text-xs'>{`${item.offer}% off`}</div>
                            <div className='text-lg font-bold max-sm:text-green-500'>{formatCurrency(item.price)}</div>
                          </div>
                          <div className='text-sm flex items-center gap-1'>M.R.P.: <div className='text-gray-700 line-through decoration-blue-600 font-semibold text-base'>{`₹${item.price + (item.price * (parseInt(item.offer, 10) / 100))}`}</div></div>
                        </div>
                      </div>
                    </div>
                  ))    
                ) : (
                  <div className='w-full h-[80vh] flex justify-evenly items-center max-sm:flex-col-reverse'>
                    <div className='flex flex-col items-center gap-1'>
                      <p className='text-2xl font-bold text-red-500 max-md:text-xl'>No items in the cart</p>
                      <button 
                        className='border-2 border-green-500 py-1 px-4 rounded-md font-semibold text-slate-600 transition-all duration-300 hover:bg-green-400'
                        onClick={() => navigate('/')}
                      >Go to home</button>
                    </div>
                    <img src='https://res.cloudinary.com/do1xweis7/image/upload/v1719416784/empty_cart_vwcz6t.png' className='w-[400px] max-lg:w-[350px] max-md:w-[250px]'/>
                  </div>
                )}
              </div>
            </div>

            {
              cartData.length > 0 && (
                <div className='min-w-[300px] flex flex-col items-center gap-4 max-sm:min-w-full'>
                  <div className='w-full bg-white flex flex-col items-center'>
                    <div className='w-full text-lg font-semibold text-gray-500 uppercase border-b px-4 py-2'>Price details</div>
                    {
                      cartTotalAmount && (
                        <div className='w-full flex flex-col items-center'>
                          <div className='w-full flex flex-col items-center px-4 py-3 gap-3 border-b'>
                            <div className='w-full flex items-center justify-start gap-2'>
                              <div className='text-lg font-medium text-black'>Total Items:</div>
                              <div className='text-lg font-semibold text-green-500'>{cartTotalAmount.total_items}</div>
                            </div>
                            <div className='w-full flex items-center justify-between'>
                              <div className='text-lg font-medium text-black'>{`Price (${cartTotalAmount.total_items} items)`}</div>
                              <div className='text-lg font-semibold text-gray-500'>{`₹${cartTotalAmount.totalAmount}`}</div>
                            </div>
                            <div className='w-full flex items-center justify-between'>
                              <div className='text-lg font-medium text-black'>Discount</div>
                              <div className='text-md font-medium text-green-500'>{`-₹${Math.abs(cartTotalAmount.discountAmount)}`}</div>
                            </div>
                            <div className='w-full flex items-center justify-between'>
                              <div className='text-lg font-medium text-black'>Delivery Charges</div>
                              <div className='text-md font-medium text-green-500'>Free</div>
                            </div>
                          </div>

                          <div className='w-full flex items-center justify-between px-4 border-b py-4'>
                            <div className='text-xl font-bold text-black'>Total Amount</div>
                            <div className='text-xl font-semibold text-black'>{`₹${Math.round((cartTotalAmount.totalAmount + cartTotalAmount.discountAmount) * 100) / 100}`}</div>
                          </div>

                          <div className='w-full flex items-center justify-start text-base text-green-600 font-bold py-3 px-4'>{`You will save ₹${Math.abs(cartTotalAmount.discountAmount)} on this order`}</div>

                          <div className='w-full flex justify-center items-center pb-4'>
                            <button className={`text-base py-2 px-4 font-semibold rounded-md border border-black ${cartTotalAmount.total_items > 0 ? 'bg-orange-500 text-black cursor-pointer' : 'bg-yellow-500 text-gray-200 cursor-not-allowed'}`}>Proceed to Buy</button>
                          </div>
                        </div>
                      )
                    }
                  </div>

                  <div className='w-full flex justify-center items-center gap-2'>
                    <MdVerified className='text-3xl text-gray-600'/>
                    <div className='text-sm font-semibold text-gray-500'>Safe and Secure Payments. Easy returns.100% Authentic products.</div>
                  </div>
                </div>
              )
            }
          </div>
        ) : (
          <div className='w-full h-[80vh] flex justify-evenly items-center max-sm:flex-col'>
            <div className='w-[450px] max-lg:w-[400px] max-md:w-[300px]'>
              <img src='https://res.cloudinary.com/do1xweis7/image/upload/v1719326202/Screenshot_2024-06-25_200448_u0bli3.png' alt=''/>
            </div>
            <div className='w-[400px] flex flex-col justify-center items-center gap-4'>
              <div className='text-2xl font-bold text-slate-700 max-md:text-lg'>Please log in to see your cart</div>
              <button
                onClick={() => navigate('/login')}
                className='w-[200px] text-lg font-bold uppercase border-2 border-green-600 rounded-md py-1 px-4 flex justify-center items-center gap-2 bg-green-400 text-slate-600 transition duration-300 hover:bg-green-500 max-sm:text-md' ><AiOutlineLogin className='text-2xl max-md:text-lg'/> LOG IN</button>
            </div>
          </div>
        )}

        {
          isUserInfoActive &&
          (
            <div className={`w-full h-full absolute top-0 left-0 bg-black opacity-70 backdrop-blur`}></div>
          )
        }
      </div>

      <Footer/>
    </div>
  );
};

export default Cart;
