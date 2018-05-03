import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

class OrderDetails extends Component {
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

    let order = this.props.order;

    let date = new Date(order.createdAt);

    return (
        <div className={this.state.mainClassName}>
          <Card noHovering={true}
                bordered={false}
                loading={this.props.fetchingOrder}
                style={{
                  maxWidth: 1240,
                  minHeight: 600,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textAlign: 'center',
                }}>
            <div style={{
              fontSize: 24,
              marginBottom: 15,
            }}>
              Order details
            </div>
            <Card noHovering={true}
                  bordered={false}
                  bodyStyle={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: 3,
                  }}>
              <ul className="order-details-list">
                <li className="order-details-list-item">
                  <div className="order-details-label-name">
                    Order ID
                  </div>
                  <div className="order-details-label-value">
                    {this.props.orderId}
                  </div>
                </li>
                <li className="order-details-list-item">
                  <div className="order-details-label-name">
                    First name
                  </div>
                  <div className="order-details-label-value">
                    {order.firstName}
                  </div>
                </li>
                <li className="order-details-list-item">
                  <div className="order-details-label-name">
                    Last name
                  </div>
                  <div className="order-details-label-value">
                    {order.lastName}
                  </div>
                </li>
                <li className="order-details-list-item">
                  <div className="order-details-label-name">
                    Email Address
                  </div>
                  <div className="order-details-label-value">
                    {order.email}
                  </div>
                </li>
                <li className="order-details-list-item">
                  <div className="order-details-label-name">
                    Phone Number
                  </div>
                  <div className="order-details-label-value">
                    {order.phoneNumber}
                  </div>
                </li>
                <li className="order-details-list-item">
                  <div className="order-details-label-name">
                    Country
                  </div>
                  <div className="order-details-label-value">
                    {order.country}
                  </div>
                </li>
                <li className="order-details-list-item">
                  <div className="order-details-label-name">
                    State or County
                  </div>
                  <div className="order-details-label-value">
                    {order.stateOrCounty}
                  </div>
                </li>
                <li className="order-details-list-item">
                  <div className="order-details-label-name">
                    Town or City
                  </div>
                  <div className="order-details-label-value">
                    {order.townOrCity}
                  </div>
                </li>
                <li className="order-details-list-item">
                  <div className="order-details-label-name">
                    Postcode or ZIP
                  </div>
                  <div className="order-details-label-value">
                    {order.postcodeOrZIP}
                  </div>
                </li>
                <li className="order-details-list-item">
                  <div className="order-details-label-name">
                    Full Home Address
                  </div>
                  <div className="order-details-label-value">
                    {order.fullHomeAddress}
                  </div>
                </li>
                <li className="order-details-list-item">
                  <div className="order-details-label-name">
                    Order notes
                  </div>
                  <div className="order-details-label-value">
                    {order.orderNotes}
                  </div>
                </li>
                <li className="order-details-list-item">
                  <div className="order-details-label-name">
                    Ordered on
                  </div>
                  <div className="order-details-label-value">
                    {date.toString()}
                  </div>
                </li>
                <li className="order-details-list-item">
                  <div className="order-details-label-name">
                    Current status
                  </div>
                  <div className="order-details-label-value">
                    <span
                        style={
                          order.currentStatus === 'ORDERED' ?
                              { color: 'green' }
                              :
                              { color: '#10B2F8' }
                        }>{order.currentStatus}</span>
                  </div>
                </li>
                <li className="order-details-list-item">
                  <div className="order-details-label-name">
                    Total Cost
                  </div>
                  <div className="order-details-label-value">
                    {this.props.currency[1]}{ this.props.fetchedOrder ?
                      parseFloat(order.totalCost).toFixed(2) :
                      0}
                  </div>
                </li>
              </ul>
            </Card>
            <ul>
              {this.props.fetchedOrder === true ?
                  this.props.order.orderedProducts.map((product, index) => {

                    let html = { __html: product.product.productDescription };

                    return <li key={index}
                               className="order-details-products-list-item">
                      <Link
                          to={`/product/${product.product.productLink}&${product.product._id}`}
                          style={{ float: 'left' }}>
                        <img src={product.product.productThumbnail} height={80}
                             width="auto"/>
                      </Link>
                      <div className="order-product-details"
                           style={{ float: 'left' }}
                           dangerouslySetInnerHTML={html}>
                      </div>
                      <div className="order-details-price">
                        <p><b>{this.props.currency[1]}{
                          product.product.salePrice ?
                              parseFloat(product.product.salePrice *
                                  product.qty).toFixed(2) :
                              parseFloat(product.product.productPrice *
                                  product.qty).toFixed(2)}</b>
                        </p>
                        <p>{product.qty} item/s</p>
                      </div>
                    </li>;
                  })
                  :
                  null
              }
              <div className="order-details-order-summary-container">
                <div className="order-details-order-summary">
                  <p style={{ clear: 'both' }}>
              <span className="order-details-order-summary-paragraph-left">
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
            </ul>
          </Card>
        </div>
    );
  }
}

export default OrderDetails;
