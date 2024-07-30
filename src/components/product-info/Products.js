import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import BlackSpinner from '../BlackSpinner';
import Item from './Item';

const Products = ({visiable_products}) => {
    const {isLoading} = useContext(AppContext);

  return (
    <div className='w-full flex justify-center items-center px-8 py-4 max-sm:px-4'>
        {
            isLoading ? 
            (<BlackSpinner/>)
            : 
            (
                <div className='w-full grid grid-cols-3 justify-center items-center gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1'>
                    {  
                        visiable_products.length > 0 &&
                        (
                            visiable_products.map((data, index) => {
                                return (<Item key={index} data={data}/>)
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