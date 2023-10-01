import styles from "./app.module.css";
import transitions from "../modals/modal/modal-transitions.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../modals/order-details/order-details";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";
import Modal from "../modals/modal/modal"
import React, {useRef} from "react";
import useModal from "../../hooks/useModal";
import {CSSTransition} from "react-transition-group";

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
                <BurgerIngredients openModal={openIngredientModal}/>
                <BurgerConstructor openModal={openOrderModal}/>
            </main>

            <CSSTransition
                in={isModalOpen && modalType === 'ingredient'}
                nodeRef={nodeRef}
                timeout={600}
                classNames={{...transitions}}
                unmountOnExit
            >
                <Modal ref={nodeRef} closeModal={closeIngredientModal} title='Детали ингредиента'>
                    <IngredientDetails/>
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