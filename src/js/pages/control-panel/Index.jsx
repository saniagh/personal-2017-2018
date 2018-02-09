import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

class Index extends Component {
  render() {
    const desktopView = window.matchMedia('(min-width: 60em)');
    const tabletView = window.matchMedia('(min-width: 40em)');

    let width = '100%';

    if (desktopView.matches) {
      width = '48%';
    } else if (tabletView.matches) {
      width = '100%';
    }

    return (
        <div className="card-responsive-list">
          <Card bordered={false}
                hoverable
                title="All products"
                style={{
                  display: 'flex',
                  width: width,
                  flexDirection: 'column',
                  cursor: 'pointer',
                  margin: 5,
                }}
                bodyStyle={{
                  padding: '0.5em',
                }}
                onClick={() => this.props.history.push(
                    '/control-panel/products')}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src="/images/products.jpg"
                   style={{ maxWidth: '100%', height: 300 }}/>
            </div>
            <div style={{ padding: '0.5em', textAlign: 'center' }}>On this page
              you can view all
              products currently added on the website, whether they are in
              stock
              or not, visible or not.
            </div>
          </Card>
          <Card bordered={false}
                hoverable
                title="Add product"
                style={{
                  display: 'flex',
                  width: width,
                  flexDirection: 'column',
                  cursor: 'pointer',
                  margin: 5,
                }}
                bodyStyle={{
                  padding: '0.5em',
                }}
                onClick={() => this.props.history.push(
                    '/control-panel/products/add-a-product')}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src="/images/add-product.jpg"
                   style={{ maxWidth: '100%', height: 300 }}/>
            </div>
            <div style={{ padding: '0.5em', textAlign: 'center' }}>On this page
              you can add new
              products to the shop which you can choose to make visible right
              away, or make them visible only to you, for later edit&add to the
              website.
            </div>
          </Card>
          <Card bordered={false}
                hoverable
                title="Categories management"
                style={{
                  display: 'flex',
                  width: width,
                  flexDirection: 'column',
                  cursor: 'pointer',
                  margin: 5,
                }}
                bodyStyle={{
                  padding: '0.5em',
                }}
                onClick={() => this.props.history.push(
                    '/control-panel/categories')}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src="/images/categories.gif"
                   style={{ maxWidth: '100%', height: 300 }}/>
            </div>
            <div style={{ padding: '0.5em', textAlign: 'center' }}>Here you can
              manage product categories available on the website. Every category
              added here will be made public immediately and will appear in
              search results.
            </div>
          </Card>
          <Card bordered={false}
                hoverable
                title="Shop's settings"
                style={{
                  display: 'flex',
                  width: width,
                  flexDirection: 'column',
                  cursor: 'pointer',
                  margin: 5,
                }}
                bodyStyle={{
                  padding: '0.5em',
                }}
                onClick={() => this.props.history.push(
                    '/control-panel/settings')}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src="/images/currency.jpg"
                   style={{ maxWidth: '100%', height: 300 }}/>
            </div>
            <div style={{ padding: '0.5em', textAlign: 'center' }}>You can
              change the store's currency here. Other settings are soon to be
              added if necessary.
            </div>
          </Card>
        </div>
    );
  }
}

export default Index;
