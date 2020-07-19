import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/actionsIndex';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const AsyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));
const AsyncHistoryOrders = asyncComponent(() => import('./containers/HistoryOrders/HistoryOrders'));
const AsyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));

const App = props => {
  useEffect(() => {
    props.onCheckAutoAuth();
  }, []);

  let routes = (
    <Switch>
      <Route path='/auth' component={AsyncAuth} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkout' component={AsyncCheckout} />
        <Route path='/orders' component={AsyncHistoryOrders} />
        <Route path='/auth' component={AsyncAuth} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAutoAuth: () => dispatch(actions.checkAuthStateForAutoAuth())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
