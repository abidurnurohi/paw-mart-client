import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
    const { user, signOutUser } = use(AuthContext);

    const handleSignOut = () => {
        signOutUser().then().catch();
    };

    // Middle Nav Links
    const navLinks = (
        <>
            <li><NavLink to="/" className="text-gray-600 font-semibold">Home</NavLink></li>
            <li><NavLink to="/allProducts" className="text-gray-600 font-semibold">Pets & Supplies</NavLink></li>

            {user && (
                <>
                    <li><NavLink to="/addListing" className="text-gray-600 font-semibold">Add Listing</NavLink></li>
                    <li><NavLink to="/myListings" className="text-gray-600 font-semibold">My Listings</NavLink></li>
                    <li><NavLink to="/myOrders" className="text-gray-600 font-semibold">My Orders</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm px-4">

            {/* LEFT SIDE */}
            <div className="navbar-start">
                {/* Mobile Dropdown */}
                <div className="dropdown lg:hidden">
                    <button tabIndex={0} className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>

                <Link to="/" className="btn btn-ghost text-2xl font-bold text-green-600">
                    PawMart
                </Link>
            </div>

            {/* MIDDLE LINKS (Large Screens) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navLinks}</ul>
            </div>

            {/* RIGHT SIDE */}
            <div className="navbar-end">

                {!user ? (
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="btn hover:bg-green-500">Login</Link>
                        <Link to="/register" className="btn hover:bg-green-500">Register</Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        {/* Profile Avatar */}
                        <div className="w-10 h-10 rounded-full overflow-hidden border">
                            <img
                                src={user.image || "https://i.ibb.co/5gNzzrY7/Shakib.jpg"}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <button onClick={handleSignOut} className="btn btn-sm bg-green-500">
                            Logout
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Navbar;
