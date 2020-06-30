/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import logoImage from '../../assets/images/logo.png';
import carImg from '../../assets/images/car.png';
import carWImg from '../../assets/images/carw.png';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Header() {
  return (
    <header className="site-header" id="site-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container bb">
          <a className="logo" href="./">
            <img src={logoImage} alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Why Cityride
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Our Drivers
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/faq">
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/terms-and-conditions">
                  Terms of use.
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item btn-order ">
                <a className="nav-link " href="#">
                  <img src={carImg} alt />
                  <img src={carWImg} alt /> My Order
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="dropdownmenubutton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  href="#"
                >
                  EN
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {};

export default Header;
