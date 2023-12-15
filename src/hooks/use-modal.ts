import {useCallback} from "react";
import {useAppDispatch, useAppSelector} from '../services/redux-hooks';
import {
    setModalType
} from '../services/modal/modal-slice';
import {resetConstructor} from "../services/burger-constructor/burger-constructor-slice";
import {useNavigate} from "react-router-dom";
import {selectModalType} from '../services/modal/selector';

const useModal = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const modalType = useAppSelector(selectModalType);

    const openIngredientModal = useCallback((): void => {
        dispatch(setModalType('ingredient'));
    }, [dispatch]);

    const closeIngredientModal = useCallback((): void => {
        dispatch(setModalType(null));
        navigate(-1);
    }, [dispatch, navigate]);

    const openOrderModal = useCallback((): void => {
        dispatch(setModalType('order'));
    }, [dispatch]);

    const closeOrderModal = useCallback((): void => {
        dispatch(setModalType(null));
        navigate(-1);
    }, [dispatch, navigate]);

    const openSubmitOrderModal = useCallback((): void => {
        dispatch(setModalType('submit-order'));
    }, [dispatch]);

    const closeSubmitOrderModal = useCallback((): void => {
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