import {useState, useCallback} from "react";
import {showDetails, hideDetails} from "../services/ingredientDetailsSlice";
import {resetNumber} from "../services/orderDetailsSlice";
import {useDispatch} from 'react-redux';

const useModal = () => {
    const dispatch = useDispatch();

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    const closeIngredientModal = useCallback(() => {
        setModalOpen(false);
        setModalType(null);
        dispatch(hideDetails());
    }, [dispatch]);

    const closeOrderModal = useCallback(() => {
        setModalOpen(false);
        setModalType(null);
        dispatch(resetNumber());
    }, [dispatch]);

    const openIngredientModal = useCallback((ingredient) => {
        setModalOpen(true);
        setModalType('ingredient');
        dispatch(showDetails(ingredient));
    }, [dispatch]);

    const openOrderModal = useCallback(() => {
        setModalOpen(true);
        setModalType('order');
    }, []);

    return {
        isModalOpen,
        modalType,
        openIngredientModal,
        openOrderModal,
        closeIngredientModal,
        closeOrderModal,
    };
};

export default useModal;