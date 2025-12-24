import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase.init';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyListings = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const email = encodeURIComponent(user.email);

        fetch(`http://localhost:3000/products?email=${email}`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:3000/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json'
                    },
                })
                    .then(res => res.json())
                    .then(data => {                    
                        if (data.deletedCount > 0) {
                            Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                       //remove from UI
                        setProducts(prev => prev.filter(p => p._id !== id));
                        };
                    });
            };
        });
    };

    return (
        <div>
            <h2 className='font-bold text-4xl text-green-500 text-center'>My Listings</h2>
            {
                products.map(product => (
                    <div key={product._id} className="card w-96 bg-base-100 shadow-xl mb-4">
                        <figure><img src={product.image} alt="Product" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>
                            <p>Category: {product.category}</p>
                            <p>Price: ${product.price}</p>
                            <p>Location: {product.location}</p>
                        </div>
                        <div className='flex'>
                            <Link to={`/updateProduct/${product._id}`} className="btn btn-primary m-4">Update Listing</Link>
                            <button onClick={() => handleDelete(product._id)} className="btn btn-secondary m-4">Delete Listing</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default MyListings;