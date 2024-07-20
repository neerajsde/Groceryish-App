import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';
import Item from './Item';

const Products = ({visiable_products}) => {
    const allProducts = visiable_products;
    const {isLoading,fetchProducts, setAllProducts, setIsAddedToCart} = useContext(AppContext);

    useEffect(() => {
        fetchProducts();
        if(allProducts.length === 0){
            setIsAddedToCart(new Array(allProducts.length).fill(false));
        }
    }, [setAllProducts]);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

  return (
    <div className='w-full flex justify-start items-center px-8 py-4'>
        {
            isLoading ? 
            (<Spinner/>)
            : 
            (
                <div className='w-full grid grid-cols-3 justify-center items-center gap-4'>
                    {  
                        allProducts.length === 0 ? 
                        (<h2>No Item Is There</h2>) : 
                        (
                            shuffleArray(allProducts).map((data, index) => {
                                return (<Item key={index} data={data} index={index}/>)
                            })
                        )
                    }
                </div>
            )
        }
    </div>
  )
}

export default Products