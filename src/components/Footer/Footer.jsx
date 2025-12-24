import React from "react";
import { Link } from "react-router";


const Footer = () => {
    return (
        <footer className="bg-green-500 text-white py-8 mt-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center">

                <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold">PawMart</h2>
                    <p className="mt-2 max-w-xs">
                        PawMart connects local pet owners and buyers for adoption and pet care products.
                    </p>
                </div>

                <div className="mb-6 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2">Useful Links</h3>
                    <ul>
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="/" className="hover:underline">Contact</Link></li>
                        <li><Link to="/" className="hover:underline">Terms</Link></li>
                    </ul>
                </div>

                <div>
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} PawMart. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
