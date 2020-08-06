/**
 *
 * AdminBookings
 *
 */

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';
import HashLoader from 'react-spinners/HashLoader';
import {
  IDENTIFIER,
  GET_AFFILIATE_ADMIN_VIEW_KEY,
} from '../../utils/constants';
import { postRequest } from '../../utils/requests';
import AdminHeader from '../AdminHeader';

function AdminBookings(props) {
  const [allBookings, setAllBookings] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isActive, setIsModalActive] = useState(false);
  const [totalEarning, setTotalEarning] = useState('');
  const [upComingEarning, setUpcomingEarning] = useState('');
  const [payedEarning, setPayedEarning] = useState('');
  const [dateType, setDateType] = useState('create');
  const [selectedRefId, setSelectedRefId] = useState('');

  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem('admin_details') &&
      (JSON.parse(localStorage.getItem('admin_details')) != undefined ||
        JSON.parse(localStorage.getItem('admin_details')) != '' ||
        JSON.parse(localStorage.getItem('admin_details')) != null) &&
      JSON.parse(localStorage.getItem('admin_details')).au_role == '1'
    ) {
      const referrals = JSON.parse(localStorage.getItem('admin_ref_users'));
      // console.log('Outsideeeee referralssssssss', referrals);
      if (referrals) {
        // console.log('referralssssssss', referrals);
        setReferrals(referrals);
      }
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
      const formData = new FormData();
      formData.append(`command`, 'get_affiliate_admin_view');
      formData.append(`identifier`, IDENTIFIER);
      formData.append(`key`, GET_AFFILIATE_ADMIN_VIEW_KEY());
      formData.append(`data[user_id]`, '');
      formData.append(`data[start_date]`, startDate);
      formData.append(`data[end_date]`, endDate);
      formData.append(`data[date_type]`, 'execute');

      if (startDate && endDate) {
        setIsModalActive(true);
        postRequest(formData, headers).then(data => {
          setIsModalActive(false);
          // console.log('Response Data:', data);
          // console.log('Props:', props);
          if (data.status == 'ok') {
            // console.log('Data If Status Ok', data);
            // alert('All Users Arrived');
            setAllBookings(data.data);
            setTotalEarning(data.data.earning.total);
            setUpcomingEarning(data.data.earning.upcoming);
            setPayedEarning(data.data.earning.payed);
          }
        });
      }
    } else {
      props.history.push('/admin/login');
    }
  }, [startDate.length, endDate.length, allBookings.length]);

  // console.log('Dataaaaaaa,', allBookings);
  const handleDateChange = e => {
    // console.log('Heeee', e.target.value);
    if (e.target.name == 'start_date') {
      // console.log(e.target.name, e.target.value);
      setStartDate(e.target.value);
    } else if (e.target.name == 'end_date') {
      // console.log(e.target.name, e.target.value);
      setEndDate(e.target.value);
    }
  };

  function bookingSearchRequest() {
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
    };
    const formData = new FormData();
    formData.append(`command`, 'get_affiliate_admin_view');
    formData.append(`identifier`, IDENTIFIER);
    formData.append(`key`, GET_AFFILIATE_ADMIN_VIEW_KEY());

    if (selectedRefId) {
      formData.append(`data[user_id]`, selectedRefId);
    } else {
      formData.append(`data[user_id]`, '');
    }

    formData.append(`data[start_date]`, startDate);
    formData.append(`data[end_date]`, endDate);

    if (dateType == 'execute') {
      formData.append(`data[date_type]`, 'execute');
    } else {
      formData.append(`data[date_type]`, 'create');
    }

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

    if (startDate && endDate) {
      setIsModalActive(true);
      postRequest(formData, headers).then(data => {
        setIsModalActive(false);
        // console.log('Response Data:', data);
        // console.log('Props:', props);
        if (data.status == 'ok') {
          // console.log('Search Booking Response ', data);
          setAllBookings(data.data);
        }
      });
    }
  }

  const setDateTypeFunc = e => {
    setDateType(e.target.value);
  };

  const handleRefIdSelect = e => {
    // console.log('Aaaaaaaaaa', e.target.value);
    setSelectedRefId(e.target.value);
  };

  return (
    <div>
      <LoadingOverlay
        styles={{
          overlay: {
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: '0px',
            left: '0px',
            display: '-webkit - box',
            display: '-webkit - flex',
            display: '-ms - flexbox',
            display: 'flex',
            'text-align': 'center',
            'font-size': '1.2em',
            color: '#000',
            background: 'rgba(0, 0, 0, 0)',
            zIndex: 800,
            // -webkit-transition: opacity 500ms ease-in;
            // transition: opacity 500ms ease-in;
            opacity: 1,
          },
        }}
        active={isActive}
        spinner
        spinner={<HashLoader size={120} color={'#3C84BB'} />}
      >
        <AdminHeader props={props} />

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
                  <div className="bookings">
                    {/* Nav tabs */}
                    <div className="row">
                      <ul className="nav nav-tabs customtab" role="tablist">
                        <li className="nav-item">
                          <a className="nav-link">
                            <span className="order-txt">Bookings</span>
                          </a>
                        </li>

                        {/* <li className="nav-item">
                          <label htmlFor>Select</label>
                          <select
                            className=""
                            // onChange={e => setDateTypeFunc(e)}
                            // value={dateType}
                          >
                            <option value="create">Create</option>
                            <option value="execute">Execute</option>
                          </select>
                        </li> */}

                        <li className="nav-item search-customer">
                          <label htmlFor>Select</label>
                          <select
                            className=""
                            onChange={e => handleRefIdSelect(e)}
                            value={selectedRefId}
                          >
                            <option value="">Select</option>
                            {referrals
                              .slice(0, referrals.length)
                              .map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                          </select>

                          <label htmlFor>From</label>
                          <input
                            type="date"
                            id="demo-foo-search"
                            name="start_date"
                            className="form-control filter-input"
                            placeholder="Search"
                            value={startDate}
                            onChange={e => handleDateChange(e)}
                          />
                          <label htmlFor>To</label>
                          <input
                            type="date"
                            id="demo-foo-search"
                            value={endDate}
                            name="end_date"
                            className="form-control filter-input"
                            placeholder="Search"
                            onChange={e => handleDateChange(e)}
                          />

                          <select
                            className=""
                            onChange={e => setDateTypeFunc(e)}
                            value={dateType}
                          >
                            <option value="create">Create</option>
                            <option value="execute">Execute</option>
                          </select>

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
                            <h1 className="font-light text-white">
                              {totalEarning}
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3 col-xlg-3">
                        <div className="card card-inverse card-info">
                          <div className="box bg-info text-center">
                            <h6 className="text-white">Payed</h6>
                            <h1 className="font-light text-white">
                              {payedEarning}
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3 col-xlg-3">
                        <div className="card card-inverse card-info">
                          <div className="box bg-info text-center">
                            <h6 className="text-white">Upcoming</h6>
                            <h1 className="font-light text-white">
                              {upComingEarning}
                            </h1>
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

                    {/* Tab panes */}

                    {/* //New */}

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
                                              <th>Name</th>
                                              <th>City</th>
                                              <th>Created at</th>
                                              <th>Service Date</th>
                                              <th>Amount</th>
                                              <th>Commision</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <React.Fragment>
                                              {allBookings.upcoming_trips >
                                              0 ? (
                                                allBookings.services.upcoming
                                                  .slice(
                                                    0,
                                                    allBookings.services
                                                      .upcoming.length,
                                                  )
                                                  .map((item, index) => (
                                                    <tr>
                                                      <td>
                                                        {item.affiliate_name}
                                                      </td>
                                                      <td>{item.city}</td>
                                                      <td>
                                                        {item.create_date}
                                                      </td>
                                                      <td>
                                                        {item.service_date}
                                                      </td>
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
                                                    <p className="text-center">
                                                      No Data
                                                    </p>
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
                            <div
                              className="tab-pane"
                              id="Completed"
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
                                              <th>Name</th>
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
                                                    allBookings.services.payed
                                                      .length,
                                                  )
                                                  .map((item, index) => (
                                                    <tr>
                                                      <td>
                                                        {item.affiliate_name}
                                                      </td>
                                                      <td>{item.city}</td>
                                                      <td>
                                                        {item.create_date}
                                                      </td>
                                                      <td>
                                                        {item.service_date}
                                                      </td>
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
                                                    <p className="text-center">
                                                      No Data
                                                    </p>
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
          </div>

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
      </LoadingOverlay>
    </div>
  );
}

AdminBookings.propTypes = {};

export default AdminBookings;
