import {useCallback} from "react";
import {showDetails} from "../services/ingredientDetails/ingredientDetailsSlice";
import {useDispatch, useSelector} from 'react-redux';
import {
    openModal,
    closeModal,
    setModalType
} from '../services/modal/modalSlice';
import {resetConstructor} from "../services/burgerConstructor/burgerConstructorSlice";
import {useLocation, useNavigate} from "react-router-dom";

const useModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isModalOpen = useSelector(state => state.modal.isOpen);
    const modalType = useSelector(state => state.modal.modalType);

    const openIngredientModal = useCallback((ingredient) => {
        localStorage.setItem('ingredientModalOpen', 'true');
        localStorage.setItem('ingredientModalData', JSON.stringify(ingredient));
        dispatch(setModalType('ingredient'));
        dispatch(showDetails(ingredient));
    }, [dispatch]);

    const closeIngredientModal = useCallback(() => {
        localStorage.removeItem('ingredientModalOpen');
        localStorage.removeItem('ingredientModalData');
        dispatch(setModalType(null));
        navigate(-1);
    }, [dispatch, navigate]);

    const openOrderModal = useCallback(() => {
        dispatch(openModal());
        dispatch(setModalType('order'));
    }, [dispatch]);

    const closeOrderModal = useCallback(() => {
        dispatch(resetConstructor());
        dispatch(closeModal());
        dispatch(setModalType(null));
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