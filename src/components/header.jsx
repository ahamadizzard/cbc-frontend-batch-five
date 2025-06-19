// import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
export default function Header() {
    const [sideDrawerOpened, setSideDrawerOpened] = useState(true)
    const navigate = useNavigate();

    return (

        <header className="relative w-full h-[80px] shadow-2xl flex gap-3 p-3 text-black font-bold justify-center ">
            <GiHamburgerMenu className="absolute left-2 h-full text-3xl md:hidden"
                onClick={() => {
                    setSideDrawerOpened(true)
                }} />
            {/* logo display */}
            <img src="/logo.png" className="w-[100px] h-[50px] object-fill  pr-3" alt="logo" />
            {/* menus */}
            <div className="w-[calc(100%-80px)] h-[60px] hidden md:flex  justify-start items-center gap-4 ">
                <Link className="hover:bg-accent hover:text-white p-2 rounded-md" to="/">Home</Link>
                <Link className="hover:bg-accent hover:text-white p-2 rounded-md" to="/login">Login</Link>
                <Link className="hover:bg-accent hover:text-white p-2 rounded-md" to="/signup">Sign Up</Link>
                <Link className="hover:bg-accent hover:text-white p-2 rounded-md" to="/admin">Admin</Link>
                <Link className="hover:bg-accent hover:text-white p-2 rounded-md" to="/contact">Contact</Link>
            </div>
            {/* Cart */}
            <div className="absolute right-10 w-[60px] hidden md:flex justify-center items-center bg-accent hover:bg-accent/70 rounded-full ">
                <Link to="/cart" className="text-[15px] font-bold">
                    <BiCart className="text-white text-2xl mt-1" />
                    <span className="text-sm font-bold text-white">Cart</span>
                </Link>
            </div>
            {
                sideDrawerOpened &&
                <div className="fixed h-screen w-full bg-[#00000060] flex md:hidden">
                    <div className="w-[350px] bg-white h-full">
                        <div className="w-full h-[80px] shadow-2xl flex justify-center items-center relative">
                            <GiHamburgerMenu className="h-full text-3xl absolute left-2 cursor-pointer"
                                onClick={() => {
                                    setSideDrawerOpened(false)
                                }} />
                            <img onClick={
                                () => {
                                    window.location.href = "/"
                                }
                            } src="/logo.png" className="w-[80px] h-[80px] object-contain cursor-pointer pr-3" alt="logo" />
                        </div>
                        <div className="w-full h-[calc(100%-80px)] flex flex-col items-center gap-2">
                            <a href="/" className="text-[20px] font-bold mx-2 my-4">Home</a>
                            <a href="/products" className="text-[20px] font-bold mx-2 my-4">Products</a>
                            <a href="/about" className="text-[20px] font-bold mx-2 my-4">About Us</a>
                            <a href="/contact" className="text-[20px] font-bold mx-2 my-4">Contact</a>
                            <a href="/cart" className="text-[20px] font-bold mx-2 my-4"><BiCart /></a>
                            {/* <UserData /> */}
                        </div>
                    </div>
                </div>
            }
        </header >
    )
}