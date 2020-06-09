import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' }
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map(controlItem => {
                return <BuildControl
                    label={controlItem.label}
                    key={controlItem.label}
                    added={() => props.ingredientAdded(controlItem.type)}
                    removed={() => props.ingredientRemoved(controlItem.type)}
                    isDisabled={props.disabledInfo[controlItem.type]} />
            })}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchaseable}
                onClick={props.orderClicked} >
                ORDER NOW</button>
        </div>
    );
}

export default BuildControls;