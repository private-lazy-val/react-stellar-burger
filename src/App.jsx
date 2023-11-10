import {useEffect, useRef} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import transitions from "./components/modals/modal/modal-transitions.module.css";
import {CSSTransition} from "react-transition-group";
import SubmitOrder from "./components/modals/submit-order/submit-order";
import IngredientInfo from "./components/modals/ingredient-info/ingredient-info";
import Layout from "./components/layout/layout";
import Home from "./pages/home/home";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import ResetPassword from "./pages/reset-password/reset-password";
import ForgotPassword from "./pages/forgot-password/forgot-password";
import Profile from "./pages/profile/profile";
import Missing from "./pages/missing/missing";
import Modal from "./components/modals/modal/modal"
import useModal from "./hooks/use-modal";
import {useDispatch} from "react-redux";
import {checkUserAuth} from "./services/user/action";
import {OnlyAuth, OnlyUnAuth} from "./components/protected-routes/protected-routes";
import IngredientPage from "./pages/ingredient-page/ingredient-page";
import ResetPasswordRoute from "./components/reset-password-route/reset-password-route";
import OrdersFeed from "./pages/orders-feed/orders-feed";
import OrderPage from "./pages/order-page/order-page";
import {loadAllIngredients} from "./services/burger-ingredients/burger-ingredients-slice";
import ProfileOrders from "./pages/profile-orders/profile-orders";
import OrderInfo from "./components/modals/order-info/order-info";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();

    const background = location.state && location.state.background;
    const {
        modalType,
        openIngredientModal,
        closeIngredientModal,
        openOrderModal,
        closeOrderModal,
        closeSubmitOrderModal
    } = useModal();

    useEffect(() => {
        dispatch(loadAllIngredients());
        dispatch(checkUserAuth());
    }, [dispatch]);

    useEffect(() => {
        // Check if modal should be opened on load
        if (localStorage.getItem('ingredientModalOpen')) {
            openIngredientModal();
        }
        if (localStorage.getItem('orderModalOpen')) {
            openOrderModal();
        }
    }, []);

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
                            <Route path='feed' element={<OrdersFeed/>}/>
                            <Route path='feed/:number' element={<OrderPage/>}/>

                            {/*protected routes*/}
                            <Route path='profile'>
                                <Route index element={<OnlyAuth component={<Profile/>}/>}/>
                                <Route path='orders' element={<OnlyAuth component={<ProfileOrders/>}/>}/>
                                <Route path='orders/:number' element={<OnlyAuth component={<OrderPage/>}/>}/>
                            </Route>

                            {/*auth*/}
                            <Route path='register' element={<OnlyUnAuth component={<Register/>}/>}/>
                            <Route path='login' element={<OnlyUnAuth component={<Login/>}/>}/>
                            <Route path='forgot-password' element={<OnlyUnAuth component={<ForgotPassword/>}/>}/>
                            <Route path='reset-password'
                                   element={<OnlyUnAuth
                                       component={<ResetPasswordRoute component={<ResetPassword/>}/>}/>}/>

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
                                            <IngredientInfo title='Детали ингредиента'/>
                                        </Modal>
                                    </CSSTransition>
                                }
                            />
                            <Route
                                path='feed/:number'
                                element={
                                    <CSSTransition
                                        in={modalType === 'order'}
                                        nodeRef={nodeRef}
                                        timeout={600}
                                        classNames={{...transitions}}
                                        unmountOnExit
                                    >
                                        <Modal ref={nodeRef} closeModal={closeOrderModal}>
                                            <OrderInfo/>
                                        </Modal>
                                    </CSSTransition>
                                }
                            />
                            <Route
                                path='/profile/orders/:number'
                                element={
                                    <CSSTransition
                                        in={modalType === 'order'}
                                        nodeRef={nodeRef}
                                        timeout={600}
                                        classNames={{...transitions}}
                                        unmountOnExit
                                    >
                                        <Modal ref={nodeRef} closeModal={closeOrderModal}>
                                            <OrderInfo/>
                                        </Modal>
                                    </CSSTransition>
                                }
                            />
                        </Routes>
                    )}


                    <CSSTransition
                        in={modalType === 'submit-order'}
                        nodeRef={nodeRef}
                        timeout={600}
                        classNames={{...transitions}}
                        unmountOnExit
                    >
                        <Modal ref={nodeRef} closeModal={closeSubmitOrderModal}>
                            <SubmitOrder/>
                        </Modal>
                    </CSSTransition>
                </>
    );
}

export default App;