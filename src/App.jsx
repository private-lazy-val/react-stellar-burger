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
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import ResetPassword from "./pages/reset-password/reset-password";
import ForgotPassword from "./pages/forgot-password/forgot-password";

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
                    {/*public routes*/}
                    <Route index element={<CreateBurger/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='forgot-password' element={<ForgotPassword/>}/>
                    <Route path='reset-password' element={<ResetPassword/>}/>
                    {/*<Route path='ingredients/:id'></Route>*/}

                    {/*protected routes*/}
                    {/*<Route path='profile'>*/}
                    {/*    <Route index element={<Profile/>}/>*/}
                    {/*</Route>*/}

                    {/*catch all*/}
                    {/*<Route path='*' element={<Missing/>}/>*/}
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