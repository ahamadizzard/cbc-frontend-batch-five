// import "./header.css";
import { Link } from "react-router-dom";
export default function Header() {
    return (
        <div className="bg-[#FFFF00] flex gap-3 p-3 text-black font-bold">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/admin">Admin</Link>
        </div>
    )
}