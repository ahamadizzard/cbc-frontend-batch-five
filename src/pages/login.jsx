import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Login() {
    // return (
    // <div className="w-full h-screen bg-[url('/public/loginBg.jpg')] bg-cover  flex  justify-center items-center">
    //     <div className="w-[50%] h-full ">

    //     </div>
    //     <div className="w-[50%] h-full flex justify-center items-center">
    //         <div className=" w-[400px] h-[600px] bg-white backdrop-blur-md shadow-xl rounded-2xl flex flex-col justify-center items-center">
    //             <h2 className="text-2xl font-bold mb-8 mask-y-from-20">Welcome to Cyclone Beauty Center</h2>
    //             <input type="text" placeholder="Email" className="w-[300px] h-[50px] border-2 border-gray-300 rounded-2xl p-2 mb-4" />
    //             <input type="password" placeholder="Password" className="w-[300px] h-[50px] border-2 border-gray-300 rounded-2xl p-2 mb-4" />
    //             <button className="w-[300px] h-[50px] bg-blue-500 text-white rounded-2xl">Login</button>
    //             <div className="w-full flex justify-center items-center mt-4">
    //                 <span className="text-gray-500">Don't have an account?</span>
    //                 <a href="/signup" className="text-blue-500 ml-2">Sign Up</a>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState({
        email: false,
        password: false
    });

    async function handleLogin() {
        // Note here if the response code is not 200, then it will throw an error
        // You can handle the error in the catch block below
        try {
            const response = await axios.post("http://localhost:8000/users/login", {
                email: email,
                password: password
            })
            toast.success("Login successful")
            console.log('Login response: ', response.data);
        } catch (error) {
            toast.error(`Login failed ${error.response.data.message}`)
            // alert("Login failed", error.response.data.message)
            // Handle error here (e.g., show error message)

        }
    }
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle login logic here
    //     console.log('Login submitted:', { email, password });
    // };

    return (
        <div className="min-h-screen flex overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 animate-gradient-shift">
            {/* Left Section - Logo */}
            <div className="hidden md:flex flex-1 items-center justify-center p-8 animate-fade-in">
                <div className="text-center text-white">
                    <div className="text-4xl font-bold mb-8">Your Logo</div>
                    <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
                    <p className="text-xl opacity-90">Please login to access your account</p>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="flex-1 flex items-center justify-center p-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-80 blur-3xl -m-4"></div>
                <div className="w-full max-w-md bg-gray-200 bg-opacity-90 backdrop-blur-lg  rounded-xl shadow-xl p-8 z-10 animate-slide-in space-y-6">
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
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-all transform hover:scale-[1.01] shadow-lg"
                    >
                        Sign in
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </a>
                    </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
    )
} 