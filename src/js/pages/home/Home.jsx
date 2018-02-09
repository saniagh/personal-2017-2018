import React, { Component } from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Card } from 'antd';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseOnCarousel: false,
    };
  }

  onMouseCarouselHover = () => {
    this.setState({
      isMouseOnCarousel: !this.state.isMouseOnCarousel,
    });
  };

  render() {

    let sliderItems = '';
    let arrayWithNoEmpty = [];

    if (this.props.fetchedSettings) {

      for (let i = 0; i < this.props.sliderImages.length; i++) {
        if (this.props.sliderImages[i])
          arrayWithNoEmpty.push(this.props.sliderImages[i]);
      }

      sliderItems = arrayWithNoEmpty.map((url, index) => {
        return <div key={index}
                    className="slide-div">
          <img src={url}/>
        </div>;
      });
    }

    return (
        <div className="index-main">
          <div onMouseEnter={this.onMouseCarouselHover}
               onMouseLeave={this.onMouseCarouselHover}>
            <Carousel interval={3000}
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
              <a href="">
                <img className="index-promotion-top-image"
                     src="/images/prom1.jpg" alt=""/>
              </a>
              <a href="">
                <img className="index-promotion-top-image"
                     src="/images/prom2.jpg" alt=""/>
              </a>
            </div>
            <div className="index-promotion-bottom">
              <img className="index-promotion-bottom-image"
                   src="/images/prom3.jpg" alt=""/>
            </div>
            <a className="index-block-title"
               href="">
              What are you looking for ?
            </a>
          </div>
          <div className="index-new-arrivals">
            <a href="">
              <img className="index-new-arrivals-image"
                   src="/images/ariv1.jpg" alt=""/>
            </a>
            <a href="">
              <img className="index-new-arrivals-image"
                   src="/images/ariv2.jpg" alt=""/>
            </a>
            <a href="">
              <img className="index-new-arrivals-image"
                   src="/images/ariv3.jpg" alt=""/>
            </a>
            <a href="">
              <img className="index-new-arrivals-image"
                   src="/images/ariv4.jpg" alt=""/>
            </a>
          </div>


          <div className="brand-item">
            <a href="">
              <img src="/images/brand1m.jpg" alt=""/>
            </a>
          </div>
          <div className="brand-item">
            <a href="">
              <img src="/images/brand2m.jpg" alt=""/>
            </a>
          </div>
          <div className="brand-item">
            <a href="">
              <img src="/images/brand3m.jpg" alt=""/>
            </a>
          </div>
          <div className="brand-item">
            <a href="">
              <img src="/images/brand4m.jpg" alt=""/>
            </a>
          </div>
          <div className="brand-item">
            <a href="">
              <img src="/images/brand5m.jpg" alt=""/>
            </a>
          </div>
          <div className="brand-item">
            <a href="">
              <img src="/images/brand6m.jpg" alt=""/>
            </a>
          </div>
        </div>
    );
  }
}

export default Home;
