import React, { Component } from 'react';

import { Card } from 'antd';

class OrderDetails extends Component {
  render() {

    let order = this.props.order;

    let date = new Date(order.createdAt);

    return <Card noHovering={true}
                 bordered={false}
                 loading={this.props.fetchingOrder}
                 bodyStyle={{
                   display: 'flex',
                   justifyContent: 'center',
                 }}>
      <ul className="order-details-list">
        <li className="order-details-list-item">
          <div className="order-details-label-name">
            Order ID ( save this somewhere )
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
            <span style={{ color: 'green' }}>{order.currentStatus}</span>
          </div>
        </li>
      </ul>
    </Card>;
  }
}

export default OrderDetails;
