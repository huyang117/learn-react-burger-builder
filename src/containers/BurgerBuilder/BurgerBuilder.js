import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        orderSubmitLoading: false,
        error: null
    }

    componentDidMount() {
        axios.get('https://react-my-burger-8941b.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: error });
            });
    }

    updatePurchaseableHandler = (currIngredients) => {
        const totalIngredients = Object.keys(currIngredients)
            .map(ingredientDesc => currIngredients[ingredientDesc])
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        this.setState({
            purchaseable: totalIngredients > 0
        });
    }

    addIngredientHandler = (ingredientType) => {
        const oldAmt = this.state.ingredients[ingredientType];
        const updatedAmt = oldAmt + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[ingredientType] = updatedAmt;
        this.setState((prevState, props) => {
            return {
                ingredients: updatedIngredients,
                totalPrice: prevState.totalPrice + INGREDIENT_PRICES[ingredientType]
            }
        });
        this.updatePurchaseableHandler(updatedIngredients);
    }

    removeIngredientHandler = (ingredientType) => {
        const oldAmt = this.state.ingredients[ingredientType];
        if (oldAmt <= 0) {
            return;
        }
        const updatedAmt = oldAmt - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[ingredientType] = updatedAmt;
        this.setState((prevState, props) => {
            return {
                ingredients: updatedIngredients,
                totalPrice: prevState.totalPrice - INGREDIENT_PRICES[ingredientType]
            }
        });
        this.updatePurchaseableHandler(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ orderSubmitLoading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Alex',
                address: {
                    street: '2 Holland Avenue',
                    zipcode: '271002',
                    country: 'Singapore'
                },
                email: 'burgerbuilder@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => this.setState({ purchasing: false, orderSubmitLoading: false }))
            .catch(error => this.setState({ purchasing: false, orderSubmitLoading: false }));
    }

    render() {
        let disabledInfo = { ...this.state.ingredients };
        for (let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
        }

        let orderSummary = null;
        let burgerSection = <Spinner />;
        if (this.state.error) {
            burgerSection = <p>Oops something went wrong</p>
        }

        if (this.state.ingredients) {
            burgerSection = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        orderClicked={this.purchaseHandler} />
                </Auxiliary>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice} />;
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

export default withErrorHandler(BurgerBuilder, axios);