import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../contexts/cartProvider/CartProvider';

const CartElements = ({ item }) => {
    const { removeFromCart, changeQuantity } = useContext(CartContext);
    const { idMeal, quantity } = item;
    const [meal, setMeal] = useState(null);
    const [number, setNumber] = useState(quantity)
    const { strMeal, strMealThumb, } = meal ?? {};
    const modifyNumber = (newNumber) => {
        changeQuantity(idMeal, newNumber);
        setNumber(newNumber);
    }
    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
            .then(res => res.json())
            .then(data => { setMeal(data?.meals[0]) })
    }, [idMeal])
    return (
        <li className='flex items-center justify-between bg-slate-900 my-5 rounded-xl shadow-xl'>
            <div className='flex'>
                <img src={strMealThumb} alt={strMeal} className='h-14 w-20 rounded-xl' />
                <div className='ml-3'>
                    <h3 className='text-xl'>{strMeal}</h3>
                    <p>Price: ${number * 50} </p>
                </div>
            </div>
            <div className='flex items-baseline gap-3 text-lg cursor-pointer'>
                <i className="fa-solid fa-plus" onClick={() => modifyNumber(number + 1)}></i>
                <p>{number}</p>
                <i className="fa-solid fa-minus" onClick={() => number !== 1 && modifyNumber(number - 1)}></i>
                <button className="btn rounded-xl text-3xl ml-2 h-14 w-14" onClick={() => removeFromCart(idMeal)}><i className="fa-solid fa-xmark"></i></button>
            </div>
        </li>
    );
};

export default CartElements;