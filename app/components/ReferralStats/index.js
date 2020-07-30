/**
 *
 * ReferralStats
 *
 */

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { IDENTIFIER, GET_AFFILIATE_USER_VIEW_KEY } from '../../utils/constants';
import { postRequest } from '../../utils/requests';
import Logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ReferralStats(props) {
  const [allBookings, setAllBookings] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalEarning, setTotalEarning] = useState('');
  const [upComingEarning, setUpcomingEarning] = useState('');
  const [payedEarning, setPayedEarning] = useState('');

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
      const start_date = moment()
        .subtract(30, 'days')
        .toString();
      const finalStartDate = moment(start_date)
        .format('yyyy-MM-DD')
        .toString();

      const end_date = moment().toString();
      const finalEndDate = moment(end_date)
        .format('yyyy-MM-DD')
        .toString();
      if (startDate == '' && endDate == '') {
        setStartDate(finalStartDate);
        setEndDate(finalEndDate);
      }
      const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
      };
      let formData = new FormData();
      formData.append(`command`, 'get_affiliate_user_view');
      formData.append(`identifier`, IDENTIFIER);
      formData.append(`key`, GET_AFFILIATE_USER_VIEW_KEY());
      formData.append(
        `data[user_id]`,
        JSON.parse(localStorage.getItem('ref_user_details')).id,
      );
      formData.append(`data[start_date]`, startDate);
      formData.append(`data[end_date]`, endDate);
      formData.append(`data[date_type]`, 'execute');

      if (startDate && endDate) {
        postRequest(formData, headers).then(data => {
          console.log('Response Data:', data);
          // console.log('Props:', props);
          if (data.status == 'ok') {
            console.log('Data If Status Ok', data);
            setAllBookings(data.data);
            setTotalEarning(data.data.earning.total);
            setUpcomingEarning(data.data.earning.upcoming);
            setPayedEarning(data.data.earning.payed);
          }
        });
      }
    } else {
      props.history.push('referral/login');
    }
  }, [startDate.length, endDate.length, allBookings.length]);

  console.log('Dataaaaaaa,', allBookings);
  const handleDateChange = e => {
    console.log('Heeeeeeeeeeeeee', e.target.value);
    if (e.target.name == 'start_date') {
      console.log(e.target.name, e.target.value);
      setStartDate(e.target.value);
    } else if (e.target.name == 'end_date') {
      console.log(e.target.name, e.target.value);
      setEndDate(e.target.value);
    }
  };

  function bookingSearchRequest() {
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
    };
    let formData = new FormData();
    formData.append(`command`, 'get_affiliate_user_view');
    formData.append(`identifier`, IDENTIFIER);
    formData.append(`key`, GET_AFFILIATE_USER_VIEW_KEY());
    formData.append(
      `data[user_id]`,
      JSON.parse(localStorage.getItem('ref_user_details')).id,
    );
    formData.append(`data[start_date]`, startDate);
    formData.append(`data[end_date]`, endDate);
    formData.append(`data[date_type]`, 'execute');

    if (startDate && endDate) {
      postRequest(formData, headers).then(data => {
        console.log('Response Data:', data);
        // console.log('Props:', props);
        if (data.status == 'ok') {
          console.log('Search Booking Response ', data);
          setAllBookings(data.data);
        }
      });
    }
  }

  return (
    <div>
      <div id="main-wrapper">
        <header className="topbar ">
          <nav className="navbar top-navbar navbar-expand-md navbar-light">
            <div className="navbar-header">
              <a className="navbar-brand" href="./">
                <b>
                  <i className="wi wi-sunset" />
                  <img src={Logo} alt="logo" className="dark-logo" />
                  <img src={Logo} alt="logo" className="mobile-logo" />
                </b>
              </a>
            </div>
            <div className="navbar-collapse">
              <ul className="navbar-nav mr-auto my-toggle mt-md-0 ">
                {/* This is  */}
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
                    <img
                      src="assets/images/driver1.jpg"
                      alt="user"
                      className="profile-pic"
                    />
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
        <div className>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <ul className="nav nav-tabs customtab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link">
                      <span className="order-txt">Dashboard</span>
                    </a>
                  </li>
                  <li className="nav-item search-customer">
                    <button
                      type="button"
                      className="btn btn-primary filter mr-3"
                    >
                      Copy Link
                    </button>
                    <label htmlFor>From</label>
                    <input
                      type="date"
                      id="demo-foo-search"
                      value={startDate}
                      name="start_date"
                      onChange={e => handleDateChange(e)}
                      className="form-control filter-input"
                      placeholder="Search"
                    />
                    <label htmlFor>To</label>
                    <input
                      type="date"
                      id="demo-foo-search"
                      value={startDate}
                      name="end_date"
                      onChange={e => handleDateChange(e)}
                      className="form-control filter-input"
                      placeholder="Search"
                    />
                    <button
                      onClick={bookingSearchRequest}
                      type="button"
                      className="btn btn-primary filter"
                    >
                      Search
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-3 col-xlg-3">
                <div className="card card-inverse card-info">
                  <div className="box bg-info text-center">
                    <h6 className="text-white">Total Trips</h6>
                    <h1 className="font-light text-white">
                      {allBookings.total_trips}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 col-xlg-3">
                <div className="card card-inverse card-info">
                  <div className="box bg-info text-center">
                    <h6 className="text-white">Upcoming Trips</h6>
                    <h1 className="font-light text-white">
                      {allBookings.upcoming_trips}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 col-xlg-3">
                <div className="card card-inverse card-info">
                  <div className="box bg-info text-center">
                    <h6 className="text-white">Completed Trips</h6>
                    <h1 className="font-light text-white">
                      {allBookings.payed_trips}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 col-xlg-3">
                <div className="card card-inverse card-info">
                  <div className="box bg-info text-center">
                    <h6 className="text-white">Conversion</h6>
                    <h1 className="font-light text-white">
                      {allBookings.conversion}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 col-xlg-3">
                <div className="card card-inverse card-info">
                  <div className="box bg-info text-center">
                    <h6 className="text-white">Total Earned</h6>
                    <h1 className="font-light text-white">{totalEarning}</h1>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 col-xlg-3">
                <div className="card card-inverse card-info">
                  <div className="box bg-info text-center">
                    <h6 className="text-white">Payed</h6>
                    <h1 className="font-light text-white">{payedEarning}</h1>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 col-xlg-3">
                <div className="card card-inverse card-info">
                  <div className="box bg-info text-center">
                    <h6 className="text-white">Upcoming</h6>
                    <h1 className="font-light text-white">{upComingEarning}</h1>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 col-xlg-3">
                <div className="card card-inverse card-info">
                  <div className="box bg-info text-center">
                    <h6 className="text-white">Clicks</h6>
                    <h1 className="font-light text-white">
                      {allBookings.clicks}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="row tabs-order">
              <div className="col-md-12">
                <div className>
                  <ul className="nav nav-tabs customtab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link">
                        <span className="order-txt">Bookings</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active show"
                        data-toggle="tab"
                        href="#Upcoming"
                        role="tab"
                        aria-selected="true"
                      >
                        <span className>Upcoming</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#Completed"
                        role="tab"
                        aria-selected="false"
                      >
                        <span className>Completed</span>
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
                        <div className="col-lg-12">
                          <div className="card">
                            <div className="card-body1">
                              <div className="table-responsive">
                                <table
                                  className="table"
                                  id="demo-foo-addrow"
                                  data-page-size={10}
                                >
                                  <thead>
                                    <tr>
                                      {/* <th>Name</th> */}
                                      {/* <th>Type</th> */}
                                      {/* <th>From</th>
                                      <th>To</th> */}
                                      <th>City</th>
                                      <th>Created at</th>
                                      <th>Booking Date</th>
                                      <th>Amount</th>
                                      <th>Commision</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <React.Fragment>
                                      {allBookings.upcoming_trips > 0 ? (
                                        allBookings.services.upcoming
                                          .slice(
                                            0,
                                            allBookings.services.upcoming
                                              .length,
                                          )
                                          .map((item, index) => (
                                            <tr>
                                              {/* <td>{item.affiliate_user_id}</td> */}
                                              {/* <td>{item.affiliate_name}</td> */}
                                              <td>{item.city}</td>
                                              <td>{item.create_date}</td>
                                              <td>{item.service_date}</td>
                                              <td>
                                                {item.service_price}
                                                {item.currency}
                                              </td>
                                              <td>{item.commission}</td>
                                            </tr>
                                          ))
                                      ) : (
                                        <span>
                                          <tr>
                                            <p>No Data</p>
                                          </tr>
                                        </span>
                                      )}
                                    </React.Fragment>
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <td colSpan={8}>
                                        <div className="text-right">
                                          <ul className="pagination pagination-split m-t-30">
                                            {' '}
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="Completed" role="tabpanel">
                      <div className="row recent-table customer-table">
                        <div className="col-lg-12">
                          <div className="card">
                            <div className="card-body1">
                              <div className="table-responsive">
                                <table
                                  className="table"
                                  id="demo-foo-addrow"
                                  data-page-size={10}
                                >
                                  <thead>
                                    <tr>
                                      {/* <th>ID</th> */}
                                      {/* <th>Name</th> */}
                                      <th>City</th>
                                      <th>Created at</th>
                                      <th>Service Date</th>
                                      <th>Amount</th>
                                      <th>Commision</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <React.Fragment>
                                      {allBookings.payed_trips > 0 ? (
                                        allBookings.services.payed
                                          .slice(
                                            0,
                                            allBookings.services.payed.length,
                                          )
                                          .map((item, index) => (
                                            <tr>
                                              {/* <td>{item.affiliate_user_id}</td> */}
                                              {/* <td>{item.affiliate_name}</td> */}
                                              <td>{item.city}</td>
                                              <td>{item.create_date}</td>
                                              <td>{item.service_date}</td>
                                              <td>
                                                {item.service_price}
                                                {item.currency}
                                              </td>
                                              <td>{item.commission}</td>
                                            </tr>
                                          ))
                                      ) : (
                                        <span>
                                          <tr>
                                            <p>No Data</p>
                                          </tr>
                                        </span>
                                      )}
                                    </React.Fragment>
                                  </tbody>

                                  <tfoot>
                                    <tr>
                                      <td colSpan={8}>
                                        <div className="text-right">
                                          <ul className="pagination pagination-split m-t-30">
                                            {' '}
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
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

ReferralStats.propTypes = {};

export default ReferralStats;
