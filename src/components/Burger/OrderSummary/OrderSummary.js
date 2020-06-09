import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const listItemStyle = {
        textTransform: 'capitalize'
    };

    const ingredientsList = Object.keys(props.ingredients)
        .map((ingredientDesc) =>
            <li key={ingredientDesc}>
                <span style={listItemStyle}>{ingredientDesc}</span>: {props.ingredients[ingredientDesc]}
            </li>);

    return (
        <Auxiliary>
            <h3>Order Summary</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientsList}
            </ul>
            <p><strong>Total Price: ${props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to check out?</p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </Auxiliary>
    );
}

export default OrderSummary;