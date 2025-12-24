import React, { useState, useEffect } from "react";

const Banner = ({ slides }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrent((current - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrent((current + 1) % slides.length);
    };

    return (
        <div className="relative w-full h-[450px] overflow-hidden rounded-xl shadow-lg">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === current ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <img
                        src={slide.image}
                        alt="Banner"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-40 w-full p-4">
                        <h2 className="text-white text-2xl font-semibold">
                            {slide.caption}
                        </h2>
                    </div>
                </div>
            ))}

            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/50 p-3 rounded-full"
            >
                ❮
            </button>

            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/50 p-3 rounded-full"
            >
                ❯
            </button>
        </div>
    );
};

export default Banner;
