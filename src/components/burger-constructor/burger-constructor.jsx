import React, {useMemo} from "react";
import DroppableIngredientArea from '../droppable-ingredient-area/droppable-ingredient-area';
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {
    addBun,
    addIngredient
} from "../../services/burgerConstructor/burgerConstructorSlice";
import {fetchOrderId} from "../../services/orderDetails/orderDetailsSlice";
import {
    getBun,
    getIngredients
} from "../../services/burgerConstructor/selector";
import {isLoadingIngredients,
    hasErrorIngredients} from "../../services/burgerIngredients/selector";
import {useDrop} from "react-dnd";

const BurgerConstructor = React.memo(({openModal}) => {

    const bun = useSelector(getBun);
    const ingredients = useSelector(getIngredients);
    const isLoading = useSelector(isLoadingIngredients);
    const hasError = useSelector(hasErrorIngredients);

    const dispatch = useDispatch();

    const totalPrice = useMemo(() => {
        return ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price, 0) + (bun ? bun.price * 2 : 0);
    }, [bun, ingredients]);

    const [{opacity, isOver}, dropTarget] = useDrop({
        accept: "ingredient",
        // A function that is called when a draggable item is released over a drop target
        drop(ingredient) {
            addIngredientToCart(ingredient);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
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
            openModal(newOrder);
        }
    };

    if (isLoading || hasError) {
        return <></>;
    }

    return (
        <section className={`${styles.section} mt-10`} ref={dropTarget}>
            <ul className={`pt-5 pb-5 ${styles['outer-list']} ${isOver ? styles['hover-over'] : ''}`} style={{opacity}}>
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
                <Button htmlType="button" type="primary" size="large" onClick={submitOrder} disabled={!bun || ingredients.length < 1}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
});

BurgerConstructor.propTypes = {
    openModal: PropTypes.func.isRequired
};

export default BurgerConstructor;