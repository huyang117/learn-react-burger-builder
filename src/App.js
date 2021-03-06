import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/actionsIndex';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

const AsyncAuth = React.lazy(() => import('./containers/Auth/Auth'));
const AsyncHistoryOrders = React.lazy(() => import('./containers/HistoryOrders/HistoryOrders'));
const AsyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));

const App = props => {

  const { onCheckAutoAuth } = props;
  useEffect(() => { onCheckAutoAuth(); }, [onCheckAutoAuth]);

  let routes = (
    <Switch>
      <Route path='/auth' render={(props) => <AsyncAuth {...props} />} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkout' render={(props) => <AsyncCheckout {...props} />} />
        <Route path='/orders' render={(props) => <AsyncHistoryOrders {...props} />} />
        <Route path='/auth' render={(props) => <AsyncAuth {...props} />} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
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
