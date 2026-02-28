import { useState, useEffect } from "react";
import { NavLink } from 'react-router';
import { MdKeyboardArrowDown, MdLogout, MdOutlineAddBox, MdOutlineCategory, MdOutlineDashboard, MdOutlineShoppingBag } from "react-icons/md";
import { HiOutlineMenu, HiOutlineX, HiOutlineChatAlt2, HiOutlineGlobeAlt } from "react-icons/hi";
import { FiSearch, FiShoppingCart, FiUser, FiHeart } from "react-icons/fi";
import { HiArrowRight, HiOutlineSwitchHorizontal } from "react-icons/hi";

function Navbar() {
    const [open, setOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const [isSellerMode, setIsSellerMode] = useState(() => {
        const savedMode = localStorage.getItem("isSellerMode");
        return savedMode === "true";
    });

    useEffect(() => {
        localStorage.setItem("isSellerMode", isSellerMode);
    }, [isSellerMode]);

    useEffect(() => {
        const handleClickOutside = () => setActiveDropdown(null);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    const toggleDropdown = (e, name) => {
        e.stopPropagation();
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/aboutUs" },
        { name: "Seller", path: "/seller" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" },
    ];

    const categories = [
        "Consumer Electronics",
        "Apparel & Accessories",
        "Home & Garden",
        "Beauty & Personal Care",
        "Sports & Entertainment",
        "Machinery",
        "Packaging & Printing"
    ];

    return (
        <>
            <div className="w-full bg-white shadow-sm font-DM">
                {
                    !isSellerMode && (
                        <div className="w-full bg-green-600 py-2 px-4">
                            <div className="max-w-[1440px] mx-auto flex items-center justify-between text-white text-[11px] sm:text-xs font-bold uppercase">
                                <div className="flex items-center gap-4 flex-1">
                                    <span className="italic text-lg">OURA<span className="not-italic font-bold">SHOPINNG</span></span>
                                    <p className="hidden md:block ml-2">Up to 20% off 8M+ hot picks</p>
                                </div>
                                <div className="flex flex-col lg:flex-row items-center gap-0 lg:gap-4 ">
                                    <button className="flex items-center gap-1 hover:opacity-80">Explore now <HiArrowRight /></button>
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-200">Starts in</span>
                                        <span className="bg-white text-black px-1.5 rounded-sm">47</span>:
                                        <span className="bg-white text-black px-1.5 rounded-sm">53</span>:
                                        <span className="bg-white text-black px-1.5 rounded-sm">42</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            {/* 2. Main Header Section */}
            <header className="w-full sticky top-0 z-[100] bg-white shadow-sm font-DM pt-2 lg:pt-0">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-0 py-1 flex items-center justify-between gap-6">

                    {/* Logo & Mobile Menu Toggle */}
                    <div className="flex items-center gap-3">
                        <HiOutlineMenu onClick={() => setOpen(true)} className="text-2xl lg:hidden cursor-pointer text-gray-700" />
                        <img className="h-6 lg:h-11 object-contain" src="/image/logo/logo.png" alt="OURA" />
                    </div>

                    {/* Desktop Search Bar */}
                    <div className="hidden lg:flex flex-1 relative max-w-2xl group ml-60">
                        <input type="text" placeholder="Search for items..." className="w-full bg-gray-100 py-[9px] px-6 rounded-full text-sm outline-none border-2 border-transparent focus:bg-white focus:border-[#088178] transition-all" />
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 p-2.5 rounded-full text-white cursor-pointer hover:bg-black transition-all">
                            <FiSearch className="text-lg" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-8 relative">

                        {/* Mode Switcher Button */}
                        <button
                            onClick={() => setIsSellerMode(!isSellerMode)}
                            className={`hidden md:flex items-center gap-2 px-4 py-[9px] rounded-full border-2 transition-all font-bold text-xs ${isSellerMode ? 'bg-green-600  text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-green-600'}`}
                        >
                            <HiOutlineSwitchHorizontal className="text-lg" />
                            {isSellerMode ? 'Switch to Buying' : 'Switch to Selling'}
                        </button>

                        {/* Message Icon & Dropdown */}
                        <div className="relative">
                            <HiOutlineChatAlt2 onClick={(e) => toggleDropdown(e, 'msg')} className="text-2xl cursor-pointer hover:text-[#088178] text-gray-700" />
                            {
                                activeDropdown === 'msg' && (
                                    <div className="absolute top-full right-[-60px] lg:right-0 mt-4 w-72 bg-white shadow-2xl rounded-2xl p-6 z-[110] border border-gray-100 text-center animate-in fade-in zoom-in duration-200">
                                        <div className="absolute -top-2 right-[75px] lg:right-4 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                                        <h3 className="text-sm font-bold text-gray-800 text-left mb-6">Messages</h3>
                                        <div className="w-20 h-16 bg-orange-50 mx-auto rounded-xl flex items-center justify-center mb-4">
                                            <HiOutlineChatAlt2 className="text-3xl text-green-600" />
                                        </div>
                                        <p className="text-gray-500 text-[11px] mb-6 font-bold">No new messages yet</p>
                                        <button className="w-full bg-green-600 text-white font-bold py-3 rounded-full hover:bg-gray-800 transition-all text-xs tracking-wider">VIEW MORE</button>
                                    </div>
                                )
                            }
                        </div>

                        {/* Cart Icon */}
                        {
                            !isSellerMode && (
                                <div className="relative">
                                    <div onClick={(e) => toggleDropdown(e, 'cart')} className="relative cursor-pointer hover:text-green-600 text-gray-700">
                                        <FiShoppingCart className="text-2xl" />
                                        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] px-1.5 rounded-full font-bold border-2 border-white">0</span>
                                    </div>
                                    {
                                        activeDropdown === 'cart' && (
                                            <div className="absolute top-full right-[-30px] lg:right-0 mt-4 w-72 bg-white shadow-2xl rounded-2xl p-6 z-[110] border border-gray-100 text-center">
                                                <div className="absolute -top-2 right-[45px] lg:right-4 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                                                <h3 className="text-sm font-bold text-gray-800 text-left mb-6">Shopping cart</h3>
                                                <p className="text-gray-500 text-sm mb-6 font-bold">Your cart is empty</p>
                                                <button className="w-full border-2 border-gray-800 text-gray-800 font-bold py-2.5 rounded-full hover:bg-gray-800 hover:text-white transition-all text-xs">GO TO CART</button>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }

                        {/* User Account Icon & Dropdown */}
                        <div className="relative">
                            <div onClick={(e) => toggleDropdown(e, 'account')} className="flex items-center gap-1 cursor-pointer hover:text-green-600 text-gray-700">
                                <FiUser className="text-2xl" />
                                <MdKeyboardArrowDown className={`transition-transform duration-300 ${activeDropdown === 'account' ? 'rotate-180' : ''}`} />
                            </div>
                            {
                                activeDropdown === 'account' && (
                                    <div className="absolute top-full right-0 mt-4 w-64 bg-white shadow-2xl rounded-2xl py-4 z-[110] border border-gray-100 animate-in slide-in-from-top-2">
                                        <div className="absolute -top-2 right-3 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                                        <div className="px-5 pb-3 border-b border-gray-50">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Account</p>
                                            <p className="text-sm font-extrabold text-gray-800">Md Nishan</p>
                                        </div>
                                        <div className="py-2">
                                            <a href="#" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-bold transition-colors"><FiUser className="text-gray-400" /> My Profile</a>
                                            <a href="#" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-bold transition-colors"><MdOutlineShoppingBag className="text-gray-400" /> My Orders</a>
                                            <a href="#" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-bold transition-colors"><FiHeart className="text-gray-400" /> Favorites</a>
                                            <div className="flex items-center justify-between px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-bold cursor-pointer border-t border-gray-50 mt-1">
                                                <span className="flex items-center gap-3"><HiOutlineGlobeAlt className="text-gray-400" /> Language</span>
                                                <span className="text-[10px] bg-green-600/10 px-2 py-0.5 rounded text-[#088178]">EN-BDT</span>
                                            </div>
                                        </div>
                                        <div className="px-5 pt-2 border-t border-gray-50">
                                            <button className="flex items-center gap-3 text-[#088178] font-bold text-sm py-2 hover:opacity-70 transition-opacity">
                                                <MdLogout /> Sign out
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* 3. Mobile Search Bar */}
                <div className="px-4 py-1 lg:hidden ">
                    <div className="relative group">
                        <input type="text" placeholder="I'm searching for..." className="w-full bg-gray-100 border-none py-[9px] px-5 pr-12 rounded-full text-sm outline-none focus:bg-white focus:ring-1 focus:ring-[#088178] transition-all" />
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-500 p-2 rounded-full text-white"><FiSearch className="text-sm" /></div>
                    </div>
                </div>

                {/* 4. Desktop Lower Navigation */}
                <div className="hidden lg:block p-1 border-t border-gray-50">
                    <div className="max-w-[1440px] mx-auto flex items-center justify-between">

                        <div className="flex items-center gap-8">
                            <div className="relative group">
                                <button className="bg-green-600 text-white px-8 py-[7px] font-bold flex items-center gap-3 rounded-full hover:bg-black transition-all">
                                    <MdOutlineCategory className="text-xl" /> Explore Categories <MdKeyboardArrowDown className="text-xl group-hover:rotate-180 transition-transform duration-300" />
                                </button>
                                <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-b-xl py-4 z-[110] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
                                    {
                                        categories.map((cat, idx) => (
                                            <a key={idx} href="#" className="flex items-center justify-between px-6 py-2.5 text-sm font-bold text-gray-700 hover:bg-[#088178]/5 hover:text-green-600 transition-colors">
                                                {cat} <HiArrowRight className="text-[10px] opacity-0 group-hover:opacity-100" />
                                            </a>
                                        ))
                                    }
                                </div>
                            </div>
                            <nav className="flex gap-2 font-bold text-gray-700">
                                {
                                    navLinks.map(link => (
                                        <NavLink key={link.name} to={link.path} className={({ isActive }) => `px-4 py-[7px] transition-all rounded-md ${isActive ? 'bg-green-600 text-white' : 'hover:text-green-600'}`}>{link.name}</NavLink>
                                    ))
                                }
                            </nav>
                        </div>

                        <div className="flex items-center gap-6">
                            {
                                isSellerMode ? (
                                    <div className="flex items-center gap-3">
                                        <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-[7px] rounded-full font-bold text-sm hover:bg-gray-200 transition-all shadow-sm">
                                            <MdOutlineDashboard className="text-xl" /> Dashboard
                                        </button>
                                        <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-[7px] rounded-full font-bold text-sm hover:bg-black transition-all shadow-md">
                                            <MdOutlineAddBox className="text-xl" /> Add Product
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-6 font-bold text-sm text-gray-600">
                                        <span className="cursor-pointer hover:text-[#088178] transition-colors">Sell on OURA</span>
                                        <span className="cursor-pointer hover:text-[#088178] border-l pl-6 border-gray-200 transition-colors">Help Center</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* 5. Mobile Drawer Menu */}
                <div className={`fixed inset-0 bg-black/60 z-[150] transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setOpen(false)} />

                <div className={`fixed top-0 left-0 h-full w-[280px] bg-white z-[200] shadow-2xl transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}>

                    <div className="flex justify-between items-center p-5 border-b bg-gray-50">
                        <img className="h-8" src="/image/logo/logo.png" alt="Logo" />
                        <HiOutlineX onClick={() => setOpen(false)} className="text-2xl text-gray-600 cursor-pointer" />
                    </div>

                    <div className="p-5">

                        {/* Mobile Mode Switcher */}
                        <div className="mb-6 bg-green-600/5 p-4 rounded-2xl flex items-center justify-between border border-green-600/10">
                            <span className="text-sm font-bold text-gray-800">{isSellerMode ? 'Seller Mode' : 'Buyer Mode'}</span>
                            <button onClick={() => setIsSellerMode(!isSellerMode)} className={`w-12 h-6 rounded-full relative transition-all ${isSellerMode ? 'bg-green-500' : 'bg-gray-300'}`}>
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isSellerMode ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-2">
                            {
                                isSellerMode && (
                                    <div className="flex flex-col gap-3 mb-4">
                                        <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-5 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all">
                                            <MdOutlineDashboard className="text-xl" /> Dashboard
                                        </button>
                                        <button className="flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-black transition-all shadow-md">
                                            <MdOutlineAddBox className="text-xl" /> Add Product
                                        </button>
                                        <div className="h-[1px] bg-gray-100 my-2 w-full"></div>
                                    </div>
                                )
                            }
                            {
                                navLinks.map((link) => (
                                    <NavLink
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setOpen(false)}
                                        className="text-base font-bold text-gray-800 py-3 border-b border-gray-50 last:border-0 hover:text-[#088178] transition-colors"
                                    >
                                        {link.name}
                                    </NavLink>
                                ))
                            }
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar;