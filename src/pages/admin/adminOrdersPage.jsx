import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (isLoading) {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to continue")
                return;
            }
            axios.get(import.meta.env.VITE_API_BASE_URL + "/api/orders", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    setOrders(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    alert("An error occurred while fetching orders: " + (err.response?.data?.message || "Unknown Error"));
                    setIsLoading(false);
                });
        }
    }, [isLoading]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="w-full h-full p-6 bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h1>

            {isLoading ? (
                <Loading />
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <Modal
                            isOpen={isModalOpen}
                            onAfterOpen={() => { }}
                            onRequestClose={() => setIsModalOpen(false)}
                            shouldCloseOnOverlayClick={true}
                            contentLabel="Order Details Modal"
                            style={{
                                overlay: {
                                    backgroundColor: 'rgba(57, 62, 70, 0.75)',
                                    backdropFilter: 'blur(4px)'
                                },
                                content: {
                                    backgroundColor: 'var(--color-primary)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '0',
                                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                                    maxWidth: '800px',
                                    width: '90%',
                                    margin: 'auto',
                                    overflow: 'hidden'
                                }
                            }}
                        >
                            <div className="relative">
                                {/* Modal Header */}
                                <div className="bg-[var(--color-accent)] p-6 text-white">
                                    <h2 className="text-2xl font-bold">
                                        Order #{(selectedOrder !== null && orders[selectedOrder]?.orderId) || ''}
                                    </h2>
                                    <div className="absolute top-4 right-4">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="text-white hover:text-[var(--color-secondary)] transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Modal Content */}
                                {selectedOrder !== null && (
                                    <div className="flex flex-col md:flex-row h-full max-h-[70vh] overflow-hidden">
                                        {/* Master View - Order Summary */}
                                        <div className="w-full md:w-1/3 p-6 border-r border-gray-200 overflow-y-auto">
                                            <div className="space-y-6">
                                                {/* Order Status */}
                                                <div>
                                                    <p className="text-xs text-gray-500">Status</p>
                                                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(orders[selectedOrder].status)}`}>
                                                        {orders[selectedOrder].status}
                                                    </p>
                                                </div>

                                                {/* Customer Info */}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-[var(--color-secondary)] mb-3">
                                                        Customer
                                                    </h3>
                                                    <div className="space-y-2">
                                                        <p className="font-medium">{orders[selectedOrder].name}</p>
                                                        <p className="text-sm text-gray-600">{orders[selectedOrder].email}</p>
                                                        <p className="text-sm text-gray-600">{orders[selectedOrder].phone}</p>
                                                        <p className="text-sm text-gray-600">{orders[selectedOrder].address}</p>
                                                    </div>
                                                </div>

                                                {/* Order Summary */}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-[var(--color-secondary)] mb-3">
                                                        Order Summary
                                                    </h3>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <span className="text-sm text-gray-600">Date:</span>
                                                            <span className="text-sm font-medium">{new Date(orders[selectedOrder].date).toISOString().split('T')[0]}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-sm text-gray-600">No. of Items:</span>
                                                            <span className="text-sm font-medium">{orders[selectedOrder].products.reduce((acc, item) => acc + item.quantity, 0)}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-sm text-gray-600">Total without discount:</span>
                                                            <span className="text-sm font-medium">Rs. {orders[selectedOrder].labelledTotal.toFixed(2)}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-sm text-gray-600">Total Amount to Pay:</span>
                                                            <span className="text-sm font-medium text-[var(--color-accent)]">Rs. {orders[selectedOrder].total.toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Detail View - Products */}
                                        <div className="w-full md:w-2/3 p-6 overflow-y-auto">
                                            <h3 className="text-lg font-semibold text-[var(--color-secondary)] mb-4">
                                                Order Items ({orders[selectedOrder].products.length})
                                            </h3>

                                            <div className="space-y-4">
                                                {orders[selectedOrder].products.map((product, index) => (
                                                    <div key={index} className="flex items-start border-b border-gray-100 pb-4">
                                                        {product.productInfo.productImages?.length > 0 && (
                                                            <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                                                                <img
                                                                    src={product.productInfo.productImages[0]}
                                                                    alt={product.productInfo.productName}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="flex-1">
                                                            <h4 className="font-medium">{product.productInfo.productName}</h4>
                                                            <p className="text-sm text-gray-600 line-clamp-1">{product.productInfo.productDescription}</p>
                                                            <div className="flex justify-between items-center mt-2">
                                                                <div className="flex items-center space-x-2">
                                                                    <span className="text-sm font-medium">Rs. {product.productInfo.salePrice.toFixed(2)}</span>
                                                                    {product.productInfo.salePrice !== product.productInfo.labelPrice && (
                                                                        <span className="text-xs text-gray-500 line-through">Rs. {product.productInfo.labelPrice.toFixed(2)}</span>
                                                                    )}
                                                                </div>
                                                                <span className="text-sm text-gray-600">Qty: {product.quantity}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex justify-end space-x-3 pt-6">
                                                <button
                                                    className="px-4 py-2 text-sm font-medium text-[var(--color-secondary)] border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                                    onClick={() => setIsModalOpen(false)}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="px-4 py-2 text-sm font-medium text-[var(--color-secondary)] border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                                    onClick={() => window.print()}
                                                >
                                                    Print
                                                </button>
                                                <button
                                                    className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-accent)] rounded-md hover:bg-opacity-90 transition-colors"
                                                    onClick={() => {/* Add your action here */ }}
                                                >
                                                    Update Status
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Modal>

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-accent">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order, index) => (
                                    <tr key={index} className="hover:bg-gray-200 cursor-pointer transition-colors"
                                        onClick={() => {
                                            setSelectedOrder(index);
                                            setIsModalOpen(true);
                                        }}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {order.orderId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{order.name}</div>
                                            <div className="text-sm text-gray-500">{order.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{order.phone}</div>
                                            <div className="text-sm text-gray-500">{order.address}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {order.products.length} item{order.products.length !== 1 ? 's' : ''}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Rs. {order.total.toFixed(2)} <span className="line-through">(Rs. {order.labelledTotal.toFixed(2)})</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                            Rs. {order.total.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(order.date)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {orders.length === 0 && !isLoading && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No orders found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}