import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Sider } = Layout;
const MenuItem = Menu.Item;
const { SubMenu } = Menu;

import Index from './Index.jsx';
import CategoriesView from './CategoriesView.jsx';

class IndexView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  controlNavigator = (e) => {
    if (e.key === 'control-navigator')
      this.onCollapse();
  };

  render() {
    return (
        <Layout>
          <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
          >
            <Menu theme="dark"
                  selectedKey={[`${this.context.router.route.location.pathname}`]}
                  defaultSelectedKeys={[`${this.context.router.route.location.pathname}`]}
                  mode="inline"
                  onClick={this.controlNavigator}>
              <MenuItem key="control-navigator"
                        style={{ display: 'flex', justifyContent: 'center' }}>
                <span>
                <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                />
                  </span>
              </MenuItem>
              <MenuItem key="/control-panel">
                <Link to={`/control-panel`}/>
                <Icon type="home"/>
                <span>Control Panel</span>
              </MenuItem>
              <SubMenu key="/control-panel/products"
                       title={<span><Link
                           to={`/control-panel/products`}/><Icon
                           type="shopping-cart"/><span>Products</span></span>}>
                <MenuItem key="/control-panel/products">
                  <Link to={`/control-panel/products`}/>
                  <span>All products</span>
                </MenuItem>
                <MenuItem key="/control-panel/categories">
                  <Link to={`/control-panel/categories`}/>
                  <span>Categories</span>
                </MenuItem>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ margin: '0 16px', fontSize: 24 }}>
              {this.context.router.route.location.pathname ===
              '/control-panel/categories' ?
                  <span>Products categories</span>
                  :
                  null
              }
            </Header>
            <Content style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}>
              <Route exact path={`/control-panel/`} component={Index}/>
              <Route path={`${this.props.match.url}/categories`}
                     component={CategoriesView}/>
            </Content>
          </Layout>
        </Layout>
    );
  }
}

IndexView.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default IndexView;
