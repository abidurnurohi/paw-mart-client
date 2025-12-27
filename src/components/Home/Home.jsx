import React from 'react';
import LatestProducts from '../LatestProducts/LatestProducts';
import Banner from '../Banner/Banner';

const latestProductsPromise = fetch('https://paw-mart-api-server-murex.vercel.app/latest-products')
    .then(res => res.json());

const Home = () => {

    const slides = [
        {
            image: "https://i.ibb.co.com/N25ZtJyf/Banner1.webp",
            caption: "“Find Your Furry Friend Today!”"
        },
        {
            image: "https://i.ibb.co.com/bMB8dKhX/Banner2.webp",
            caption: "“Adopt, Don’t Shop — Give a Pet a Home.”"
        },
        {
            image: "https://i.ibb.co/TMPmSK0q/Banner3.webp",
            caption: "Healthy & Safe Pets for Your Family"
        }
    ];

    return (
        <div>
            <Banner slides={slides} />

            <LatestProducts latestProductsPromise={latestProductsPromise} />
        </div>
    );
};

export default Home;
