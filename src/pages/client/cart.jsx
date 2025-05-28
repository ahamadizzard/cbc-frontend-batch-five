import { useState } from "react";
import { getCart } from "../../utils/cart";
import { BiMinus, BiTrash } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";

export default function CartPage() {
    const [cart, setCart] = useState(getCart());
    console.log(cart);

    return (
        <div className="w-full h-full flex flex-col items-center pt-4">
            {cart.map((item) => {
                return (
                    <div
                        key={item.productId}
                        className="w-[600px] h-[100px] bg-primary rounded-l-2xl shadow-2xl flex flex-row mb-3 relative justify-center items-center"
                    >
                        <img
                            src={item.productImage ? item.productImage : "https://placehold.co/600x400"}
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
                            <button className="bg-accent text-white px-2 py-1 rounded-md font-bold cursor-pointer hover:bg-accent/60 mr-2 aspect-square"><BiMinus /></button>
                            <span className="text-lg font-bold">{item.quantity}</span>
                            <button className="bg-accent text-white px-2 py-1 rounded-md font-bold cursor-pointer hover:bg-accent/60 ml-2 aspect-square"><BiPlus /></button>
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
                                // Remove item from cart logic here
                                const newCart = cart.filter((cartItem) => cartItem.productId !== item.productId);
                                setCart(newCart);
                                localStorage.setItem("cart", JSON.stringify(newCart));
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
            {/* cart summary */}
            <div>
                <h1>summary</h1>
            </div>
        </div>
    );
}
