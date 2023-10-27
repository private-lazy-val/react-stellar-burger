import {useRef} from "react";
import {Route, Routes} from "react-router-dom";
import transitions from "./components/modals/modal/modal-transitions.module.css";
import {CSSTransition} from "react-transition-group";
import OrderDetails from "./components/modals/order-details/order-details";
import IngredientDetails from "./components/modals/ingredient-details/ingredient-details";
import Layout from "./components/layout/layout";
import Home from "./components/home/home";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import ResetPassword from "./pages/reset-password/reset-password";
import ForgotPassword from "./pages/forgot-password/forgot-password";
import ProtectedRouteElement from "./components/protected-route-element/protected-route-element";
import Profile from "./pages/profile/profile";
import Missing from "./pages/missing/missing";
import Modal from "./components/modals/modal/modal"
import useModal from "./hooks/useModal";

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
                    <Route index element={<Home/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='forgot-password' element={<ForgotPassword/>}/>
                    <Route path='reset-password' element={<ResetPassword/>}/>
                    {/*<Route path='ingredients/:id'></Route>*/}
                    {/*<Route path='feed'>*/}
                    {/*    <Route index element={<Feed/>}/>*/}
                    {/*</Route>*/}

                    {/*protected routes*/}
                    <Route element={<ProtectedRouteElement/>}>
                        <Route path='profile'>
                            <Route index element={<Profile/>}/>
                        </Route>
                    </Route>

                    {/*catch all*/}
                    <Route path='*' element={<Missing/>}/>
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