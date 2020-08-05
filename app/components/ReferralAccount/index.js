/**
 *
 * ReferralAccount
 *
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LogoImg from '../../assets/images/logo.svg';

function ReferralAccount(props) {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (
      localStorage.getItem('ref_user_details') &&
      (JSON.parse(localStorage.getItem('ref_user_details')) != undefined ||
        JSON.parse(localStorage.getItem('ref_user_details')) != '') &&
      JSON.parse(localStorage.getItem('ref_user_details')).au_role == '2'
    ) {
      console.log(
        'ref_User_Data',
        JSON.parse(localStorage.getItem('ref_user_details')),
      );
      setUserData(JSON.parse(localStorage.getItem('ref_user_details')));
    } else {
      props.history.push('/referral/login');
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem('ref_user_details');
    props.history.push('/referral/login');
  };
  // console.log('userDatavvvvvvvvvv', userData);

  return (
    <div>
      <div id="main-wrapper">
        <header className="topbar ">
          <nav className="navbar top-navbar navbar-expand-md navbar-light">
            <div className="navbar-header">
              <a className="navbar-brand" href="./">
                <b>
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
                    <i className="ti-menu" />
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
                        <Link to="/referral/account">
                          <i className="mdi mdi-account-box" /> Your Account
                        </Link>
                      </li>

                      <li role="separator" className="divider" />
                      <li className="logout">
                        <a onClick={onLogout}>
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
        <div className>
          <div className="container">
            <div className="row  tabs-order youraccount">
              <div className="col-md-12">
                <div className="mt-4">
                  {/* Nav tabs */}
                  <ul className="nav nav-tabs customtab" role="tablist">
                    <li className="nav-item w-100 text-center">
                      <a className="nav-link">
                        <span className="order-txt">Your Account</span>
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane active show"
                      id="Upcoming"
                      role="tabpanel"
                    >
                      <div className="row recent-table customer-table">
                        <div className="col-lg-6 offset-lg-3">
                          <div className="card">
                            <div className="card-body">
                              <h3 className="box-title m-b-0">
                                Referral your Account
                              </h3>
                              <p className="text-muted m-b-30 font-13">
                                You will get 20% of every bid
                              </p>
                              <div className="row">
                                <div className="col-sm-12 col-xs-12">
                                  <form>
                                    <div className="form-group">
                                      <label>Name</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Enter Username"
                                        value={userData.name}
                                        readOnly={true}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label>Email</label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Enter email"
                                        value={userData.email}
                                        readOnly={true}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label>20%</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        value={userData.commission}
                                        readOnly={true}
                                      />
                                    </div>
                                    {/* <div className="form-group">
                                      <label>Password</label>
                                      <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Confirm Password"
                                      />
                                    </div> */}
                                    <div className="text-center">
                                      <button
                                        type="submit"
                                        className="btn btn-primary waves-effect waves-light m-r-10"
                                        disabled
                                      >
                                        Update
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReferralAccount.propTypes = {};

export default ReferralAccount;
