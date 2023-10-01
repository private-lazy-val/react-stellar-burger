import React, {useMemo} from "react";
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {getBun, getIngredients} from "../../services/burgerConstructorSlice";
import {fetchOrderId} from "../../services/orderDetailsSlice";
import {
    isLoadingIngredients,
    hasErrorIngredients
} from "../../services/burgerIngredientsSlice";

const BurgerConstructor = React.memo(({openModal}) => {
    const bun = useSelector(getBun);
    const ingredients = useSelector(getIngredients);

    const isLoading = useSelector(isLoadingIngredients);
    const hasError = useSelector(hasErrorIngredients);

    const dispatch = useDispatch();
    const totalPrice = useMemo(() => {
        return ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price, 0) + (bun ? bun.price * 2 : 0);
    }, [bun, ingredients]);


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
        <section className={`${styles.section} mt-15`}>
            <ul className={styles['outer-list']}>
                {bun && <li className={styles.bun}><ConstructorElement type="top" isLocked={true}
                                                                       text={`${bun.name} (верх)`}
                                                                       price={bun.price}
                                                                       thumbnail={bun.image}/></li>}
                <li>
                    <ul className={`${styles['inner-list']} custom-scroll`}>
                        {ingredients.map((ingredient) => (
                            <li key={ingredient.uuid} className={styles.item}>
                                <DragIcon type="primary"/>
                                <ConstructorElement text={ingredient.name} price={ingredient.price}
                                                    thumbnail={ingredient.image}/>
                            </li>
                        ))}
                    </ul>
                </li>

                {bun &&
                    <li className={styles.bun}><ConstructorElement type="bottom" isLocked={true}
                                                                   text={`${bun.name} (низ)`}
                                                                   price={bun.price}
                                                                   thumbnail={bun.image}/></li>}
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
    openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;