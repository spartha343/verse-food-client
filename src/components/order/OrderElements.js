import React, { useEffect, useState } from 'react';

const OrderElements = ({ item }) => {
    const { idMeal, quantity } = item;
    const [meal, setMeal] = useState(null);
    const { strMeal, strMealThumb, } = meal ?? {};
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
                    <p>Price: ${quantity * 50} </p>
                </div>
            </div>
            <div className='me-3 text-lg'>
                <p>{quantity} units</p>
            </div>
        </li>
    );
};

export default OrderElements;