import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../contexts/cartProvider/CartProvider';
import OrderElements from './OrderElements';
import { UserContext } from '../../contexts/userProvider/UserProvider';
import { toast } from 'react-hot-toast';

const Order = () => {
    const { user, setIsLoading } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const [orders, setOrders] = useState([]);
    const email = user.email;
    useEffect(() => {
        fetch(`https://verse-food-server-spartha343.vercel.app/orders/${email}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data || []);
            });
    }, [email])

    const handleConfirmOrder = () => {
        setIsLoading(true);
        fetch('https://verse-food-server-spartha343.vercel.app/confirm-order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ cart, email: email })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Order Placed Successfully!', {
                        duration: 3000
                    });
                    setOrders(cart);
                    localStorage.setItem('verseFoodCart', JSON.stringify([]));
                    setCart([]);
                }
                setIsLoading(false)
            })
    }
    return (
        <div className='min-h-screen'>
            <h3 className='text-3xl m-5'>Your Orders:</h3>
            {
                (orders.length === 0 && cart.length === 0) && <div className='flex items-center justify-center min-h-screen text-4xl'>You have not ordered anything recently.</div>
            }
            {
                cart.length !== 0 && <div className='m-5'>
                    <ul className='max-w-4xl mx-auto'>
                        {
                            cart.map((item, idx) => {
                                return <OrderElements key={idx} item={item}></OrderElements>
                            })
                        }
                        <li><h2 className='text-xl'>Total Price: ${cart?.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0) * 50}</h2></li>
                        <li className='relative mb-24'><button className='btn btn-outline btn-secondary absolute right-0' onClick={handleConfirmOrder}>Confirm Your Order</button></li>
                    </ul>
                </div>
            }
            {
                orders?.length !== 0 && <p className='text-base bg-slate-700 p-3 rounded-lg max-w-4xl mx-auto'>Please wait for some time. Your foods are on their's way towards you. Our delivery boy will call you soon.</p>
            }
            {
                orders?.length !== 0 && orders?.map(order => <div className='m-5'>
                    <ul className='max-w-4xl mx-auto mb-20'>
                        {
                            order?.orderedItems?.map((item, idx) => {
                                return <OrderElements key={idx} item={item}></OrderElements>
                            })
                        }
                        <li><h2 className='text-xl'>Total Price: ${order?.orderedItems?.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0) * 50}</h2></li>
                        <li className='relative'><button className='btn btn-disabled absolute right-0'>Order Confirmed!</button></li>
                    </ul>
                </div>
                )
            }
        </div>
    );
};

export default Order;