import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Meal from '../meal/Meal';

const Home = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('verseFoodCart')) || []);
    const foods = useLoaderData().meals;
    const [meals, setMeals] = useState(foods);
    const [isLoading, setIsLoading] = useState(false)
    const handleSearch = (event) => {
        setIsLoading(true)
        event.preventDefault();
        const form = event.target;
        const searchedText = form.searchedText.value;
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedText}`)
            .then(res => res.json())
            .then(data => setMeals(data.meals))
        form.searchedText.value = '';
        setIsLoading(false);
    }
    if (isLoading) {
        return <div className='min-h-screen flex items-center justify-center'>
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    }
    return (
        <div>
            <form className='flex justify-center items-center mt-5 gap-4' onSubmit={handleSearch}>
                <input type="text" name="searchedText" className='w-72 lg:w-[40%] rounded-md h-9 px-3' placeholder='What are you Looking for?' />
                <input type="submit" className="btn btn-outline btn-sm" value='Search' />
            </form>
            {
                !meals && <div className='flex items-center justify-center text-5xl h-96'>No Such food available</div>
            }
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 m-5'>
                {
                    meals?.map((meal, idx) => <Meal cart={cart} setCart={setCart} key={idx} meal={meal}></Meal>)
                }
            </div>
        </div>
    );
};

export default Home;