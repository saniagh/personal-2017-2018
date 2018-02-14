import React from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import HomeView from './home/HomeView.jsx';
import ClientAreaView from './client-area/ClientAreaView.jsx';
import RegularSalePageView from './client-area/RegularSalePageView.jsx';
import IndexView from './control-panel/IndexView.jsx';
import ViewProductView from './client-area/ViewProductView.jsx';

const Routes = withRouter(() => {
  return <Switch>
    <Route exact path={`/`} component={HomeView}/>
    <Route path={`/client-area`} component={ClientAreaView}/>
    <Route path={`/control-panel`} component={IndexView}/>
    <Route path={`/browse-shop/:searchTerm`}
           component={RegularSalePageView}/>
    <Route exact
           path={`/product/:productName&:productId`}
           component={ViewProductView}/>
  </Switch>;

});

export default Routes;
