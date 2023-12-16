import {useCallback} from "react";
import {useSelector, useDispatch} from "../services/store";
import {ModalTypes, setModalType} from '../services/modal/modal-slice';
import {resetConstructor} from "../services/burger-constructor/burger-constructor-slice";
import {useNavigate} from "react-router-dom";
import {selectModalType} from '../services/modal/selector';

const useModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const modalType = useSelector(selectModalType);

    const openIngredientModal = useCallback((): void => {
        dispatch(setModalType(ModalTypes.Ingredient));
    }, [dispatch]);

    const closeIngredientModal = useCallback((): void => {
        dispatch(setModalType(null));
        navigate(-1);
    }, [dispatch, navigate]);

    const openOrderModal = useCallback((): void => {
        dispatch(setModalType(ModalTypes.Order));
    }, [dispatch]);

    const closeOrderModal = useCallback((): void => {
        dispatch(setModalType(null));
        navigate(-1);
    }, [dispatch, navigate]);

    const openSubmitOrderModal = useCallback((): void => {
        dispatch(setModalType(ModalTypes.SubmitOrder));
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