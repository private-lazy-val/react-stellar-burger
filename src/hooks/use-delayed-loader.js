import { useState, useEffect } from 'react';

// Delay the appearance of the loading indicator
// to avoid it flashing briefly on the screen in case the content loads quickly
export const useDelayedLoader = (isLoading, delay) => {
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        let handler;

        if (isLoading) {
            // Set up a delay for showing the loader
            handler = setTimeout(() => {
                setShowLoader(true);
            }, delay);
        } else {
            // If isLoading is false, don't show the loader
            setShowLoader(false);
        }

        return () => {
            if (handler) {
                clearTimeout(handler);
            }
        };
    }, [isLoading, delay]);

    return showLoader;
};
