import React, { useState } from "react";
import { toast } from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload.jsx";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


export default function EditProductPage() {
    const location = useLocation();
    const [productId, setProductId] = useState(location.state.productId);
    const [productName, setProductName] = useState(location.state.productName);
    const [altNames, setAltNames] = useState(location.state.altNames.join(","));
    const [productCategory, setProductCategory] = useState(location.state.productCategory || "N/A");
    const [productDescription, setProductDescription] = useState(location.state.productDescription);
    const [productImages, setProductImages] = useState([]);
    const [labelPrice, setLabelPrice] = useState(location.state.labelPrice);
    const [salePrice, setSalePrice] = useState(location.state.salePrice);
    const [stock, setStock] = useState(location.state.stock);
    const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    console.log(location);

    async function UpdateProduct() {


        //get the token from local storage
        const token = localStorage.getItem("token");
        // check if token is null
        // if it is null, show a toast error message
        if (token === null) {
            toast.error("Please login to add product");
            return;
        }

        let imageUrls = location.state.productImages;


        // this will run all the promises in parallel
        // and return the result in the same order as the promises were created
        // this will return an array of urls
        // if one failed, all will fail
        const promisesArray = [];

        for (let i = 0; i < productImages.length; i++) {
            promisesArray[i] = mediaUpload(productImages[i]);
        }
        setIsLoading(true);
        try {
            if (productImages.length > 0) {
                imageUrls = await Promise.all(promisesArray);
            }

            const altNamesArray = altNames.split(",");
            console.log(altNamesArray);
            const product = {
                productId: productId,
                productName: productName,
                altNames: altNamesArray,
                productCategory: productCategory,
                productDescription: productDescription,
                productImages: imageUrls,
                labelPrice: labelPrice,
                salePrice: salePrice,
                stock: stock,
                isAvailable: isAvailable,
            };

            // console.log(imageUrls);

            await axios
                .put(import.meta.env.VITE_API_BASE_URL + "/api/products/" + productId, product, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    toast.success("Product updated successfully");
                    navigate("/admin/products");
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Error adding product", error);
                });
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center ">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            <input
                type="text"
                placeholder="Product ID"
                className="input input-bordered w-full max-w-xs mb-2"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                disabled
            />
            <input
                type="text"
                placeholder="Product Name"
                className="input input-bordered w-full max-w-xs mb-2"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Alt Names (comma separated)"
                className="input input-bordered w-full max-w-xs mb-2"
                value={altNames}
                onChange={(e) => setAltNames(e.target.value)}
            />
            <input
                type="text"
                placeholder="Product Category"
                className="input input-bordered w-full max-w-xs mb-2"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
            />
            <textarea
                placeholder="Product Description"
                className="textarea textarea-bordered w-full max-w-xs mb-2"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
            ></textarea>
            <input
                type="file"
                placeholder="images"
                multiple
                className="input input-bordered w-full max-w-xs mb-2"
                onChange={(e) => {
                    setProductImages(e.target.files);
                }}
            />
            <input
                type="number"
                placeholder="Label Price"
                className="input input-bordered w-full max-w-xs mb-2"
                value={labelPrice}
                onChange={(e) => setLabelPrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Sale Price"
                className="input input-bordered w-full max-w-xs mb-2"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Stock"
                className="input input-bordered w-full max-w-xs mb-2"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
            />
            <label className="cursor-pointer">
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                />
                Available
            </label>
            <button
                className="text-white mt-4 ml-2 bg-blue-500 rounded font-bold py-2 px-4 mr-4"
                onClick={() => {
                    // setIsLoading(true);
                    UpdateProduct();
                    // setIsLoading(false);
                }}
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Update Product"}
            </button>
            {/* add a cancel button to return to adminProductPage */}
            <button
                className="text-white mt-4 ml-2 bg-red-500 rounded font-bold py-2 px-4 mr-4"
                onClick={() => {
                    // navigate to adminProductPage
                    navigate("/admin/products");
                }}
            >
                Cancel
            </button>
        </div>
    );
}

