import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'antd';

import Auth from '../../modules/Auth.js';

class MyOrders extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mainClassName: 'main-container hidden',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        mainClassName: 'main-container',
      });
    }, 200);
  }

  render() {
    return (
        <div className={this.state.mainClassName}>
          <Card noHovering={true}
                bordered={false}
                loading={this.props.fetchingOrders}
                style={{
                  maxWidth: 1240,
                  minHeight: 600,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
            {Auth.isUserAuthenticated() ?
                <div>
                  <div className="my-orders-header">
                    My orders
                  </div>
                  <ul>
                    {this.props.orders.map((order, index) => {

                      const publishDate = new Date(order.createdAt);

                      return <li key={index}
                                 className="my-orders-list-item">
                        <div className="my-orders-list-item-content">
                          <div className="my-orders-order-header-container">
                            <div className="my-orders-order-header">
                              <h1>
                                <Link to={`/order-details/${order._id}`}>Order
                                  id: {order._id}</Link>
                              </h1>
                              <p>
                                Placed on: {publishDate.toString()} |
                                Total: {this.props.currency[1]}{order.totalCost}
                              </p>
                            </div>
                            <div className="view-details-button-container">
                              <Link to={`/order-details/${order._id}`}
                                    className="view-details-button">
                                View details
                              </Link>
                            </div>
                          </div>
                          <div>
                            <p>
                              Subtotal: {this.props.currency[1]}{order.totalCost}</p>
                            <p style={{
                              color: order.currentStatus === 'ORDERED' ?
                                  'green' :
                                  '#10B2F8',
                            }}>{order.currentStatus}</p>
                          </div>
                        </div>
                      </li>;
                    })}
                  </ul>
                </div>
                :
                <div>
                  <div className="my-orders-header">
                    Login to continue
                  </div>
                  <div className="my-orders-spacing"
                       style={{ fontSize: 16 }}>
                    Login and refresh this page to continue
                  </div>
                </div>
            }
          </Card>
        </div>
    );
  }
}

export default MyOrders;
