import { Route, Routes } from 'react-router-dom'
import ProductsPage from './client/productsPage.jsx'
import ProductOverview from './client/productOverview.jsx'
import CartPage from './client/cart.jsx'
import Checkout from './client/checkout.jsx'
import SearchProductsPage from './client/searchProduct.jsx'
import ImageSlider from '../components/imageSlider.jsx'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import About from './client/about.jsx';
import Contact from './client/contact.jsx';

import { Link } from 'react-router-dom';
import MainPage from './client/mainPage.jsx'

export default function HomePage() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-accent/10">
            <div className='w-full flex flex-col items-center ml-10 overflow-y-auto'>
                <Routes path="*">
                    <Route path="*" element={<MainPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/search" element={<SearchProductsPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/overview/:id" element={<ProductOverview />} />
                    <Route path="/*" element={<hi>404 Not Found</hi>} />
                </Routes>
            </div>


            {/* <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center mb-8">
                <img src="/logo.png" alt="Logo" className="w-24 h-24 mb-4" />
                <h1 className="text-4xl font-bold text-accent mb-2">Welcome to Kandy CBC Store!</h1>
                <p className="text-lg text-gray-600 mb-6 text-center">
                    Discover the best products, enjoy seamless shopping, and manage your cart with ease. Start exploring now!
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                    <Link to="/products" className="px-6 py-3 bg-accent text-white rounded-lg font-semibold shadow hover:bg-accent-dark transition">Shop Products</Link>
                    <Link to="/cart" className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition">View Cart</Link>
                    <Link to="/about" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold shadow hover:bg-gray-300 transition">About</Link>
                    <Link to="/contact" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold shadow hover:bg-gray-300 transition">Contact</Link>
                </div>
                <div className="w-full flex flex-col items-center">
                    <p className="text-sm text-gray-400">Not what you're looking for? Try searching for products!</p>
                    <Link to="/search" className="mt-2 px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition">Search Products</Link>
                </div>

            </div> */}


        </div>
    )
}
