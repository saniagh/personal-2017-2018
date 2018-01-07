import React, { Component } from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';

import { Layout, Breadcrumb } from 'antd';
const { Footer } = Layout;
const BreadcrumbItem = Breadcrumb.Item;

import HomeView from './home/HomeView.jsx';
import ClientAreaView from './client-area/ClientAreaView.jsx';
import IndexView from './control-panel/IndexView.jsx';

const breadcrumbNameMap = {
  '/': 'Home',
  '/client-area': 'Client Area',
  '/control-panel': 'Control Panel',
  '/control-panel/products': 'Products',
  '/control-panel/products/add-a-product': 'Add Product',
  '/control-panel/categories': 'Categories',
};

const Routes = withRouter((props) => {
  const { location } = props;
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
        <BreadcrumbItem key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </BreadcrumbItem>
    );
  });
  const breadcrumbItems = [
    (
        <BreadcrumbItem key="home">
          <Link to="/">Home</Link>
        </BreadcrumbItem>
    )].concat(extraBreadcrumbItems);
  return (
      <span>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {breadcrumbItems}
        </Breadcrumb>
          <Switch>
            <Route exact path={`/`} component={HomeView}/>
            <Route path={`/client-area`} component={ClientAreaView}/>
            <Route path={`/control-panel`} component={IndexView}/>
          </Switch>
        <Footer style={{ textAlign: 'center' }}>
          Bloo Shop @2018 Created by Valentin C.
        </Footer>
      </span>
  );
});

export default Routes;
