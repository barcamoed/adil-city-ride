/**
 *
 * AdminAccount
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import AdminHeader from '../AdminHeader';
// import '../../assets/css/dashboard.css';
// import '../../assets/css/dashboardcore.css';

function AdminAccount(props) {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log(
      'admin_details',
      JSON.parse(localStorage.getItem('admin_details')),
    );
    if (
      localStorage.getItem('admin_details') &&
      (JSON.parse(localStorage.getItem('admin_details')) != undefined ||
        JSON.parse(localStorage.getItem('admin_details')) != '' ||
        JSON.parse(localStorage.getItem('admin_details')) != null) &&
      JSON.parse(localStorage.getItem('admin_details')).au_role == '1'
    ) {
      console.log(
        'admin_details',
        JSON.parse(localStorage.getItem('admin_details')),
      );
      setUserData(JSON.parse(localStorage.getItem('admin_details')));
    } else {
      props.history.push('/admin/login');
    }
  }, []);

  return (
    <div>
      {/* </div> */}
      <AdminHeader />

      <div>
        <div className="page-wrapper">
          {/* ============================================================== */}
          {/* Container fluid  */}
          {/* ============================================================== */}
          <div className="container-fluid">
            {/* ============================================================== */}
            {/* Bread crumb and right sidebar toggle */}
            {/* ============================================================== */}
            {/* ============================================================== */}
            {/* End Bread crumb and right sidebar toggle */}
            {/* ============================================================== */}
            {/* ============================================================== */}
            {/* Start Page Content */}
            {/* ============================================================== */}
            <div className="row tabs-order">
              <div className="col-md-12">
                <div className>
                  {/* Nav tabs */}
                  <ul className="nav nav-tabs customtab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link">
                        <span className="order-txt">Your Accounts</span>
                      </a>
                    </li>
                  </ul>
                  {/* Tab panes */}
                  <div className="tab-content">
                    <div
                      className="tab-pane active show"
                      id="Upcoming"
                      role="tabpanel"
                    >
                      <div className="row recent-table customer-table">
                        <div className="col-lg-6">
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
                                    {/* <div className="form-group">
                                      <label>City</label>
                                      <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                      />
                                    </div>
                                    <div className="form-group">
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
          {/* ============================================================== */}
          {/* End PAge Content */}
          {/* ============================================================== */}
        </div>
        {/* ============================================================== */}
        {/* End Container fluid  */}
        {/* ============================================================== */}
        {/* ============================================================== */}
        {/* End Page wrapper  */}
        {/* ============================================================== */}
        <div
          className="modal fade add-user admin-login"
          id="certificates-pop"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel1"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLabel1">
                  Create New Invite
                </h4>
              </div>
              <div className="modal-body">
                <form className="form-material">
                  <div className="form-group">
                    <label>
                      Email
                      <span className="help" />
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-line"
                      placeholder="Enter Name"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-rounded btn-outline-dark"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-rounded btn-outline-dark"
                >
                  + Create Invite
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AdminAccount.propTypes = {};

export default AdminAccount;
