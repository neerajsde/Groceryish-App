import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { SlPaperPlane } from "react-icons/sl";
import Spinner from '../Spinner';
import { AppContext } from '../../context/AppContext';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Featued_Products from './Featued_Products';

const homeBanners = [
  <svg id="10015.io" viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="svg-pattern" x="0" y="0" width="134" height="134" patternUnits="userSpaceOnUse" patternTransform="translate(100, 100) rotate(145) skewX(0)"><svg width="34" height="34" viewBox="0 0 100 100"><g fill="#8ceebd" opacity="1"><path d="M50.0439 50.0439C22.7868 49.2528 0.835069 27.3011 0.0439453 0.0439453C27.3011 0.835069 49.2528 22.7868 50.0439 50.0439Z"></path><path d="M50.0439 50C22.7868 50.7911 0.835069 72.7429 0.0439453 100C27.3011 99.2089 49.2528 77.2571 50.0439 50Z"></path><path d="M50 50.0439C77.2571 49.2528 99.2089 27.3011 100 0.0439453C72.7429 0.835069 50.7911 22.7868 50 50.0439Z"></path><path d="M50 50C77.2571 50.7911 99.2089 72.7429 100 100C72.7429 99.2089 50.7911 77.2571 50 50Z"></path></g></svg></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="#3ad3ac"></rect><rect x="0" y="0" width="100%" height="100%" fill="url(#svg-pattern)"></rect></svg>,
  <svg id="10015.io" viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="svg-pattern" x="0" y="0" width="142" height="142" patternUnits="userSpaceOnUse" patternTransform="translate(100, 100) rotate(145) skewX(0)"><svg width="42" height="42" viewBox="0 0 100 100"><g fill="#bbc5c8" opacity="1"><path d="M50.0439 50.0439C22.7868 49.2528 0.835069 27.3011 0.0439453 0.0439453C27.3011 0.835069 49.2528 22.7868 50.0439 50.0439Z"></path><path d="M50.0439 50C22.7868 50.7911 0.835069 72.7429 0.0439453 100C27.3011 99.2089 49.2528 77.2571 50.0439 50Z"></path><path d="M50 50.0439C77.2571 49.2528 99.2089 27.3011 100 0.0439453C72.7429 0.835069 50.7911 22.7868 50 50.0439Z"></path><path d="M50 50C77.2571 50.7911 99.2089 72.7429 100 100C72.7429 99.2089 50.7911 77.2571 50 50Z"></path></g></svg></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="#7afabc"></rect><rect x="0" y="0" width="100%" height="100%" fill="url(#svg-pattern)"></rect></svg>,
  <svg id="10015.io" viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="svg-pattern" x="0" y="0" width="142" height="142" patternUnits="userSpaceOnUse" patternTransform="translate(100, 100) rotate(145) skewX(0)"><svg width="42" height="42" viewBox="0 0 100 100"><g fill="#6c8b8e" opacity="1"><path d="M50.0439 50.0439C22.7868 49.2528 0.835069 27.3011 0.0439453 0.0439453C27.3011 0.835069 49.2528 22.7868 50.0439 50.0439Z"></path><path d="M50.0439 50C22.7868 50.7911 0.835069 72.7429 0.0439453 100C27.3011 99.2089 49.2528 77.2571 50.0439 50Z"></path><path d="M50 50.0439C77.2571 49.2528 99.2089 27.3011 100 0.0439453C72.7429 0.835069 50.7911 22.7868 50 50.0439Z"></path><path d="M50 50C77.2571 50.7911 99.2089 72.7429 100 100C72.7429 99.2089 50.7911 77.2571 50 50Z"></path></g></svg></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="#dbfa7a"></rect><rect x="0" y="0" width="100%" height="100%" fill="url(#svg-pattern)"></rect></svg>,
  <svg id="10015.io" viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="svg-pattern" x="0" y="0" width="142" height="142" patternUnits="userSpaceOnUse" patternTransform="translate(100, 100) rotate(145) skewX(0)"><svg width="42" height="42" viewBox="0 0 100 100"><g fill="#49f785" opacity="1"><path d="M50.0439 50.0439C22.7868 49.2528 0.835069 27.3011 0.0439453 0.0439453C27.3011 0.835069 49.2528 22.7868 50.0439 50.0439Z"></path><path d="M50.0439 50C22.7868 50.7911 0.835069 72.7429 0.0439453 100C27.3011 99.2089 49.2528 77.2571 50.0439 50Z"></path><path d="M50 50.0439C77.2571 49.2528 99.2089 27.3011 100 0.0439453C72.7429 0.835069 50.7911 22.7868 50 50.0439Z"></path><path d="M50 50C77.2571 50.7911 99.2089 72.7429 100 100C72.7429 99.2089 50.7911 77.2571 50 50Z"></path></g></svg></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="#fa9c7a"></rect><rect x="0" y="0" width="100%" height="100%" fill="url(#svg-pattern)"></rect></svg>,
  <svg id="10015.io" viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="svg-pattern" x="0" y="0" width="142" height="142" patternUnits="userSpaceOnUse" patternTransform="translate(100, 100) rotate(145) skewX(0)"><svg width="42" height="42" viewBox="0 0 100 100"><g fill="#bbc5c8" opacity="1"><path d="M50.0439 50.0439C22.7868 49.2528 0.835069 27.3011 0.0439453 0.0439453C27.3011 0.835069 49.2528 22.7868 50.0439 50.0439Z"></path><path d="M50.0439 50C22.7868 50.7911 0.835069 72.7429 0.0439453 100C27.3011 99.2089 49.2528 77.2571 50.0439 50Z"></path><path d="M50 50.0439C77.2571 49.2528 99.2089 27.3011 100 0.0439453C72.7429 0.835069 50.7911 22.7868 50 50.0439Z"></path><path d="M50 50C77.2571 50.7911 99.2089 72.7429 100 100C72.7429 99.2089 50.7911 77.2571 50 50Z"></path></g></svg></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="#fb7c89"></rect><rect x="0" y="0" width="100%" height="100%" fill="url(#svg-pattern)"></rect></svg>,
  <svg id="10015.io" viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="svg-pattern" x="0" y="0" width="142" height="142" patternUnits="userSpaceOnUse" patternTransform="translate(100, 100) rotate(145) skewX(0)"><svg width="42" height="42" viewBox="0 0 100 100"><g fill="#bac9c0" opacity="1"><path d="M50.0439 50.0439C22.7868 49.2528 0.835069 27.3011 0.0439453 0.0439453C27.3011 0.835069 49.2528 22.7868 50.0439 50.0439Z"></path><path d="M50.0439 50C22.7868 50.7911 0.835069 72.7429 0.0439453 100C27.3011 99.2089 49.2528 77.2571 50.0439 50Z"></path><path d="M50 50.0439C77.2571 49.2528 99.2089 27.3011 100 0.0439453C72.7429 0.835069 50.7911 22.7868 50 50.0439Z"></path><path d="M50 50C77.2571 50.7911 99.2089 72.7429 100 100C72.7429 99.2089 50.7911 77.2571 50 50Z"></path></g></svg></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="#867afa"></rect><rect x="0" y="0" width="100%" height="100%" fill="url(#svg-pattern)"></rect></svg>,
  <svg id="10015.io" viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="svg-pattern" x="0" y="0" width="142" height="142" patternUnits="userSpaceOnUse" patternTransform="translate(100, 100) rotate(145) skewX(0)"><svg width="42" height="42" viewBox="0 0 100 100"><g fill="#bac9c0" opacity="1"><path d="M50.0439 50.0439C22.7868 49.2528 0.835069 27.3011 0.0439453 0.0439453C27.3011 0.835069 49.2528 22.7868 50.0439 50.0439Z"></path><path d="M50.0439 50C22.7868 50.7911 0.835069 72.7429 0.0439453 100C27.3011 99.2089 49.2528 77.2571 50.0439 50Z"></path><path d="M50 50.0439C77.2571 49.2528 99.2089 27.3011 100 0.0439453C72.7429 0.835069 50.7911 22.7868 50 50.0439Z"></path><path d="M50 50C77.2571 50.7911 99.2089 72.7429 100 100C72.7429 99.2089 50.7911 77.2571 50 50Z"></path></g></svg></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="#fa7aa5"></rect><rect x="0" y="0" width="100%" height="100%" fill="url(#svg-pattern)"></rect></svg>
];

