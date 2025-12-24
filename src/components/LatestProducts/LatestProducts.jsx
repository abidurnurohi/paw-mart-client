import React, { use } from 'react';
import Product from '../Product/Product';

const LatestProducts = ({ latestProductsPromise }) => {
    const products = use(latestProductsPromise);
    return (
        <div>
            <h2 className='font-bold text-4xl text-green-500 text-center py-2'>Recent Listings</h2>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;