import {useCallback} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {
    setModalType
} from '../services/modal/modal-slice';
import {resetConstructor} from "../services/burger-constructor/burger-constructor-slice";
import {useNavigate} from "react-router-dom";
import {selectModalType} from '../services/modal/selector';

const useModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const modalType = useSelector(selectModalType);

    const openIngredientModal = useCallback(() => {
        localStorage.setItem('ingredientModalOpen', 'true');
        dispatch(setModalType('ingredient'));
    }, [dispatch]);

    const closeIngredientModal = useCallback(() => {
        localStorage.removeItem('ingredientModalOpen');
        dispatch(setModalType(null));
        navigate(-1);
    }, [dispatch, navigate]);

    const openOrderModal = useCallback(() => {
        localStorage.setItem('orderModalOpen', 'true');
        dispatch(setModalType('order'));
    }, [dispatch]);

    const closeOrderModal = useCallback(() => {
        localStorage.removeItem('orderModalOpen');
        dispatch(setModalType(null));
        navigate(-1);
    }, [dispatch, navigate]);

    const openSubmitOrderModal = useCallback(() => {
        dispatch(setModalType('submit-order'));
    }, [dispatch]);

    const closeSubmitOrderModal = useCallback(() => {
        dispatch(setModalType(null));
        dispatch(resetConstructor());
    }, [dispatch]);

    return {
        modalType,
        openIngredientModal,
        closeIngredientModal,
        openOrderModal,
        closeOrderModal,
        openSubmitOrderModal,
        closeSubmitOrderModal
    };
};

export default useModal;