import {useCallback} from "react";
import {showDetails, hideDetails} from "../services/ingredientDetailsSlice";
import {resetNumber} from "../services/orderDetailsSlice";
import {useDispatch, useSelector} from 'react-redux';
import {
    openModal,
    closeModal,
    setModalType,
    resetModalType,
    getIsOpen,
    getModalType
} from '../services/modal/modalSlice';

const useModal = () => {
    const dispatch = useDispatch();

    const isModalOpen = useSelector(getIsOpen);
    const modalType = useSelector(getModalType);

    const closeIngredientModal = useCallback(() => {
        dispatch(closeModal());
        dispatch(resetModalType());
        dispatch(hideDetails());
    }, [dispatch]);

    const closeOrderModal = useCallback(() => {
        dispatch(closeModal());
        dispatch(resetModalType());
        dispatch(resetNumber());
    }, [dispatch]);

    const openIngredientModal = useCallback((ingredient) => {
        dispatch(openModal());
        dispatch(setModalType('ingredient'));
        dispatch(showDetails(ingredient));
    }, [dispatch]);

    const openOrderModal = useCallback(() => {
        dispatch(openModal());
        dispatch(setModalType('order'));
    }, [dispatch]);

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