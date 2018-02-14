import React, { Component } from 'react';

import { Rate, Icon, Button, Input, Card } from 'antd';

import ImageGallery from 'react-image-gallery';

class ViewProduct extends Component {

  turnIntoHtml = () => {
    return {
      __html: this.props.product.productDescription,
    };
  };

  render() {

    const product = this.props.product;

    const images = product.productPictures.map((image, index) => {
      return {
        original: image,
        thumbnail: image,
      };
    });

    return (
        <div>
          <section className="product-section mt15">
            <div className="preview-gallery full">
              <ImageGallery items={images}
                            thumbnailPosition="left"
                            showFullscreenButton={false}
                            showPlayButton={false}
                            slideOnThumbnailHover={true}
                            disableArrowKeys={true}/>
            </div>
            <div className="preview-details full fr">
              <div className="preview-product-details">
                <h1>
                  {product.productName}
                </h1>
                <p className="product-price full">
            <span className="price-now full">
              <strong>
                {this.props.currency[1]}
                {product.salePrice ?
                    <span>
                      <span>
                        {product.salePrice}
                      </span>
                      <span className="sale-flag">
                        (SALE)
                      </span>
                    </span>
                    :
                    product.productPrice}
              </strong>
            </span>
                  {product.salePrice ?
                      <del className="old-price full">
                        <strong>
                          {this.props.currency[1]}
                          MARKET PRICE {product.productPrice}
                        </strong>
                      </del>
                      :
                      null
                  }
                </p>
                <Rate character={<Icon type="heart"/>}
                      value={3}/>
              </div>
              <div className="preview-order-box">
                <ul className="list-style-none preview-product-list">
                  <li className="preview-order-box-list-item">
                    <label>Quantity:</label>
                    <Button shape="square" icon="minus"
                            style={{ height: 30, width: 30, padding: 0 }}
                            onClick={this.props.onDecrementQty}
                            disabled={this.props.orderQty === 1}/>
                    <Input style={{
                      height: 30,
                      width: 60,
                      padding: 0,
                      position: 'relative',
                      top: 1,
                      textAlign: 'center',
                    }}
                           value={this.props.orderQty}
                           onChange={this.props.onQtyChange}/>
                    <Button shape="square" icon="plus"
                            style={{ height: 30, width: 30, padding: 0 }}
                            onClick={this.props.onIncrementQty}/>
                  </li>
                </ul>
                <p className="pt20">
                  Availability: {product.stockStatus ?
                    <span>In Stock</span> :
                    <span style={{ color: 'red' }}>Not in Stock</span>
                }
                </p>
                <div className="preview-add-cart-div">
                  <button className="preview-add-card-button full">
                    ADD TO CART
                  </button>
                </div>
              </div>
              <div className="product-info">
                <Card bordered={false}
                      noHovering={true}
                      bodyStyle={{
                        padding: 0,
                        margin: 0,
                        borderBottom: '1px solid #ddd',
                      }}>
                  <h3 className="product-description-title">Product
                    description</h3>
                  <div className="product-description"
                       dangerouslySetInnerHTML={this.turnIntoHtml()}/>
                </Card>
              </div>
            </div>
          </section>
        </div>
    );
  }
}

export default ViewProduct;

