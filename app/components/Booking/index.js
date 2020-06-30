/**
 *
 * Booking
 *
 */

// import DatePicker from 'react-datepicker';
import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import Header from '../Header';
import Footer from '../Footer';
import infoImg from '../../assets/images/info.png';
import btnarrowImg from '../../assets/images/btnarrow.png';
import tickImg from '../../assets/images/tick.png';
import leftangleImg from '../../assets/images/leftangle.png';
import whatsappImg from '../../assets/images/whatsapp.png';
import { bookingSchema } from '../Login/schema';
import RCTimePicker from '../RCTimePicker/index';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Booking = () => {
  const [arrival_flight_number, setArrival_flight_number] = useState('');
  const [departure_flight_number, setDeparture_flight_number] = useState('');
  const [showThis, setArrivalFlightError] = useState(false);
  const [showThis2, setDepartureFlightError] = useState(false);

  const [showBabyAges, setTodos] = useState('');
  const [showChildAges, setChildAgesData] = useState('');
  const selectBabyOptions = event => {
    const babyAges = [
      { title: 'Age 1', value: '1', age: '8 months' },
      { title: 'Age 2', value: '2', age: '7 months' },
    ];
    setTodos(babyAges);
    if (event == 1) {
      const filter = babyAges.filter(item => item.value === event);
      setTodos(filter);
    } else if (event == 2) {
      setTodos(babyAges);
    } else if (event == '') {
      const myAgesData = [];
      setTodos(myAgesData);
    }
  };
  const selectChildOptions = event => {
    const childAgesData = [
      { title: 'Age 1', value: '1', age: '2 years' },
      { title: 'Age 2', value: '2', age: '4 years' },
    ];
    setChildAgesData(childAgesData);
    if (event == 1) {
      const filter = childAgesData.filter(item => item.value === event);
      setChildAgesData(filter);
    } else if (event == 2) {
      setChildAgesData(childAgesData);
    } else if (event == '') {
      const myAgesData = [];
      setChildAgesData(myAgesData);
    }
  };

  useEffect(() => {
    var date = new Date().toISOString().slice(0, 10);

    //To restrict past date
    $('#exp_date').attr('min', date);
    $('#arrivaldate').attr('min', date);
    $('#departuredate').attr('min', date);

    // axios
    //   .get(
    //     "https://gist.githubusercontent.com/witalewski/fc8f043d53a0d505f84c5ddb04ae76ea/raw/7c505bbc1675a0bc8a067f8b633b531c769bb64c/data.json"
    //   )
    //   .then(({ data }) => {
    //    this.setState({ todos: data });
    //    this.setState({ nextTodoId: data.length });
    //    setTodos(data);
    //    setNextTodoId(data.length);
    //   });
  }, []);

  function handleKeyUp(e, setFieldValue) {
    var flight_num = e.target.value;
    flight_num = flight_num.toUpperCase().replace(/\s/g, '');
    var regex = /^([A-Z][A-Z][A-Z]?|[A-Z][0-9]|[0-9][A-Z])[0-9]{1,4}$/.exec(
      flight_num,
    );
    if (regex != null) {
      setArrival_flight_number(
        regex[1] +
          ' ' +
          flight_num.slice(
            flight_num.indexOf(regex[1]) + regex[1].length,
            flight_num.length,
          ),
      );
      setFieldValue(
        'arrival_flight_number',
        regex[1] +
          ' ' +
          flight_num.slice(
            flight_num.indexOf(regex[1]) + regex[1].length,
            flight_num.length,
          ),
      );
      console.log('Value at end', e.target.value);
      setArrivalFlightError(false);
      // console.log('departure_flight_number end', departure_flight_number);
    } else {
      setArrivalFlightError(true);
    }
  }

  function handleKeyUp1(e, setFieldValue) {
    var flight_num = e.target.value;
    flight_num = flight_num.toUpperCase().replace(/\s/g, '');
    var regex = /^([A-Z][A-Z][A-Z]?|[A-Z][0-9]|[0-9][A-Z])[0-9]{1,4}$/.exec(
      flight_num,
    );
    if (regex != null) {
      setDeparture_flight_number(
        regex[1] +
          ' ' +
          flight_num.slice(
            flight_num.indexOf(regex[1]) + regex[1].length,
            flight_num.length,
          ),
      );
      setFieldValue(
        'departure_flight_number',
        regex[1] +
          ' ' +
          flight_num.slice(
            flight_num.indexOf(regex[1]) + regex[1].length,
            flight_num.length,
          ),
      );
      setDepartureFlightError(false);
      console.log('Value at end', e.target.value);
      // console.log('departure_flight_number end', departure_flight_number);
    } else {
      setDepartureFlightError(true);
    }
  }

  return (
    <div>
      <Header />

      <div>
        <section className="banner innerbanner booking" />
        <section className="bookingcontent">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="bookingwrap">
                  <p className="text-center blue text-decoration-underline backsearch">
                    <img src={leftangleImg} alt /> Back to search options
                  </p>
                  <Formik
                    initialValues={{
                      ordernumber: '',
                      lastname: '',
                      first_name: '',
                      phone_number: '',
                      email: '',
                      arrival_date: '',
                      arrival_flight_number: '',
                      arrival_time: '',
                      departure_date: '',
                      departure_flight_number: '',
                      departure_time: '',
                      card_holder_name: '',
                      card_number: '',
                      exp_date: '',
                      cvv: '',
                    }}
                    validationSchema={bookingSchema}
                    onSubmit={values => {
                      // orderRequest(values);
                      console.log('Moeed:', values);
                    }}
                  >
                    {({ errors, touched, setFieldValue }) => (
                      <Form className="bookingform">
                        <h2>
                          Lead Passenger Details{' '}
                          <span
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Tooltip on top"
                          >
                            <img src={infoImg} />
                          </span>
                        </h2>
                        <hr />
                        <div className="form-row ">
                          <div className="form-group col-md-6 mw-470">
                            <label>Passenger first name</label>
                            <Field
                              type="text"
                              name="first_name"
                              className="form-control"
                              id="fname"
                            />

                            {errors.first_name && touched.first_name ? (
                              <div className="errorMsg">
                                {errors.first_name}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6 mw-470">
                            <label>Passenger last name</label>
                            <Field
                              type="text"
                              name="last_name"
                              className="form-control"
                              id="lname"
                            />

                            {errors.last_name && touched.last_name ? (
                              <div className="errorMsg">{errors.last_name}</div>
                            ) : null}
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6 mw-470">
                            <label>Mobile phone</label>
                            <Field
                              type="tel"
                              name="phone_number"
                              className="form-control"
                              id="phone"
                            />

                            {errors.phone_number && touched.phone_number ? (
                              <div className="errorMsg">
                                {errors.phone_number}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6 mw-470">
                            <label>Email</label>
                            <Field
                              type="email"
                              name="email"
                              className="form-control"
                              id="email"
                            />
                            {errors.email && touched.email ? (
                              <div className="errorMsg">{errors.email}</div>
                            ) : null}
                          </div>
                        </div>

                        <h2>Arrival Flight Details</h2>
                        <hr />
                        <div className="form-row">
                          <div className="form-group col-md-4 mw-300">
                            <label>Arrival date</label>
                            <Field
                              type="date"
                              className="form-control"
                              id="arrivaldate"
                              name="arrival_date"
                            />
                            {errors.arrival_date && touched.arrival_date ? (
                              <div className="errorMsg">
                                {errors.arrival_date}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-4 mw-360">
                            <label>Flight number</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="fnumber"
                              name="arrival_flight_number"
                              onKeyUp={e => handleKeyUp(e, setFieldValue)}
                            />
                            {(errors.arrival_flight_number &&
                              touched.arrival_flight_number) ||
                            showThis ? (
                              <div className="errorMsg">
                                {errors.arrival_flight_number
                                  ? errors.arrival_flight_number
                                  : 'Invalid flight number'}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-4 mw-200">
                            <label>
                              Arrival time{' '}
                              <span>
                                <img src={infoImg} />
                              </span>
                            </label>
                            <Field
                              type="time"
                              className="form-control"
                              id="arrivaltime"
                              name="arrival_time"
                              component={RCTimePicker}
                            />

                            {errors.arrival_time && touched.arrival_time ? (
                              <div className="errorMsg">
                                {errors.arrival_time}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <h2>Departure Flight Details</h2>
                        <hr />
                        <div className="form-row">
                          <div className="form-group col-md-4 mw-300">
                            <label>Departure date</label>
                            <Field
                              type="date"
                              className="form-control"
                              id="departuredate"
                              name="departure_date"
                            />
                            {errors.departure_date && touched.departure_date ? (
                              <div className="errorMsg">
                                {errors.departure_date}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-4 mw-360">
                            <label>Flight number</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="fnumber"
                              name="departure_flight_number"
                              // onBlur={e => handleChange(e, setFieldValue)}
                              onKeyUp={e => handleKeyUp1(e, setFieldValue)}
                            />
                            {(errors.departure_flight_number &&
                              touched.departure_flight_number) ||
                            showThis2 ? (
                              <div className="errorMsg">
                                {errors.departure_flight_number
                                  ? errors.departure_flight_number
                                  : 'Invalid flight number'}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-4 mw-200">
                            <label>
                              Departure time{' '}
                              <span>
                                <img src={infoImg} />
                              </span>
                            </label>
                            {/* <Field
                              type="time"
                              className="form-control"
                              id="arrivaltime"
                              name="departure_time"
                            /> */}
                            <Field
                              className="form-control"
                              id="arrivaltime"
                              name="departure_time"
                              component={RCTimePicker}
                            />
                            {errors.departure_time && touched.departure_time ? (
                              <div className="errorMsg">
                                {errors.departure_time}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <h2>Transfer Details</h2>
                        <hr />
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <label>Address / Hotel</label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                            />
                          </div>
                          <div className="form-group col-sm-12">
                            <a
                              href="#"
                              className="blue text-decoration-underline ml-15"
                            >
                              Advanced location search
                            </a>
                          </div>
                          <div className="form-group col-md-12">
                            <div className="selectwrap">
                              <label className="mb-0">Passengers numbers</label>
                              <select className="form-control form-control-sm">
                                <option>1</option>
                                <option>2</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group">
                            <button
                              type="button"
                              className="btn btnstyle4 backbtn ml-15"
                              name="button"
                            >
                              <img src={btnarrowImg} alt /> Back to options
                            </button>
                          </div>
                        </div>
                        <h2>
                          Special Equipment{' '}
                          <span>
                            <img src={infoImg} />
                          </span>
                        </h2>
                        <hr />
                        <div className="form-row">
                          <div className="form-group col-lg-4 col-md-6">
                            <label>Request for:</label>
                            <div className="wrapfields">
                              <div className="selectwrap">
                                <label className="mb-0 ml-0">Baby seat</label>
                                <label className="mb-0 ml-0">Quantity</label>
                                <select
                                  onChange={event =>
                                    selectBabyOptions(event.target.value)
                                  }
                                  className="form-control form-control-sm"
                                  defaultValue=""
                                >
                                  <option value="">Select</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                </select>
                              </div>

                              {showBabyAges && showBabyAges.length > 0
                                ? showBabyAges.map(item => (
                                    <div className="selectwrap subfield">
                                      <label className="mb-0 ml-0 mr-5">
                                        {item.title}
                                      </label>
                                      <select className="form-control form-control-sm">
                                        {/* <option>{item.age}</option> */}
                                        <option>{item.value}</option>
                                      </select>
                                    </div>
                                  ))
                                : null}
                              {/* <div className="selectwrap subfield border-top-0">
                                <label className="mb-0 ml-0 mr-5">Age 2</label>
                                <select className="form-control form-control-sm">
                                  <option>8 months</option>
                                  <option>2</option>
                                </select>
                              </div> */}
                            </div>
                          </div>
                          <div className="form-group  col-lg-4 col-md-6">
                            <label>Request for:</label>
                            <div className="wrapfields">
                              <div className="selectwrap">
                                <label className="mb-0 ml-0">Child seat</label>
                                <label className="mb-0 ml-0">Quantity</label>
                                <select
                                  onChange={event =>
                                    selectChildOptions(event.target.value)
                                  }
                                  className="form-control form-control-sm"
                                  defaultValue=""
                                >
                                  <option value="">Select</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                </select>
                              </div>

                              {showChildAges && showChildAges.length > 0
                                ? showChildAges.map(item => (
                                    <div className="selectwrap subfield">
                                      <label className="mb-0 ml-0 mr-5">
                                        {item.title}
                                      </label>
                                      <select className="form-control form-control-sm">
                                        <option>{item.age}</option>
                                        <option>{item.value}</option>
                                      </select>
                                    </div>
                                  ))
                                : null}
                            </div>
                          </div>
                          <div className="form-group  col-lg-4 col-md-6">
                            <label>Request for:</label>
                            <div className="wrapfields">
                              <div className="selectwrap">
                                <label className="mb-0 ml-0 mr-5">
                                  <span>
                                    <img src={infoImg} />
                                  </span>{' '}
                                  Folding wheelchair
                                </label>
                                <select className="form-control form-control-sm">
                                  <option>1</option>
                                  <option>2</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h2>Remark</h2>
                        <hr />
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <h2>Payment</h2>
                        <hr />
                        <div className="if_not_calc_display_none ">
                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <label>Card holder name</label>
                              <Field
                                type="text"
                                name="card_holder_name"
                                className="form-control"
                              />

                              {errors.card_holder_name &&
                              touched.card_holder_name ? (
                                <div className="errorMsg">
                                  {errors.card_holder_name}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-4">
                              <label>Card Number</label>
                              <div className="isvalid">
                                <Field
                                  type="text"
                                  className="form-control"
                                  id="cardnumber"
                                  name="card_number"
                                />
                                {errors.card_number && touched.card_number ? (
                                  <div className="errorMsg">
                                    {errors.card_number}
                                  </div>
                                ) : (
                                  <img src={tickImg} alt />
                                )}
                              </div>
                            </div>
                            <div className="form-group col-md-4">
                              <label>Expiration Date</label>
                              <Field
                                type="date"
                                // min={new Date()}
                                max="2050-02-20"
                                className="form-control"
                                id="prev_dates"
                                name="exp_date"
                              />

                              {errors.exp_date && touched.exp_date ? (
                                <div className="errorMsg">
                                  {errors.exp_date}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-4">
                              <label>CVV</label>
                              <Field
                                type="text"
                                name="cvv"
                                className="form-control"
                              />

                              {errors.cvv && touched.cvv ? (
                                <div className="errorMsg">{errors.cvv}</div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-12">
                              <p>
                                Amount: <b className="black">00.00 USD </b>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <div className="bookingnotvalid">
                              <p className="invalid">
                                Booking cannot be instantly confirmed for these
                                dates. Send Cityride a booking request.
                              </p>
                              <p className="invalid">
                                The price is not valid for your selected
                                address. Send Cityride a price request.
                              </p>
                              <label className="ml-0">
                                I would like to be contact by:
                              </label>
                              <div className="mycheck border-top-0 pt-0">
                                <div className="checks">
                                  <input
                                    type="checkbox"
                                    name="checkboxG1"
                                    id="checkboxG1"
                                    className="css-checkbox"
                                  />
                                  <label
                                    htmlFor="checkboxG1"
                                    className="css-label ml-0"
                                  >
                                    Email to{' '}
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                  />
                                </div>
                                <div className="checks">
                                  <input
                                    type="checkbox"
                                    name="checkboxG2"
                                    id="checkboxG2"
                                    className="css-checkbox"
                                  />
                                  <label
                                    htmlFor="checkboxG2"
                                    className="css-label"
                                  >
                                    WhatsApp to{' '}
                                  </label>
                                  <input
                                    type="tel"
                                    className="form-control"
                                    id="whatsapp"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group col-md-12">
                            <div className="mycheck">
                              <input
                                type="checkbox"
                                name="checkboxG3"
                                id="checkboxG3"
                                className="css-checkbox"
                              />
                              <label
                                htmlFor="checkboxG3"
                                className="css-label blue text-decoration-underline ml-0"
                              >
                                Confirm terms and conditions
                              </label>
                              <input
                                type="checkbox"
                                name="checkboxG4"
                                id="checkboxG4"
                                className="css-checkbox"
                              />
                              <label htmlFor="checkboxG4" className="css-label">
                                I wish to receive promotional content
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group text-center">
                          <button
                            type="submit"
                            // disabled={!_.isEmpty(errors)}
                            className="btn btnstyle4"
                          >
                            Continue
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

Booking.propTypes = {};

export default Booking;
