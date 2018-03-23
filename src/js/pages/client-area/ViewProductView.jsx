import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { notification, Card } from 'antd';

import ViewProduct from './ViewProduct.jsx';

class ViewProductView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: '',
      fetchingProduct: false,
      fetchedProduct: false,
      fetchingProductError: false,
      currency: [],
      fetchingSettings: false,
      fetchedSettings: false,
      fetchingSettingsError: false,
      orderQty: 1,
      upSellProduct: {},
      crossSellProduct: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      upSellProduct: {},
      crossSellProduct: {},
    });
    if (this.props.match.params.productId !==
        nextProps.match.params.productId) {
      axios({
        method: 'post',
        url: '/product/view-product',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          productId: nextProps.match.params.productId,
        }),
      }).then((res) => {
        this.setState({
          fetchingProduct: false,
          fetchedProduct: true,
          fetchingProductError: false,
          product: res.data.product[0],
        });

        axios({
          method: 'post',
          url: '/product/view-product',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
          data: qs.stringify({
            productId: res.data.product[0].upSellLink,
          }),
        }).then((response) => {
          this.setState({
            upSellProduct: response.data.product[0],
          });
        }).catch(() => {
        });

        axios({
          method: 'post',
          url: '/product/view-product',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
          data: qs.stringify({
            productId: res.data.product[0].crossSellLink,
          }),
        }).then((response) => {
          this.setState({
            crossSellProduct: response.data.product[0],
          });
        }).catch(() => {
        });

      }).catch(() => {

        notification.error({
          message: 'Fatal error',
          description: 'An error has occurred while fetching the product.',
        });

        this.setState({
          fetchingProduct: false,
          fetchedProduct: false,
          fetchingProductError: true,
        });
      });
    }
  }

  componentDidMount() {
    this.setState({
      fetchingProduct: true,
      fetchingSettings: true,
    });
    axios({
      method: 'post',
      url: '/product/view-product',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        productId: this.props.match.params.productId,
      }),
    }).then((res) => {
      this.setState({
        fetchingProduct: false,
        fetchedProduct: true,
        fetchingProductError: false,
        product: res.data.product[0],
      });

      axios({
        method: 'post',
        url: '/product/view-product',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          productId: res.data.product[0].upSellLink,
        }),
      }).then((response) => {
        this.setState({
          upSellProduct: response.data.product[0],
        });
      }).catch(() => {
      });

      axios({
        method: 'post',
        url: '/product/view-product',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          productId: res.data.product[0].crossSellLink,
        }),
      }).then((response) => {
        this.setState({
          crossSellProduct: response.data.product[0],
        });
      }).catch(() => {
      });

    }).catch(() => {

      notification.error({
        message: 'Fatal error',
        description: 'An error has occurred while fetching the product.',
      });

      this.setState({
        fetchingProduct: false,
        fetchedProduct: false,
        fetchingProductError: true,
      });
    });
    axios({
      method: 'get',
      url: '/settings/get-settings',
    }).then((res) => {
      this.setState({
        fetchingSettings: false,
        fetchedSettings: true,
        fetchingSettingsError: false,
        currency: res.data.settings[0].currency,
      });
    }).catch(() => {
      this.setState({
        fetchingSettings: false,
        fetchedSettings: false,
        fetchingSettingsError: true,
      });
      notification.error({
        message: 'Fatal error',
        description: 'An error has occurred while fetching shop\'s settings. Please contact an administrator.',
      });
    });
  }

  onIncrementQty = () => {
    this.setState({
      orderQty: this.state.orderQty + 1,
    });
  };

  onDecrementQty = () => {
    this.setState({
      orderQty: this.state.orderQty - 1,
    });
  };

  onQtyChange = (e) => {
    this.setState({
      orderQty: e.target.value,
    });
  };

  onClickUpOrCross = (value) => () => {
    this.setState({
      upSellProduct: {},
      crossSellProduct: {},
      fetchingProduct: true,
    });
    axios({
      method: 'post',
      url: '/product/view-product',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        productId: value,
      }),
    }).then((res) => {
      this.setState({
        fetchingProduct: false,
        fetchedProduct: true,
        fetchingProductError: false,
        product: res.data.product[0],
      });

      axios({
        method: 'post',
        url: '/product/view-product',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          productId: res.data.product[0].upSellLink,
        }),
      }).then((response) => {
        this.setState({
          upSellProduct: response.data.product[0],
        });
      }).catch(() => {
      });

      axios({
        method: 'post',
        url: '/product/view-product',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          productId: res.data.product[0].crossSellLink,
        }),
      }).then((response) => {
        this.setState({
          crossSellProduct: response.data.product[0],
        });
      }).catch(() => {
      });

    }).catch(() => {

      notification.error({
        message: 'Fatal error',
        description: 'An error has occurred while fetching the product.',
      });

      this.setState({
        fetchingProduct: false,
        fetchedProduct: false,
        fetchingProductError: true,
      });
    });
  };

  render() {
    if (this.state.fetchedProduct === true)
      return <ViewProduct product={this.state.product}
                          currency={this.state.currency}
                          orderQty={this.state.orderQty}
                          upSellProduct={this.state.upSellProduct}
                          crossSellProduct={this.state.crossSellProduct}
                          onIncrementQty={this.onIncrementQty}
                          onDecrementQty={this.onDecrementQty}
                          onQtyChange={this.onQtyChange}
                          onClickUpOrCross={this.onClickUpOrCross}/>;
    else return <Card loading={true}
                      bordered={false}
                      noHovering={true}/>;
  }
}

export default ViewProductView;

