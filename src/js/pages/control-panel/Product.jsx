import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Input } from 'antd';

class Product extends Component {
  render() {

    const cardMediaQuery = window.matchMedia('(max-width: 768px)');

    return (
        <Card bordered={false}
              noHovering={true}
              bodyStyle={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: cardMediaQuery.matches ? 24 : 5,
              }}>
          <div style={{ width: '100%' }}>
            <Link to={`${this.props.router.route.match.url}/add-a-product`}>
              <Button type="primary"
                      htmlType="button">
                Add product
              </Button>
            </Link>
          </div>
          <Input style={{ width: '30em' }}
                 placeholder="Search products"
                 suffix={<Icon type="search"
                               className="certain-category-icon"/>}/>
        </Card>
    );
  }
}

export default Product;
