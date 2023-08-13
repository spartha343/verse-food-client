import React, { useContext } from 'react';
import CartElements from './CartElements';
import { CartContext } from '../../contexts/cartProvider/CartProvider';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart } = useContext(CartContext);
    return (
        <div className='my-10 min-h-screen'>
            <div className="card max-w-4xl mx-auto bg-neutral shadow-xl">
                <div className="card-body">
                    <ul>
                        {
                            cart.map((item, idx) => {
                                return <CartElements key={idx} item={item}></CartElements>
                            })
                        }
                    </ul>
                    {
                        cart.length !== 0 ?
                            <div className='flex justify-between items-baseline'>
                                <h2 className='text-xl'>Total Price: ${cart?.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0) * 50}</h2>
                                <Link to='/order' className='btn btn-secondary'>Place Order</Link>
                            </div>
                            :
                            <div className='min-h-16 text-3xl'>No items are available in your cart. Please go to the <Link to='/' className='btn btn-link btn-lg'>Home section</Link> to add some foods to your cart.</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;