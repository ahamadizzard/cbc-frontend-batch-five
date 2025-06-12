import { Link, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AdminProductPage from "./admin/productPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage.jsx";
import AdminUsersPage from "./admin/adminUsersPage.jsx";
import AdminReviewPage from "./admin/adminReviewPage.jsx";

export default function AdminPage() {
    const location = useLocation();
    const path = location.pathname;

    function getClass(name) {
        if (path.includes(name)) {
            return "bg-accent text-white  rounded-md p-2 w-full"
        }
        else {
            return "text-accent "
        }
    }

    const userFirstName = localStorage.getItem('user');
    return (
        <div className="w-full h-screen flex bg-accent">
            {/* // divide into 2 sections */}
            <div className="w-[200px] h-full bg-white  flex flex-col gap-4 p-4 ">
                <h4 className="bg-accent text-white rounded-md p-2 text-center font-bold w-full">{userFirstName}</h4>
                <h1 className="text-2xl font-bold ">Admin Panel</h1>
                <Link className={getClass("products")} to="/admin/products">Products</Link>
                <Link className={getClass("users")} to="/admin/users">Users</Link>
                <Link className={getClass("orders")} to="/admin/orders">Orders</Link>
                <Link className={getClass("reviews")} to="/admin/reviews">Reviews</Link>
            </div>
            <div className="w-[calc(100%-200px)] h-full bg-white border-accent border rounded-lg p-4">
                <Routes path="/*">
                    <Route path="/products" element={<AdminProductPage />} />
                    {/* <Route path="/products" element={<AdminProductPage />} /> */}
                    <Route path="/users" element={<AdminUsersPage />} />
                    <Route path="/orders" element={<AdminOrdersPage />} />
                    <Route path="/reviews" element={<AdminReviewPage />} />
                    <Route path="/add-product" element={<AddProductPage />} />
                    <Route path="/edit-product" element={<EditProductPage />} />
                </Routes>
            </div>
        </div>
    );
}