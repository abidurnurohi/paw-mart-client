import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const MyOrders = () => {
    const { user } = use(AuthContext)
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (user?.email) {
            fetch(`https://paw-mart-api-server-murex.vercel.app/orders?email=${user.email}`,{
                headers:{
                    authorization: `Bearer ${user.accessToken}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                })
        }
    }, [user]);

    return (
        <div>
            <h3 className='font-bold text-2xl text-gray-500'>MY ORDERS: {orders.length}</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                Serial
                            </th>
                            <th>Product</th>
                            <th>Buyer Info</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Download Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => 
                        <tr key={order._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={order.photo}
                                                        alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-green-500">{order.productName}</div>
                                                <div className="text-sm opacity-50">{order.address}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                       {order.buyerName}
                                        <br />
                                        <span className="badge badge-ghost badge-sm"> {order.email}</span>
                                    </td>
                                    <td>{order.bid_price}</td>
                                    <td>20/09/2025</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">Download</button>
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;