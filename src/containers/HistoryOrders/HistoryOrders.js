import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as orderActions from '../../store/actions/actionsIndex';

import Order from '../../components/OrderPlacing/Order';

class HistoryOrders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading && this.props.orders.length===0) {
            orders = <p>Order history is empty</p>;
        }
        else if (!this.props.loading && this.props.orders.length>0) {
            orders = this.props.orders.map(order => (
                <Order {...order} key={order.id} />
            ));
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.fetchOrderLoading,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(orderActions.fetchOrdersAsync(token))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(HistoryOrders, axios));