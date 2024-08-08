import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

function AppContextProvider({children}){
    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5050/api/v1';
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cartItem, setCartItem] = useState(0);
    const [userData, setUserData] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [error, setError] = useState('');
    const [isUserInfoActive, setIsUserInfoActive] = useState(false);
    const [isProfilePic, setProfilePic] = useState(false);
    const [updateProfilePic, setUpdateProfilePic] = useState('');
    const [isSellProduct, setIsSellProduct] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [cartProductIDs, setCartProductIDs] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    
    const [menuItemsDetector, setMenuItemsDetector] = useState([true, false, false, false]);
    // location
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');
    // process to buy in cart
    const [cartTotalAmount, setCartTotalAmount] = useState(null);
    // wishlist 
    const [wishlistLength, setWishlistLength] = useState(0);
    const [wishlistItems, setWishlistItems] = useState([]);

    // I want to show My additional info
    const [isAddInfo, setIsAddInfo] = useState(true);

    const fetch_data = async (url, sendData) => {
        try{
            setIsLoading(true);
            const response = await fetch(url, {
                method: 'POST', // Specify the request method
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer your-token',
                },
                body: JSON.stringify(sendData)
            });

            const data = await response.json();
            if(data.sucess){
                if(data.current_page === 'login'){
                    setIsLoggedIn(true);
                    setUpdateProfilePic(data.user.img);
                    setUserData(data);
                    setCartItem(data.user.cart.length);
                    setWishlistLength(data.user.wishlist.length);
                    navigate(-1);
                }
                else{
                    navigate('/login');
                }
                setEmailError('');
                setPassError('');
                setError('');
                toast.success(data.message);
            }
            else{
                if(data.tag === 'email'){
                    setEmailError(data.message);
                    setError(data.message);
                }
                else if(data.tag === 'password'){
                    setPassError(data.message);
                    setError(data.message);
                }
                else if(data.tag === 'error'){
                    setError(data.message);
                }
                else{
                    setError('something went wrong.');
                }
                toast.error(data.message);
            }
        } catch(err){
            setEmailError('');
            setPassError('');
            setError(err.message);
            toast.error(err.message);
        }
        setIsLoading(false);
    }

    const fetchProducts = async () => {
        try{
            setIsLoading(true);
            const url = `${baseUrl}/get-products`;
            let response;
            if(isLoggedIn){
                response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        user_id:userData.user._id
                    })
                });
            }
            else{
                response = await fetch(url, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    }
                });
            }

            const data = await response.json();
            if(data.sucess){
                setAllProducts(data.products);
            }
        }
        catch(err){
            toast.success(err.message)
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    },[isLoggedIn]);

    const fetchUserCartTotalAmount = async () => {
        try{
            let url;
            let response;
            if(isLoggedIn){
                url = `${baseUrl}/get-selected-all-items`;
                response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({user_id: userData.user._id})
                });
            }
            else{
                url = `${baseUrl}/get-selected-all-items-without-login`;
                response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({products:cartProductIDs})
                });
            }

            const data = await response.json();
            if(data.success){
                setCartTotalAmount(data);
                console.log('data fetched sucessfully in cart');
            }
        }
        catch(err){
            toast.error('something went wrong.');
        }
    }

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

    const value = {
        isLoggedIn, setIsLoggedIn,
        isLoading, setIsLoading,
        cartItem, setCartItem,
        userData, setUserData,
        emailError, setEmailError,
        passError, setPassError,
        error, setError,
        fetch_data,
        isUserInfoActive, setIsUserInfoActive,
        isProfilePic, setProfilePic,
        updateProfilePic, setUpdateProfilePic,
        isSellProduct, setIsSellProduct,
        cartData, setCartData,
        cartProductIDs, setCartProductIDs,
        allProducts, setAllProducts, 
        menuItemsDetector, setMenuItemsDetector,
        fetchProducts,
        // location 
        city, setCity,
        area, setArea,
        // I will remove when this is completed
        isAddInfo, setIsAddInfo,
        // user cart total amount
        cartTotalAmount, setCartTotalAmount, fetchUserCartTotalAmount,
        // wishlist
        wishlistLength, setWishlistLength,
        wishlistItems, setWishlistItems,
        maxCategory, setMaxCategory
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;