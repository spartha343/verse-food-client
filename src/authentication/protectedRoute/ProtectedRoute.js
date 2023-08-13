import React, { useContext } from 'react';
import { UserContext } from '../../contexts/userProvider/UserProvider';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useContext(UserContext);
    let location = useLocation();
    return isLoading ?
        (<div className='flex items-center justify-center min-h-screen'><span className="loading loading-infinity loading-lg"></span></div>)
        :
        (user ? children : <Navigate to="/sign-in" state={{ from: location }} replace />)
};

export default ProtectedRoute;