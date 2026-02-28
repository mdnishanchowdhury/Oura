import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BiCategory } from "react-icons/bi";
import { motion } from "framer-motion";

const categories = [
    {
        name: "Seasonal Harvest",
        items: 342,
        icon: "https://i.ibb.co.com/HJHtSr1/category-image.png"
    },
    {
        name: "Pressed Juices",
        items: 312,
        icon: "https://i.ibb.co.com/HJHtSr1/category-image.png"
    },
    {
        name: "Rare Fruits",
        items: 189,
        icon: "https://i.ibb.co.com/HJHtSr1/category-image.png"
    },
    {
        name: "Crisp Vegetables",
        items: 319,
        icon: "https://i.ibb.co.com/HJHtSr1/category-image.png"
    },
    {
        name: "Fresh Picks",
        items: 243,
        icon: "https://i.ibb.co.com/HJHtSr1/category-image.png"
    },
    {
        name: "Nutty Treasures",
        items: 345,
        icon: "https://i.ibb.co.com/HJHtSr1/category-image.png"
    },
    {
        name: "Nutty Treasures",
        items: 345,
        icon: "https://i.ibb.co.com/HJHtSr1/category-image.png"
    },
    {
        name: "Nutty Treasures",
        items: 345,
        icon: "https://i.ibb.co.com/HJHtSr1/category-image.png"
    },
    {
        name: "Nutty Treasures",
        items: 345,
        icon: "https://i.ibb.co.com/HJHtSr1/category-image.png"
    },
];

export default function ShopByCategorySlider() {
    const sliderRef = useRef(null);

    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = window.innerWidth < 768 ? 120 : 300;
            const scrollTo = direction === "left"
                ? sliderRef.current.scrollLeft - scrollAmount
                : sliderRef.current.scrollLeft + scrollAmount;

            sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    // Stagger Container
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    // Card Animation
    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15
            }
        }
    };

    return (
        <section className="lg:py-6 px-6 lg:px-0">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group"
            >

                {/* Header Section */}
                <div className="flex justify-between items-center mb-2 lg:mb-6">
                    <div>
                        <h2 className="text-xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
                            <span className="text-yellow-500"><BiCategory /></span> Shop by Category
                        </h2>
                        <p className="text-slate-500 mt-1 text-[10px] md:text-base">
                            Discover fresh and quality products
                        </p>
                    </div>

                    <div className="hidden md:flex gap-3">
                        <motion.button
                            whileTap={{ scale: 0.85 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => scroll("left")}
                            className="p-2.5 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-green-600 hover:text-white transition-all"
                        >
                            <ChevronLeft size={20} />
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.85 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => scroll("right")}
                            className="p-2.5 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-green-600 hover:text-white transition-all"
                        >
                            <ChevronRight size={20} />
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Swipe Hint */}
                <p className="md:hidden text-xs text-green-500 text-center mb-2 animate-pulse">
                    Swipe to explore →
                </p>


                {/* Slider Container */}
                <motion.div
                    ref={sliderRef}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex gap-2 md:gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-4"
                    style={{
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                    }}
                >
                    <style dangerouslySetInnerHTML={{
                        __html: `.no-scrollbar::-webkit-scrollbar { display: none; }`
                    }} />

                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                scale: 1.04,
                                boxShadow: "0px 15px 35px rgba(0,0,0,0.08)"
                            }}
                            className="min-w-[115px] md:min-w-[225px] bg-white rounded-2xl md:rounded-3xl p-3 md:p-8 border border-slate-100 shadow-sm transition-all cursor-pointer flex flex-col items-center md:items-start"
                        >
                            <div className="lg:w-[150px] px-2">
                                <img src={category.icon} alt="" className="w-full h-full object-cover" />
                            </div>

                            <h3 className="text-[11px] md:text-lg font-bold text-slate-800 mb-0.5 leading-tight text-center md:text-left truncate w-full">
                                {category.name}
                            </h3>

                            <p className="text-[9px] md:text-sm text-slate-500 font-medium">
                                <span className="text-green-600 font-bold">{category.items}</span> <span className="hidden md:inline">items</span>
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

            </motion.div>
        </section>
    );
}