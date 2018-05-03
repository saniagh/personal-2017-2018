import React, { Component } from 'react';

import { countries } from '../../modules/allCountries.js';

import Auth from '../../modules/Auth.js';

import { Card, Input, Tooltip, Select, Checkbox, Spin } from 'antd';
const TextArea = Input.TextArea;

const Option = Select.Option;

class Checkout extends Component {

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

    const mediaQuery = window.matchMedia('(max-width: 1025px)');

    const countriesOptions = countries.map((country) => {
      return <Option key={country.name}>
        {country.name}
      </Option>;
    });

    let totalCost = 0;
    for (let i = 0; i < this.props.shoppingCartProducts.length; i++) {
      let item = this.props.shoppingCartProducts[i];
      if (item.product.salePrice)
        totalCost += item.qty * item.product.salePrice;
      else
        totalCost += item.qty * item.product.productPrice;
    }

    totalCost = Math.round(totalCost * 100) / 100;

    return (
        <div className={this.state.mainClassName}>
          <Spin tip={this.props.savingOrder ?
              'Creating your order...' :
              'Order created. Please wait...'}
                size="large"
                spinning={this.props.savingOrder || this.props.savedOrder}>
            <div className="checkout-container">
              <h2 className="checkout-page-title">
                Checkout
              </h2>
              <div className="checkout-body">
                <div className="checkout-info">
                  {!Auth.isUserAuthenticated() && !this.props.reducerEmail ?
                      <div className="checkout-login-info">
                        Returning customer? <span
                          className="checkout-login-link"
                          onClick={this.props.onShowLoginModal}>
                Click here to login
              </span>
                      </div>
                      :
                      null
                  }
                </div>
                <div className="checkout-form-container">
                  <div className="checkout-form">
                    <h3>Billing details</h3>
                    <div className="checkout-row">
                      <div className="checkout-input-wrap">
                <span className="checkout-input-label">
                  First Name <Tooltip placement="topLeft" title="Required">
                  <span className="required-star">
                    *
                  </span>
                </Tooltip>
                </span>
                        <input
                            className={`checkout-input ${this.props.errors.firstName ?
                                'error' :
                                null}`}
                            value={this.props.firstName}
                            onChange={this.props.onFirstNameChange}/>
                      </div>
                      <div className="checkout-input-wrap">
                <span className="checkout-input-label">
                  Email <Tooltip placement="topLeft" title="Required">
                  <span className="required-star">
                    *
                  </span>
                </Tooltip>
                </span>
                        <input disabled={this.props.reducerEmail}
                               className={`checkout-input ${this.props.errors.email ?
                                   'error' :
                                   null}`}
                               value={this.props.email}
                               onChange={this.props.onEmailChange}/>
                      </div>
                    </div>
                    <div className="checkout-row">
                      <div className="checkout-input-wrap">
                <span className="checkout-input-label">
                  Last Name <Tooltip placement="topLeft" title="Required">
                  <span className="required-star">
                    *
                  </span>
                </Tooltip>
                </span>
                        <input
                            className={`checkout-input ${this.props.errors.lastName ?
                                'error' :
                                null}`}
                            value={this.props.lastName}
                            onChange={this.props.onLastNameChange}/>
                      </div>
                      <div className="checkout-input-wrap">
                      <span
                          className="checkout-input-label">Phone number:</span>
                        <input
                            className={`checkout-input ${this.props.errors.phoneNumber ?
                                'error' :
                                null}`}
                            value={this.props.phoneNumber}
                            onChange={this.props.onPhoneNumberChange}/>
                      </div>
                    </div>
                    <div className="checkout-row">
                      <div className="checkout-input-wrap full">
                <span className="checkout-input-label">
                  Country <Tooltip placement="topLeft" title="Required">
                  <span className="required-star">
                    *
                  </span>
                </Tooltip>
                </span>
                        <Select style={mediaQuery.matches ?
                            {
                              width: '60%',
                            }
                            :
                            {
                              width: 700,
                            }
                        }
                                defaultValue={this.props.country}
                                placeholder="Select a country..."
                                onChange={this.props.onCountryChange}>
                          {countriesOptions}
                        </Select>
                      </div>
                    </div>
                    <div className="checkout-row">
                      <div className="checkout-input-wrap full">
                <span className="checkout-input-label">
                  State/County <Tooltip placement="topLeft" title="Required">
                  <span className="required-star">
                    *
                  </span>
                </Tooltip>
                </span>
                        <input
                            className={`checkout-input full ${this.props.errors.stateOrCounty ?
                                'error' :
                                null}`}
                            value={this.props.stateOrCounty}
                            onChange={this.props.onStateOrCountyChange}/>
                      </div>
                    </div>
                    <div className="checkout-row">
                      <div className="checkout-input-wrap full">
                <span className="checkout-input-label">
                  Full Home Address <Tooltip placement="topLeft"
                                             title="Required">
                  <span className="required-star">
                    *
                  </span>
                </Tooltip>
                </span>
                        <input
                            className={`checkout-input full ${this.props.errors.fullHomeAddress ?
                                'error' :
                                null}`}
                            value={this.props.fullHomeAddress}
                            onChange={this.props.onFullHomeAddressChange}/>
                      </div>
                    </div>
                    <div className="checkout-row">
                      <div className="checkout-input-wrap">
                <span className="checkout-input-label">
                  Town/City <Tooltip placement="topLeft" title="Required">
                  <span className="required-star">
                    *
                  </span>
                </Tooltip>
                </span>
                        <input
                            className={`checkout-input ${this.props.errors.townOrCity ?
                                'error' :
                                null}`}
                            value={this.props.townOrCity}
                            onChange={this.props.onTownOrCityChange}/>
                      </div>
                      <div className="checkout-input-wrap">
                <span className="checkout-input-label">
                  Postcode/ZIP <Tooltip placement="topLeft" title="Required">
                  <span className="required-star">
                    *
                  </span>
                </Tooltip>
                </span>
                        <input
                            className={`checkout-input ${this.props.errors.postcodeOrZIP ?
                                'error' :
                                null}`}
                            value={this.props.postcodeOrZIP}
                            onChange={this.props.onPostcodeOrZIPChange}/>
                      </div>
                    </div>
                    <div className="checkout-row"
                         style={{ minHeight: 200 }}>
                      <div className="checkout-input-wrap full"
                           style={{ height: 200 }}>
                <span className="checkout-input-label">
                  Order Notes
                </span>
                        <TextArea style={{
                          maxWidth: 700,
                          maxHeight: 100,
                          fontSize: 14,
                          fontWeight: 700,
                          fontColor: '#333',
                          border: this.props.errors.orderNotes ?
                              '3px solid rgba(226, 44, 44, 0.6)' :
                              '',
                        }}
                                  placeholder="Notes about your order, e.g. special notes for delivery"
                                  value={this.props.orderNotes}
                                  onChange={this.props.onOrderNotesChange}/>
                      </div>
                    </div>
                  </div>
                  <div className="checkout-final-details">
                    <div className="checkout-final-details-title">
                      Your order
                    </div>
                    <ul className="checkout-final-details-body">
                      {this.props.shoppingCartProducts.map((item, index) => {
                        return <li key={index}
                                   className="checkout-final-details-row">
                  <span className="checkout-final-details-name">
                    <img src={item.product.productThumbnail}
                         alt=""
                         style={{
                           minWidth: 50,
                           minHeight: 50,
                           maxWidth: 50,
                           maxHeight: 50,
                           marginRight: 5,
                         }}/>
                    {item.product.productName} x {item.qty}
                  </span>
                          <span className="checkout-final-details-price">
                    {this.props.currency[1] }{item.product.salePrice ?
                              item.product.salePrice :
                              item.product.productPrice}
                  </span>
                        </li>;
                      })}
                      <li className="checkout-final-details-row">
                <span className="checkout-final-details-name">
                  Total
                </span>
                        <span className="checkout-final-details-price">
                  {this.props.currency[1] }{totalCost}
                </span>
                      </li>
                      <li className="checkout-final-details-row">
                        <Checkbox checked={this.props.confirmedTermsOfService}
                                  onChange={this.props.onConfirmTermsOfService}
                                  style={{ fontSize: 16 }}>
                          I've read and accepted the
                          <span>Terms & Conditions</span>
                        </Checkbox>
                      </li>
                      <li>
                        <button className="place-order-button"
                                onClick={this.props.onSaveOrder}>
                          Place order
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Spin>
        </div>
    );
  }
}

export default Checkout;
