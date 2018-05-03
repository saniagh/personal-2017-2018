import React, { Component } from 'react';
import { Select, Collapse, Pagination, Button, Modal, Card } from 'antd';
import { Route, Link } from 'react-router-dom';

const Option = Select.Option;
const Panel = Collapse.Panel;

import { smoothScroll } from '../../modules/scrollFunction.js';

import QuickViewProductView from './QuickViewProductView.jsx';

class RegularSalePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productsToShow: 60,
      indexStart: 1,
      indexEnd: 60,
      pageNumber: 1,
      isModalVisible: false,
      chosenProductKey: -1,
      mainClassName: 'main-container hidden',
    };
  }

  onProductsToShowChange = (value) => () => {
    this.setState({
      productsToShow: value,
      indexStart: 1,
      indexEnd: value === 60 ? 60 : 120,
      pageNumber: 1,
    });
  };

  onPageChange = (page) => {
    if (page !== this.state.pageNumber) {
      smoothScroll();
      this.setState({
        pageNumber: page,
        indexStart: this.state.productsToShow === 60 ?
            1 + (60 * (page - 1)) :
            1 + (120 * (page - 1)),
        indexEnd: this.state.productsToShow === 60 ?
            (60 * page) :
            (120 * page),
      });
    }
  };

  onShowModal = (key) => {
    this.setState({
      isModalVisible: true,
      chosenProductKey: key,
    });
  };

  onHideModal = () => {
    this.setState({
      isModalVisible: false,
      chosenProductKey: -1,
    });
  };

  onLoadMore = () => {
    this.setState({
      indexEnd: this.state.indexEnd + this.state.productsToShow,
    });
  };

  componentDidMount() {
    window.addEventListener('popstate', this.onHideModal);
    setTimeout(() => {
      this.setState({
        mainClassName: 'main-container',
      });
    }, 100);
  }

  render() {

    let asideMenu;

    if (this.props.fetchedSettings) {
      asideMenu = this.props.siteNavigation.map((option, index) => {
        return <li key={index}>
          <div className="menu-title">
            <a href={option.optionAnchor}>
              {option.optionName}
            </a>
          </div>
          <div className="menu-list">
            <dl>
              {option.siteNavigationColumn1.map((line, i) => {
                if (line.lineType === 'title') {
                  return <dt key={i}>
                    <a href={line.lineAnchor}>
                      {line.lineText}
                    </a>
                  </dt>;
                } else if (line.lineType === 'normal') {
                  return <dd key={i}>
                    <a href={line.lineAnchor}>
                      {line.lineText}
                    </a>
                  </dd>;
                }
              })}
            </dl>
            <dl>
              {option.siteNavigationColumn2.map((line, i) => {
                if (line.lineType === 'title') {
                  return <dt key={i}>
                    <a href={line.lineAnchor}>
                      {line.lineText}
                    </a>
                  </dt>;
                } else if (line.lineType === 'normal') {
                  return <dd key={i}>
                    <a href={line.lineAnchor}>
                      {line.lineText}
                    </a>
                  </dd>;
                }
              })}
            </dl>
            <dl>
              {option.siteNavigationColumn3.map((line, i) => {
                if (line.lineType === 'title') {
                  return <dt key={i}>
                    <a href={line.lineAnchor}>
                      {line.lineText}
                    </a>
                  </dt>;
                } else if (line.lineType === 'normal') {
                  return <dd key={i}>
                    <a href={line.lineAnchor}>
                      {line.lineText}
                    </a>
                  </dd>;
                }
              })}
            </dl>
          </div>
        </li>;
      });
    }

    let asideTags;

    if (this.props.fetchedTags) {
      asideTags = this.props.tags.map((tag, index) => {
        return <li key={index}>
          <Link to={`/browse-shop/${tag.tagName}`}
                onClick={this.props.fetchProductsOnDemandFilter(tag.tagName)}>
            {tag.tagName} ({tag.usedNTimes})
          </Link>
        </li>;
      });
    }

    let asideCategories;

    if (this.props.fetchedCategories) {
      asideCategories = this.props.categories.map((category, index) => {
        return <li key={index}>
          <Link to={`/browse-shop/${category.categoryName}`}
                onClick={this.props.fetchProductsOnDemandFilter(
                    category.categoryName)}>
            {category.categoryName} ({category.usedNTimes})
          </Link>
        </li>;
      });
    }

    let productsList;

    if (this.props.fetchedProducts && this.props.fetchedSettings) {
      productsList = this.props.products.map((product, index) => {
        if (index + 1 >= this.state.indexStart && index < this.state.indexEnd)
          return <li key={index + 1}
                     className="products-list-item">
            <div className="pr">
              <div className="products-box">
                <Link to={`/product/${product.productLink}&${product._id}`}
                      className="products-box-link">
                  <img src={product.productThumbnail} alt=""/>
                </Link>
                {product.productFeatured ?
                    <span className="featured-badge">
                Featured
              </span>
                    :
                    null
                }
                <p className="quick-view-product">
                  <a onClick={ () => {
                    this.onShowModal(index);
                    this.props.history.push(
                        '/browse-shop/' + this.props.searchTerm + '/' +
                        product.productName);
                  }}>
                    Quick View
                  </a>
                </p>
              </div>
            </div>
            <p className="product-title">
              <Link to={`/product/${product.productLink}&${product._id}`}>
                {product.productName}
              </Link>
            </p>
            <p className="product-price">
            <span className="price-now">
              <strong>
                {this.props.currency[1]}
                {product.salePrice ?
                    product.salePrice :
                    product.productPrice}
              </strong>
            </span>
              {product.salePrice ?
                  <span>
                  <span className="sale-flag">(SALE)</span>
                  <del className="old-price">
                    <strong>
                      {this.props.currency[1]}
                      {product.productPrice}
                    </strong>
                  </del>
                </span>
                  :
                  null
              }
            </p>
          </li>;
      });
    }

    const cardMediaQuery = window.matchMedia('(max-width: 1300px)');

    return (
        <div className={this.state.mainClassName}>
          <div className="main-wrap">
            <Card bordered={false}
                  noHovering={true}
                  loading={!this.props.fetchedProducts}
                  style={{
                    padding: 0,
                  }}
                  bodyStyle={{
                    margin: 0,
                    padding: 0,
                  }}>
              <div style={{ marginBottom: 40, height: 30 }}>
                <div className="results-count-wrap">
                  <div className="results-count fl">
                    {this.props.fetchedProducts ?
                        <span>
               {this.props.searchTerm}: ({this.props.products.length} results)
                  </span>
                        :
                        null
                    }
                  </div>
                </div>
              </div>
            </Card>
            <aside className="aside-nav fl">
              <Card bordered={false}
                    noHovering={true}
                    loading={!this.props.fetchedCategories}
                    style={{
                      padding: 0,
                    }}
                    bodyStyle={{
                      margin: 0,
                      padding: 0,
                    }}>
                <section className="aside-section">
                  <div className="aside-section-list-wrap">
                    <ul>
                      {asideMenu}
                    </ul>
                  </div>
                </section>
              </Card>
              <Card bordered={false}
                    noHovering={true}
                    loading={!this.props.fetchedCategories &&
                    !this.props.fetchedTags}
                    style={{
                      padding: 0,
                    }}
                    bodyStyle={{
                      margin: 0,
                      padding: 0,
                    }}>
                <section className="filters">
                  <section className="filters-list">
                    <Collapse defaultActiveKey={['1']}>
                      <Panel header="Categories" key="1">
                        <ul className="list-style-none">
                          {asideCategories}
                        </ul>
                      </Panel>
                    </Collapse>
                  </section>
                  <section className="filters-list">
                    <Collapse defaultActiveKey={['1']}>
                      <Panel header="Tags" key="1">
                        <ul className="list-style-none">
                          {asideTags}
                        </ul>
                      </Panel>
                    </Collapse>
                  </section>
                </section>
              </Card>
            </aside>
            <p className="search-term">{this.props.searchTerm}</p>
            <div className="sort-by fr">
              <div className="fl">
                <strong className="sort-by-text">Sort by</strong>
                <Select defaultValue="featured"
                        style={{ width: 144, }}
                        onChange={this.props.changeSortByStatus}>
                  <Option value="featured">Featured</Option>
                  <Option value="onsale">On Sale</Option>
                  <Option value="lowhigh">Price low to high</Option>
                  <Option value="highlow">Price high to low</Option>
                </Select>
              </div>
              <div className="view-number fr">
                <p className="fl">
                  Showing:
                  <span
                      className={`showing-number ${this.state.productsToShow ===
                      60 ? 'active' : null}`}
                      onClick={this.onProductsToShowChange(60)}>
                  60
                </span>
                  <span
                      className={`showing-number ${this.state.productsToShow ===
                      120 ? 'active' : null}`}
                      onClick={this.onProductsToShowChange(120)}>
                  120
                </span>
                </p>
              </div>
            </div>

            <section className="products-content-box fr">
              <div className="margin-top30">
                <ul className="products-list">
                  {productsList}
                </ul>
              </div>
              <div className="pagination-container">
                <Card bordered={false}
                      noHovering={true}
                      loading={!this.props.fetchedProducts}
                      style={{
                        padding: 0,
                      }}
                      bodyStyle={{
                        margin: 0,
                        padding: 0,
                      }}>
                  {cardMediaQuery.matches ?
                      <Button onClick={this.props.products.length >
                      this.state.indexEnd ? this.onLoadMore : () => {
                      }}
                              type="primary"
                              disabled={this.props.products.length <
                              this.state.indexEnd}>
                        {this.props.products.length >
                        this.state.indexEnd ? 'View more' : 'No more to show'}
                      </Button>
                      :
                      <Pagination current={this.state.pageNumber}
                                  onChange={this.onPageChange}
                                  pageSize={this.state.productsToShow}
                                  total={this.props.products.length}/>
                  }
                </Card>
              </div>
            </section>
            <Modal wrapClassName="vertical-center-modal"
                   width="auto"
                   visible={this.state.isModalVisible}
                   title={null}
                   footer={null}
                   style={{ maxWidth: window.innerWidth }}
                   onOk={this.onHideModal}
                   onCancel={() => {
                     this.onHideModal();
                     this.props.history.replace(
                         '/browse-shop/' + this.props.searchTerm);
                   }}>
              <QuickViewProductView
                  product={this.props.products[this.state.chosenProductKey]}
                  currency={this.props.currency}
                  onHideModal={this.onHideModal}/>
            </Modal>
          </div>
        </div>
    );
  }
}

export default RegularSalePage;
