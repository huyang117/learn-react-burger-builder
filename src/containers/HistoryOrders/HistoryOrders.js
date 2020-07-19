import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as orderActions from '../../store/actions/actionsIndex';

import Order from '../../components/OrderPlacing/Order';

const HistoryOrders = props => {

    useEffect(() => {
        props.onFetchOrders(props.token, props.userId);
    },[]);

    let orders = <Spinner />;
    if (!props.loading && props.orders.length === 0) {
        orders = <p>Order history is empty</p>;
    }
    else if (!props.loading && props.orders.length > 0) {
        orders = props.orders.map(order => (
            <Order {...order} key={order.id} />
        ));
    }
    return (
        <div>
            {orders}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.fetchOrderLoading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(orderActions.fetchOrdersAsync(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(HistoryOrders, axios));