import { useState, useCallback } from "react";

const useModal = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    const closeModal = useCallback(() => {
        setModalOpen(false);
        setModalType(null)
    }, [])

    const openIngredientModal = useCallback((ingredient) => {
        setModalOpen(true);
        setModalType('ingredient');
        setSelectedIngredient(ingredient);
    }, [])

    const openOrderModal = useCallback(() => {
        setModalOpen(true);
        setModalType('order');
    }, [])

    return {
        isModalOpen,
        modalType,
        selectedIngredient,
        openIngredientModal,
        openOrderModal,
        closeModal,
    };
};

export default useModal;