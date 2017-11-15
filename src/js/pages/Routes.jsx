import React, { Component } from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';

import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;
const BreadcrumbItem = Breadcrumb.Item;

import HomeView from './home/HomeView.jsx';
import ClientAreaView from './client-area/ClientAreaView.jsx';

const breadcrumbNameMap = {
  '/': 'Home',
  '/client-area': 'Client Area',
};

const Routes = withRouter((props) => {
  const { location } = props;
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
  return <Content style={{ padding: '0 50px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
      {breadcrumbItems}
    </Breadcrumb>
    <Switch>
      <Route exact path={`/`} component={HomeView}/>
      <Route path={`/client-area`} component={ClientAreaView}/>
    </Switch>
  </Content>;
});

export default Routes;
