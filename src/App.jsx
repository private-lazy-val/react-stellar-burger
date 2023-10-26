import transitions from "./components/modals/modal/modal-transitions.module.css";
import OrderDetails from "./components/modals/order-details/order-details";
import IngredientDetails from "./components/modals/ingredient-details/ingredient-details";
import Modal from "./components/modals/modal/modal"
import React, {useRef} from "react";
import useModal from "./hooks/useModal";
import {CSSTransition} from "react-transition-group";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/layout";
import CreateBurger from "./components/create-burger/create-burger";

function App() {
    const {
        isModalOpen,
        modalType,
        closeIngredientModal,
        closeOrderModal
    } = useModal();

    // Used in CSSTransition
    const nodeRef = useRef(null);

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<CreateBurger/>}/>
                </Route>
            </Routes>

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
        </>
    );
}

export default App;