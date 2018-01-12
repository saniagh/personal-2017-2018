import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Sider } = Layout;
const MenuItem = Menu.Item;
const { SubMenu } = Menu;

import Index from './Index.jsx';
import CategoriesView from './CategoriesView.jsx';
import ProductView from './ProductView.jsx';
import CreateProductView from './CreateProductView.jsx';
import EditProductView from './EditProductView.jsx';
import SettingsView from './SettingsView.jsx';

class IndexView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      selectedKeys: [],
    };
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    this.setState({ selectedKeys: [this.props.location.pathname] });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedKeys: [nextProps.location.pathname] });
    this.forceUpdate();
  }

  render() {

    const mediaQuery = window.matchMedia('(max-width: 768px)');

    return (
        <Layout>
          <Sider
              trigger={mediaQuery.matches && this.state.collapsed === false ?
                  null :
                  true}
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
              breakpoint={mediaQuery.matches ? 'sm' : ''}
              collapsedWidth={mediaQuery.matches ? 0 : ''}
              style={
                mediaQuery.matches ?
                    {
                      overflow: 'auto',
                      height: 'auto',
                      background: '#fff',
                      position: 'fixed',
                      left: 0,
                      zIndex: 2,
                      top: 0,
                    }
                    :
                    { background: '#fff' }}
          >
            { //Triggers re-render of the menu preventing submenu closing itself
              !this.state.collapsed ?
                  <Menu theme="light"
                        selectedKeys={this.state.selectedKeys}
                        defaultSelectedKeys={this.state.selectedKeys}
                        defaultOpenKeys={['/control-panel/products-submenu']}
                        mode="inline"
                        onClick={mediaQuery.matches ?
                            this.onCollapse :
                            console.log('')}>
                    {mediaQuery.matches ?
                        <MenuItem key="control-navigator"
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                  }}>
                <span>
                <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                />
                  </span>
                        </MenuItem>
                        :
                        <MenuItem disabled={true}
                                  style={{ cursor: 'default' }}>
                          <div style={{ height: 32 }}/>
                        </MenuItem>
                    }
                    <MenuItem key="/">
                      <Link to={`/`}/>
                      <Icon type="double-left"/>
                      <span>Return to site</span>
                    </MenuItem>
                    <MenuItem key="/control-panel">
                      <Link to={`/control-panel`}/>
                      <Icon type="home"/>
                      <span>Control Panel</span>
                    </MenuItem>
                    <SubMenu key="/control-panel/products-submenu"
                             title={
                               <span>
                           <Link to={`/control-panel/products`}/>
                           <Icon type="shopping-cart"/>
                         <span>
                           Products
                         </span>
                       </span>}>
                      <MenuItem key="/control-panel/products">
                        <Link to={`/control-panel/products`}/>
                        <span>All products</span>
                      </MenuItem>
                      <MenuItem key="/control-panel/products/add-a-product">
                        <Link to={`/control-panel/products/add-a-product`}/>
                        <span>Add Product</span>
                      </MenuItem>
                      <MenuItem key="/control-panel/categories">
                        <Link to={`/control-panel/categories`}/>
                        <span>Categories</span>
                      </MenuItem>
                    </SubMenu>
                    <MenuItem key="/control-panel/settings">
                      <Link to={`/control-panel/settings`}/>
                      <Icon type="setting"/>
                      <span>Settings</span>
                    </MenuItem>
                  </Menu>
                  :
                  null
            }

          </Sider>
          <Layout>
            <Header style={{ margin: '0 16px', fontSize: 24 }}>
              {this.context.router.route.location.pathname ===
              '/control-panel/categories' ?
                  <span>Products categories</span>
                  :
                  null
              }
              {this.context.router.route.location.pathname ===
              '/control-panel/products' ?
                  <span>Products overview</span>
                  :
                  null
              }
              {this.context.router.route.location.pathname ===
              '/control-panel/products/add-a-product' ?
                  <span>Add Product</span>
                  :
                  null
              }
              {this.context.router.route.location.pathname ===
              '/control-panel/settings' ?
                  <span>Settings</span>
                  :
                  null
              }
              {
                this.context.router.route.location.pathname.indexOf(
                    '/control-panel/products/edit-product') !== -1 ?
                    <span>Edit product</span>
                    :
                    null
              }
            </Header>
            <Content style={
              mediaQuery.matches ?
                  {
                    margin: '24px 16px',
                    padding: 0,
                    background: '#fff',
                    minHeight: 280,
                  }
                  :
                  {
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                  }
            }>
              <Route exact path={`/control-panel/`} component={Index}/>
              <Route exact path={`${this.props.match.url}/products`}
                     component={ProductView}/>
              <Route path={`${this.props.match.url}/categories`}
                     component={CategoriesView}/>
              <Route exact
                     path={`${this.props.match.url}/products/add-a-product`}
                     component={CreateProductView}/>
              <Route exact
                     path={`${this.props.match.url}/products/edit-product/:productLink`}
                     component={EditProductView}/>
              <Route exact
                     path={`${this.props.match.url}/settings`}
                     component={SettingsView}/>
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
