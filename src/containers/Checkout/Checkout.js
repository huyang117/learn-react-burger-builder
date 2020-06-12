import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/OrderPlacing/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {}, 
        price: 0
    }

    componentDidMount() { // if ingredients is initially NULL, then here should be componentWillMount
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            if (param[0]==='price') {
                this.setState({ price: param[1] });
            } else {
                ingredients[param[0]] = (+param[1]);
            } 
        }
        this.setState({ ingredients: ingredients });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (
                        <ContactData 
                            ingredients={this.state.ingredients}
                            price={this.state.price}
                            {...props} />)} />
                            {/* due to the way we render ContactData component,
                             the history object is not available. That is the 
                             reason of passing props to ContactData */}
            </div>
        );
    }
}

export default Checkout;