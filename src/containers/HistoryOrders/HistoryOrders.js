import React, { Component } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import Order from '../../components/OrderPlacing/Order';

class HistoryOrders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const ordersFetched = [];
                for (let key in response.data) {
                    ordersFetched.push({
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({
                    orders: ordersFetched,
                    loading: false
                });
                console.log(this.state.orders);
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let orders = <Spinner />;
        if (!this.state.loading && this.state.orders.length===0) {
            orders = <p>Order history is empty</p>;
        }
        else if (!this.state.loading && this.state.orders.length>0) {
            orders = this.state.orders.map(order => (
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

export default withErrorHandler(HistoryOrders, axios);