// import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
export default function Header() {
    const navigate = useNavigate();
    return (

        <header className="w-full h-[80px] shadow-2xl flex gap-3 p-3 text-black font-bold">
            {/* logo display */}
            <img src="logo.png" className="w-[100px] h-[50px] object-fill  pr-3" alt="logo" />
            {/* menus */}
            <div className="w-[calc(100%-80px)] h-[60px] flex justify-start items-center gap-4 ">
                <Link className="hover:bg-blue-300 hover:text-white p-2 rounded-md" to="/">Home</Link>
                <Link className="hover:bg-blue-300 hover:text-white p-2 rounded-md" to="/login">Login</Link>
                <Link className="hover:bg-blue-300 hover:text-white p-2 rounded-md" to="/signup">Sign Up</Link>
                <Link className="hover:bg-blue-300 hover:text-white p-2 rounded-md" to="/admin">Admin</Link>
                <Link className="hover:bg-blue-300 hover:text-white p-2 rounded-md" to="/admin">Contact</Link>
            </div>
            {/* Cart */}
            <div className="w-[60px] h-[50px] flex gap-4 bg-accent hover:bg-accent/70 rounded-full ">
                <Link to="/cart" className="flex flex-col justify-center ml-3  items-center">
                    <BiCart className="text-white text-2xl " />
                    <span className="text-sm font-bold text-white">Cart</span>
                </Link>
            </div>
        </header >
    )
}