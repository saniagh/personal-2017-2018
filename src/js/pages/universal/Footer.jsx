import React, { Component } from 'react';
import { Card } from 'antd';

class Footer extends Component {
  render() {
    return (
        <Card noHovering={true}
              bordered={false}
              bodyStyle={{
                padding: 0,
                margin: 0,
                background: '#f7f7f7',
              }}
              loading={this.props.fetchingSettings}>
          <div>
            {this.props.location.pathname.indexOf('/control-panel') === -1 ?
                <div className="footer-main">
                  <nav className="footer-nav">
                    <ul>
                      {this.props.footerLeftColumn.map((item, index) => {
                        return <li key={index}
                                   className={item.lineType === 'title' ?
                                       'footer-nav-title' :
                                       'footer-nav-link'}>
                          {item.lineType === 'title' ? item.lineText :
                              <a href={item.lineAnchor}>
                                {item.lineText}
                              </a>
                          }
                        </li>;
                      })}
                    </ul>
                    <ul>
                      {this.props.footerCenterColumn.map((item, index) => {
                        return <li key={index}
                                   className={item.lineType === 'title' ?
                                       'footer-nav-title' :
                                       'footer-nav-link'}>
                          {item.lineType === 'title' ? item.lineText :
                              <a href={item.lineAnchor}>
                                {item.lineText}
                              </a>
                          }
                        </li>;
                      })}
                    </ul>
                    <ul>
                      {this.props.footerRightColumn.map((item, index) => {
                        return <li key={index}
                                   className={item.lineType === 'title' ?
                                       'footer-nav-title' :
                                       'footer-nav-link'}>
                          {item.lineType === 'title' ? item.lineText :
                              <a href={item.lineAnchor}>
                                {item.lineText}
                              </a>
                          }
                        </li>;
                      })}
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
                      <a href=""
                         className="footer-share footer-share-facebook"/>
                      <a href=""
                         className="footer-share footer-share-instagram"/>
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
        </Card>
    );
  }
}

export default Footer;
