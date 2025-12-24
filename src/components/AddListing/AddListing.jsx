import React, { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const AddListing = () => {
    const { user } = use(AuthContext);
    const handleAddProduct = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const image = form.image.value;
        const price = form.price.value;
        const location = form.location.value;
        const email = form.email.value;
        const description = form.description.value;

        const newListing = { title, image, price, location, email, description };

        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newListing)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your listing has been added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };
    return (
            <div className='lg:w-1/2 mx-auto'>
                <form onSubmit={handleAddProduct} className="card-body">
                    <fieldset className="fieldset">
                        <label className="label">Product/Pet Name</label>
                        <input type="text" name='title' className="input" />
                        <select defaultValue="Pick a color" className="select appearance-none">
                            <option disabled={true}>Category</option>
                            <option>Pets</option>
                            <option>Food</option>
                            <option>Accessories</option>
                        </select>
                        <label className="label">Image</label>
                        <input type="text" name='image' className="input" />
                        <label className="label">Price</label>
                        <input type="text" name="price" className="input" required placeholder='Price' />
                        <label className="label">Location</label>
                        <input type="text" name="location" className="input" required placeholder='Where are you located' />
                        <input type="email" name='email' className="input" readOnly defaultValue={user.email} />
                        <div class="mb-4">
                            <label for="description" class="block text-gray-700 font-medium mb-2">
                                Description
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                maxlength="5000"
                                rows="8"
                                placeholder="Write detailed information about your pet or product here..."
                                class="w-full p-3 border border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none bg-white"
                            ></textarea>
                        </div>

                        <button className="btn btn-neutral mt-4">Add Product</button>
                    </fieldset>
                </form>
            </div>
        );
    };

    export default AddListing;