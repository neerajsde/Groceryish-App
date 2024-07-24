import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { AppContext } from '../context/AppContext'
import HomeSection from '../sections/HomeSection';
import Hot_DealsSection from '../sections/Hot_DealsSection';
import Permotions from '../sections/Permotions';
import NewProducts from '../sections/NewProducts';
import Footer from '../components/Footer';
import { IoMdCloseCircle } from "react-icons/io";
import SearchBar from '../components/SearchBar';

const Home = () => {
  const {isUserInfoActive, menuItemsDetector, isAddInfo, setIsAddInfo} = useContext(AppContext);

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

        {
          isUserInfoActive &&
          (
            <div className={`w-full min-h-screen absolute top-0 left-0 bg-black opacity-70 backdrop-blur`}></div>
          )
        }
      </div>

      { // I will Remove when I will have made this.
        isAddInfo && (
          <div className='w-full h-screen absolute top-0 left-0 flex justify-center items-center bg-[#1111] backdrop-blur-sm'>
            <div className='w-full max-w-[500px] bg-white border-2 border-black relative'>
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