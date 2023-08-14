import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../components/home/Home";
import Order from "../components/order/Order";
import MealDetails from "../components/mealDetails/MealDetails";
import Cart from "../components/cart/Cart";
import SignIn from "../authentication/signIn/SignIn";
import SignOut from "../authentication/signOut/SignOut";
import SignUp from "../authentication/signUp/SignUp";
import ProtectedRoute from "../authentication/protectedRoute/ProtectedRoute";
import Control from "../components/control/Control";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: async () => fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
            },
            {
                path: '/order',
                element: <ProtectedRoute><Order></Order></ProtectedRoute>
            },
            {
                path: '/cart',
                element: <Cart></Cart>
            },
            {
                path: '/meal-details/:id',
                element: <MealDetails></MealDetails>,
                loader: async ({ params }) => fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`)
            },
            {
                path: '/sign-in',
                element: <SignIn></SignIn>,
            },
            {
                path: '/sign-out',
                element: <SignOut></SignOut>,
            },
            {
                path: '/sign-up',
                element: <SignUp></SignUp>,
            },
            {
                path: '/control',
                element: <Control></Control>,
                loader: async () => fetch('https://verse-food-server-spartha343.vercel.app/orders')
            },
        ]
    }
]);