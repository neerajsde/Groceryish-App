import { createContext, useState } from "react";
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
    const [allProducts, setAllProducts] = useState([]);
    const [isAddedToCart, setIsAddedToCart] = useState([]);
    const [menuItemsDetector, setMenuItemsDetector] = useState([true, false, false, false]);

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
                    console.log(data);
                    navigate('/');
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
            console.log(url);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                }
            });

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
        allProducts, setAllProducts, 
        isAddedToCart, setIsAddedToCart, 
        menuItemsDetector, setMenuItemsDetector,
        fetchProducts
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;