import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ImageSlider from "../../components/imageSlider.jsx";
import Loading from "../../components/loading.jsx";
import { addToCart, getCart } from "../../utils/cart.js";

export default function ProductOverview() {
    const navigate = useNavigate();
    const params = useParams();
    const productId = params.id;
    const [status, setStatus] = useState("loading"); // loading, success, error
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);

    useEffect(() => {
        // Fetch product data
        axios
            .get(import.meta.env.VITE_API_BASE_URL + "/api/products/" + productId)
            .then((response) => {
                setProduct(response.data.product);
                setStatus("success");

                // Fetch reviews after product is loaded
                return axios.get(import.meta.env.VITE_API_BASE_URL + `/api/reviews/${productId}`);
            })
            .then((response) => {
                setReviews(response.data);
                setReviewsLoading(false);
            })
            .catch((error) => {
                setStatus("error");
                toast.error("An error occurred while fetching data");
                console.error(error);
            });
    }, [productId]);

    return (
        <>
            {status == "success" && (
                <div className="w-full h-full flex flex-col">
                    <div className="w-full flex">
                        <div className="w-[50%] h-full flex justify-center items-center mt-10">
                            <ImageSlider images={product.productImages} />
                        </div>
                        <div className="w-[50%] justify-center items-center flex mt-10">
                            <div className="w-[500px] h-[600px] flex flex-col items-center">
                                <h1 className="w-full text-center text-color text-2xl text-secondary font-semibold mb-2">
                                    {product.productName} <br />
                                    {product.altNames.map((altName, index) => {
                                        return (
                                            <span
                                                key={index}
                                                className="text-gray-500 italic text-xl font-normal"
                                            >
                                                {" "}
                                                {" | " + altName}
                                            </span>
                                        );
                                    })}
                                </h1>
                                <h1 className="w-full text-center my-2 text-gray-600 text-md font-semibold mb-16">
                                    {product.productId}
                                </h1>
                                <p className="w-full text-center text-gray-600 text-md font-semibold mb-16">
                                    {product.productDescription}
                                </p>
                                <div>
                                    {product.labelPrice > product.salePrice ? (
                                        <div className="flex justify-center items-center my-4 mb-32">
                                            <h1 className="text-secondary text-4xl font-bold">
                                                Price Rs.{" "}
                                            </h1>
                                            <span className="text-gray-500 text-4xl line-through">
                                                {product.labelPrice.toFixed(2)}
                                            </span>
                                            <span className="text-accent text-4xl mx-2 font-bold">
                                                {product.salePrice.toFixed(2)}{" "}
                                            </span>
                                        </div>
                                    ) : (
                                        <div>
                                            <span className="text-accent text-4xl font-bold">
                                                {product.salePrice.toFixed(2)}{" "}
                                            </span>
                                        </div>
                                    )}
                                    <div className="w-full flex justify-center items-center my-8 ">
                                        <button className="bg-accent text-white px-4 py-2 rounded-md font-semibold cursor-pointer hover:bg-purple-900 shadow-2xl shadow-accent"
                                            onClick={() => {
                                                console.log("old cart");
                                                console.log(getCart());
                                                addToCart(product, 1);
                                                console.log(getCart());
                                                toast.success("Product added to cart");
                                            }}>
                                            Add to Cart
                                        </button>
                                        <button className="bg-accent text-white px-4 py-2 rounded-md font-semibold cursor-pointer hover:bg-purple-900 shadow-2xl shadow-secondary ml-4"
                                            onClick={(e) => {
                                                navigate("/checkout", {
                                                    state: {
                                                        cart: [
                                                            {
                                                                productId: product.productId,
                                                                name: product.productName,
                                                                image: product.productImages[0],
                                                                price: product.salePrice,
                                                                labelPrice: product.labelPrice,
                                                                quantity: 1
                                                            }
                                                        ]
                                                    }
                                                })
                                            }}>
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="w-full p-8 mt-8 border-t border-gray-200">
                        <h2 className="text-2xl font-bold text-secondary mb-6">Customer Reviews</h2>

                        {reviewsLoading ? (
                            <div className="flex justify-center">
                                <Loading />
                            </div>
                        ) : reviews.length === 0 ? (
                            <p className="text-gray-500">No reviews yet for this product.</p>
                        ) : (
                            <div className="space-y-6">
                                {reviews.map((review, index) => (
                                    <div key={index} className="w-[1200px] bg-gray-50 p-4 rounded-lg flex flex-row shadow-sm">
                                        <div className="w-[calc(100%-320px)]  flex-shrink-0 mr-4 ">
                                            <div className="flex items-center mb-2">
                                                <div className="font-semibold text-secondary mr-2">
                                                    {review.name || 'Anonymous'}
                                                </div>
                                                <div className="text-yellow-500">
                                                    {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                                                </div>
                                            </div>
                                            <p className="text-gray-700">{review.reviewText}</p>
                                            <div className="text-sm text-gray-500 mt-2">
                                                {new Date(review.reviewDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="w-[220px] ml-4 flex-shrink-0  flex flex-col items-end justify-end">
                                            {review.reviewImages && review.reviewImages.length > 0 && (
                                                <div className="mt-2 flex space-x-2">
                                                    {review.reviewImages.map((image, imgIndex) => (
                                                        <img
                                                            key={imgIndex}
                                                            src={image}
                                                            alt={`Review image ${imgIndex + 1}`}
                                                            className="w-20 h-20 object-cover rounded-md"
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {status == "loading" && <Loading />}
        </>
    );
}