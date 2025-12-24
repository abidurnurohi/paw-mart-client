import React, { use, useRef } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const product = useLoaderData();
    const { _id, title, category, location, image, email, description, price } = product;

    const orderModalRef = useRef(null);
    const { user } = use(AuthContext);

    const handleModal = () => {
        orderModalRef.current.showModal();
    };

    const handleOrderSubmit = (e) => {
        e.preventDefault();

        const newOrder = {
            productId: _id,
            productName: category,
            buyerName: user.displayName,
            email: user.email,
            bid_price: e.target.offeredPrice.value,
            address: location,
            photo: image,
            date: new Date()         
        };

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newOrder)
        })
        .then(res => res.json())
        .then(data => {

            if (data.insertedId) {    
                orderModalRef.current.close();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your order has been placed",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    return (
        <div className='p-6'>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <img src={image} className="w-96 rounded-lg mb-4" />

            <p><b>Category:</b> {category}</p>
            <p><b>Owner Email:</b> {email}</p>
            <p><b>Description:</b> {description}</p>
            <p><b>Price:</b> ${price}</p>
            <p><b>Location:</b> {location}</p>

            <button onClick={handleModal} className="btn bg-green-500 mt-6">Adopt / Order Now</button>

            <dialog ref={orderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Place Your Order</h3>

                    <form onSubmit={handleOrderSubmit}>
                        <fieldset className="fieldset">
                            <label className="label">Your Name</label>
                            <input type="text" className="input" readOnly defaultValue={user.displayName} />

                            <label className="label">Your Email</label>
                            <input type="email" className="input" readOnly defaultValue={user.email} />

                            <label className="label">Your Offered Price</label>
                            <input type="text" name="offeredPrice" className="input" required placeholder="Your price" />

                            <button className="btn btn-neutral mt-4">Place Order</button>
                        </fieldset>
                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ProductDetails;
