import {useRef, useMemo} from "react";
import styles from "./burger-ingredients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from 'react-redux';
import {switchTab} from "../../services/burger-ingredients/burger-ingredients-slice";
import {
    selectAllIngredients, selectCurrentTab, selectIngredientsError, selectIngredientsStatus
} from "../../services/burger-ingredients/selector";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import LoadingComponent from "../../utils/loading-component";
import ItemNotFound from "../../utils/item-not-found";
import {useDelayedLoader} from '../../hooks/use-delayed-loader';

const BurgerIngredients = () => {
    const dispatch = useDispatch();

    const {allIngredients, currentTab, ingredientsFetchStatus, ingredientsFetchError} = useSelector(state => ({
        allIngredients: selectAllIngredients(state),
        currentTab: selectCurrentTab(state),
        ingredientsFetchStatus: selectIngredientsStatus(state),
        ingredientsFetchError: selectIngredientsError(state)
    }));

    const isLoading = ingredientsFetchStatus === 'loading';
    const showLoader = useDelayedLoader(isLoading, 300);

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

    let content;

    if (showLoader) {
        content = <div className="page-backdrop"><LoadingComponent/></div>;
    } else if (ingredientsFetchStatus === 'failed' && !showLoader) {
        content = <div className="page-backdrop text_type_digits-medium">{ingredientsFetchError}</div>;
    } else if (ingredientsFetchStatus === 'succeeded' && categorizedItems) {
        content = (
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
                                    <BurgerIngredient key={ingredient._id} ingredient={ingredient}/>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </section>
        )
    }

    if (!allIngredients && ingredientsFetchStatus === 'succeeded') {
        content = <div className='page-backdrop'><ItemNotFound/></div>
    }

    return (
        <>
            {content}
        </>
    );
};
export default BurgerIngredients;