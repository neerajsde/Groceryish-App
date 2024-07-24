import React, { useState } from 'react';
import { IoSearch, IoClose } from "react-icons/io5";

const Search = () => {
    
    const [searchInput, setSearchInput] = useState({
        search: '',
        category: 'all'
    });

    function inputHandler(event) {
        setSearchInput((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }
    function handleSearch() {
        // Implement your search logic here
        console.log("Search term:", searchInput.search);
        console.log("Selected category:", searchInput.category);
    }

    const category = ['Vegitables','Fruits', 'Coffe & teas','Baby', 'Beauty', 'Gift Cards', 'Toys & Gaming'];

  return (
    <div className='w-[500px] h-[45px] flex justify-center items-center rounded-lg relative max-sm:w-[90vw] max-sm:h-[35px] max-lg:border max-lg:border-black'>
        <select name='category' className=' h-full rounded-l-md bg-gray-200 border-none outline-none px-1 text-sm font-semibold text-black max-sm:hidden max-lg:bg-white' onChange={inputHandler}>
            <option value='all'>All Categories</option>
            {
                category.map((item, index) => {
                    return (
                        <option key={index} value={item}>{item}</option>
                    )
                })
            }
        </select>
        <div className='h-full flex items-center bg-gray-200 px-1 max-lg:bg-white max-sm:hidden'><div className='w-[2px] h-[50%] bg-gray-400 border border-gray-400 rounded-full max-sm:hidden'></div></div>
        <input
            type='text'
            name='search'
            placeholder='Search for items...'
            value={searchInput.search}
            onChange={inputHandler}
            className='w-full h-full text-black outline-none px-2 pr-8 text-base font-semibold bg-gray-200 max-sm:text-sm max-sm:px-3 max-lg:bg-white max-sm:border-l max-sm:border-black max-sm:rounded-l-md max-sm:pr-7'
        />
        {searchInput.search && (
            <div
                className='absolute top-[0.65rem] right-[3.2rem] text-2xl font-bold cursor-pointer text-blue-500 max-sm:right-[40px] max-sm:top-2 max-sm:text-base'
                onClick={() => setSearchInput((prevData) => ({
                    ...prevData,
                    search: ''
                }))}
            >
                <IoClose />
            </div>
        )}
        <button
            className='w-[80px] h-full text-white bg-green-600 flex justify-center items-center text-2xl rounded-r-md transition duration-300 ease-in hover:bg-green-600 max-sm:w-[40px]'
            onClick={handleSearch}
        >
            <IoSearch />
        </button>
    </div>
  )
}

export default Search