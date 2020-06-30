/**
 *
 * Footer
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import logoImage from '../../assets/images/logo.png';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const Footer = () => {
  const [showThis, handleShowThis] = useState(1);
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
                <a href="#">Why Cityride</a>
              </li>
              <li>
                <a href="#">Our Drivers</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">
                  <img src={logoImage} alt />
                </a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Terms of use.</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {showThis ? (
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
