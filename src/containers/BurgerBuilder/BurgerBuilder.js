import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/actionTypes';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        orderSubmitLoading: false,
        error: null
    }

    componentDidMount() {
        // axios.get('https://react-my-burger-8941b.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //         this.updatePurchaseableHandler(response.data);
        //     })
        //     .catch(error => {
        //         this.setState({ error: error });
        //     });
    }

    updatePurchaseableHandler = (currIngredients) => {
        const totalIngredients = Object.keys(currIngredients)
            .map(ingredientDesc => currIngredients[ingredientDesc])
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        
        return totalIngredients > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        let disabledInfo = { ...this.props.ings };
        for (let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
        }

        let orderSummary = null;
        let burgerSection = <Spinner />;
        if (this.state.error) {
            burgerSection = <p>Oops something went wrong</p>
        }

        if (this.props.ings) {
            burgerSection = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={(ingredientType) => this.props.onIngredientAdded(ingredientType)}
                        ingredientRemoved={(ingredientType) => this.props.onIngredientRemoved(ingredientType)}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseableHandler(this.props.ings)}
                        orderClicked={this.purchaseHandler} />
                </Auxiliary>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.props.price} />;
        }

        if (this.state.orderSubmitLoading) {
            orderSummary = <Spinner />
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgerSection}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:igName}),
        onIngredientRemoved: (igName) => dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:igName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));