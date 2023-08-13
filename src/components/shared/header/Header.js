import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../contexts/userProvider/UserProvider';

const Header = () => {
    const { user } = useContext(UserContext);
    const { photoURL } = user ?? {};
    const listItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/cart'>Cart</Link></li>
        <li><Link to='/order'>Order</Link></li>
        <li><Link to='/control'>Control</Link></li>
    </>
    return (
        <div className="navbar bg-neutral">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {listItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Verse Food</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {listItems}
                </ul>
            </div>
            <div className="navbar-end">{
                user ?
                    <Link to='/sign-out'>
                        {
                            photoURL ? <div className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src={photoURL} alt='' />
                                </div>
                            </div>
                                :
                                <div className='rounded-full bg-slate-500 w-10 h-10 flex items-center justify-center'><i className="fa-solid fa-user"></i></div>
                        }
                    </Link>
                    :
                    <Link to='/sign-up' className='rounded-full bg-slate-500 w-10 h-10 flex items-center justify-center'><i className="fa-solid fa-user"></i></Link>
            }
            </div>
        </div>
    );
};

export default Header;