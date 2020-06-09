import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let ingredientsBasedOnInput = Object.keys(props.ingredients).map(
        ingredientDesc => {
            return [...Array(props.ingredients[ingredientDesc])].map((_,i) => {
                return <BurgerIngredient key={ingredientDesc+i} type={ingredientDesc} />
            })
        }
    ).reduce((accumulator, currentValue)=> accumulator.concat(currentValue),[]);

    if (ingredientsBasedOnInput.length===0) {
        ingredientsBasedOnInput=<p>Please choose your ingredients! :)</p>
    }

    return (
        <div className={classes.Burger}>  
            <BurgerIngredient type="bread-top" />
            {ingredientsBasedOnInput}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;