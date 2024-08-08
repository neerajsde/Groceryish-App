import React, { useContext, useEffect } from 'react'
import Navbar from '../components/sections/navbar/Navbar'
import Header from '../components/sections/Header'
import { AppContext } from '../context/AppContext'
import HomeSection from '../components/home-page-section/HomeSection';
import Hot_DealsSection from '../components/home-page-section/Hot_DealsSection';
import Permotions from '../components/home-page-section/Permotions';
import NewProducts from '../components/home-page-section/NewProducts';
import Footer from '../components/sections/Footer';
import SearchBar from '../components/search/SearchBar';

const Home = () => {
  const {menuItemsDetector} = useContext(AppContext);

  useEffect(() => {
    document.title = 'Groceyish - Home';
  },[]);

  return (
    <div className='w-full flex flex-col bg-white'>
      <Navbar/>
      <SearchBar/>

      <div className='w-full min-h-screen relative'>
        <Header/>
        {
          menuItemsDetector[0] && (<HomeSection/>)
        }

        {
          menuItemsDetector[1] && (<Hot_DealsSection/>)
        }

        {
          menuItemsDetector[2] && (<Permotions/>)
        }

        {
          menuItemsDetector[3] && (<NewProducts/>)
        }

        <Footer/>
      </div>
    </div>
  )
}

export default Home