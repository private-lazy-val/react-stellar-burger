import React, {useState, useRef, useMemo, useEffect} from "react";
import styles from "./burger-ingredients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector, useDispatch} from 'react-redux';
import {
    getAllIngredients,
    loadAllIngredients,
    isLoadingIngredients,
    hasErrorIngredients
} from "../../features/burgerIngredients/burgerIngredientsSlice";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

const BurgerIngredients = React.memo(({openModal}) => {
    const allIngredients = useSelector(getAllIngredients);
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingIngredients);
    const hasError = useSelector(hasErrorIngredients);

    const [current, setCurrent] = useState('Булки');

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
        setCurrent(tab);
        refs[tab].current.scrollIntoView({behavior: 'smooth'});
    };

    const handleScroll = () => {
        let newCurrent = current;

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
        if (current !== newCurrent) {
            setCurrent(newCurrent);
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
                    <Tab key={category} value={category} active={current === category}
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

export default BurgerIngredients;