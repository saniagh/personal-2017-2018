import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Button, Input, Card } from 'antd';

import ImageGallery from 'react-image-gallery';

class ViewProduct extends Component {

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
        <div className={this.state.mainClassName}>
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
                {this.props.currency[1] }
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
                          {this.props.currency[1] }
                          {product.productPrice}
                        </strong>
                      </del>
                      :
                      null
                  }
                </p>
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
                  Availability: {product.stockStatus && product.stockQuantity ?
                    <span>In Stock</span> :
                    <span style={{ color: 'red' }}>Not in Stock</span>
                }
                </p>
                <div className="preview-add-cart-div">
                  <button className="preview-add-card-button full"
                          disabled={!product.stockQuantity}
                          onClick={product.stockQuantity ?
                              this.props.onAddProductToCart(
                                  this.props.product, this.props.orderQty) :
                              console.log('')}>
                    {product.stockQuantity ?
                        'ADD TO CART' :
                        'Product not in stock'}
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
          {this.props.upSellProduct || this.props.crossSellProduct ?
              <section className="product-section mt30">
                <ul className="list-style-none w100">
                  {this.props.upSellProduct ?
                      <li className="cross-and-up-product">
                        <div className="pr">
                          <h4 className="section-title">
                            Similar product
                          </h4>
                          <div className="products-box">
                            <Link
                                onClick={this.props.onClickUpOrCross(
                                    this.props.upSellProduct._id)}
                                to={`/product/${this.props.upSellProduct.productLink}&${this.props.upSellProduct._id}`}
                                className="products-box-link">
                              <img
                                  src={this.props.upSellProduct.productThumbnail}
                                  alt=""/>
                            </Link>
                          </div>
                        </div>
                        <p className="product-title tac">
                          <Link className="w100"
                                onClick={this.props.onClickUpOrCross(
                                    this.props.upSellProduct._id)}
                                to={`/product/${this.props.upSellProduct.productLink}&${this.props.upSellProduct._id}`}>
                            {this.props.upSellProduct.productName}
                          </Link>
                        </p>
                        <p className="product-price tac">
                          <span className="price-now">
                            <strong>
                              {this.props.currency[1]}
                              {this.props.upSellProduct.salePrice ?
                                  this.props.upSellProduct.salePrice :
                                  this.props.upSellProduct.productPrice}
                            </strong>
                          </span>
                          {this.props.upSellProduct.salePrice ?
                              <span>
                                <span className="sale-flag">(SALE)</span>
                                <del className="old-price">
                                  <strong>
                                    {this.props.currency[1]}
                                    {this.props.upSellProduct.productPrice}
                                  </strong>
                                </del>
                              </span>
                              :
                              null}
                        </p>
                      </li>
                      :
                      null
                  }
                  {this.props.crossSellProduct ?
                      <li className="cross-and-up-product">
                        <div className="pr">
                          <h4 className="section-title">
                            Usually sold togheter with
                          </h4>
                          <div className="products-box">
                            <Link
                                onClick={this.props.onClickUpOrCross(
                                    this.props.crossSellProduct._id)}
                                to={`/product/${this.props.crossSellProduct.productLink}&${this.props.crossSellProduct._id}`}
                                className="products-box-link">
                              <img
                                  src={this.props.crossSellProduct.productThumbnail}
                                  alt=""/>
                            </Link>
                          </div>
                        </div>
                        <p className="product-title tac">
                          <Link className="w100"
                                onClick={this.props.onClickUpOrCross(
                                    this.props.crossSellProduct._id)}
                                to={`/product/${this.props.crossSellProduct.productLink}&${this.props.crossSellProduct._id}`}>
                            {this.props.crossSellProduct.productName}
                          </Link>
                        </p>
                        <p className="product-price tac">
                          <span className="price-now">
                            <strong>
                              {this.props.currency[1]}
                              {this.props.crossSellProduct.salePrice ?
                                  this.props.crossSellProduct.salePrice :
                                  this.props.crossSellProduct.productPrice}
                            </strong>
                          </span>
                          {this.props.crossSellProduct.salePrice ?
                              <span>
                                <span className="sale-flag">(SALE)</span>
                                <del className="old-price">
                                  <strong>
                                    {this.props.currency[1]}
                                    {this.props.crossSellProduct.productPrice}
                                  </strong>
                                </del>
                              </span>
                              :
                              null}
                        </p>
                      </li>
                      :
                      null
                  }
                </ul>
              </section>
              :
              null
          }

        </div>
    );
  }
}

export default ViewProduct;

