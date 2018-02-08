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
    return (
        <div className="index-main">
          <div onMouseEnter={this.onMouseCarouselHover}
               onMouseLeave={this.onMouseCarouselHover}>
            <Carousel interval={3000}
                      autoPlay
                      infiniteLoop
                      showThumbs={false}
                      showStatus={false}
                      emulateTouch
                      showArrows={this.state.isMouseOnCarousel}>
              <div className="slide-div">
                <img src="/products.jpg" alt=""/>
              </div>
              <div className="slide-div">
                <img src="/currency.jpg" alt=""/>
              </div>
              <div className="slide-div">
                <img src="/add-product.jpg" alt=""/>
              </div>
            </Carousel>
          </div>
        </div>
    );
  }
}

export default Home;
