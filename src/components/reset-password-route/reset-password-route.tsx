import React, {ReactElement, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

type ResetPasswordProps = {
    component: ReactElement
}
const ResetPasswordRoute = ({ component }: ResetPasswordProps): React.JSX.Element | null => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('visitedForgotPassword') !== 'true') {
            navigate('/');
        }
    }, [navigate]);

    return localStorage.getItem('visitedForgotPassword') === 'true' ? component : null;
}

export default ResetPasswordRoute;
