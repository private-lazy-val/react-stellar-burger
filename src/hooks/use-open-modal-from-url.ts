import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import useModal from './use-modal';

const useOpenModalFromUrl = (): void => {
    const location = useLocation();
    const {openIngredientModal, openOrderModal} = useModal();

    useEffect(() => {
        const pathSegments = location.pathname.split('/').filter(Boolean);

        if (pathSegments.length >= 2) {
            const [type] = pathSegments.slice(-2);
            // Check the type and call the appropriate modal opening function
            if (type === 'ingredients') {
                openIngredientModal();
            } else if (type === 'orders' || type === 'feed') {
                openOrderModal();
            }
        }
    }, [location, openIngredientModal, openOrderModal]);
};

export default useOpenModalFromUrl;
