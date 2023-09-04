import styles from "./app.module.css";
import transitions from "../modals/modal/modal-transitions.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../modals/order-details/order-details";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";
import Modal from "../modals/modal/modal"
import React, {useEffect, useState, useRef} from "react";
import {v4 as uuidv4} from "uuid";
import useModal from "../../hooks/useModal";
import {CSSTransition} from "react-transition-group";

const BASE_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
    const {isModalOpen, modalType, selectedIngredient, openIngredientModal, openOrderModal, closeModal} = useModal();

    const [bun, setBun] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [items, setItems] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    // Used in CSSTransition
    const nodeRef = useRef(null);

    useEffect(() => {
        const fetchIngredients = async () => {
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

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients items={items}
                                   isLoading={isLoading}
                                   error={error}
                                   openModal={openIngredientModal}
                                   addIngredientToCart={addIngredientToCart}/>
                <BurgerConstructor bun={bun}
                                   ingredients={ingredients}
                                   openModal={openOrderModal}/>
            </main>

            <CSSTransition
                in={isModalOpen && modalType === 'ingredient'}
                nodeRef={nodeRef}
                timeout={600}
                classNames={{...transitions}}
                unmountOnExit
            >
                <Modal ref={nodeRef} closeModal={closeModal} title='Детали ингредиента'>
                    <IngredientDetails ingredient={selectedIngredient}/>
                </Modal>
            </CSSTransition>

            <CSSTransition
                in={isModalOpen && modalType === 'order'}
                nodeRef={nodeRef}
                timeout={600}
                classNames={{...transitions}}
                unmountOnExit
            >
                <Modal ref={nodeRef} closeModal={closeModal}>
                    <OrderDetails/>
                </Modal>
            </CSSTransition>
        </div>
    );
}

export default App;