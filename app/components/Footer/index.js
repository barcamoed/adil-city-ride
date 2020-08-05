/**
 *
 * Footer
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import logoImage from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

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
