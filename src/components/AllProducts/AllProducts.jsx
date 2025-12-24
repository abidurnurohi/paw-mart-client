import React from 'react';
import { useLoaderData } from 'react-router';
import Product from '../Product/Product';

const AllProducts = () => {

    const products = useLoaderData();
    return (
        <div>
            <h2 className='font-bold text-4xl text-green-500 text-center py-2'>All Listings</h2>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    // Map through all products and render them
                    products.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default AllProducts;