const HomeSection = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5050/api/v1';
  const {allProducts, fetchProducts, isLoggedIn, userData} = useContext(AppContext);
  const [currentBanner, setCurrentBanner] = useState(homeBanners[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uniqueCategory, setUniqueCategory] = useState([]);
  const [colorsArray, setColorsArray] = useState([]);
  const [categoryItems, setcategoryItems] = useState([]);
  const [visiableItems, setVisiableItems] = useState([]);
  const [maxSixItems, setMaxSixItems] = useState([]);
  const [isVisiableLeftArrow, setIsVisiableLeftArrow] = useState(true);
  const [isVisiableRightArrow, setIsVisiableRightArrow] = useState(true);
  const [currentCategory, setCurrentCategory] = useState('All');

  // Function to determine maxCategory based on width
  const getMaxCategory = (width) => {
    if (width < 425) {
      return 1;
    }else if (width > 425 && width < 500) {
      return 2;
    } else if (width < 768) {
      return 3;
    } else {
      return 6;
    }
  };
  const [width, setWidth] = useState(window.innerWidth);
  const [maxCategory, setMaxCategory] = useState(getMaxCategory(window.outerWidth));

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.outerWidth;
      setWidth(newWidth);
      setMaxCategory(getMaxCategory(newWidth));
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prevBanner => {
        const currentIndex = homeBanners.indexOf(prevBanner);
        setCurrentIndex(currentIndex);
        const nextIndex = (currentIndex + 1) % homeBanners.length;
        return homeBanners[nextIndex];
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  function emailHandler(event){
    setUserEmail(event.target.value);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setcategoryItems(allProducts);
    categoryHandler('All');
  },[allProducts])

  function categoryHandler(category) {
    if (category === 'All') {
      setVisiableItems(categoryItems);
      setMaxSixItems(categoryItems.length > maxCategory ? categoryItems.slice(0, maxCategory) : categoryItems);
      setIsVisiableLeftArrow(false);
      setIsVisiableRightArrow(categoryItems.length > maxCategory);
      setColorsArray(shuffleArray([...colorsArray]));
      setCurrentCategory('All');
      return;
    }
  
    const filterItems = categoryItems.filter(product => product.category === category);
    setVisiableItems(filterItems);
    setMaxSixItems(filterItems.slice(0, maxCategory));
    handleArrowBtn();
    setColorsArray(shuffleArray([...colorsArray]));
    setCurrentCategory(category);
  }
  

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleLeftMoveItems() {
    if(!isVisiableLeftArrow){
      toast.error('no more items');
      return;
    }
    const items = visiableItems;
    setMaxSixItems((prevData) => {
        const prevItems = [...prevData];
        const index = items.indexOf(prevItems[0]);

        if (index > 0) {
            prevItems.unshift(items[index - 1]);

            // Ensure only a maximum of six items
            if (prevItems.length > maxCategory) {
                prevItems.pop();
            }
        }
        handleArrowBtn();
        return prevItems;
    });
  }

  function handleRightMoveItems() {
    if(!isVisiableRightArrow){
      toast.error('no more items.');
      return;
    }
    const items = visiableItems;
    setMaxSixItems((prevData) => {
        const prevItems = [...prevData];
        const index = items.indexOf(prevItems[prevItems.length - 1]);

        if (index < items.length - 1) {
            prevItems.push(items[index + 1]);

            // Ensure only a maximum of six items
            if (prevItems.length > maxCategory) {
                prevItems.shift();
            }
        }
        handleArrowBtn();
        return prevItems;
    });
  }

  function handleArrowBtn() {
    const items = visiableItems;
    const leftIndex = items.indexOf(maxSixItems[0]);
    const rightIndex = items.indexOf(maxSixItems[maxSixItems.length - 1]);
  
    setIsVisiableLeftArrow(leftIndex > 0);
    setIsVisiableRightArrow(rightIndex < items.length - 1);
  }
  

  const subscribe = async (email_id) => {
    try{
      setIsLoading(true);
      const url = `${baseUrl}/subscribe`;
      const response = await fetch(url, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email_id
          })
      });

      const data = await response.json();
      if(data.sucess){
        toast.success(data.message);
      }
      else{
        toast.error(data.message);
      }
    }
    catch(err){
      toast.error(err.message);
    }
    finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const categories = ["All"];
    allProducts.forEach((product) => {
      categories.push(product.category);
    });
    const uniqueSet = new Set(categories);
    setUniqueCategory(Array.from(uniqueSet));

    generateHexColorsArray(allProducts.length);
  }, [allProducts]);

  function generateHexColorsArray(length) {
    const colorsArray = [];
    for(let i=0; i<length; i++){
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      colorsArray.push(color);
    }
    setColorsArray(colorsArray);
  }

  const getClassNames = (product) => {
    if (currentCategory === product) {
      return 'text-green-600 bold border-b-2 border-b-green-500';
    }
    return 'text-gray-400 hover:text-black border-b-2 border-b-transparent';
  };
  

  return (
    <div className='w-full relative'>
        <div className='max-md:hidden'>{currentBanner}</div>
        <div className='md:hidden w-full min-h-[80vh] bg-green-300 flex justify-center items-end relative'>
            <img 
              src='https://res.cloudinary.com/do1xweis7/image/upload/v1721280453/fruits_banner_hq3qfx.png' 
              alt=''
              className='w-[400px]'
            />
            <div className='w-full min-h-[80vh] absolute top-0 left-0 bg-[#1111112c]'></div>
        </div>
        
        <div className='absolute top-0 right-0 w-full flex flex-col items-center justify-center max-md:top-5'>

          <div className='w-full flex items-center justify-evenly max-lg:justify-center max-md:flex-col'>
            <div className='flex flex-col gap-6 max-lg:gap-4 max-md:gap-5'>
              {
                isLoggedIn && (
                  <div className='flex flex-col'>
                    <div className='text-lg text-gray-500 font-semibold'>Welcome 👋</div>
                    <div className='text-2xl text-black font-bold capitalize'>{userData.user.name}</div>
                  </div>
                )
              }
              <h2 className='text-5xl font-bold text-slate-700 max-lg:text-3xl'>Don't miss our daily <br/>amazing deals.</h2>
              <p className='text-xl font-semibold text-gray-500 max-lg:text-base'>Save upto 60% off on your first order</p>
              <div className='w-full flex items-center justify-between relative'>
                <input
                  type='email'
                  name='email'
                  placeholder={isLoggedIn ? 'Enter your another email address':'Enter your email address'}
                  value={userEmail}
                  onChange={emailHandler}
                  className='w-full text-lg font-medium pl-10 px-2 py-2 outline-none border-none max-lg:text-base max-lg:pl-7 max-lg:rounded'
                />
                <button className='text-lg font-semibold text-white bg-green-600 py-2 px-4 outline-none border-none flex items-center gap-2 max-lg:text-base max-lg:hidden' onClick={() => subscribe(userEmail)}>Subscribe {isLoading && (<Spinner/>)}</button>
                <div className='absolute top-4 left-3 text-gray-500 text-md max-lg:text-sm max-lg:left-2 max-lg:top-4'><SlPaperPlane/></div>
              </div>
              <button className='w-[150px] text-lg font-semibold rounded-sm text-white bg-green-600 py-2 px-4 outline-none border-none flex items-center justify-center gap-2 lg:hidden max-lg:text-base' onClick={() => subscribe(userEmail)}>Subscribe {isLoading && (<Spinner/>)}</button>
            </div>

            <img 
              src='https://res.cloudinary.com/do1xweis7/image/upload/v1721280453/fruits_banner_hq3qfx.png' 
              alt=''
                className='w-[600px] max-lg:w-[400px] max-md:hidden'
            />
          </div>

          <div className='w-full flex items-center justify-center gap-2 mt-[-20px] max-md:hidden'>
            {
              homeBanners.map((item, index) => {
                return (
                  <div key={index} className={`w-[12px] h-[12px] border-[1.5px] border-black rounded-full cursor-pointer ${index === currentIndex ? 'bg-green-600 border-white-600' : 'border-black bg-transparent'}`}></div>
                )
              })
            }
          </div>
        </div>


        <div className='w-full flex flex-col items-center py-8 gap-8'>
            <div className='w-full flex items-center justify-between px-8 max-md:px-4 max-md:flex-col max-md:gap-4'>
              <h2 className='text-3xl font-bold text-slate-600 max-lg:text-2xl max-md:text-xl'>Explore Categories</h2>
              <div className='flex items-center gap-6 max-md:flex-wrap max-md:gap-y-1 max-sm:gap-3 max-md:justify-between'>
                {
                  uniqueCategory.map((product, index) => {
                  return (
                    <div 
                      key={index} 
                      onClick={() => categoryHandler(product)} 
                      className={`text-base font-semibold cursor-pointer ${getClassNames(product)} transition duration-200 ease-linear`}
                    >
                      {product}
                    </div>
                  );
                  })
                }
              </div>
            </div>

            <div className='w-full flex items-center justify-between px-4'>
              <div className={`text-3xl bg-gray-200 py-4 px-2 max-md:text-xl ${isVisiableLeftArrow ? 'cursor-pointer text-black' : ' cursor-not-allowed text-white'}`} onClick={handleLeftMoveItems}><FaChevronLeft/></div>

              <div className='flex items-center gap-4'>
                {
                  maxSixItems.map((product, index) => {
                    return (
                      <div key={index} style={{ borderColor: colorsArray[index] }} className='w-[170px] rounded-md border-2 object-cover flex flex-col items-center gap-2 cursor-pointer'>
                        <div>
                          <img src={product.img} alt='' className='w-full h-[150px] p-2'/>
                        </div>
                        <div style={{ backgroundColor: colorsArray[index] }} className='w-full flex flex-col items-center'>
                          <div className='text-md font-semibold text-white'>{product.name}</div>
                          <div className='text-lg font-semibold text-gray-200'>{product.quantity}</div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>

              <div className={`text-3xl bg-gray-200 py-4 px-2 max-md:text-xl cursor-pointer ${isVisiableRightArrow ? 'cursor-pointer text-black' : ' cursor-not-allowed text-white'}`} onClick={handleRightMoveItems}><FaChevronRight/></div>
            </div>
        </div>

        <Featued_Products/>
    </div>
  )
}

export default HomeSection