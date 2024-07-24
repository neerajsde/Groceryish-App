import React, { useContext } from 'react'
import Search from './Search'
import ShowUserName from './ShowUserName'
import { AppContext } from '../context/AppContext'
import Location from './Location'

const SearchBar = () => {
    const {isLoggedIn} = useContext(AppContext);
  return (
    <div className={`w-full min-h-[50px] flex items-center justify-between lg:hidden px-2 py-2 gap-2 border-b max-sm:flex-col bg-[#2ff5e5bc]`}>
        {
            isLoggedIn ? (
              <div className='flex items-center gap-4 max-sm:w-full justify-around'>
                <ShowUserName/>
                <div className='sm:hidden'><Location/></div>
              </div>
            ) : (<Location/>)
        }
        <Search/>
    </div>
  )
}

export default SearchBar