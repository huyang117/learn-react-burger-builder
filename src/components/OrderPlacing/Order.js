import React from 'react';

import classes from './Order.css';

const Order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientsOutput = ingredients.map(ingredient => {
        return (
            <span key={ingredient.name} className={classes.Ingredient}>
                {ingredient.name} ({ingredient.amount})
            </span>);
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
            <p>Delivery Method: {props.deliveryMethod}</p>
        </div>
    );
}

export default Order;