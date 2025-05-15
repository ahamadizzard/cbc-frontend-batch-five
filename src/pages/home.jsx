import { Route, Routes } from 'react-router-dom'
import Header from '../components/header.jsx'
import ProductsPage from './client/productsPage.jsx'
export default function HomePage() {
    return (
        <div className="w-full h-screen flex flex-col items-center">
            {/* <Header /> */}
            <div className='w-full h-[calc(100vh-100px)] flex flex-col ml-10 overflow-y-auto'>
                <Routes path="/*">
                    <Route path="/" element={<div>Home</div>} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/about" element={<div>About</div>} />
                    <Route path="/contact" element={<div>Contact</div>} />
                    <Route path="/*" element={<hi>404 Not Found</hi>} />
                </Routes>
            </div>

        </div>
    )
}