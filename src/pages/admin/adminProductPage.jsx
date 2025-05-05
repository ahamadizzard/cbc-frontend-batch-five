import React, { useState, useEffect } from 'react';
// import { sampleProducts } from "../../assets/sampleData.js";
import axios from 'axios';

export default function AdminProductPage() {
    // const [loading, setLoading] = useState(true);
    // State variables to hold product data and loading state
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch product data from the API when the component mounts
        axios.get(import.meta.env.VITE_API_BASE_URL + "/api/products")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }
        , []);

    return (
        // max-h-full to prevent overflow, overflow-y-scroll to allow scrolling
        <div className="w-full h-full max-h-full overflow-y-scroll  ">
            <table className='w-full border-collapse border border-gray-600 m-6' >
                <thead>
                    <tr className='bg-gray-200 p-4'>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Alt. Names</th>
                        <th>Product Description</th>
                        <th>Product Images</th>
                        <th>Label Price</th>
                        <th>Sales Price</th>
                        <th>Stock</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-100'>
                    {
                        products.map(
                            //passing the single product as item here 
                            // and index as index
                            (item, index) => {
                                return (
                                    <tr key={index} className='border-b border-gray-600 '>
                                        <td>{item.productId}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.altNames[0]}</td>
                                        <td>{item.productDescription}</td>
                                        <td><img src={item.productImages[0]} className="w-[50px] h-[50px]" /></td>
                                        <td>{item.labelPrice}</td>
                                        <td>{item.salePrice}</td>
                                        <td>{item.stock}</td>
                                        <td>{item.isAvailable ? "Available" : "Not Available"}</td>
                                    </tr>

                                )

                            }
                        )
                    }
                </tbody>
            </table>
        </div >
    );
}