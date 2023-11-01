import {useEffect, useRef} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
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
import Profile from "./pages/profile/profile";
import Missing from "./pages/missing/missing";
import Modal from "./components/modals/modal/modal"
import useModal from "./hooks/useModal";
import {useDispatch} from "react-redux";
import {checkUserAuth} from "./services/user/action";
import {OnlyAuth, OnlyUnAuth} from "./components/protected-routes/protected-routes";
import IngredientPage from "./components/ingredient-page/ingredient-page";
import ResetPasswordRoute from "./components/reset-password-route/reset-password-route";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const background = location.state && location.state.background;
    const {
        isModalOpen,
        modalType,
        openIngredientModal,
        closeIngredientModal,
        closeOrderModal
    } = useModal();

    useEffect(() => {
        dispatch(checkUserAuth());
        // Check if modal should be opened on load
        if (localStorage.getItem('ingredientModalOpen')) {
            const ingredient = JSON.parse(localStorage.getItem('ingredientModalData'));
            openIngredientModal(ingredient);
        }
    }, [openIngredientModal, dispatch]);

    // Used in CSSTransition
    const nodeRef = useRef(null);

    return (
        <>
            {/*If background is not set, then the Routes component will render based on the current location*/}
            <Routes location={background || location}>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='ingredients/:ingredientId'
                           element={<IngredientPage title='Детали ингредиента'/>}
                    />

                    {/*protected routes*/}
                    <Route path='profile'>
                        <Route index element={<OnlyAuth component={<Profile/>}/>}/>
                    </Route>

                    {/*auth*/}
                    <Route path='register' element={<OnlyUnAuth component={<Register/>}/>}/>
                    <Route path='login' element={<OnlyUnAuth component={<Login/>}/>}/>
                    <Route path='forgot-password' element={<OnlyUnAuth component={<ForgotPassword/>}/>}/>
                    <Route path='reset-password' element={<OnlyUnAuth component={<ResetPasswordRoute component={<ResetPassword/>}/>}/>}/>

                    {/*catch all*/}
                    <Route path='*' element={<Missing/>}/>
                </Route>
            </Routes>

            {/*If background exists, the Routes component will use background as its location*/}
            {background && (
                <Routes>
                    <Route
                        path='/ingredients/:ingredientId'
                        element={
                            <CSSTransition
                                in={modalType === 'ingredient'}
                                nodeRef={nodeRef}
                                timeout={600}
                                classNames={{...transitions}}
                                unmountOnExit
                            >
                                <Modal ref={nodeRef} closeModal={closeIngredientModal}>
                                    <IngredientDetails title='Детали ингредиента'/>
                                </Modal>
                            </CSSTransition>
                        }
                    />
                </Routes>
            )}


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