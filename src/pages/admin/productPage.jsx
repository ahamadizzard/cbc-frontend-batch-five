import React, { useState, useEffect } from 'react';
// import { sampleProducts } from "../../assets/sampleData.js";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegTrashCan } from "react-icons/fa6";
// import { MdPageview } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import toast from 'react-hot-toast';
import Loading from '../../components/loading.jsx';

export default function AdminProductPage() {

    const [isLoading, setIsLoading] = useState(true);
    // State variables to hold product data and loading state
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading == true) {
            // Fetch product data from the API when the component mounts
            axios.get(import.meta.env.VITE_API_BASE_URL + "/api/products")
                .then((res) => {
                    // console.log(res.data);
                    setProducts(res.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                })
        }
    }
        , [isLoading]);

    function deleteProduct(productId) {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (token === null) {
            toast.error("You are not logged in, please log-in as Administrator to delete a product")
            return;
        }
        if (!token === "admin") {
            toast.error("You are not logged in as Administrator, please log-in as Administrator to delete a product")
            return;
        }
        try {
            axios.delete(import.meta.env.VITE_API_BASE_URL + "/api/products/" + productId, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(() => {
                toast.success("Product deleted successfully");
                setIsLoading(true);
            }).catch((error) => {
                toast.error("Error deleting product: " + error.message);
            })
        } catch (error) {
            toast.error("Error deleting product: " + error.message);
        }
    }

    const handleView = (product) => {
        // Your modify logic here
        console.log("View product:", product);
    };
    const handleModify = (product) => {
        // Your modify logic here
        console.log("Modify product:", product);
        // Navigate to the modify product page with the product ID
        navigate('/admin/edit-product', {
            state: item
        });
    };

    const handleDelete = (productId) => {
        // Your delete logic here
        console.log("Delete product with ID:", productId);
    };


    return (
        <div className="w-full h-full max-h-full overflow-y-auto bg-gray-50">
            {/* Header Section */}
            <div className="sticky top-0 z-10 bg-white shadow-sm p-4 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Product Inventory</h1>
                        <p className="text-gray-600">Manage your product listings and inventory</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center  pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                            // Add your search handler here
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Link to="/admin/add-product" className='px-4 py-2 bg-accent text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 cursor-pointer'>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Product
                        </Link>

                    </div>
                </div>
            </div>

            {/* Product Table */}

            <div className="w-full h-full max-h-full overflow-y-auto p-4 bg-gray-50">
                {isLoading ?
                    <div>
                        <Loading />
                    </div>


                    : <table className='w-full border-collapse rounded-lg overflow-hidden shadow-lg'>
                        <thead>
                            <tr className='bg-accent text-white'>
                                <th className='p-3 text-left'>Product ID</th>
                                <th className='p-3 text-left'>Product Name</th>
                                <th className='p-3 text-left'>Alt. Names</th>
                                <th className='p-3 text-left'>Category</th>
                                <th className='p-3 text-left'>Description</th>
                                <th className='p-3 text-left'>Image</th>
                                <th className='p-3 text-left'>Label Price</th>
                                <th className='p-3 text-left'>Sales Price</th>
                                <th className='p-3 text-left'>Stock</th>
                                <th className='p-3 text-left'>Availability</th>
                                <th className='p-3 text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {products.map((item, index) => (
                                <tr key={index} className='hover:bg-gray-50 transition-colors'>
                                    {/* All table cells with vertical alignment */}
                                    <td className='px-3 py-4 align-middle'>{item.productId}</td>
                                    <td className='px-3 py-4 align-middle font-medium'>{item.productName}</td>
                                    <td className='px-3 py-4 align-middle text-gray-600'>{item.altNames?.join(", ")}</td>
                                    <td className='px-3 py-4 align-middle font-medium'>{item.productCategory}</td>
                                    <td className='px-3 py-4 align-middle text-gray-600 max-w-xs truncate' title={item.productDescription}>
                                        {item.productDescription}
                                    </td>
                                    <td className='px-3 py-4 align-middle'>
                                        <img
                                            src={item.productImages[0]}
                                            className="w-12 h-12 object-cover rounded-md border border-gray-200"
                                            alt={item.productName}
                                        />
                                    </td>
                                    <td className='px-3 py-4 align-middle font-medium'>${item.labelPrice?.toFixed(2)}</td>
                                    <td className='px-3 py-4 align-middle text-green-600 font-medium'>${item.salePrice?.toFixed(2)}</td>
                                    <td className='px-3 py-4 align-middle'>{item.stock}</td>
                                    <td className='px-3 py-4 align-middle'>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {item.isAvailable ? "Available" : "Not Available"}
                                        </span>
                                    </td>
                                    {/* Action buttons container */}
                                    <td className='px-3 py-4 align-middle'>
                                        <div className='flex flex-row space-x-2'>
                                            <button
                                                className="px-3 py-1 bg-green-500 text-white flex items-center justify-center rounded-md hover:bg-green-600  hover:scale-105 transition-all text-sm shadow-lg cursor-pointer"
                                                onClick={() => handleView(item)}
                                            >
                                                <VscPreview className='flex-shrink-0 text-lg' />
                                                <span className='ml-1'>View</span>
                                            </button>
                                            <button
                                                className="px-3 py-1 bg-blue-500 text-white flex items-center justify-center rounded-md hover:bg-blue-600 hover:scale-105 transition-all text-sm shadow-lg cursor-pointer"
                                                // onClick={() => handleModify()}
                                                onClickCapture={() => {
                                                    navigate("/admin/edit-product", { state: item })
                                                }}

                                            >
                                                <FaEdit className='flex-shrink-0 text-lg' />
                                                <span className='ml-1'>Modify</span>
                                            </button>
                                            <button
                                                className="px-3 py-1 bg-red-500 text-white flex items-center justify-center rounded-md hover:bg-red-600 hover:scale-105 transition-all text-sm shadow-lg cursor-pointer"
                                                // onClick={() => handleDelete(item.productId)}
                                                onClick={() => {
                                                    deleteProduct(item.productId)
                                                }}
                                            >
                                                <FaRegTrashCan className="flex-shrink-0 text-lg" />
                                                <span className="ml-1">Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div >
    );
}