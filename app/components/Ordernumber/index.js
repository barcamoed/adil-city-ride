/**
 *
 * Ordernumber
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import Header from '../Header';
import Footer from '../Footer';
import { FormattedMessage } from 'react-intl';
import { IDENTIFIER, GET_RESERVATION_DETAILS_KEY } from '../../utils/constants';
import { postRequest } from '../../utils/requests';
import searchImg from '../../assets/images/search.png';
import messages from './messages';
import { OrderNumberSchema } from '../Login/schema';

const Ordernumber = props => {
  const [orderNumber, setOrderNumber] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {}, [orderNumber, lastName]);

  function handleOrder(e) {
    const value = e.target.value;
    if (e.target.name == 'order_number') {
      // console.log('Order no.', value);
      setOrderNumber(value);
    } else if (e.target.name == 'last_name') {
      // console.log('Last ANme', value);
      setLastName(value);
    }
  }
  function handleClick() {
    // console.log('Insodeeeeeeeeeeeee', orderNumber, lastName);
    if (orderNumber && lastName) {
      // console.log('Insodeeeeeeeeeeeee2');
      const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
      };

      let formData = new FormData();
      let data = {
        command: 'get_reservation_details',
        identifier: IDENTIFIER,
        key: GET_RESERVATION_DETAILS_KEY(),
        data: {
          res_id: orderNumber,
          last_name: lastName,
          environment: 'test',
        },
      };

      for (let dataKey in data) {
        if (dataKey === 'data') {
          // append nested object
          for (let previewKey in data[dataKey]) {
            formData.append(`data[${previewKey}]`, data[dataKey][previewKey]);
          }
        } else {
          formData.append(dataKey, data[dataKey]);
        }
      }
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }
      postRequest(formData, headers).then(data => {
        if (data.result == 'ok') {
          // console.log('Data Status:', data);
          const reservation_details = data.reservation_details;
          // console.log('Details...', reservation_details);
          localStorage.setItem(
            'order_detail',
            JSON.stringify(reservation_details),
          );
          window.location.href = 'http://localhost:3000/order-summary';
          // setFormData(myObj);
        }
        // else if (data.result == 'no_results') {
        //   const noResultFound = 'No Result Found';

        // }
      });
    }
  }

  return (
    <div>
      <Header props={props} />

      <section className="banner innerbanner ordernumber">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <h1 className="text-center">Enter Order Number</h1>
            </div>

            <div className="col-md-12">
              <Formik
                initialValues={{
                  ordernumber: orderNumber,
                  lastname: lastName,
                }}
                validationSchema={OrderNumberSchema}
                onSubmit={values => {
                  // orderRequest(values);
                  // console.log('My Valuessssss:', values);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="input-group">
                      <Field
                        type="text"
                        name="order_number"
                        className="form-control"
                        placeholder="6 Digits"
                        onChange={handleOrder}
                      />

                      <Field
                        type="text"
                        name="last_name"
                        className="form-control"
                        placeholder="Last name"
                        onChange={handleOrder}
                      />

                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary searchbtn"
                          type="submit"
                          onClick={handleClick}
                        >
                          <img
                            src={searchImg}
                            className="img-fluid"
                            alt="search"
                          />{' '}
                          Search
                        </button>
                      </div>
                    </div>
                    {errors.order_number && touched.order_number ? (
                      <div className="errorMsg">{errors.order_number}</div>
                    ) : null}

                    {errors.last_name && touched.last_name ? (
                      <div className="errorMsg">{errors.last_name}</div>
                    ) : null}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

Ordernumber.propTypes = {};

export default Ordernumber;
