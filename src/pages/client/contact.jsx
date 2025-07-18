import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';



export default function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
    }
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-accent/40 text-white mt-10">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        We'd love to hear from you! Reach out with questions or feedback.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-secondary/20"></div>
            </section>

            {/* Contact Content */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Contact Form */}
                        <div className="lg:w-1/2">
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-accent mb-6">Send Us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-accent mb-2">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-accent mb-2">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-accent mb-2">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-accent mb-2">Message</label>
                                        <textarea
                                            id="message"
                                            rows="5"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-6 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:w-1/2">
                            <div className="bg-secondary/10 p-8 rounded-xl border-l-4 border-accent">
                                <h2 className="text-3xl font-bold text-accent mb-8">Get In Touch</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="bg-accent/80 p-3 rounded-full mr-4">
                                            <FaMapMarkerAlt className="text-primary text-sm" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-accent mb-1">Our Location</h3>
                                            <p className="text-accent">123 Business Avenue<br />City, State 10001</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-accent/80 p-3 rounded-full mr-4">
                                            <FaPhone className="text-primary text-sm" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-accent mb-1">Phone Numbers</h3>
                                            <p className="text-accent">
                                                Main: (123) 456-7890<br />
                                                Support: (123) 456-7891
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-accent/80 p-3 rounded-full mr-4">
                                            <FaEnvelope className="text-primary text-sm" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-accent mb-1">Email Addresses</h3>
                                            <p className="text-accent">
                                                info@yourcompany.com<br />
                                                support@yourcompany.com
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-accent/80 p-3 rounded-full mr-4">
                                            <FaClock className="text-primary text-sm" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-accent mb-1">Working Hours</h3>
                                            <p className="text-accent">
                                                Monday - Friday: 9am - 6pm<br />
                                                Saturday: 10am - 2pm<br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold text-accent mb-4">Follow Us</h3>
                                    <div className="flex space-x-4">
                                        <a href="#" className="bg-accent/80 p-3 rounded-full hover:bg-accent/50 transition-colors">
                                            <span className="sr-only">Facebook</span>
                                            <span className="text-primary">FB</span>
                                        </a>
                                        <a href="#" className="bg-accent/80 p-3 rounded-full hover:bg-accent/50 transition-colors">
                                            <span className="sr-only">Twitter</span>
                                            <span className="text-primary">TW</span>
                                        </a>
                                        <a href="#" className="bg-accent/80 p-3 rounded-full hover:bg-accent/50 transition-colors">
                                            <span className="sr-only">Instagram</span>
                                            <span className="text-primary">IG</span>
                                        </a>
                                        <a href="#" className="bg-accent/80 p-3 rounded-full hover:bg-accent/50 transition-colors">
                                            <span className="sr-only">LinkedIn</span>
                                            <span className="text-primary">IN</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-accent mb-12">Find Us on the Map</h2>
                    <div className="bg-gray-200 rounded-xl overflow-hidden h-96">
                        {/* Replace with your actual map component or iframe */}
                        <div className="flex items-center justify-center h-full bg-secondary/10">
                            <p className="text-gray-500 text-lg">Map integration would go here</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
