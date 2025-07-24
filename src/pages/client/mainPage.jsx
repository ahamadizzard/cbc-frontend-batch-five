import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import ReviewsCarousel from './reviewsCarousel.jsx';
import AutoImageSlider from '../../components/autoImageSlider.jsx';
export default function MainPage() {
    const heroSectionImages = [
        "image01.jpg",
        "image02.jpg",
        "image03.jpg",
        "image04.jpg",
        "image05.jpg",
        "image06.jpg",
        "image07.jpg",
        "image08.jpg",
        "image09.jpg",
    ]
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center mt-80">

            <div className='flex items-center justify-center w-full h-[550px] mx-auto px-4 mt-10 p-4 mb-4'>

                <AutoImageSlider images={[
                    // add a map function to iterate over heroSectionImages
                    ...heroSectionImages.map(image => `herosection/${image}`)
                ]} />


            </div>

            {/* <div className="w-full bg-accent/5 rounded-2xl shadow-xl mx-auto p-6 flex flex-col items-center justify-center mt-4 mb-1"> */}
            <div className="w-full  mx-auto p-6 flex flex-col items-center justify-center mt-4 mb-1">
                <img src="/logo.png" alt="Logo" className="w-48 h-24 mb-4" />
                <h1 className="text-4xl font-bold text-accent mb-2">Welcome to CBC Store!</h1>
                <p className="text-lg text-gray-600 mb-6 text-center">
                    Discover the best products, enjoy seamless shopping, and manage your cart with ease. Start exploring now!
                </p>
                <div className="flex flex-wrap gap-4 ">
                    <Link to="/search" className="px-6 py-3 bg-accent text-white rounded-lg font-semibold shadow hover:bg-accent-dark transition">Shop Products</Link>
                    {/* <Link to="/cart" className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition">View Cart</Link> */}
                    <Link to="/about" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold shadow hover:bg-gray-300 transition">About</Link>
                    <Link to="/contact" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold shadow hover:bg-gray-300 transition">Contact</Link>
                </div>
                {/* <div className="w-full bg-amber-200 flex flex-col items-center mt-5">
                        <p className="text-sm text-gray-400">Not what you're looking for? Try searching for products!</p>
                        <Link to="/search" className="mt-2 px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition">Search Products</Link>
                    </div> */}
            </div>
            <div>
                <ReviewsCarousel />
            </div>
            {/* Page Footer */}
            {/* <footer className="bg-accent/40 text-accent py-8 w-full mt-10 mx-auto"> */}
            <div className='w-full rounded-2xl shadow-xl mx-auto p-2 flex flex-col items-center justify-center mt-4 mb-1-full'>
                <footer className="w-full bg-accent/30 text-accent rounded-t-2xl shadow-xl mx-auto p-6 flex flex-col items-center justify-center mt-4 ">
                    <div className="container mx-auto px-1">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                            <div>
                                <img src="/logo.png" className="left-2 w-[200px] h-[150px] object-fill" alt="logo" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2">CBC Store</h3>
                                <p className="text-accent">Your one-stop shop for quality products at affordable prices.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold mb-2">Quick Links</h4>
                                <ul className="space-y-2">
                                    <li><a href="/" className="text-accent hover:text-primary">Home</a></li>
                                    <li><a href="/search" className="text-accent hover:text-primary">Products</a></li>
                                    <li><a href="/about" className="text-accent hover:text-primary">About Us</a></li>
                                    <li><a href="/contact" className="text-accent hover:text-primary">Contact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold mb-2">Customer Service</h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-accent hover:text-primary">FAQs</a></li>
                                    <li><a href="#" className="text-accent hover:text-primary">Shipping Policy</a></li>
                                    <li><a href="#" className="text-accent hover:text-primary">Returns & Refunds</a></li>
                                    <li><a href="#" className="text-accent hover:text-primary">Privacy Policy</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold mb-2">Contact Us</h4>
                                <address className="text-accent not-italic">
                                    3/2, A. A. Dharmasena Mawatha,<br />
                                    Kandy, 20000<br />
                                    <a href="mailto:info@shopease.com" className="hover:text-primary">info@cbclanka.com</a><br />
                                    (94) 774272631
                                </address>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-accent">
                            &copy; {new Date().getFullYear()} CBC Store. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>

        </div>
    );
}