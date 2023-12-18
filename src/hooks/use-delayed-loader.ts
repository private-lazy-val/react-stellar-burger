import { useState, useEffect } from 'react';

// Delay the appearance of the loading indicator
// to avoid it flashing briefly on the screen in case the content loads quickly
type DelayedLoaderProps = {
    isLoading: boolean;
    delay: number;
}

export const useDelayedLoader = ({isLoading, delay}: DelayedLoaderProps): boolean => {
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        let handler: NodeJS.Timeout;

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
