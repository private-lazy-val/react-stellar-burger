import React, {useRef, useMemo, useEffect} from "react";
import styles from "./burger-ingredients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector, useDispatch} from 'react-redux';
import {
    loadAllIngredients, switchTab
} from "../../services/burgerIngredients/burgerIngredientsSlice";
import {getAllIngredients, getCurrentTab, isLoadingIngredients,
    hasErrorIngredients} from "../../services/burgerIngredients/selector";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";

const BurgerIngredients = React.memo(({openModal}) => {
    const allIngredients = useSelector(getAllIngredients);
    const currentTab = useSelector(getCurrentTab);
    const isLoading = useSelector(isLoadingIngredients);
    const hasError = useSelector(hasErrorIngredients);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllIngredients());
    }, [dispatch]);

    const categorizedItems = useMemo(() => ({
        'Булки': allIngredients.filter(item => item.type === 'bun'),
        'Соусы': allIngredients.filter(item => item.type === 'sauce'),
        'Начинки': allIngredients.filter(item => item.type === 'main'),
    }), [allIngredients]);

    const refs = {
        'Булки': useRef(null),
        'Соусы': useRef(null),
        'Начинки': useRef(null),
    };

    const handleTabClick = (tab) => {
        dispatch(switchTab(tab));
        refs[tab].current.scrollIntoView({behavior: 'smooth'});
    };

    const handleScroll = () => {
        let newCurrent = currentTab;
        // Iterate through each category and check its bounding rectangle
        for (const category of Object.keys(refs)) {
            const rect = refs[category].current.getBoundingClientRect();
            // If the top edge of the element is in the viewport or below the top edge of the viewport,
            // and the top edge of the element is within the upper half of the viewport,
            // update newCurrent and break loop since we found the first visible element
            if (rect.top >= 0 && rect.top < window.innerHeight * 0.5) {
                newCurrent = category;
                break;
            }
        }
        if (currentTab !== newCurrent) {
            dispatch(switchTab(newCurrent));
        }
    };

    if (isLoading) {
        return <p className="text text_type_main-medium text_color_inactive mt-10 ml-10">Загрузка...</p>;
    }

    if (hasError) {
        return <p className="text text_type_main-medium text_color_inactive mt-10 ml-10">Произошла ошибка. Пожалуйста,
            перезагрузите страницу.</p>;
    }

    return (
        <section className={styles.section}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={styles.tabs}>
                {Object.keys(categorizedItems).map(category => (
                    <Tab key={category} value={category} active={currentTab === category}
                         onClick={() => handleTabClick(category)}>
                        {category}
                    </Tab>
                ))}
            </div>

            <ul className={`${styles['create-burger']} custom-scroll`} onScroll={handleScroll}>
                {Object.entries(categorizedItems).map(([category, ingredients]) => (
                    <li key={category} ref={refs[category]}>
                        <h2 className="text text_type_main-medium mt-10">{category}</h2>
                        <ul className={`${styles.ingredients} mt-6 ml-4`}>
                            {ingredients.map((ingredient) => (
                                <BurgerIngredient key={ingredient._id} ingredient={ingredient} openModal={openModal}/>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    );
});

BurgerIngredients.propTypes = {
    openModal: PropTypes.func.isRequired
};

export default BurgerIngredients;