import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Rate, Icon, Button, Input } from 'antd';

import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';

class QuickViewProduct extends Component {
  render() {

    const product = this.props.product;

    const images = product.productPictures.map((image, index) => {
      return {
        original: image,
        thumbnail: image,
      };
    });

    let percentage = 0;

    if (product.salePrice && product.productPrice) {
      percentage = Math.floor((product.productPrice - product.salePrice) /
          product.productPrice * 100);
    }

    return (
        <div className="preview-wrap">
          <div className="preview-gallery">
            <ImageGallery items={images}
                          thumbnailPosition="left"
                          showFullscreenButton={false}
                          showPlayButton={false}
                          slideOnThumbnailHover={true}
                          disableArrowKeys={true}/>
          </div>
          <div className="preview-details">
            <div className="preview-product-details">
              <h1>
                {product.productName}
              </h1>
              <p className="product-price preview">
            <span className="price-now preview">
              <strong>
                {this.props.currency[1]}
                {product.salePrice ?
                    product.salePrice :
                    product.productPrice}
              </strong>
            </span>
                {product.salePrice ?
                    <span>
                      <del className="old-price preview">
                        <strong>
                          {this.props.currency[1]}
                          {product.productPrice}
                        </strong>
                      </del>
                      <span className="percentage-spacing">
                        {percentage}% OFF
                      </span>
                      <span className="sale-flag">
                        (SALE)
                      </span>
                    </span>
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
                <button className="preview-add-card-button">
                  ADD TO CART
                </button>
              </div>
              <div className="preview-link-to-full">
                <Link to={`/product/${product.productLink}&${product._id}`}
                      onClick={this.props.onHideModal}>
                  <span>
                    ...or view the full product here
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default QuickViewProduct;
