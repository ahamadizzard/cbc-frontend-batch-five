import { useEffect, useState } from "react";
// import { addToCart, getCart, getTotal, removeFromCart, getTotalLabelPrice } from "../../utils/cart";
import { getCart, getTotal, getTotalLabelPrice } from "../../utils/cart";
import { BiMinus, BiTrash, BiPlus, BiArrowBack } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCart } from "../../components/cartContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function CartPage() {
    // const [cart, setCart] = useState(getCart());
    const navigate = useNavigate();
    const { cartItems: cart, addToCart, removeFromCart } = useCart();

    // const [totalPrice, setTotalPrice] = useState(getTotal());
    // const [totalItems, setTotalItems] = useState(cart.length);
    // const [totalLabelPrice, setTotalLabelPrice] = useState(getTotalLabelPrice());

    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const calculateLabelTotal = () => {
        return cart.reduce((sum, item) => sum + item.labelPrice * item.quantity, 0);
    };

    const totalPrice = calculateTotal();
    const totalLabelPrice = calculateLabelTotal();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);


    // count number of items in the cart
    // const countItems = () => {
    //     let count = 0;
    //     cart.forEach((item) => {
    //         count += item.quantity;
    //     });
    //     setTotalItems(count);
    // }

    // useEffect(() => {
    //     countItems();
    // }, [cart]);

    return (
        <div className="w-full h-full flex flex-row items-center justify-center pt-4">
            <div className="w-[800px] h-full flex flex-col items-center rounded-lg pt-4">
                {cart.map((item) => {
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
                                        addToCart(item, -1);
                                        // setCart(getCart()); // Update cart state with new quantity
                                        // setTotalPrice(getTotal());
                                        // setTotalLabelPrice(getTotalLabelPrice());
                                    }}
                                >
                                    <BiMinus />
                                </button>
                                <span className="text-lg font-bold">{item.quantity}</span>
                                <button className="bg-accent text-white px-2 py-1 rounded-md font-bold cursor-pointer hover:bg-accent/60 ml-2 aspect-square"
                                    onClick={() => {
                                        addToCart(item, 1);
                                        // setCart(getCart()); // Update cart state with new quantity
                                        // setTotalPrice(getTotal());
                                        // setTotalLabelPrice(getTotalLabelPrice());
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
                                    // setTotalPrice(getTotal());
                                    // setTotalLabelPrice(getTotalLabelPrice());
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
                        <h1 className="text-lg font-semibold text-gray-600">Label Price Total</h1>
                        <h1 className="text-lg font-semibold text-gray-600">Rs. {totalLabelPrice.toFixed(2)}</h1>
                    </div>
                    <div className="flex flex-row justify-between relative items-center mt-4">
                        <h1 className="text-lg font-semibold text-gray-600">Discount Total</h1>
                        <h1 className="text-lg font-semibold absolute right-[100px] text-red-600">({(((totalLabelPrice - totalPrice) / totalLabelPrice) * 100).toFixed(2)} %)</h1>
                        <h1 className="text-lg font-semibold text-red-600">Rs. {(totalLabelPrice - totalPrice).toFixed(2)}</h1>
                    </div>
                    <div className="flex flex-row justify-between items-center mt-4">
                        <h1 className="text-lg font-semibold text-gray-600">Total Amount to Pay</h1>
                        <h1 className="text-lg font-semibold text-gray-600">Rs. {totalPrice.toFixed(2)}</h1>
                    </div>
                    <button
                        onClick={() => {
                            const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
                            if (totalQuantity > 0) {
                                navigate("/checkout", { state: { cart } });
                            } else {
                                toast.error("Your cart is empty. Please add items before checking out.");
                                setTimeout(() => {
                                    const confirmGoToProducts = window.confirm("Would you like to go to the products page?");
                                    if (confirmGoToProducts) {
                                        navigate("/products");
                                    }
                                }, 2000); // slight delay to let the toast show first
                            }
                        }}
                        className="bg-accent text-white text-center flex flex-row items-center justify-center gap-2 px-4 py-2 rounded-lg mt-4 w-full font-bold hover:bg-accent/60"
                    >
                        <MdPayment /> Checkout
                    </button>


                    {/* <Link to="/checkout" state={
                        {
                            cart: cart
                        }
                    }
                        className="bg-accent text-white text-center flex flex-row items-center justify-center gap-2 px-4 py-2 rounded-lg mt-4 w-full font-bold hover:bg-accent/60">
                        <MdPayment /> Checkout
                    </Link> */}
                    <Link to="/products" className="bg-secondary text-white text-center flex flex-row justify-center items-center gap-2 px-4 py-2 rounded-lg mt-4 w-full font-bold hover:bg-secondary/60">
                        <BiArrowBack /> Back to Shopping
                    </Link>
                </div>
            </div>
        </div>


    );
}
