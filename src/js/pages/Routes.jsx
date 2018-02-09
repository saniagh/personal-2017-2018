import React, { Component } from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';

import { Layout, Breadcrumb } from 'antd';

const BreadcrumbItem = Breadcrumb.Item;

import HomeView from './home/HomeView.jsx';
import ClientAreaView from './client-area/ClientAreaView.jsx';
import IndexView from './control-panel/IndexView.jsx';

const Routes = withRouter((props) => {
  const { location } = props;
  const mediaQuery = window.matchMedia('(max-width: 768px)');

  let breadcrumbNameMap = {
    '/': 'Home',
    '/client-area': 'Client Area',
    '/control-panel': 'Control Panel',
    '/control-panel/products': 'Products',
    '/control-panel/products/add-a-product': 'Add Product',
    '/control-panel/categories': 'Categories',
  };

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
        {location.pathname === '/' ?
            null
            :
            <div className="breadcrumbs-container">
              {location.pathname.indexOf(
                  '/control-panel/products/edit-product/') !==
              -1 ?
                  <Breadcrumb style={{ margin: '16px 0' }}
                              separator=">">
                    <BreadcrumbItem key="home">
                      <Link to="/">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem key="Control Panel">
                      <Link to='/client-area'>Control Panel</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem key="Products">
                      <Link to='/control-panel/products'>Products</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem key="Edit Product">
                      <Link to={location.pathname}>Edit Product</Link>
                    </BreadcrumbItem>
                  </Breadcrumb>
                  :
                  <Breadcrumb style={{ margin: '16px 0' }}
                              separator=">">
                    {breadcrumbItems}
                  </Breadcrumb>
              }
            </div>
        }

        <Switch>
              <Route exact path={`/`} component={HomeView}/>
              <Route path={`/client-area`} component={ClientAreaView}/>
              <Route path={`/control-panel`} component={IndexView}/>
            </Switch>

      </span>
  );
});

export default Routes;
