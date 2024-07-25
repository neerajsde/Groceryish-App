import React, { useEffect } from 'react'
import Navbar from '../components/sections/navbar/Navbar'

const Wishlist = () => {

  useEffect(() => {
      document.title = 'Wishlist'
  });

  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default Wishlist