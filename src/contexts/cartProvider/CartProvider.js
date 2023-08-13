import React, { createContext, useState } from 'react';

export const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('verseFoodCart')) || []);
    const getCart = () => {
        const cart = JSON.parse(localStorage.getItem('verseFoodCart')) || [];
        return cart;
    }

    const isAddedToCart = (idMeal) => {
        const isIncluded = getCart().find(item => item.idMeal === idMeal);
        if (isIncluded) {
            return true;
        }
        return false;
    }

    const changeQuantity = (idMeal, quantity) => {
        const cart = getCart();
        cart.forEach(element => {
            if (element.idMeal === idMeal) {
                element.quantity = quantity;
            }
        });
        setCart(cart);
        localStorage.setItem('verseFoodCart', JSON.stringify(cart));
    }

    const addToCart = (idMeal) => {
        if (!isAddedToCart(idMeal)) {
            const newCart = [{ idMeal, quantity: 1 }, ...getCart()];
            setCart(newCart);
            localStorage.setItem('verseFoodCart', JSON.stringify(newCart))
        }
    }

    const removeFromCart = (idMeal) => {
        if (isAddedToCart(idMeal)) {
            const newCart = getCart().filter(item => item.idMeal !== idMeal);
            setCart([...newCart]);
            localStorage.setItem('verseFoodCart', JSON.stringify([...newCart]));
        }
    }
    const cartInfo = { cart, setCart, isAddedToCart, removeFromCart, addToCart, changeQuantity };
    return (
        <CartContext.Provider value={cartInfo}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;