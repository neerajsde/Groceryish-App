import React, { useContext, useEffect } from 'react'
import Navbar from '../components/sections/navbar/Navbar'
import Header from '../components/sections/Header'
import { AppContext } from '../context/AppContext'
import HomeSection from '../components/home-page-section/HomeSection';
import Hot_DealsSection from '../components/home-page-section/Hot_DealsSection';
import Permotions from '../components/home-page-section/Permotions';
import NewProducts from '../components/home-page-section/NewProducts';
import Footer from '../components/sections/Footer';
import { IoMdCloseCircle } from "react-icons/io";
import SearchBar from '../components/search/SearchBar';

const Home = () => {
  const {menuItemsDetector, isAddInfo, setIsAddInfo} = useContext(AppContext);

  useEffect(() => {
    document.title = 'Groceyish - Home';
  },[]);

  return (
    <div className='w-full flex flex-col bg-white relative'>
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

      { // I will Remove when I will have made this.
        isAddInfo && (
          <div className='w-full h-screen absolute top-0 left-0 flex justify-center items-center bg-[#1111] backdrop-blur-sm z-10'>
            <div className='w-[500px] bg-white border-2 border-black relative max-lg:w-[350px] max-sm:w-[250px]'>
              <img src='https://res.cloudinary.com/do1xweis7/image/upload/v1721653403/more_info_banner_scwuip.jpg' alt='I am working on this project' className='w-full'/>
              <div className='absolute top-[-0.8rem] right-[-0.8rem] text-4xl text-white bg-black rounded-full cursor-pointer' onClick={() => setIsAddInfo(false)}><IoMdCloseCircle/></div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Home