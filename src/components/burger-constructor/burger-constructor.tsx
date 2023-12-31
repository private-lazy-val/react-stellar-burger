import React, {useMemo} from "react";
import DroppableIngredientArea from '../droppable-ingredient-area/droppable-ingredient-area';
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import {
    addBun,
    addIngredient
} from "../../services/burger-constructor/burger-constructor-slice";
import {createNewOrder} from "../../services/submit-order/submit-order-slice";
import {
    selectBun,
    selectIngredients
} from "../../services/burger-constructor/selector";
import {useDrop} from "react-dnd";
import useModal from "../../hooks/use-modal";
import {selectIngredientsStatus} from "../../services/burger-ingredients/selector";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "../../services/store";
import {selectAccessToken} from "../../services/user/selector";
import {useRefreshToken} from "../../hooks/use-refresh-token";
import {AsyncThunkStatuses} from "../../enums";

type DropCollectedProps = {
    opacity: number;
}

type TNewOrder = {
    ingredients: string[];
}
const BurgerConstructor = (): React.JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);
    useRefreshToken(accessToken);

    const {bun, ingredients, ingredientsFetchStatus} = useSelector(state => ({
        bun: selectBun(state),
        ingredients: selectIngredients(state),
        ingredientsFetchStatus: selectIngredientsStatus(state)
    }));

    const {
        openSubmitOrderModal,
    } = useModal();

    const totalPrice = useMemo(() => {
        return ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price, 0) + (bun ? bun.price * 2 : 0);
    }, [bun, ingredients]);

    const [{opacity}, dropTarget] = useDrop<BaseIngredient, unknown, DropCollectedProps>({
        accept: "ingredient",
        // A function that is called when a draggable item is released over a drop target
        drop(ingredient) {
            addIngredientToCart(ingredient);
        },
        collect: monitor => ({
            opacity: monitor.isOver() ? 0.5 : 1
        })
    });

    const addIngredientToCart = (ingredient: BaseIngredient): void => {
        if (ingredient.type === 'bun') {
            dispatch(addBun(ingredient));
        } else {
            dispatch(addIngredient(ingredient));
        }
    };

    const submitOrder = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        if (bun && ingredients.length !== 0 && accessToken) {
            const newOrder: TNewOrder = {
                ingredients: [bun._id, ...ingredients.map(ingredient => ingredient._id), bun._id]
            }
            dispatch(createNewOrder(newOrder));
            openSubmitOrderModal();
        } else {
            navigate('/login');
        }
    };

    if (ingredientsFetchStatus !== AsyncThunkStatuses.succeeded) {
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