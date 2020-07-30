/**
 *
 * AdminBookings
 *
 */

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  IDENTIFIER,
  GET_AFFILIATE_ADMIN_VIEW_KEY,
} from '../../utils/constants';
import { postRequest } from '../../utils/requests';
import AdminHeader from '../AdminHeader';

function AdminBookings() {
  const [allBookings, setAllBookings] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (
      localStorage.getItem('admin_details') &&
      (JSON.parse(localStorage.getItem('admin_details')) != undefined ||
        JSON.parse(localStorage.getItem('admin_details')) != '' ||
        JSON.parse(localStorage.getItem('admin_details')) != null) &&
      JSON.parse(localStorage.getItem('admin_details')).au_role == '1'
    ) {
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
      formData.append(`command`, 'get_affiliate_admin_view');
      formData.append(`identifier`, IDENTIFIER);
      formData.append(`key`, GET_AFFILIATE_ADMIN_VIEW_KEY());
      formData.append(`data[user_id]`, '');
      formData.append(`data[start_date]`, startDate);
      formData.append(`data[end_date]`, endDate);
      formData.append(`data[date_type]`, 'execute');

      if (startDate && endDate) {
        postRequest(formData, headers).then(data => {
          console.log('Response Data:', data);
          // console.log('Props:', props);
          if (data.status == 'ok') {
            console.log('Data If Status Ok', data);
            // alert('All Users Arrived');
            setAllBookings(data.data);
          }
        });
      }
    } else {
      props.history.push('/admin/login');
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
    formData.append(`command`, 'get_affiliate_admin_view');
    formData.append(`identifier`, IDENTIFIER);
    formData.append(`key`, GET_AFFILIATE_ADMIN_VIEW_KEY());
    formData.append(`data[user_id]`, '');
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
                <div className="bookings">
                  {/* Nav tabs */}
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
                    <li className="nav-item search-customer">
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
                      <button
                        onClick={bookingSearchRequest}
                        type="button"
                        className="btn btn-primary filter"
                      >
                        Search
                      </button>
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
                                              <td>{item.affiliate_name}</td>
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
                                            allBookings.services.payed.length,
                                          )
                                          .map((item, index) => (
                                            <tr>
                                              {/* <td>{item.affiliate_user_id}</td> */}
                                              <td>{item.affiliate_name}</td>
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

AdminBookings.propTypes = {};

export default AdminBookings;
