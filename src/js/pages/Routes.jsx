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
        <div className="sub-header-promo-container">
            <div className="header-promo">
              <div className="header-promo-banner">
                <div className="o-row">
                  <div className="o-column">
                    <div className="o-line">
                      <p className="header-promo-title">
                        Promo banner text. Add functionality to settings!
                      </p>
                      <div className="header-promo-link-container">
                        <Link to={`/`}
                              className="header-promo-link">
                          Promo link!
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
