import React from 'react';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({bun, ingredients}) => {

    const renderBun = (bun, type) => {
        if (bun !== null) {
            return (
                <ConstructorElement
                    type={type}
                    isLocked={true}
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            )
        } else {
            return;
        }
    }
    const renderIngredient = (ingredient) => {
        return (
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
            />
        )
    }

    return (
        <section>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {
                    <>
                        <div>
                            {renderBun(bun, "top")}
                        </div>
                        <ul>
                            {ingredients.map((ingredient) => (
                                <li>
                                    {renderIngredient(ingredient)}
                                </li>
                            ))}
                        </ul>
                        <div>
                            {renderBun(bun, "bottom")}
                        </div>
                    </>
                }
            </div>
        </section>
    );
};

export default BurgerConstructor;