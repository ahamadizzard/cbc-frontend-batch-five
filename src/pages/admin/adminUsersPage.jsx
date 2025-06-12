import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import Modal from 'react-modal';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentUserRole, setCurrentUserRole] = useState('');

    useEffect(() => {
        if (isLoading) {
            const token = localStorage.getItem("token");
            const getCurrentUserRole = localStorage.getItem("role");
            setCurrentUserRole(getCurrentUserRole);
            if (!token) {
                alert("Please login to continue")
                return;
            }
            axios.get(import.meta.env.VITE_API_BASE_URL + "/api/users", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    setUsers(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    alert("An error occurred while fetching users: " + (err.response?.data?.message || "Unknown Error"));
                    setIsLoading(false);
                });
        }
    }, [isLoading]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getRoleColor = (role) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'bg-purple-100 text-purple-800';
            case 'user':
                return 'bg-blue-100 text-blue-800';
            case 'guest':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="w-full h-full p-6 bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden cursor-pointer">
                    <div className="overflow-x-auto">
                        <Modal
                            isOpen={isModalOpen}
                            onAfterOpen={() => { }}
                            onRequestClose={() => setIsModalOpen(false)}
                            shouldCloseOnOverlayClick={true}
                            contentLabel="User Details"
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

                            <div className="p-6">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* User Image */}
                                <div className="flex justify-center mb-6">
                                    <img
                                        src={users[selectedUser].imgURL || 'https://avatar.iran.liara.run/public/boy?username=ash'}
                                        alt={`${users[selectedUser].firstName} ${users[selectedUser].lastName}`}
                                        className="w-24 h-24 rounded-full object-cover border-2 border-accent"
                                    />
                                </div>

                                {/* User Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-600">First Name</label>
                                        <p className="text-lg font-medium text-gray-800 p-2 bg-gray-50 rounded">
                                            {users[selectedUser].firstName}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-600">Last Name</label>
                                        <p className="text-lg font-medium text-gray-800 p-2 bg-gray-50 rounded">
                                            {users[selectedUser].lastName}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-600">Email</label>
                                        <p className="text-lg font-medium text-gray-800 p-2 bg-gray-50 rounded">
                                            {users[selectedUser].email}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-600">Role</label>
                                        {currentUserRole === 'admin' ? (
                                            <select
                                                className="w-full p-2 border border-gray-300 rounded focus:ring-accent focus:border-accent"
                                                value={users[selectedUser].role}
                                                onChange={async (e) => {
                                                    const newRole = e.target.value;
                                                    try {
                                                        const token = localStorage.getItem("token");
                                                        const response = await axios.put(
                                                            `${import.meta.env.VITE_API_BASE_URL}/api/users/${users[selectedUser].email}`,
                                                            { role: newRole },
                                                            { headers: { 'Authorization': `Bearer ${token}` } }
                                                        );
                                                        // Update local state
                                                        const updatedUsers = [...users];
                                                        updatedUsers[selectedUser].role = newRole;
                                                        setUsers(updatedUsers);
                                                    } catch (error) {
                                                        console.error("Failed to update role:", error);
                                                    }
                                                }}
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="customer">Customer</option>
                                            </select>
                                        ) : (
                                            <p className="text-lg font-medium text-gray-800 p-2 bg-gray-50 rounded">
                                                {users[selectedUser].role}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-600">Status</label>
                                        <div className="flex items-center">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-accent focus:ring-accent"
                                                    checked={users[selectedUser].isBlocked}
                                                    onChange={async (e) => {
                                                        const isBlocked = e.target.checked;
                                                        try {
                                                            const token = localStorage.getItem("token");
                                                            const response = await axios.put(
                                                                `${import.meta.env.VITE_API_BASE_URL}/api/users/${users[selectedUser].email}`,
                                                                { isBlocked },
                                                                { headers: { 'Authorization': `Bearer ${token}` } }
                                                            );
                                                            // Update local state
                                                            const updatedUsers = [...users];
                                                            updatedUsers[selectedUser].isBlocked = isBlocked;
                                                            setUsers(updatedUsers);
                                                        } catch (error) {
                                                            console.error("Failed to update status:", error);
                                                        }
                                                    }}
                                                />
                                                <span className="ml-2 text-gray-700">
                                                    {users[selectedUser].isBlocked ? 'User is Blocked' : 'User is Active'}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={async () => {
                                            if (window.confirm("Are you sure you want to delete this user?")) {
                                                try {
                                                    const token = localStorage.getItem("token");
                                                    await axios.delete(
                                                        `${import.meta.env.VITE_API_BASE_URL}/api/users/${users[selectedUser]._id}`,
                                                        { headers: { 'Authorization': `Bearer ${token}` } }
                                                    );
                                                    // Remove user from local state
                                                    const updatedUsers = users.filter((_, index) => index !== selectedUser);
                                                    setUsers(updatedUsers);
                                                    setIsModalOpen(false);
                                                } catch (error) {
                                                    console.error("Failed to delete user:", error);
                                                }
                                            }
                                        }}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                                    >
                                        Delete User
                                    </button>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Modal>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-accent">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">First Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Last Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>

                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Joined Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors"
                                        onClick={() => {
                                            setSelectedUser(index);
                                            setIsModalOpen(true);
                                        }}>
                                        {/* <td className="px-6 py-4 whitespace-nowrap"> */}
                                        <div className="flex items-center px-6 py-2 whitespace-nowrap">
                                            {/* User Image */}
                                            <img
                                                src={user.imgURL || 'https://via.placeholder.com/50'}
                                                alt={`${user.firstName} ${user.lastName}`}
                                                className="w-12 h-12 rounded-full object-cover mr-4"
                                            />
                                        </div>


                                        {/* </td> */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {user.firstName || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{user.lastName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                                                {user.role || 'user'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(user.createdAt || new Date())}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                {user.isBlocked ? 'Inactive' : 'Active'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {users.length === 0 && !isLoading && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No users found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

