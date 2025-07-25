import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import ProductCard from "../../components/productCard.jsx"
import Loading from "../../components/loading.jsx"

export default function SearchProductsPage() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [error, setError] = useState(null);

    useEffect(() => {
        const searchProducts = async () => {
            if (searchQuery.length > 0) {
                try {
                    const response = await axios.get(
                        import.meta.env.VITE_API_BASE_URL + '/api/products/search/' + searchQuery)

                    // const response = await axios.get(
                    //     `${import.meta.env.VITE_API_BASE_URL}/api/products/search?q=${encodeURIComponent(searchQuery)}`
                    // );
                    setProducts(response.data);

                } catch (error) {
                    setError(err.response?.data?.message || "Failed to search products");
                    setProducts([]); // Clear products on error
                    console.log(error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                axios.get(import.meta.env.VITE_API_BASE_URL + '/api/products/')
                    .then((response) => {
                        setProducts(response.data)
                        setIsLoading(false)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        };

        // Add debouncing (500ms delay)
        const debounceTimer = setTimeout(() => {
            setIsLoading(true);
            searchProducts();
        }, 500);

        return () => clearTimeout(debounceTimer); // Cleanup on unmount or query change
    }, [searchQuery]); // Add searchQuery as dependency



    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Page Header */}
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-accent">CBC Cosmetics Webstore</h1>
                        {/* <nav className="flex space-x-6">
                            <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Products</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
                        </nav> */}
                        <div className="flex items-center space-x-2 ">
                            {/* <button className="p-2 text-gray-600 hover:text-blue-600"> */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {/* </button> */}
                            <input
                                type="text"
                                placeholder="Search"
                                className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-accent transition duration-200 w-full max-w-xs"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    setIsLoading(true)
                                }}
                            />
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

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loading />
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                ) : products.length === 0 && searchQuery ? (
                    <div className="bg-blue-100 border border-blue-400 text-blue-700 flex justify-center items-center px-4 py-3 rounded">
                        No products found matching "{searchQuery}"
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 md:gap-6">
                        {products.map(product => (
                            <ProductCard
                                key={product.productId}
                                product={product}
                                className="w-full h-full"
                            />
                        ))}
                    </div>
                )}
            </main>


        </div>
    );
}