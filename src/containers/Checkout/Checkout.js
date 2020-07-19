import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/OrderPlacing/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

const Checkout = props => {
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.push('/checkout/contact-data');
    }

    let checkoutSummary = <Redirect to='/' />; //redirect to burger builder if ingredients is null
    if (props.ings) {
        const redirectIfPurchased = props.purchased ? <Redirect to='/' /> : null;
        checkoutSummary = (
            <div>
                {redirectIfPurchased}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler} />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        );
    };
    return checkoutSummary;
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);