import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import OrderElements from '../order/OrderElements';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userProvider/UserProvider';

const Control = () => {
    const { setIsLoading } = useContext(UserContext)
    const [orders, setOrders] = useState(useLoaderData());
    const handleConfirmDelivery = (id) => {
        setIsLoading(true)
        fetch(`https://verse-food-server-spartha343.vercel.app/on-delivery-completion/${id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => {
                if (res.ok) {
                    setOrders(orders.filter(order => order._id !== id));
                    toast.success('Order Delivery Completed Successfully!', {
                        duration: 3500
                    })
                }
                setIsLoading(false)
            })
    }

    return (
        <div className='m-5 min-h-screen'>
            <p className='bg-slate-950 text-center rounded-md p-2'>Note: In production build, this page will be only visible to admins, moderators or controllers</p>
            <h3 className='text-3xl mt-2'>Orders to be delivered:</h3>
            {
                orders.length === 0 && <div className='flex items-center justify-center min-h-screen text-4xl'>Yay, all of the orders have been delivered.</div>
            }
            {
                orders?.length !== 0 && orders?.map(order => <div key={order._id} className='m-5 max-w-4xl mx-auto'>
                    <h4 className='text-xl border-b-2'>{order.userEmail}</h4>
                    <ul className='mb-20'>
                        {
                            order?.orderedItems?.map((item, idx) => {
                                return <OrderElements key={idx} item={item}></OrderElements>
                            })
                        }
                        <li><h2 className='text-xl'>Total Price: ${order?.orderedItems?.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0) * 50}</h2></li>
                        <li className='relative'><button className='btn absolute right-0' onClick={() => handleConfirmDelivery(order._id)}>Delivery Completed ?</button></li>
                    </ul>
                </div>
                )
            }
        </div>
    );
};

export default Control;