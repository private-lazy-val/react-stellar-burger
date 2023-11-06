import { useMatch } from 'react-router-dom';

export const useBasePath = () => {
    // This will return match object if the current location is within /profile/orders or null otherwise
    const matchProfileOrders = useMatch('/profile/orders/*');

    // Default to feed if not under profile/orders
    return matchProfileOrders ? '/profile/orders' : '/feed';
};