import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/OrderPlacing/Order';

class HistoryOrders extends Component {
    state = {
        orders: null
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                this.setState({ orders: response.data });
                console.log(response.data);
            });
    }

    render() {
        return (
            <div>
                <Order />
            </div>
        );
    }
}

export default HistoryOrders;