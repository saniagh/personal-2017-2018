import React, { Component } from 'react';
import { Card, Popconfirm, Button } from 'antd';
import { Link } from 'react-router-dom';

class ManageOrderDetails extends Component {

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
    }, 100);
  }

  render() {

    const order = this.props.order;

    return (
        <div className={this.state.mainClassName}>
          <Card noHovering={true}
                bordered={false}>
            <div className="manage-orders-view-container">
              <div className="manage-orders-view-left">
                <h2 className="manage-orders-section-title">
                  Contact details
                </h2>
                <ul>
                  <li className="manage-orders-details-list-item">
                    <span className="manage-orders-details-label-name">
                      First Name:
                    </span>
                    <span className="manage-orders-details-label-value">
                      {order.firstName}
                    </span>
                  </li>
                  <li className="manage-orders-details-list-item">
                    <span className="manage-orders-details-label-name">
                      Last Name:
                    </span>
                    <span className="manage-orders-details-label-value">
                      {order.lastName}
                    </span>
                  </li>
                  <li className="manage-orders-details-list-item">
                    <span className="manage-orders-details-label-name">
                      Email Address:
                    </span>
                    <span className="manage-orders-details-label-value">
                      {order.email}
                    </span>
                  </li>
                  <li className="manage-orders-details-list-item">
                    <span className="manage-orders-details-label-name">
                      Phone number:
                    </span>
                    <span className="manage-orders-details-label-value">
                      {order.phoneNumber}
                    </span>
                  </li>
                  <li className="manage-orders-details-list-item">
                    <span className="manage-orders-details-label-name">
                      Billing Address:
                    </span>
                    <span className="manage-orders-details-label-value">
                      {order.fullHomeAddress}, {order.townOrCity}, {order.country}, {order.postcodeOrZIP}
                    </span>
                  </li>
                  <li className="manage-orders-details-list-item">
                    <span className="manage-orders-details-label-name">
                      City & County:
                    </span>
                    <span className="manage-orders-details-label-value">
                      {order.townOrCity}, {order.stateOrCounty}
                    </span>
                  </li>
                  <li className="manage-orders-details-list-item">
                    <span className="manage-orders-details-label-name">
                      Country:
                    </span>
                    <span className="manage-orders-details-label-value">
                      {order.country}
                    </span>
                  </li>
                  <li className="manage-orders-details-list-item">
                    <span className="manage-orders-details-label-name">
                      Postal Code / ZIP:
                    </span>
                    <span className="manage-orders-details-label-value">
                      {order.postcodeOrZIP}
                    </span>
                  </li>
                  <li className="manage-orders-details-list-item">
                    <span className="manage-orders-details-label-name">
                      Current status:
                    </span>
                    <span className="manage-orders-details-label-value"
                          style={
                            order.currentStatus === 'ORDERED' ?
                                { color: 'green' }
                                :
                                { color: '#10B2F8' }
                          }>
                      {order.currentStatus}
                    </span>
                  </li>
                  <li className="manage-orders-details-list-item">
                    <span className="manage-orders-details-label-name">
                      Additional notes:
                    </span>
                    <span className="manage-orders-details-label-value">
                      {order.orderNotes}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="manage-orders-view-right">
                <h2 className="manage-orders-section-title">
                  Products ordered
                </h2>
                <ul>
                  {this.props.fetchedOrder === true ?
                      this.props.order.orderedProducts.map((product, index) => {

                        let html = { __html: product.product.productDescription };

                        return <li key={index}
                                   className="manage-order-products-list-item">
                          <h3 style={{ marginBottom: 5 }}>
                            {index + 1}. {product.product.productName}
                          </h3>
                          <Link
                              to={`/product/${product.product.productLink}&${product.product._id}`}
                              style={{ float: 'left' }}>
                            <img src={product.product.productThumbnail}
                                 height={80}
                                 width="auto"/>
                          </Link>
                          <div className="order-product-details"
                               dangerouslySetInnerHTML={html}>
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                          }}>
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                            }}>
                              <p>
                                <b>{this.props.currency[1]}{
                                  product.product.salePrice ?
                                      parseFloat(product.product.salePrice *
                                          product.qty).toFixed(2) :
                                      parseFloat(product.product.productPrice *
                                          product.qty).toFixed(2)}</b>
                              </p>
                              <p>
                                {product.qty} item/s
                              </p>
                            </div>
                          </div>
                        </li>;
                      })
                      :
                      null
                  }
                </ul>
                <div className="order-details-order-summary-container"
                     style={{ border: 0, fontWeight: 600 }}>
                  <div className="order-details-order-summary"
                       style={{ float: 'left', width: '100%' }}>
                    <p style={{ clear: 'both' }}>
                      <span
                          className="order-details-order-summary-paragraph-left">
                        Total cost:
                      </span>
                      <span
                          className="order-details-order-summary-paragraph-right">
                        {this.props.currency[1]}{ this.props.fetchedOrder ?
                          parseFloat(order.totalCost).toFixed(2) :
                          0}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="manage-orders-products-mark-completed">
                  <Popconfirm placement="top"
                              title="Are you sure about this?"
                              onConfirm={() => this.props.onCompleteOrder(
                                  order._id)}>
                    <Button icon="check"
                            type="primary"
                            disabled={order.currentStatus === 'Delivered'}>
                      Mark order as completed
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </Card>
        </div>
    );
  }
}

export default ManageOrderDetails;
