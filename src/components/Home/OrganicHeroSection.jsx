import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function OrganicHeroSection() {
    const categories = [
        "Fresh & Organic",
        "Baby Food & Care",
        "Fresh Vegetables",
        "Meat & Fish",
        "Dairy & Eggs",
        "Bakery & Snacks",
        "Rice, Pulses",
        "Beverages & Juices",
        "Frozen Foods",
    ];

    const banners = [
        {
            image: "/image/banner/banner2.jpg",
            title: "Eat Fresh,\nLive Healthy",
            description: "Organic produce delivered at your door.",
        },
        {
            image: "/image/banner/banner1.jpg",
            title: "Pure & Natural\nProducts",
            description: "Healthy choices for your daily lifestyle.",
        },
        {
            image: "/image/banner/banner3.jpg",
            title: "Farm Fresh\nVegetables",
            description: "Straight from farm to your home.",
        },
    ];

    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [current]);

    return (
        <div className="w-full flex items-center justify-center py-6 px-4 md:px-0">
            <div className="w-full max-w-[1440px] mx-auto grid grid-cols-12 gap-6">

                {/* Sidebar */}
                <div className="hidden md:block col-span-3 bg-white rounded-2xl shadow-xs border border-gray-100 self-start overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-50 font-bold text-gray-800">
                        All Categories
                    </div>
                    <div className="p-2 space-y-1 overflow-y-auto max-h-[390px] custom-scrollbar">
                        {categories.map((item, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all text-sm font-medium ${index === 0
                                    ? "bg-green-100 text-green-700"
                                    : "hover:bg-gray-100 text-gray-700"
                                    }`}
                            >
                                <span>{item}</span>
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hero Section */}
                <div className="col-span-12 md:col-span-9">
                    <div
                        className="group relative rounded-3xl overflow-hidden shadow-xs h-[300px] md:h-[450px] bg-cover bg-center bg-no-repeat transition-all duration-700 border-2 border-gray-100"
                        style={{ backgroundImage: `url(${banners[current].image})` }}
                    >
                        {/* Content */}
                        <div className="relative z-10 h-full flex items-center px-8 md:px-16 ">

                            <div className="max-w-xl space-y-4 md:space-y-6 text-black">
                                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-sm whitespace-pre-line">
                                    {banners[current].title}
                                </h1>
                                <p className="text-sm md:text-lg opacity-90 font-medium">
                                    {banners[current].description}
                                </p>
                                <button className="rounded-full px-8 py-3 bg-green-600 hover:bg-black text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg">
                                    Shop Now
                                </button>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/50 backdrop-blur-md p-2 rounded-full text-white transition-all opacity-0 group-hover:opacity-100 z-20"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/50 backdrop-blur-md p-2 rounded-full text-white transition-all opacity-0 group-hover:opacity-100 z-20"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {
                                banners.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrent(index)}
                                        className={`rounded-full transition-all duration-300 ${current === index
                                            ? "w-8 h-2 bg-green-500"
                                            : "w-2 h-2 bg-white/60 hover:bg-white"
                                            }`}
                                    ></button>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}