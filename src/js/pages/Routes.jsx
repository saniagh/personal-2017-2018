import React from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import HomeView from './home/HomeView.jsx';
import MyOrdersView from './client-area/MyOrdersView.jsx';
import RegularSalePageView from './client-area/RegularSalePageView.jsx';
import IndexView from './control-panel/IndexView.jsx';
import ViewProductView from './client-area/ViewProductView.jsx';
import CheckoutView from './client-area/CheckoutView.jsx';
import OrderDetailsView from './client-area/OrderDetailsView.jsx';

const Routes = withRouter(() => {
  return <Switch>
    <Route exact path={`/`} component={HomeView}/>
    <Route path={`/my-orders`} component={MyOrdersView}/>
    <Route path={`/control-panel`} component={IndexView}/>
    <Route path={`/browse-shop/:searchTerm`}
           component={RegularSalePageView}/>
    <Route exact
           path={`/product/:productName&:productId`}
           component={ViewProductView}/>
    <Route exact
           path={`/checkout`}
           component={CheckoutView}/>
    <Route path={`/order-details/:orderId`}
           component={OrderDetailsView}/>
  </Switch>;

});

export default Routes;
