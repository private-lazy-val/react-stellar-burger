import {useCallback} from "react";
import {showDetails} from "../services/ingredientDetails/ingredientDetailsSlice";
import {useDispatch, useSelector} from 'react-redux';
import {
    openModal,
    closeModal,
    setModalType
} from '../services/modal/modalSlice';
import {resetConstructor} from "../services/burgerConstructor/burgerConstructorSlice";

const useModal = () => {
    const dispatch = useDispatch();

    const isModalOpen = useSelector(state => state.modal.isOpen);
    const modalType = useSelector(state => state.modal.modalType);

    const closeIngredientModal = useCallback(() => {
        dispatch(closeModal());
    }, [dispatch]);

    const closeOrderModal = useCallback(() => {
        dispatch(resetConstructor());
        dispatch(closeModal());
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