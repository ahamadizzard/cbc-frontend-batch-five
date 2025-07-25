import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import ProductCard from "../../components/productCard.jsx"

export default function ProductsPage() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isLoading) {
            axios.get(import.meta.env.VITE_API_BASE_URL + '/api/products')
                .then((response) => {
                    console.log(response.data)
                    setProducts(response.data)
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }), [isLoading]

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Page Header */}
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-accent">CBC Webstore</h1>
                        {/* <nav className="flex space-x-6">
                            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
                            <a href="/products" className="text-gray-600 hover:text-blue-600">Products</a>
                            <a href="/about" className="text-gray-600 hover:text-blue-600">About</a>
                            <a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a>
                        </nav> */}
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-600 hover:text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            <button className="p-2 text-gray-600 hover:text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-accent mb-2">Featured Products</h2>
                    <p className="text-gray-600">Discover our collection of premium products</p>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 md:gap-6">
                    {products.map(product => (
                        <ProductCard
                            key={product.productId}
                            product={product}
                            className="w-full h-full "
                        />
                    ))}
                </div>
            </main>

            {/* Page Footer */}
            {/* <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-bold mb-4">ShopEase</h3>
                            <p className="text-gray-400">Your one-stop shop for quality products at affordable prices.</p>
                        </div>
                        <div>
                            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Products</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-md font-semibold mb-4">Customer Service</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Shipping Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Returns & Refunds</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-md font-semibold mb-4">Contact Us</h4>
                            <address className="text-gray-400 not-italic">
                                123 Shop Street<br />
                                Commerce City, CC 12345<br />
                                <a href="mailto:info@shopease.com" className="hover:text-white">info@shopease.com</a><br />
                                (123) 456-7890
                            </address>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
                    </div>
                </div>
            </footer> */}
        </div>
    );
}