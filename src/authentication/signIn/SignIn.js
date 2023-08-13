import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/userProvider/UserProvider';

const SignIn = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || '/';

    const { signInWithEmail, signInWithGoogle } = useContext(UserContext);
    const handleSignInWithEmail = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInWithEmail(email, password)
            .then(() => { })
            .catch(error => {
                console.log(error)
                // const errorCode = error.code;
                // const errorMessage = error.message;
            })
            .then(() => {
                navigate(from, { replace: true });
            })
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => { })
            .catch(error => {
                console.log(error)
                // const errorCode = error.code;
                // const errorMessage = error.message;
            })
            .then(() => {
                navigate(from, { replace: true });
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign In now!</h1>
                    <p className="py-6 w-auto">
                        You must sign in to place your order. Don't you have an account? <Link to='/sign-up' className='btn-link'>Sign Up</Link></p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSignInWithEmail} >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" name='email' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" value="Sign In" className="btn btn-primary" />
                        </div>

                        <div className="divider"></div>
                        <button className='btn btn-outline text-base' onClick={handleGoogleSignIn}>Sign In With Google </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;