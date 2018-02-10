import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
        <div>
          {this.props.location.pathname.indexOf('/control-panel') === -1 ?
              <div className="footer-main">
                <nav className="footer-nav">
                  <ul>
                    <li className="footer-nav-title">
                      About Bloo's
                    </li>
                    <li className="footer-nav-link">
                      <a href="">About us</a>
                    </li>
                    <li className="footer-nav-link">
                      <a href="">About us</a>
                    </li>
                    <li className="footer-nav-link">
                      <a href="">About us</a>
                    </li>
                    <li className="footer-nav-link">
                      <a href="">About us</a>
                    </li>
                    <li className="footer-nav-link">
                      <a href="">About us</a>
                    </li>
                  </ul>
                  <ul>
                    <li className="footer-nav-title">
                      About Bloo's
                    </li>
                    <li className="footer-nav-link">
                      <a href="">About us</a>
                    </li>
                    <li className="footer-nav-link">
                      <a href="">About us</a>
                    </li>
                    <li className="footer-nav-link">
                      <a href="">About us</a>
                    </li>
                    <li className="footer-nav-link">
                      <a href="">About us</a>
                    </li>
                    <li className="footer-nav-link">
                      <a href="">About us</a>
                    </li>
                  </ul>
                  <ul>
                    <li className="footer-nav-title">
                      About Bloo's
                    </li>
                    <li className="footer-nav-link">
                      <a href="">About us</a>
                    </li>
                    <li className="footer-nav-link">
                      <a href="">About us</a>
                    </li>
                    <li className="footer-nav-link">
                      <a href="">About us</a>
                    </li>
                    <li className="footer-nav-link">
                      <a href="">About us</a>
                    </li>
                    <li className="footer-nav-link">
                      <a href="">About us</a>
                    </li>
                  </ul>
                </nav>
                <div className="footer-subscribe-social">
                  <h3 className="footer-sub-title">GET EXCLUSIVE OFFERS &
                    UPDATES</h3>
                  <form className="footer-subscribe">
                    <input type="text"
                           className="footer-input"
                           placeholder="Enter your email"/>
                    <button className="footer-submit">
                      Subscribe
                    </button>
                  </form>
                  <h3 className="footer-sub-title">FOLLOW US ON SOCIAL
                    MEDIA</h3>
                  <div className="footer-socials">
                    <a href="" className="footer-share footer-share-facebook"/>
                    <a href="" className="footer-share footer-share-instagram"/>
                    <a href="" className="footer-share footer-share-twitter"/>
                  </div>
                </div>
              </div>
              :
              null
          }
          <div className="footer-bottom">
            Created by Valentin C.
          </div>
        </div>
    );
  }
}

export default Footer;
