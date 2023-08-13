import React, { useContext } from 'react';
import { UserContext } from '../../contexts/userProvider/UserProvider';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
    const { user } = useContext(UserContext);
    const { photoURL, displayName, email } = user ?? {};
    const { signOutAUser } = useContext(UserContext);
    const navigator = useNavigate();
    const handleSignOut = () => {
        signOutAUser()
            .then(() => { })
            .catch(error => {
                console.log(error);
            })
        navigator('/')
    }

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='flex items-center flex-col'>
                {
                    photoURL &&
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src={photoURL} alt='' />
                        </div>
                    </div>
                }
                {displayName && <p className='text-lg'>{displayName}</p>}
                <p>{email}</p>
                <button className='btn btn-primary mt-3' onClick={handleSignOut}>SignOut</button>
            </div>
        </div>
    );
};

export default SignOut;