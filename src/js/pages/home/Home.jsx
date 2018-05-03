import React, { Component } from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Card } from 'antd';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseOnCarousel: false,
      anchorHeight: 0,
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

  onMouseCarouselHover = () => {
    this.setState({
      isMouseOnCarousel: !this.state.isMouseOnCarousel,
    });
  };

  render() {

    let element = document.getElementById('height-div');

    let anchorHeight = 0;

    if (element) {
      anchorHeight = element.offsetHeight;
    }

    let sliderItems = '';
    let arrayWithNoEmpty = [];

    if (this.props.fetchedSettings) {

      for (let i = 0; i < this.props.sliderImages.length; i++) {
        if (this.props.sliderImages[i].imageUrl)
          arrayWithNoEmpty.push(this.props.sliderImages[i]);
      }

      sliderItems = arrayWithNoEmpty.map((url, index) => {
        return <a key={index}
                  href={url.imageAnchor}
                  style={{ height: anchorHeight, }}>
          <div className="slide-div"
               id="height-div">
            <img src={url.imageUrl}/>
          </div>
        </a>;
      });
    }

    return (
        <div className={this.state.mainClassName}>
          <div className="index-main">
            <Card bordered={false}
                  noHovering={true}
                  loading={!this.props.fetchedSettings}
                  style={{
                    padding: 0,
                  }}
                  bodyStyle={{
                    margin: 0,
                    padding: 0,
                  }}>
              <div onMouseEnter={this.onMouseCarouselHover}
                   onMouseLeave={this.onMouseCarouselHover}>
                <Carousel interval={5000}
                          autoPlay
                          infiniteLoop
                          showThumbs={false}
                          showStatus={false}
                          showArrows={this.state.isMouseOnCarousel}>
                  {sliderItems}
                </Carousel>
              </div>
              <div className="index-promotion">
                <div className="index-promotion-top">
                  <a href={this.props.leftIndexPromotionsDesktop.imageAnchor}>
                    <img className="index-promotion-top-image"
                         src={this.props.leftIndexPromotionsDesktop.imageUrl}
                         alt=""/>
                  </a>
                  <a href={this.props.rightIndexPromotionsDesktop.imageAnchor}>
                    <img className="index-promotion-top-image"
                         src={this.props.rightIndexPromotionsDesktop.imageUrl}
                         alt=""/>
                  </a>
                </div>
                <div className="index-promotion-bottom">
                  <a href={this.props.footerIndexPromotionsDesktop.imageAnchor}>
                    <img className="index-promotion-bottom-image"
                         src={this.props.footerIndexPromotionsDesktop.imageUrl}
                         alt=""/>
                  </a>
                </div>
                <a className="index-block-title"
                   href="">
                  What are you looking for ?
                </a>
              </div>
              <div className="index-new-arrivals">
                {this.props.indexPromotionsNewArrivals.map((item, index) => {
                  return <a href={item.imageAnchor}
                            key={index}>
                    <img className="index-new-arrivals-image"
                         src={item.imageUrl} alt=""/>
                  </a>;
                })}
              </div>
              <div className="index-sales">
                <a className="index-sales-top"
                   href={this.props.indexSalesTopPosterDesktop.imageAnchor}>
                  <img className="index-sales-top-image"
                       src={this.props.indexSalesTopPosterDesktop.imageUrl}
                       alt=""/>
                </a>
                <div className="index-sales-middle">
                  {this.props.indexSalesMiddleImagesDesktop.map(
                      (item, index) => {
                        return <a href={item.imageAnchor}
                                  key={index}>
                          <img className="index-sales-middle-image"
                               src={item.imageUrl} alt=""/>
                        </a>;
                      })}
                </div>
                <a className="index-sales-top"
                   href={this.props.indexSalesMiddlePosterDesktop.imageAnchor}>
                  <img className="index-sales-top-image"
                       src={this.props.indexSalesMiddlePosterDesktop.imageUrl}
                       alt=""/>
                </a>
                <div className="index-sales-middle">
                  {this.props.indexSalesBottomImagesDesktop.map(
                      (item, index) => {
                        return <a href={item.imageAnchor}
                                  key={index}>
                          <img className="index-sales-middle-image"
                               src={item.imageUrl} alt=""/>
                        </a>;
                      })}
                </div>
              </div>

              {this.props.indexImagesMobile.map((item, index) => {
                return <div className="brand-item"
                            key={index}>
                  <a href={item.imageAnchor}>
                    <img src={item.imageUrl} alt=""/>
                  </a>
                </div>;
              })}
            </Card>
          </div>
        </div>
    );
  }
}

export default Home;
