import React, { useState } from "react";
import { toast } from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
    // Form state management
    const [formData, setFormData] = useState({
        productId: "",
        productName: "",
        altNames: "",
        productCategory: "",
        productDescription: "",
        labelPrice: "",
        salePrice: "",
        stock: "",
        isAvailable: true
    });
    const [productImages, setProductImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Validate form inputs
    const validateForm = () => {
        const newErrors = {};
        if (!formData.productId.trim()) newErrors.productId = "Required field";
        if (!formData.productName.trim()) newErrors.productName = "Required field";
        if (!formData.productCategory.trim()) newErrors.productCategory = "Required field";
        if (productImages.length === 0) newErrors.productImages = "At least one image required";
        if (!formData.labelPrice) newErrors.labelPrice = "Required field";
        if (!formData.stock) newErrors.stock = "Required field";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Authentication required");
            return;
        }

        setIsLoading(true);

        try {
            // Upload images
            const uploadPromises = Array.from(productImages).map(file => mediaUpload(file));
            const imageUrls = await Promise.all(uploadPromises);

            // Prepare product data
            const product = {
                ...formData,
                altNames: formData.altNames.split(",").map(name => name.trim()).filter(name => name),
                productImages: imageUrls,
                labelPrice: parseFloat(formData.labelPrice),
                salePrice: parseFloat(formData.salePrice),
                stock: parseInt(formData.stock)
            };

            // Submit to API
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/products`,
                product,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Product created successfully");
            navigate("/admin/products");
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(error.response?.data?.message || "Creation failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            {/* Main card container with hover effect */}
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    {/* Card header with gradient */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold">Add New Product</h1>
                            <button
                                onClick={() => navigate("/admin/products")}
                                className="px-4 py-2 bg-white bg-opacity-20 text-blue-600 font-bold hover:text-blue-800 rounded-lg hover:bg-opacity-30 transition-colors flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Back to Products
                            </button>
                        </div>
                    </div>

                    {/* Form content */}
                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Product ID Card */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product ID*</label>
                                    <input
                                        type="text"
                                        name="productId"
                                        className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.productId ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        value={formData.productId}
                                        onChange={handleChange}
                                    />
                                    {errors.productId && (
                                        <p className="mt-1 text-sm text-red-600">{errors.productId}</p>
                                    )}
                                </div>

                                {/* Product Name Card */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                                    <input
                                        type="text"
                                        name="productName"
                                        className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.productName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        value={formData.productName}
                                        onChange={handleChange}
                                    />
                                    {errors.productName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.productName}</p>
                                    )}
                                </div>

                                {/* Alternative Names Card */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-sm font-medium text-gray-700">Alternative Names</label>
                                        <span className="text-xs text-gray-500">comma separated</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="altNames"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.altNames}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Category Card */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                                    <input
                                        type="text"
                                        name="productCategory"
                                        className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.productCategory ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        value={formData.productCategory}
                                        onChange={handleChange}
                                    />
                                    {errors.productCategory && (
                                        <p className="mt-1 text-sm text-red-600">{errors.productCategory}</p>
                                    )}
                                </div>

                                {/* Pricing Cards */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Label Price*</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            name="labelPrice"
                                            step="0.01"
                                            min="0"
                                            className={`w-full pl-8 pr-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.labelPrice ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            value={formData.labelPrice}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.labelPrice && (
                                        <p className="mt-1 text-sm text-red-600">{errors.labelPrice}</p>
                                    )}
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            name="salePrice"
                                            step="0.01"
                                            min="0"
                                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.salePrice}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Stock Card */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity*</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        min="0"
                                        className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.stock ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        value={formData.stock}
                                        onChange={handleChange}
                                    />
                                    {errors.stock && (
                                        <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                                    )}
                                </div>

                                {/* Availability Toggle Card */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                name="isAvailable"
                                                className="sr-only"
                                                checked={formData.isAvailable}
                                                onChange={handleChange}
                                            />
                                            <div className={`w-10 h-4 rounded-full shadow-inner transition-colors ${formData.isAvailable ? 'bg-blue-400' : 'bg-gray-300'
                                                }`}></div>
                                            <div className={`absolute left-0 top-0 w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.isAvailable ? 'transform translate-x-6' : ''
                                                }`}></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {formData.isAvailable ? 'Available' : 'Out of Stock'}
                                        </span>
                                    </label>
                                </div>

                                {/* Image Upload Card */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Images*</label>
                                    <div className={`border-2 border-dashed rounded-md px-6 pt-5 pb-6 ${errors.productImages ? 'border-red-500' : 'border-gray-300'
                                        }`}>
                                        <div className="space-y-1 text-center">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                                    <span>Upload files</span>
                                                    <input
                                                        type="file"
                                                        multiple
                                                        className="sr-only"
                                                        onChange={(e) => setProductImages(e.target.files)}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                        </div>
                                    </div>
                                    {errors.productImages && (
                                        <p className="mt-1 text-sm text-red-600">{errors.productImages}</p>
                                    )}

                                    {/* Image previews */}
                                    {productImages.length > 0 && (
                                        <div className="mt-4">
                                            <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Images</h3>
                                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                                                {Array.from(productImages).map((file, index) => (
                                                    <div key={index} className="relative group">
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            alt={`Preview ${index}`}
                                                            className="h-24 w-full object-cover rounded-md"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newFiles = [...productImages];
                                                                newFiles.splice(index, 1);
                                                                setProductImages(newFiles);
                                                            }}
                                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Description Card */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
                                    <textarea
                                        name="productDescription"
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.productDescription}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>

                            {/* Form actions */}
                            <div className="flex justify-end space-x-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/products")}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        "Add Product"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}