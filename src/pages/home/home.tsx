import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from './home.module.css';
import React from "react";

const Home = (): React.JSX.Element => {

    return (
        <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </DndProvider>
        </main>
    );
};

export default Home;