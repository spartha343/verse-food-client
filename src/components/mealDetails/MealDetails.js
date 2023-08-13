import { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { CartContext } from '../../contexts/cartProvider/CartProvider';

const MealDetails = () => {
    const { meals } = useLoaderData();
    const { addToCart, isAddedToCart } = useContext(CartContext);
    const { strInstructions, strYoutube, strMealThumb, strMeal, idMeal } = meals[0] ?? {};
    const isAdded = isAddedToCart(idMeal);

    return (
        <div className="hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={strMealThumb} alt='' className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">{strMeal}</h1>
                    <p className="py-6"><span className='font-bold uppercase'>How to prepare : </span>{strInstructions}
                        <br />
                        <Link to={strYoutube} className="link link-info">See Full Video</Link>
                    </p>
                    <button className={`btn ${isAdded ? 'btn-disabled' : 'btn-primary'}`} onClick={() => addToCart(idMeal)} >{isAdded ? 'Already Added' : 'Add To Cart'}</button>
                </div>
            </div>
        </div>
    );
};

export default MealDetails;