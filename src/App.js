import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import HistoryOrders from './containers/HistoryOrders/HistoryOrders';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={HistoryOrders} />
            <Route path="/Auth" component={Auth} />
            <Route path="/" component={BurgerBuilder} />       
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
