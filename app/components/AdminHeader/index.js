/**
 *
 * AdminHeader
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import LogoImg from '../../assets/images/logo.png';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Link } from 'react-router-dom';

function AdminHeader() {
  useEffect(() => {
    if ($(window).width() < 767) {
      $('#main-wrapper').addClass('mini-sidebar');
      $('.nav-toggler').click(function() {
        $('#main-wrapper').toggleClass('show-sidebar');
        $('.nav-toggler i').toggleClass('ti-menu');
        $('.nav-toggler i').addClass('ti-close');
      });
    } else {
      $('#main-wrapper').removeClass('mini-sidebar');
    }
  }, []);

  return (
    <div>
      <div id="main-wrapper">
        <header className="topbar">
          <nav className="navbar top-navbar navbar-expand-md navbar-light">
            <div className="navbar-header">
              <a className="navbar-brand" href="./">
                {/* Logo icon */}
                <b>
                  <i className="wi wi-sunset" />
                  <img src={LogoImg} alt="logo" className="dark-logo" />
                  <img src={LogoImg} alt="logo" className="mobile-logo" />
                </b>
              </a>
            </div>
            <div className="navbar-collapse">
              <ul className="navbar-nav mr-auto my-toggle mt-md-0 ">
                <li className="nav-item">
                  {' '}
                  <a
                    className="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark"
                    href="javascript:void(0)"
                  >
                    <i className="ti-menu fa fa-bars" />
                  </a>{' '}
                </li>
                <li className="nav-item">
                  {' '}
                  <a
                    className="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark"
                    href="javascript:void(0)"
                  >
                    <i className="icon-arrow-left-circle" />
                  </a>{' '}
                </li>
              </ul>
              <ul className="navbar-nav my-lg-0">
                <li className="nav-item dropdown blur-ondrop">
                  <a
                    className="nav-link dropdown-toggle text-muted waves-effect waves-dark"
                    href
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src={LogoImg} alt="user" className="profile-pic" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right animated flipInY">
                    <ul className="dropdown-user">
                      <li>
                        <Link to="/admin/account">
                          <i className="mdi mdi-account-box" /> Your Account
                        </Link>
                      </li>
                      <li role="separator" className="divider" />
                      <li className="logout">
                        <a href="#">
                          <i className="fa fa-power-off" /> Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <aside className="left-sidebar">
          <div className="scroll-sidebar">
            <nav className="sidebar-nav">
              <ul id="sidebarnav">
                <li>
                  <Link aria-expanded="false" to="/admin/referrals">
                    <i className="mdi mdi-account-star" />
                    <span className="hide-menu">Referrals</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/bookings" aria-expanded="false">
                    <i className="mdi mdi-calendar-clock" />
                    <span className="hide-menu">Bookings</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        <div className="right-sidebar">
          <div className="slimscrollright">
            <div className="rpanel-title">
              {' '}
              Notifications{' '}
              <span>
                <i className="fa fa-close ti-close right-side-toggle" />
              </span>{' '}
            </div>
            <div className="r-panel-body sidenav">
              <div className="sch-box">
                <a href>
                  <div className="media">
                    <img
                      src="https://placehold.it/70x70"
                      className="img-fluid"
                    />
                    <div className="media-body">
                      <p className="float-right">1m ago</p>
                      <h6 className="green">Burns Marks</h6>
                      <p>shared an ETA</p>
                    </div>
                  </div>
                </a>
              </div>
              <hr />
              <div className="sch-box">
                <a href>
                  <div className="media">
                    <img
                      src="https://placehold.it/70x70"
                      className="img-fluid"
                    />
                    <div className="media-body">
                      <p className="float-right">1m ago</p>
                      <h6 className="green">Burns Marks</h6>
                      <p>shared an ETA</p>
                    </div>
                  </div>
                </a>
              </div>
              <hr />
              <div className="sch-box green-grad">
                <a href>
                  <div className="media">
                    <img
                      src="https://placehold.it/70x70"
                      className="img-fluid"
                    />
                    <div className="media-body">
                      <p className="float-right">1m ago</p>
                      <h6 className="green">Burns Marks</h6>
                      <p>shared an ETA</p>
                    </div>
                  </div>
                </a>
              </div>
              <hr />
              <div className="sch-box">
                <a href>
                  <div className="media">
                    <img
                      src="https://placehold.it/70x70"
                      className="img-fluid"
                    />
                    <div className="media-body">
                      <p className="float-right">1m ago</p>
                      <h6 className="green">Burns Marks</h6>
                      <p>shared an ETA</p>
                    </div>
                  </div>
                </a>
              </div>
              <hr />
              <div className="sch-box green-grad">
                <a href>
                  <div className="media">
                    <img
                      src="https://placehold.it/70x70"
                      className="img-fluid"
                    />
                    <div className="media-body">
                      <p className="float-right">1m ago</p>
                      <h6 className="green">Burns Marks</h6>
                      <p>shared an ETA</p>
                    </div>
                  </div>
                </a>
              </div>
              <hr />
              <div className="sch-box">
                <a href>
                  <div className="media">
                    <img
                      src="https://placehold.it/70x70"
                      className="img-fluid"
                    />
                    <div className="media-body">
                      <p className="float-right">1m ago</p>
                      <h6 className="green">Burns Marks</h6>
                      <p>shared an ETA</p>
                    </div>
                  </div>
                </a>
              </div>
              <hr />
              <div className="sch-box green-grad">
                <a href>
                  <div className="media">
                    <img
                      src="https://placehold.it/70x70"
                      className="img-fluid"
                    />
                    <div className="media-body">
                      <p className="float-right">1m ago</p>
                      <h6 className="green">Burns Marks</h6>
                      <p>shared an ETA</p>
                    </div>
                  </div>
                </a>
              </div>
              <hr />
              <div className="sch-box">
                <a href>
                  <div className="media">
                    <img
                      src="https://placehold.it/70x70"
                      className="img-fluid"
                    />
                    <div className="media-body">
                      <p className="float-right">1m ago</p>
                      <h6 className="green">Burns Marks</h6>
                      <p>shared an ETA</p>
                    </div>
                  </div>
                </a>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AdminHeader.propTypes = {};

export default AdminHeader;
