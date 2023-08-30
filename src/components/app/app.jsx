import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../modals/order-details/order-details";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";
import Modal from "../modals/modal/modal"
import React, {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
    const [bun, setBun] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [items, setItems] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    const [selectedIngredient, setSelectedIngredient] = useState(null);

    useEffect(() => {
        const fetchIngredients = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(BASE_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok'); // Will be caught by catch block
                }

                const fetchedObject = await response.json();
                if (fetchedObject.success && Array.isArray(fetchedObject.data) && fetchedObject.data.length > 0) {
                    setItems(fetchedObject.data);
                } else {
                    throw new Error('Data format is incorrect or array is empty'); // Will be caught by catch block
                }

            } catch (error) {
                setError(true);
                console.log('Error occurred:', error); // Log the entire error object for more details
            } finally {
                setIsLoading(false);
            }
        };
        fetchIngredients();
    }, []);

    const addIngredientToCart = React.useCallback((ingredient) => {
        const ingredientWithUUID = {...ingredient, uuid: uuidv4()};
        ingredient.type === 'bun' ? setBun(ingredientWithUUID) : setIngredients(prev => [...prev, ingredientWithUUID]);
    }, [])

    const closePopup = React.useCallback(() => {
        setModalOpen(false);
        setModalType(null)
    }, [])

    const openIngredientPopup = React.useCallback((ingredient) => {
        setModalOpen(true);
        setModalType('ingredient');
        setSelectedIngredient(ingredient);
    }, [])

    const openOrderPopup = React.useCallback(() => {
        setModalOpen(true);
        setModalType('order');
    }, [])

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients items={items}
                                   isLoading={isLoading}
                                   error={error}
                                   openPopup={openIngredientPopup}
                                   addIngredientToCart={addIngredientToCart}/>
                <BurgerConstructor bun={bun}
                                   ingredients={ingredients}
                                   openPopup={openOrderPopup}/>
            </main>
            {isModalOpen && modalType === 'ingredient' && (
                <Modal closePopup={closePopup} title="Детали ингредиента">
                    <IngredientDetails ingredient={selectedIngredient}/>
                </Modal>
            )}
            {isModalOpen && modalType === 'order' && (
                <Modal closePopup={closePopup}>
                    <OrderDetails/>
                </Modal>
            )}
        </div>
    );
}

export default App;
