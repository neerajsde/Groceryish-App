import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import WishListItems from '../product-info/WishListItems';

const Favourites = () => {
  const {isLoggedIn} = useContext(AppContext);

  return (
    <div>
      {
        isLoggedIn ? (
          <div className='w-full flex justify-center bg-gray-300 p-4'><div className='w-[900px] max-lg:w-full'><WishListItems/></div></div>
        ):
        (
          <div></div>
        )
      }
    </div>
  )
}

export default Favourites