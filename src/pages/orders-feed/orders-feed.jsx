import styles from "./orders-feed.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

const OrdersFeed = () => {
    const dateFromServer = '2022-10-10T17:33:32.877Z';

    return (
        <main className={styles.main}>
            <h1 className="text text_type_main-large">Лента заказов</h1>
            <section className={styles.section}>
                <ul>
                    <li className={styles.order}>
                        <div className={styles.date}>
                            <p className="text text_type_digits-default">#034535</p>
                            <div>
                                <FormattedDate date={new Date(dateFromServer)}
                                               className="text text_type_main-default text_color_inactive"/>
                                <span className="text text_type_main-default text_color_inactive">&nbsp;i-GMT+3</span>
                            </div>
                        </div>
                        <h2 className="text text_type_main-medium">Death Star Starship Main бургер</h2>
                        <div className={styles.summary}>
                            <ul className={styles.ingredients}>
                                <li className={styles.ingredient}>
                                    <img className={styles[`ingredient-img`]}
                                         src="https://code.s3.yandex.net/react/code/bun-01.png"
                                         alt="Флюоресцентная булка R2-D3"/>
                                </li>
                                <li className={styles.ingredient}>
                                    <img className={styles[`ingredient-img`]}
                                         src="https://code.s3.yandex.net/react/code/meat-03.png"
                                         alt="Филе Люминесцентного тетраодонтимформа"/>
                                </li>
                                <li className={styles.ingredient}>
                                    <img className={styles[`ingredient-img`]}
                                         src="https://code.s3.yandex.net/react/code/sauce-04.png"
                                         alt="Соус фирменный Space Sauce"/>
                                </li>
                                <li className={styles.ingredient}>
                                    <img className={styles[`ingredient-img`]}
                                         src="https://code.s3.yandex.net/react/code/core.png"
                                         alt="Кристаллы марсианских альфа-сахаридов"/>
                                </li>
                                <li className={styles.ingredient}>
                                    <img className={styles[`ingredient-img`]}
                                         src="https://code.s3.yandex.net/react/code/sauce-03-large.png"
                                         alt="Соус традиционный галактический"/>
                                </li>
                                <li className={styles.ingredient}>
                                    <img className={styles[`ingredient-img`]}
                                         src="https://code.s3.yandex.net/react/code/sauce-03-large.png"
                                         alt="Соус традиционный галактический"/>
                                </li>
                            </ul>
                            <div className={styles.total}>
                                <span className="text text_type_digits-default">666</span>
                                <CurrencyIcon type="primary"/>
                            </div>
                        </div>


                    </li>
                </ul>

            </section>

        </main>
    );
};

export default OrdersFeed;