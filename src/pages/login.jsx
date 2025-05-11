import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState({
        email: false,
        password: false
    });
    const navigate = useNavigate()

    async function handleLogin() {
        // Note here if the response code is not 200, then it will throw an error
        // You can handle the error in the catch block below
        try {
            const response = await axios.post(import.meta.env.VITE_API_BASE_URL + "/api/users/login", {
                email: email,
                password: password
            })
            toast.success("Login successful")
            // console.log('Login response: ', response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.firstName);
            const token = localStorage.getItem('token');
            const userFirstName = localStorage.getItem('user');
            if (response.data.role === "admin") {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(`Login failed ${error.response.data.message}`)
        }
    }
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle login logic here
    //     console.log('Login submitted:', { email, password });
    // };

    return (
        <div
            className="min-h-screen flex overflow-hidden opacity-90  "
            // style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)' }}
            style={{ backgroundImage: 'url(/mainbg.jpg)' }}
        >
            {/* Left Section - Logo */}
            <div className="hidden md:flex flex-1 items-center justify-center p-8 animate-fade-in">
                <div className="text-center text-white">
                    <div className="text-4xl font-bold mb-8">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className=" mx-auto"
                            width={900}
                            height={600}
                        />
                    </div>
                    {/* <h1 className="text-4xl font-bold mb-4">Welcome Back</h1> */}
                    {/* <h1 className="text-4xl text-blue-600 font-bold mb-4">Cosmetic Beauty Products</h1> */}
                    <p className="text-xl opacity-90">Please login to access your account</p>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="flex-1 flex items-center justify-center p-4 relative">
                {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-80 blur-3xl -m-4"></div> */}
                {/* <div className="w-full max-w-md bg-gray-200 bg-opacity-90 backdrop-blur-lg  rounded-xl shadow-xl p-8 z-10 animate-slide-in space-y-6"> */}
                <div
                    className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden p-8 border border-white/30 space-y-6 z-10 animate-slide-in hover:scale-[1.01] transition-all duration-200"
                >
                    {/* <form onSubmit={handleSubmit} className="space-y-6"> */}
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Login</h2>

                    {/* Email Input */}
                    <div className={`space-y-1 transition-all duration-200 ${isFocused.email ? 'scale-[1.02]' : ''}`}>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setIsFocused({ ...isFocused, email: true })}
                            onBlur={() => setIsFocused({ ...isFocused, email: false })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className={`space-y-1 transition-all duration-200 ${isFocused.password ? 'scale-[1.02]' : ''}`}>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setIsFocused({ ...isFocused, password: true })}
                            onBlur={() => setIsFocused({ ...isFocused, password: false })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                        />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        // type="submit"
                        onClick={handleLogin}
                        // className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-all transform hover:scale-[1.01] shadow-lg"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150"
                    >
                        Sign in
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </Link>
                    </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
    )
} 