import React from 'react';
import { Link } from 'react-router';

const Product = ({ product }) => {
    const { _id, name, category, location, price, image } = product;
    return (
        <div className="card bg-base-100 shadow-sm">
            <figure className="px-5 pt-5">
                <img
                    src={image}
                    alt="Products"
                    className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{category}</p>
                <p>{location}</p>
                <p>Price: ${price}</p>
                <div className="card-actions">
                    <Link to={`/productDetails/${_id}`} className="btn bg-green-500 w-full">See Details</Link>
                </div>
            </div>
        </div>
    );
};

export default Product;