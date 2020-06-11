import React, { Component } from 'react';

import CheckoutSummary from '../../components/OrderPlacing/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            'bacon':1,
            'salad':1,
            'cheese':1,
            'meat':1
        }
    }
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} />
            </div>
        );
    }
}

export default Checkout;