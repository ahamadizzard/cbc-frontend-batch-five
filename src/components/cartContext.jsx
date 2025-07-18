import { createContext, useContext, useEffect, useState } from "react";
import { getCart, addToCart as addItemToCart, removeFromCart as removeItemFromCart } from "../utils/cart";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(getCart());

    const getTotalQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const refreshCart = () => {
        setCartItems(getCart());
    };

    const addToCart = (product, quantity = 1) => {
        addItemToCart(product, quantity);
        refreshCart();
    };

    const removeFromCart = (productId) => {
        removeItemFromCart(productId);
        refreshCart();
    };

    useEffect(() => {
        const listener = () => {
            refreshCart(); // listen for changes from other tabs (optional)
        };
        window.addEventListener("storage", listener);
        return () => window.removeEventListener("storage", listener);
    }, []);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
