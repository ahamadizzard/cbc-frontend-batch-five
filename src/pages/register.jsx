import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role: 'customer' // default role
    });
    const [isFocused, setIsFocused] = useState({
        email: false,
        firstName: false,
        lastName: false,
        password: false
    });
    const navigate = useNavigate();

    async function handleRegister() {
        try {
            await axios.post(
                import.meta.env.VITE_API_BASE_URL + "/api/users",
                formData
            );
            toast.success("Registration successful");
            navigate('/login'); // Redirect to home after registration
        } catch (error) {
            toast.error(`Registration failed: ${error.response?.data?.message || error.message}`);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFocus = (field) => {
        setIsFocused(prev => ({
            ...prev,
            [field]: true
        }));
    };

    const handleBlur = (field) => {
        setIsFocused(prev => ({
            ...prev,
            [field]: false
        }));
    };

    return (
        <div
            className="min-h-screen flex overflow-hidden opacity-90"
            style={{ backgroundImage: 'url(/mainbg.jpg)', backgroundSize: 'cover' }}
        >
            {/* Left Section - Logo */}
            <div className="hidden md:flex flex-1 items-center justify-center p-8 animate-fade-in">
                <div className="text-center text-white">
                    <div className="text-4xl font-bold mb-8">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="mx-auto"
                            width={900}
                            height={600}
                        />
                    </div>
                    <p className="text-xl opacity-90">Create your account</p>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="flex-1 flex items-center justify-center p-4 relative">
                <div
                    className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden p-8 border border-white/30 space-y-6 z-10 animate-slide-in hover:scale-[1.01] transition-all duration-200"
                >
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Register</h2>

                    {/* First Name Input */}
                    <div className={`space-y-1 transition-all duration-200 ${isFocused.firstName ? 'scale-[1.02]' : ''}`}>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            onFocus={() => handleFocus('firstName')}
                            onBlur={() => handleBlur('firstName')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                        />
                    </div>

                    {/* Last Name Input */}
                    <div className={`space-y-1 transition-all duration-200 ${isFocused.lastName ? 'scale-[1.02]' : ''}`}>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            onFocus={() => handleFocus('lastName')}
                            onBlur={() => handleBlur('lastName')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div className={`space-y-1 transition-all duration-200 ${isFocused.email ? 'scale-[1.02]' : ''}`}>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => handleFocus('email')}
                            onBlur={() => handleBlur('email')}
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onFocus={() => handleFocus('password')}
                            onBlur={() => handleBlur('password')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                        />
                    </div>

                    {/* Role Selection (hidden by default, can be made visible if needed) */}
                    <input type="hidden" name="role" value="customer" />

                    {/* Register Button */}
                    <button
                        onClick={handleRegister}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150"
                    >
                        Create Account
                    </button>

                    {/* Login Link */}
                    <div className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}