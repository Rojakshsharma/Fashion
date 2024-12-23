import React, { useEffect } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

// Utility function to get a specific cookie by name
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
};

function Verify() {
    const { navigate, setCartItem, backend_url } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async (token) => {
        try {
            if (!token) {
                return null;
            }

            const response = await axios.post(
                backend_url + 'api/order/verifyStripe',
                { success, orderId },
                { headers: { token } }
            );
            
            if (response.data.success) {
                setCartItem({});
                navigate('/orders');
            } else {
                navigate('/cart');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const tokenFromCookie = getCookie('token'); 

        if (tokenFromCookie) {
            localStorage.setItem('token', tokenFromCookie);
            verifyPayment(tokenFromCookie);
        } else {
            toast.error('No token found');
            navigate('/login');
        }
    }, [success, orderId]);

    return <div></div>;
}

export default Verify;

