import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/actionsIndex';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    const updatePurchaseableHandler = (currIngredients) => {
        const totalIngredients = Object.keys(currIngredients)
            .map(ingredientDesc => currIngredients[ingredientDesc])
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        
        return totalIngredients > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }


        let disabledInfo = { ...props.ings };
        for (let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
        }

        let orderSummary = null;
        let burgerSection = <Spinner />;
        if (props.error) {
            burgerSection = <p>Oops something went wrong</p>
        }

        if (props.ings) {
            burgerSection = (
                <Auxiliary>
                    <Burger ingredients={props.ings} />
                    <BuildControls
                        ingredientAdded={(ingredientType) => props.onIngredientAdded(ingredientType)}
                        ingredientRemoved={(ingredientType) => props.onIngredientRemoved(ingredientType)}
                        disabledInfo={disabledInfo}
                        price={props.price}
                        purchaseable={updatePurchaseableHandler(props.ings)}
                        orderClicked={purchaseHandler}
                        isAuthenticated={props.isAuthenticated} />
                </Auxiliary>
            );

            orderSummary = <OrderSummary
                ingredients={props.ings}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                totalPrice={props.price} />;
        }

        return (
            <Auxiliary>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgerSection}
            </Auxiliary>
        );

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch(burgerBuilderActions.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(burgerBuilderActions.removeIngredient(igName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));