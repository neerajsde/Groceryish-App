import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext';
import Products from '../components/Products';

const Featued_Products = () => {
    const {allProducts} = useContext(AppContext);
    const [uniqueCategory, setUniqueCategory] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('All');
    const [visiableProducts, setVisableProducts] = useState([]);

    useEffect(() => {
        setVisableProducts(allProducts);
        const categories = ["All"];
        allProducts.forEach((product) => {
          categories.push(product.category);
        });
        const uniqueSet = new Set(categories);
        setUniqueCategory(Array.from(uniqueSet));

    }, [allProducts]);

    function categoryHandler(category) {
        if (category === 'All') {
          setCurrentCategory('All');
          setVisableProducts(allProducts);
          return;
        }

        setCurrentCategory(category);
        const filterItems = allProducts.filter(product => product.category === category);
        setVisableProducts(filterItems);
    }

    const getClassNames = (product) => {
      if (currentCategory === product) {
        return 'text-green-600 bold border-b-2 border-b-green-500';
      }
      return 'text-gray-400 hover:text-black border-b-2 border-b-transparent';
    };

  return (
    <div className='w-full flex flex-col items-center py-8 gap-8 max-md:gap-1'>
        <div className='w-full flex items-center justify-between px-8 max-md:px-4 max-md:flex-col max-md:gap-4'>
            <h2 className='text-3xl font-bold text-slate-600 max-lg:text-2xl max-md:text-xl'>Featured Products</h2>
            <div className='flex items-center gap-6 max-md:flex-wrap max-md:gap-y-1 max-sm:gap-3 max-md:justify-between'>
                {
                uniqueCategory.map((product, index) => {
                return (
                    <div 
                    key={index} 
                    onClick={() => categoryHandler(product)} 
                    className={`text-base font-semibold cursor-pointer ${getClassNames(product)} transition duration-200 ease-linear`}
                    >
                    {product}
                    </div>
                );
                })
                }
            </div>
        </div>
        <Products visiable_products={visiableProducts}/>
    </div>
  )
}

export default Featued_Products