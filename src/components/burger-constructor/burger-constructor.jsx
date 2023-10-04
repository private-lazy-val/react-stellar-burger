import React, {useCallback, useMemo} from "react";
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {
    addBun,
    addIngredient,
    removeIngredient,
    getBun,
    getIngredients
} from "../../features/burgerConstructor/burgerConstructorSlice";
import {fetchOrderId} from "../../features/orderDetails/orderDetailsSlice";
import {
    isLoadingIngredients,
    hasErrorIngredients
} from "../../features/burgerIngredients/burgerIngredientsSlice";
import {useDrop} from "react-dnd";
import {v4 as uuidv4} from "uuid";

const BurgerConstructor = React.memo(({openModal}) => {
    const bun = useSelector(getBun);
    const ingredients = useSelector(getIngredients);

    const isLoading = useSelector(isLoadingIngredients);
    const hasError = useSelector(hasErrorIngredients);

    const dispatch = useDispatch();

    const totalPrice = useMemo(() => {
        return ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price, 0) + (bun ? bun.price * 2 : 0);
    }, [bun, ingredients]);

    const addIngredientToCart = useCallback((ingredient) => {
        const ingredientWithUUID = {...ingredient.ingredient, uuid: uuidv4()};
        if (ingredient.ingredient.type === 'bun') {
            dispatch(addBun(ingredientWithUUID));
        } else {
            dispatch(addIngredient(ingredientWithUUID));
        }
    }, [dispatch]);

    const removeIngredientFromCart = useCallback((ingredient) => {
        dispatch(removeIngredient(ingredient));
    }, [dispatch]);

    const [{isHover, opacity}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredient) {
            addIngredientToCart(ingredient);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            opacity: monitor.isOver() ? 0.5 : 1
        })
    });

    const border = isHover ? '3px solid rgba(76, 76, 255, 0.20)' : 'none';


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
        <section className={`${styles.section} mt-15`} ref={dropTarget}>
            <ul className={styles['outer-list']} style={{border, opacity}}>
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
                        <ul className={`${styles['inner-list']} custom-scroll`}>
                            {ingredients.map((ingredient) => (
                                <li key={ingredient.uuid} className={styles['draggable-ingredients']}>
                                    <DragIcon type="primary"/>
                                    <ConstructorElement text={ingredient.name} price={ingredient.price}
                                                        thumbnail={ingredient.image}
                                                        handleClose={() => {
                                                            removeIngredientFromCart(ingredient)
                                                        }}/>
                                </li>
                            ))}
                        </ul>
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
                <Button htmlType="button" type="primary" size="large" onClick={submitOrder}>
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