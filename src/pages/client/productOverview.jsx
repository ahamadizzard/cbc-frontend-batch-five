import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ImageSlider from "../../components/imageSlider.jsx";
import Loading from "../../components/loading.jsx";
import { addToCart, getCart } from "../../utils/cart.js";

export default function ProductOverview() {
    const params = useParams();
    const productId = params.id;
    const [status, setStatus] = useState("loading"); // loading, success, error
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_BASE_URL + "/api/products/" + productId)
            .then((response) => {
                setProduct(response.data.product);

                setStatus("success");
            })
            .catch((error) => {
                setStatus("error");
                toast.error("An error occurred while fetching the product");
            });
    }, []);
    return (
        <>
            {status == "success" && (
                <div className="w-full h-full flex">
                    <div className="w-[50%] h-full flex justify-center items-center ">
                        <ImageSlider images={product.productImages} />
                    </div>
                    <div className="w-[50%] justify-center items-center flex">
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
                                    <button className="bg-accent text-white px-4 py-2 rounded-md font-semibold cursor-pointer hover:bg-purple-900 shadow-2xl shadow-secondary ml-4">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {status == "loading" && <Loading />}
        </>
    );
}
