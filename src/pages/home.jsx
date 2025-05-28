import { Route, Routes } from 'react-router-dom'
import Header from '../components/header.jsx'
import ProductsPage from './client/productsPage.jsx'
import ProductOverview from './client/productOverview.jsx'
import CartPage from './client/cart.jsx'
export default function HomePage() {
    return (
        <div className="w-full h-screen flex flex-col items-center">
            {/* <Header /> */}
            <div className='w-full h-[calc(100vh-100px)] flex flex-col items-center ml-10 overflow-y-auto'>
                <Routes path="/*">
                    <Route path="/" element={<div>Home Page</div>} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/about" element={<div>About</div>} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/contact" element={<div>Contact</div>} />
                    <Route path="/overview/:id" element={<ProductOverview />} />
                    <Route path="/*" element={<hi>404 Not Found</hi>} />
                </Routes>
            </div>

        </div>
    )
}