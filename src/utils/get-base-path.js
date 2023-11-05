export const getBasePath = (pathname) => {
    if (pathname.includes('/profile/orders')) {
        return '/profile/orders';
    } else {
        // Default to feed if not under profile/orders
        return '/feed';
    }
};