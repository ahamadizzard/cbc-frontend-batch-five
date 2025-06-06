// import axios from "axios";
// import { useEffect, useState } from "react";
// import Loading from "../../components/loading";

// export default function AdminReviewPage() {
//     const [reviews, setReviews] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         if (isLoading) {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 alert("Please login to continue")
//                 return;
//             }
//             axios.get(import.meta.env.VITE_API_BASE_URL + "/api/reviews", {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             })
//                 .then((res) => {
//                     setReviews(res.data);
//                     console.log(res.data);
//                     setIsLoading(false);

//                 })
//                 .catch((err) => {
//                     alert("An error occurred while fetching reviews: " + (err.response || "Unknown Error"));
//                     setIsLoading(false);
//                 });
//         }
//     }, [isLoading]);


//     return (
//         <div className="w-full h-full flex flex-col items-center justify-center pt-2">
//             <h1 className="text-2xl font-bold ">Admin Reviews Page</h1>
//             <p className="text-lg text-gray-600">This page will display all the reviews submitted by users.</p>
//             {/* Future implementation for displaying reviews will go here */}

//             {isLoading ? (
//                 <Loading />
//             ) : (
//                 <div className="w-full h-full overflow-x-auto mt-4">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-accent ">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Review ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">User Image</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Rating</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Comment</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Review Images</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Review Visibility</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {reviews.map((review) => (
//                                 <tr key={review.id}>
//                                     <td className="px-6 py-4 whitespace-nowrap">{review.reviewId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{review.productId}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <img src={review.userImage} alt="U.Image" className="w-10 h-10 rounded-full" />
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{review.name}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{review.rating}</td>
//                                     <td className="px-6 py-4 whitespace-pre-wrap">{review.reviewText}</td>
//                                     <td className="px-6 py-4 whitespace-pre-wrap">{review.reviewDate}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <img src={review.reviewImages[0]} alt="R.Image" className="w-10 h-10 rounded-full" />
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{review.isVisible ? "Visible" : "Hidden"}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";

export default function AdminReviewPage() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to continue");
                return;
            }
            axios.get(import.meta.env.VITE_API_BASE_URL + "/api/reviews", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    setReviews(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    alert("An error occurred while fetching reviews: " + (err.response || "Unknown Error"));
                    setIsLoading(false);
                });
        }
    }, [isLoading]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const renderRatingStars = (rating) => {
        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
                <span className="ml-1 text-sm text-gray-600">{rating}/5</span>
            </div>
        );
    };

    return (
        <div className="w-full h-full p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Customer Reviews</h1>
                    <p className="text-gray-600 mt-2">Manage all customer reviews submitted for your products</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loading />
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-accent">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">User</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Rating</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Review</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {reviews.map((review) => (
                                        <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img
                                                            className="h-10 w-10 rounded-full object-cover"
                                                            src={review.userImage || '/default-user.png'}
                                                            alt="User"
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{review.name}</div>
                                                        <div className="text-sm text-gray-500">ID: {review.reviewId}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">Product ID: {review.productId}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {renderRatingStars(review.rating)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 max-w-xs">{review.reviewText}</div>
                                                {review.reviewImages?.length > 0 && (
                                                    <div className="flex mt-2 space-x-2">
                                                        {review.reviewImages.slice(0, 2).map((img, i) => (
                                                            <div key={i} className="relative h-10 w-10 rounded-md overflow-hidden">
                                                                <img
                                                                    src={img}
                                                                    alt={`Review ${i + 1}`}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        ))}
                                                        {review.reviewImages.length > 2 && (
                                                            <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center text-xs">
                                                                +{review.reviewImages.length - 2}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(review.reviewDate)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${review.isVisible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {review.isVisible ? 'Visible' : 'Hidden'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {reviews.length === 0 && !isLoading && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No reviews found</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}