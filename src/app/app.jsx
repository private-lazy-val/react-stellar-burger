import styles from "./app.module.css";
import transitions from "../components/modals/modal/modal-transitions.module.css";
import AppHeader from "../components/app-header/app-header";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import OrderDetails from "../components/modals/order-details/order-details";
import IngredientDetails from "../components/modals/ingredient-details/ingredient-details";
import Modal from "../components/modals/modal/modal"
import React, {useRef} from "react";
import useModal from "../hooks/useModal";
import {CSSTransition} from "react-transition-group";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    const {
        isModalOpen,
        modalType,
        openIngredientModal,
        openOrderModal,
        closeIngredientModal,
        closeOrderModal
    } = useModal();

    // Used in CSSTransition
    const nodeRef = useRef(null);

    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients openModal={openIngredientModal}/>
                    <BurgerConstructor openModal={openOrderModal}/>
                </DndProvider>
            </main>

            <CSSTransition
                in={isModalOpen && modalType === 'ingredient'}
                nodeRef={nodeRef}
                timeout={600}
                classNames={{...transitions}}
                unmountOnExit
            >
                <Modal ref={nodeRef} closeModal={closeIngredientModal}>
                    <IngredientDetails title='Детали ингредиента'/>
                </Modal>
            </CSSTransition>

            <CSSTransition
                in={isModalOpen && modalType === 'order'}
                nodeRef={nodeRef}
                timeout={600}
                classNames={{...transitions}}
                unmountOnExit
            >
                <Modal ref={nodeRef} closeModal={closeOrderModal}>
                    <OrderDetails/>
                </Modal>
            </CSSTransition>
        </div>
    );
}

export default App;