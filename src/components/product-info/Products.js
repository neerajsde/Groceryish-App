import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import Spinner from '../Spinner';
import Item from './Item';

const Products = ({visiable_products}) => {
    const allProducts = visiable_products;
    const {isLoading, setIsAddedToCart} = useContext(AppContext);

    useEffect(() => {
        if(allProducts.length === 0){
            setIsAddedToCart(new Array(allProducts.length).fill(false));
        }
    }, [allProducts]);

  return (
    <div className='w-full flex justify-start items-center px-8 py-4 max-sm:px-4'>
        {
            isLoading ? 
            (<Spinner/>)
            : 
            (
                <div className='w-full grid grid-cols-3 justify-center items-center gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1'>
                    {  
                        allProducts.length > 0 &&
                        (
                            allProducts.map((data, index) => {
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