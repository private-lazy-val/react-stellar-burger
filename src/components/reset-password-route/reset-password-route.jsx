// reset-password-route.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordRoute = ({ component }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('visitedForgotPassword') !== 'true') {
            navigate('/');
        }
    }, [navigate]);

    return localStorage.getItem('visitedForgotPassword') === 'true' ? component : null;
}

export default ResetPasswordRoute;
