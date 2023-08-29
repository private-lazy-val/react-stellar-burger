import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../modals/order-details/order-details";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";
import Modal from "../modals/modal/modal"
import {useEffect, useState} from "react";

const BASE_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
    const [bun, setBun] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);


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

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients items={items}
                                   isLoading={isLoading}
                                   error={error}/>
                <BurgerConstructor bun={bun}
                                   ingredients={ingredients}/>
            </main>
            <Modal closePopup={closePopup} title="Детали ингредиента">
                <IngredientDetails />
            </Modal>
            <Modal closePopup={closePopup}>
                <OrderDetails />
            </Modal>
        </div>
    );
}

export default App;
