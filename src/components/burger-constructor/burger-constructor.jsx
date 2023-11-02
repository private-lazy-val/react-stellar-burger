import {useMemo} from "react";
import DroppableIngredientArea from '../droppable-ingredient-area/droppable-ingredient-area';
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import {useDispatch, useSelector} from "react-redux";
import {
    addBun,
    addIngredient
} from "../../services/burgerConstructor/burgerConstructorSlice";
import {fetchOrderId} from "../../services/submitOrder/submitOrderSlice";
import {
    selectBun,
    selectIngredients
} from "../../services/burgerConstructor/selector";
import {
    selectIsLoadingIngredients,
    selectHasErrorIngredients
} from "../../services/burgerIngredients/selector";
import {useDrop} from "react-dnd";
import useModal from "../../hooks/useModal";
import {selectAllOrders, selectTodayTotalOrders, selectTotalOrders} from "../../services/ordersFeed/selector";

const BurgerConstructor = () => {
    const dispatch = useDispatch();

    const { bun, ingredients, isLoading, hasError } = useSelector(state => ({
        bun: selectBun(state),
        ingredients: selectIngredients(state),
        isLoading: selectIsLoadingIngredients(state),
        hasError: selectHasErrorIngredients(state)
    }));

    const {
        openSubmitOrderModal,
    } = useModal();

    const totalPrice = useMemo(() => {
        return ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price, 0) + (bun ? bun.price * 2 : 0);
    }, [bun, ingredients]);

    const [{opacity}, dropTarget] = useDrop({
        accept: "ingredient",
        // A function that is called when a draggable item is released over a drop target
        drop(ingredient) {
            addIngredientToCart(ingredient);
        },
        collect: monitor => ({
            opacity: monitor.isOver() ? 0.5 : 1
        })
    });

    const addIngredientToCart = (ingredient) => {
        if (ingredient.type === 'bun') {
            dispatch(addBun(ingredient));
        } else {
            dispatch(addIngredient(ingredient));
        }
    };

    const submitOrder = (e) => {
        e.preventDefault();
        if (bun && ingredients.length !== 0) {

            const newOrder = {
                ingredients: [bun._id, ...ingredients.map(ingredient => ingredient._id), bun._id]
            }
            dispatch(fetchOrderId(newOrder));
            openSubmitOrderModal(newOrder);
        }
    };

    if (isLoading || hasError) {
        return <></>;
    }

    return (
        <section className={`${styles.section} mt-10`} ref={dropTarget}>
            <ul className={`pt-5 pb-5 ${styles['outer-list']}`} style={{opacity}}>
                {bun ?
                    <li className={styles.bun}><ConstructorElement type="top" isLocked={true}
                                                                   text={`${bun.name} (верх)`}
                                                                   price={bun.price}
                                                                   thumbnail={bun.image}
                    /></li>
                    :

                    <div
                        className={`${styles.stub} ${styles['stub__bun-top']} text text_type_main-default text_color_inactive`}>Перетащите
                        булки</div>}
                {ingredients.length > 0 ?
                    <li>
                        <DroppableIngredientArea/>
                    </li>
                    :
                    <div
                        className={`${styles.stub} ${styles['stub__ingredients']} text_type_main-default text_color_inactive`}>Перетащите
                        ингредиенты</div>
                }

                {bun ?
                    <li className={styles.bun}><ConstructorElement type="bottom" isLocked={true}
                                                                   text={`${bun.name} (низ)`}
                                                                   price={bun.price}
                                                                   thumbnail={bun.image}
                    /></li>
                    :
                    <div
                        className={`${styles.stub} ${styles['stub__bun-bottom']} text_type_main-default text_color_inactive`}>Перетащите
                        булки</div>}
            </ul>

            <div className={`${styles.checkout} mr-4 mt-10`}>
                <div className={styles.total}>
                    <span className="text text_type_digits-medium">{totalPrice}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={submitOrder}
                        disabled={!bun || ingredients.length < 1}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

export default BurgerConstructor;