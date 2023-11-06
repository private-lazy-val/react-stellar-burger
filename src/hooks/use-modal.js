import {useCallback} from "react";
import {showIngredientInfo} from "../services/ingredient-info/ingredient-info-slice";
import {showOrderInfo} from "../services/order-info/order-info-slice";
import {useDispatch, useSelector} from 'react-redux';
import {
    openModal,
    closeModal,
    setModalType
} from '../services/modal/modal-slice';
import {resetConstructor} from "../services/burger-constructor/burger-constructor-slice";
import {useNavigate} from "react-router-dom";
import {selectIsModalOpen, selectModalType} from '../services/modal/selector';

const useModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isModalOpen, modalType } = useSelector(state => ({
        isModalOpen: selectIsModalOpen(state),
        modalType: selectModalType(state)
    }));

    const openIngredientModal = useCallback((ingredient) => {
        localStorage.setItem('ingredientModalOpen', 'true');
        localStorage.setItem('ingredientModalData', JSON.stringify(ingredient));
        dispatch(setModalType('ingredient'));
        dispatch(showIngredientInfo(ingredient));
    }, [dispatch]);

    const closeIngredientModal = useCallback(() => {
        localStorage.removeItem('ingredientModalOpen');
        localStorage.removeItem('ingredientModalData');
        dispatch(setModalType(null));
        navigate(-1);
    }, [dispatch, navigate]);

    const openSubmitOrderModal = useCallback(() => {
        dispatch(openModal());
        dispatch(setModalType('submit-order'));
    }, [dispatch]);

    const closeSubmitOrderModal = useCallback(() => {
        dispatch(resetConstructor());
        dispatch(closeModal());
        dispatch(setModalType(null));
    }, [dispatch]);

    const openOrderModal = useCallback((order) => {
        localStorage.setItem('orderModalOpen', 'true');
        localStorage.setItem('orderModalData', JSON.stringify(order));
        dispatch(setModalType('order'));
        dispatch(showOrderInfo(order));
    }, [dispatch]);

    const closeOrderModal = useCallback(() => {
        localStorage.removeItem('orderModalOpen');
        localStorage.removeItem('orderModalData');
        dispatch(setModalType(null));
        navigate(-1);
    }, [dispatch, navigate]);

    return {
        isModalOpen,
        modalType,
        openIngredientModal,
        closeIngredientModal,
        openSubmitOrderModal,
        closeSubmitOrderModal,
        openOrderModal,
        closeOrderModal
    };
};

export default useModal;