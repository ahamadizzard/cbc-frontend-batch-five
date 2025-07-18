import { Link, useLocation, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AdminProductPage from "./admin/productPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage.jsx";
import AdminUsersPage from "./admin/adminUsersPage.jsx";
import AdminReviewPage from "./admin/adminReviewPage.jsx";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Loading from "../components/loading.jsx";
import toast from "react-hot-toast";

export default function AdminPage() {
    const location = useLocation();
    const navigate = useNavigate();
    // Get the current path
    const path = location.pathname;
    const [status, setStatus] = useState("loading");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setStatus("unauthenticated");
            navigate('/login');
            return;
        }
        axios
            .get(import.meta.env.VITE_API_BASE_URL + '/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                // response.data contains user details
                if (response.data.role !== "admin") {
                    setStatus("unauthorized");
                    toast.error("You are not authorized to access this page.");
                    navigate('/');
                } else {
                    setUser(response.data);
                    setStatus("authenticated");
                }
            })
            .catch((error) => {
                setStatus("unauthenticated");
                toast.error("You are not authenticated. Please login.");
                console.error("Error fetching user data:", error);
                navigate('/login');
            });
    }, []);

    function getClass(name) {
        if (path.includes(name)) {
            return "bg-accent text-white  rounded-md p-2 w-full"
        }
        else {
            return "text-accent "
        }
    }

    const userFirstName = user?.firstName + " " + user?.lastName || "Admin";
    console.log("User:", userFirstName);
    return (
        <div className="w-full h-screen flex bg-accent">
            {
                status == "loading" || status == "unauthenticated" ?
                    <Loading />
                    :
                    // status == "authenticated" ?
                    <>
                        {/* // divide into 2 sections */}
                        <div className="w-[200px] h-full bg-white  flex flex-col gap-4 p-4 ">
                            <h4 className="bg-accent text-white rounded-2xl p-1 text-center font-semibold w-full">{userFirstName}</h4>
                            <h1 className="text-2xl font-bold ">Admin Panel</h1>
                            <Link className={getClass("products")} to="/admin/products">Products</Link>
                            <Link className={getClass("users")} to="/admin/users">Users</Link>
                            <Link className={getClass("orders")} to="/admin/orders">Orders</Link>
                            <Link className={getClass("reviews")} to="/admin/reviews">Reviews</Link>
                        </div>
                        <div className="w-[calc(100%-200px)] h-full bg-white border-accent border rounded-lg p-4">
                            <Routes path="/*">
                                <Route path="/products" element={<AdminProductPage />} />
                                <Route path="/users" element={<AdminUsersPage />} />
                                <Route path="/orders" element={<AdminOrdersPage />} />
                                <Route path="/reviews" element={<AdminReviewPage />} />
                                <Route path="/add-product" element={<AddProductPage />} />
                                <Route path="/edit-product" element={<EditProductPage />} />
                            </Routes>
                        </div>
                    </>
            }
        </div >
    );
}