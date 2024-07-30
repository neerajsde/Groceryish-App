import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UserAccount from './pages/UserAccount'
import Cart from './pages/Cart'
import { AppContext } from './context/AppContext'
import AddProduct from './components/product-info/AddProduct'
import Wishlist from './pages/Wishlist'
import BlackSpinner from './components/BlackSpinner'

const App = () => {
  const {isSellProduct, isLoading} = useContext(AppContext);
  return (
    <div className='w-screen h-screen relative overflow-x-hidden'>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/user-account' element={<UserAccount/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
      </Routes>

      {
        isSellProduct && (<AddProduct/>)
      }
      {
        isLoading && (
          <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-8'>
            <div className="w-[200px] h-[150px] rounded-lg bg-[rgba(248,203,204,0.5)] backdrop-blur flex flex-col justify-center items-center gap-2">
              <div className='text-md font-semibold text-black'>Loading...</div>
              <BlackSpinner/>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App