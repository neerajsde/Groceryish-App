import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { AppContext } from '../context/AppContext'
import Products from '../components/Products';
import HomeSection from '../sections/HomeSection';
import Hot_DealsSection from '../sections/Hot_DealsSection';
import Permotions from '../sections/Permotions';
import NewProducts from '../sections/NewProducts';
import Footer from '../components/Footer';

const Home = () => {
  const {isUserInfoActive, menuItemsDetector} = useContext(AppContext);
  return (
    <div className='w-full flex flex-col bg-white'>
      <Navbar/>
      <Header/>

      <div className='w-full min-h-screen relative'>
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

        {
          isUserInfoActive &&
          (
            <div className={`w-full min-h-screen absolute top-0 left-0 bg-black opacity-70 backdrop-blur`}></div>
          )
        }
      </div>
    </div>
  )
}

export default Home