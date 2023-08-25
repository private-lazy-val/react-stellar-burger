import styles from "./app.module.css";
import {data} from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useState} from "react";

function App() {
    const [bun, setBun] = useState(null);
    const [ingredients, setIngredients] = useState([]);

    const addIngredientToCart = (ingredient) => {
        ingredient.type === 'bun' ? setBun(ingredient) : setIngredients(prev => [...prev, ingredient]);
    }

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients data={data} addIngredientToCart={addIngredientToCart}/>
                <BurgerConstructor bun={bun} ingredients={ingredients}/>
            </main>
        </div>
    );
}

export default App;
