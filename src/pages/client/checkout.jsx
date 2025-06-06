import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
// import { addToCart, getCart, getTotal, removeFromCart, getTotalLabelPrice } from "../../utils/cart";
import { BiMinus, BiTrash, BiPlus, BiArrowBack, BiCart } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function Checkout() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state?.cart || []);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    function getTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    }
    function getTotalLabelPrice() {
        let totalLabelPrice = 0;
        cart.forEach((item) => {
            totalLabelPrice += item.labelPrice * item.quantity;
        });
        return totalLabelPrice;
    }
    function removeFromCart(index) {
        const newCart = cart.filter((item, i) => i !== index);
        setCart(newCart);
    }

    function changeQuantity(index, quantity) {
        const newQuantity = cart[index].quantity + quantity;
        if (newQuantity <= 0) {
            removeFromCart(index);
            return;
        } else {
            const newCart = [...cart];
            newCart[index].quantity = newQuantity;
            setCart(newCart);
        }
    }
    // function getTotalItems() {
    //     let totalItems = 0;
    //     cart.forEach((item) => {
    //         totalItems += totalItems;
    //     })
    //     return totalItems;
    // }
    async function placeOrder() {
        // get the token from the local storage
        const token = localStorage.getItem("token");
        // check if the token exists
        if (!token) {
            toast.error("Please login to place order")
        }
        // validate the phone number and address
        if (!phoneNumber || !address) {
            toast.error("Please enter phone number and address")

            return;
        }

        // if the token exists, then call the api to place the order
        const orderInfo = {
            products: [],
            phone: phoneNumber,
            address: address,
        }

        for (let i = 0; i < cart.length; i++) {
            const item = {
                productId: cart[i].productId,
                quantity: cart[i].quantity
            }
            // below commented out method also possible
            // orderInformation.product.push(item)
            orderInfo.products[i] = item;
        }

        try {
            const response = await axios.post(import.meta.env.VITE_API_BASE_URL + "/api/orders", orderInfo, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            )
            toast.success("Order placed successfully")
            console.log(response.data)
        } catch (error) {
            toast.error("Error placing order, Try again..")
        }
    }
    return (
        <div className="w-full h-full flex flex-row items-center justify-center pt-4">
            <div className="w-[800px] h-full flex flex-col items-center rounded-lg pt-4">
                {cart.map((item, index) => {
                    return (
                        <div
                            key={item.productId}
                            className="w-[600px] h-[100px] bg-primary rounded-l-2xl shadow-2xl flex flex-row mb-3 relative justify-center items-center"
                        >
                            <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-[100px] h-[100px] object-cover gap-1 rounded-l-2xl"
                            />
                            <div className="flex flex-col justify-center items-start w-[250px] h-full pl-4">
                                <h1 className="text-l text-secondary font-bold ">{item.productName}</h1>
                                <h1 className="text-sm font-semibold text-gray-600">{item.productId}</h1>
                                {
                                    item.labelPrice > item.price ? (
                                        <div className="flex items-center">
                                            <span className="text-gray-500 text-lg line-through mr-2">
                                                Rs. {item.labelPrice.toFixed(2)}
                                            </span>
                                            <span className="text-accent text-lg font-bold">
                                                Rs. {item.price.toFixed(2)}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-accent text-lg font-bold">
                                            Rs. {item.price.toFixed(2)}
                                        </span>
                                    )
                                }

                            </div>
                            <div className="w-[80px] h-full flex flex-row justify-center items-center">
                                <button className="bg-accent text-white px-2 py-1 rounded-md font-bold cursor-pointer hover:bg-accent/60 mr-2 aspect-square"
                                    onClick={() => {
                                        changeQuantity(index, -1);
                                        // setCart(getCart()); // Update cart state with new quantity
                                        setTotalPrice(getTotal());
                                        // setTotalLabelPrice(getTotalLabelPrice());
                                        setTotalItems(getTotalItems());
                                    }}
                                >
                                    <BiMinus />
                                </button>
                                <span className="text-lg font-bold">{item.quantity}</span>
                                <button className="bg-accent text-white px-2 py-1 rounded-md font-bold cursor-pointer hover:bg-accent/60 ml-2 aspect-square"
                                    onClick={() => {
                                        changeQuantity(index, 1);
                                        // setCart(getCart()); // Update cart state with new quantity
                                        setTotalPrice(getTotal());
                                        // setTotalLabelPrice(getTotalLabelPrice());
                                        setTotalItems(getTotalItems());
                                    }}
                                >
                                    <BiPlus />
                                </button>
                            </div>
                            {/* Total */}
                            <div className="w-[200px] h-full flex flex-col justify-center items-start pl-10">

                                <p className="text-2xl font-semibold text-secondary">
                                    Rs. {(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>


                            <button
                                className="absolute right-[5px] text-red-600 hover:bg-red-500 text-lg hover:text-white px-2 py-1 flex flex-row justify-center items-center gap-1  rounded-full  cursor-pointer ml-2 aspect-square"
                                onClick={() => {
                                    removeFromCart(item.productId);
                                    // setCart(getCart());
                                    setTotalPrice(getTotal());
                                    // setTotalLabelPrice(getTotalLabelPrice());
                                    setTotalItems(getTotalItems());
                                }}
                            >
                                <BiTrash />
                            </button>

                        </div>
                    );
                })}
                {cart.length === 0 && (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-bold text-secondary">Your cart is empty</h1>
                        <p className="text-gray-500">Add some products to your cart to see them here.</p>
                    </div>
                )}
            </div>
            <div className="w-[600px] h-full  rounded-lg  p-4">
                <div className="w-full h-full flex flex-col bg-white rounded-lg shadow-lg  p-3">
                    <h1 className="text-2xl font-bold text-center text-secondary">Cart Summary</h1>
                    <div className="flex flex-row justify-between items-center mt-4">
                        <h1 className="text-lg font-semibold text-gray-600">Total Items :</h1>
                        <h1 className="text-lg font-semibold text-gray-600"> {cart.length}</h1>
                    </div>
                    <div className="flex flex-row justify-between items-center mt-4">
                        <h1 className="text-lg font-semibold text-gray-600">Total Without Discount</h1>
                        <h1 className="text-lg font-semibold text-gray-600">Rs. {getTotalLabelPrice().toFixed(2)}</h1>
                    </div>
                    <div className="flex flex-row justify-between relative items-center mt-4">
                        <h1 className="text-lg font-semibold text-gray-600">Discount Total</h1>
                        <h1 className="text-lg font-semibold absolute right-[100px] text-red-600">({(((getTotalLabelPrice() - getTotal()) / getTotalLabelPrice()) * 100).toFixed(2)} %)</h1>
                        <h1 className="text-lg font-semibold text-red-600">Rs. {(getTotalLabelPrice() - getTotal()).toFixed(2)}</h1>
                    </div>
                    <div className="flex flex-row justify-between items-center mt-4">
                        <h1 className="text-lg font-semibold text-gray-600">Total Amount to Pay</h1>
                        <h1 className="text-lg font-semibold text-gray-600">Rs. {getTotal().toFixed(2)}</h1>
                    </div>
                    {/* vertical line below */}
                    <div className="w-full h-[1px] bg-gray-300 my-4"></div>
                    {/* Payment Method to choose cash or card payment */}
                    <div className="flex flex-row justify-between items-center mt-4">
                        <h1 className="text-lg font-semibold text-gray-600">Payment Method</h1>
                        <h1 className="text-lg font-semibold text-gray-600">Cash on Delivery</h1>
                    </div>
                    {/* Address */}
                    <div className="flex flex-row justify-between gap-2 items-center mt-4">
                        <h1 className="text-lg font-semibold text-gray-600">Telephone: </h1>
                        <input type="text" placeholder="Enter your phone number" className="w-[calc(100%-120px)] h-[40px] text-end border border-gray-300 rounded-lg p-2" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="flex flex-row justify-between gap-2 items-center mt-4">
                        <h1 className="text-lg font-semibold text-gray-600">Address: </h1>
                        <input type="text" placeholder="Enter your address" className="w-[calc(100%-120px)] h-[40px] border border-gray-300 rounded-lg p-2" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    {/* vertical line below */}
                    <div className="w-full h-[1px] bg-gray-300 my-4"></div>
                    {/* Total Price */}
                    <div className="flex flex-row justify-between items-center mt-4">
                        <h1 className="text-lg font-semibold text-gray-600">Total Price</h1>
                        <h1 className="text-lg font-semibold text-gray-600">Rs. {getTotal().toFixed(2)}</h1>
                    </div>
                    {/* Place Order Button */}
                    <button className="bg-accent text-white text-center flex flex-row items-center justify-center gap-2 px-4 py-2 rounded-lg mt-4 w-full font-bold hover:bg-accent/60"
                        onClick={placeOrder}>
                        <MdPayment /> Place Order
                    </button>
                    <Link to="/cart" className="bg-secondary text-white text-center flex flex-row justify-center items-center gap-2 px-4 py-2 rounded-lg mt-4 w-full font-bold hover:bg-secondary/60">
                        <BiCart /> Back to Cart
                    </Link>
                    <Link to="/products" className="bg-blue-600 text-white text-center flex flex-row justify-center items-center gap-2 px-4 py-2 rounded-lg mt-4 w-full font-bold hover:bg-secondary/60">
                        <BiArrowBack /> Back to Shopping
                    </Link>
                </div>
            </div>
        </div>


    );
}
