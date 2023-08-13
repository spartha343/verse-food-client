import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/cartProvider/CartProvider';

const Meal = ({ meal }) => {
    const { addToCart, isAddedToCart } = useContext(CartContext);
    const { strMeal, strMealThumb, strInstructions, idMeal } = meal;
    const isAdded = isAddedToCart(idMeal);
    return (
        <div className="card bg-neutral shadow-xl">
            <figure className='max-h-52'><img src={strMealThumb} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{strMeal}</h2>
                <p>{strInstructions.slice(0, 40) + '...'}</p>
                <div className="card-actions justify-end mt-3">
                    <Link to={`/meal-details/${idMeal}`} className="btn btn-outline btn-info btn-sm">See Details</Link>
                    <button className={`btn btn-outline btn-sm ${isAdded ? 'btn-disabled' : 'btn-primary'}`} onClick={() => addToCart(idMeal)} >{isAdded ? 'Already Added' : 'Add To Cart'}</button>
                </div>
            </div>
        </div>
    );
};

export default Meal;