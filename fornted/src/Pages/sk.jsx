import React, { useEffect, useState } from 'react';
import './CSS/sk.css';
import { PropagateLoader } from 'react-spinners';

const Sk = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <div className="sk">
            {loading ? (
                <PropagateLoader color='#36d7b7' />
            ) : (
                <div>
                    <h2 className="order">Order Successful!</h2>
                    <p>Your order has been successfully placed.</p>
                </div>
            )}
        </div>
    );
};

export default Sk;
