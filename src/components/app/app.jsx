import styles from "./app.module.css";
import api from "../../api/api";
import transitions from "../modals/modal/modal-transitions.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../modals/order-details/order-details";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";
import Modal from "../modals/modal/modal"
import React, {useEffect, useState, useRef, useCallback, useReducer} from "react";
import {v4 as uuidv4} from "uuid";
import useModal from "../../hooks/useModal";
import {CSSTransition} from "react-transition-group";
import {ConstructorContext} from "../../services/contexts/constructorContext";
import {IngredientsContext} from "../../services/contexts/ingredientsContext";
import {OrderDetailsContext} from "../../services/contexts/orderDetailsContext";
import {initialState, ingredientsReducer} from "../../services/reducers/ingredientsReducer";

function App() {
    const [state, dispatch] = useReducer(ingredientsReducer, initialState, undefined);

    const {isModalOpen, modalType, selectedIngredient, openIngredientModal, openOrderModal, closeModal} = useModal();

    const [bun, setBun] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [items, setItems] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [idIsLoading, setIdIsLoading] = useState(true);
    const [idError, setIdError] = useState(false);
    const [orderId, setOrderId] = useState(null);

    // Used in CSSTransition
    const nodeRef = useRef(null);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await api.get('/ingredients');
                // Axios places the response (converted to JSON) from the server in the `data` property.
                // No need to await response.json() as with the Fetch API.
                const jsonResponse = response.data;
                // No need to check for `.ok` with Axios, unsuccessful requests will throw an error directly
                if (jsonResponse.success && Array.isArray(jsonResponse.data) && jsonResponse.data.length > 0) {
                    setItems(jsonResponse.data);
                } else {
                    throw new Error('Data format is incorrect or array is empty'); // Will be caught by catch block
                }
            } catch (err) {
                setError(true);
                console.log('Error occurred:', err); // Log the entire error object for more details
            } finally {
                setIsLoading(false);
            }
        };
        fetchIngredients();
    }, []);

    const addIngredientToCart = useCallback((ingredient) => {
        const ingredientWithUUID = {...ingredient, uuid: uuidv4()};
        if (ingredient.type === 'bun') {
            if (bun) { // If there's already a bun, remove its price first
                dispatch({type: 'remove_bun', payload: bun});
            }
            setBun(ingredientWithUUID);
            dispatch({type: 'add_bun', payload: ingredientWithUUID});
        } else {
            setIngredients(prev => [...prev, ingredientWithUUID]);
            dispatch({type: 'add_ingredient', payload: ingredientWithUUID});
        }
    }, [bun])

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <IngredientsContext.Provider value={{items, isLoading, error, addIngredientToCart}}>
                    <ConstructorContext.Provider value={{bun, ingredients, state}}>
                        <BurgerIngredients openModal={openIngredientModal}/>
                        <OrderDetailsContext.Provider value={{setOrderId, setIdIsLoading, setIdError}}>
                            <BurgerConstructor openModal={openOrderModal}/>
                        </OrderDetailsContext.Provider>
                    </ConstructorContext.Provider>
                </IngredientsContext.Provider>
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
                    <OrderDetailsContext.Provider value={{orderId, idIsLoading, idError}}>
                        <OrderDetails/>
                    </OrderDetailsContext.Provider>
                </Modal>
            </CSSTransition>
        </div>
    );
}

export default App;