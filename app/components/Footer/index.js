/**
 *
 * Footer
 *
 */

import React, { useState, useEffect } from 'react';

import logoImage from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

const Footer = props => {
  const [showThis, handleShowThis] = useState(null);
  console.log('Propsssss', props);

  useEffect(() => {
    if (Object.keys(props).length != 0 && props.constructor === Object) {
      console.log('Pro', props);
      if (
        props.props.match.path == '/booking' ||
        props.props.match.path == '/order-number' ||
        props.props.match.path == '/order-summary'
      ) {
        handleShowThis(0);
      }
    }
  }, []);

  const handleClick = () => {
    console.log('State before', showThis);
    handleShowThis(0);
    console.log('State Now', showThis);
  };
  return (
    <div>
      <footer>
        <div className="container">
          <div className="footerwrap">
            <ul>
              <li>
                <Link to="/">Why Cityride</Link>
              </li>
              <li>
                <Link to="/">Our Drivers</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/">
                  <img src={logoImage} alt />
                </Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">Terms of use.</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {showThis != 0 ? (
        <div className="cookies">
          <div className="container">
            <div className="cookieswrap">
              <p>
                This website uses cookies to provide you with the best browsing
                experience. Find out more or adjust your settings.
              </p>
              <div className="btn-order">
                <a onClick={handleClick} className="btn btnstyle2">
                  Accept
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
