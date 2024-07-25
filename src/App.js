import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Toaster } from 'react-hot-toast'
import UserAccount from './pages/UserAccount'
import Cart from './pages/Cart'
import { AppContext } from './context/AppContext'
import AddProduct from './components/product-info/AddProduct'
import Wishlist from './pages/Wishlist'

const App = () => {
  const {isSellProduct} = useContext(AppContext);
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
    </div>
  )
}

export default App