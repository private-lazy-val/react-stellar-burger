export const getSortedOrders = (orders) => {
    return [...orders].sort((a, b) => {
        // Assuming createdAt is a string in ISO date format
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime(); // For descending order
    });
};

