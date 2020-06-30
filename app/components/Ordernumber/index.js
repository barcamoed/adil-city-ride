/**
 *
 * Ordernumber
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import Header from '../Header';
import Footer from '../Footer';
import { FormattedMessage } from 'react-intl';

import searchImg from '../../assets/images/search.png';
import messages from './messages';
import { OrderNumberSchema } from '../Login/schema';

function Ordernumber() {
  return (
    <div>
      <Header />

      <section className="banner innerbanner ordernumber">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <h1 className="text-center">Enter Order Number</h1>
            </div>

            <div className="col-md-12">
              <Formik
                initialValues={{
                  ordernumber: '',
                  lastname: '',
                }}
                validationSchema={OrderNumberSchema}
                onSubmit={values => {
                  // orderRequest(values);
                  console.log('Moeed:', values);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="input-group">
                      <Field
                        type="number"
                        name="order_number"
                        className="form-control"
                        placeholder="6 Digits"
                      />
                      {errors.order_number && touched.order_number ? (
                        <div className="errorMsg">{errors.order_number}</div>
                      ) : null}

                      <Field
                        type="text"
                        name="last_name"
                        className="form-control"
                        placeholder="Last name"
                      />
                      {errors.last_name && touched.last_name ? (
                        <div className="errorMsg">{errors.last_name}</div>
                      ) : null}

                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary searchbtn"
                          type="submit"
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
}

Ordernumber.propTypes = {};

export default Ordernumber;
