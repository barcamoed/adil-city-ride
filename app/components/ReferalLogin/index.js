/**
 *
 * ReferalLogin
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import '../../assets/css/dashboard.css';
// import '../../assets/css/dashboardcore.css';
import LogoImg from '../../assets/images/logo.png';
import { Formik, Form, Field } from 'formik';
import { LoginShema } from '../Login/schema';
import {
  IDENTIFIER,
  GET_AFFILIATE_USER_LOGIN_KEY,
} from '../../utils/constants';
import { postRequest } from '../../utils/requests';
import LoadingOverlay from 'react-loading-overlay';

function ReferalLogin(props) {
  const [credentialError, setError] = useState('');
  const [isActive, setIsModalActive] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('ref_user_details')) {
      props.history.push('/referral/stat');
    }
  }, [credentialError]);
  const userLoginRequest = values => {
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
    };

    let formData = new FormData();
    let data = {
      command: 'affiliate_user_login',
      identifier: IDENTIFIER,
      key: GET_AFFILIATE_USER_LOGIN_KEY(),
      data: {
        email: values.email,
        password: values.password,
      },
    };

    for (let dataKey in data) {
      if (dataKey == 'command') {
        formData.append(`command`, 'affiliate_user_login');
      } else if (dataKey == 'identifier') {
        formData.append(`identifier`, IDENTIFIER);
      } else if (dataKey == 'key') {
        formData.append(`key`, GET_AFFILIATE_USER_LOGIN_KEY());
      }
      if (dataKey === 'data') {
        // append nested object
        for (let previewKey in data[dataKey]) {
          if (previewKey == 'email') {
            formData.append(`data[${previewKey}]`, values.email);
          } else if (previewKey == 'password') {
            formData.append(`data[${previewKey}]`, values.password);
          }
        }
      }
    }

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    setIsModalActive(true);
    postRequest(formData, headers).then(data => {
      console.log('Response Dataaaa:', data);
      console.log('Props:', props);
      setIsModalActive(false);
      if (data.status == 'ok' && data.access == '2') {
        localStorage.setItem(
          'ref_user_details',
          JSON.stringify(data.user_details),
        );
        setError('');
        props.history.push('/referral/stat');
      } else if (data.status == 'error' && data.access == '0' && data.message) {
        console.log('Response', data);
        setError(data.message);
      }
    });
  };

  return (
    <div>
      <LoadingOverlay active={isActive} spinner text="Loading...">
        <section className="admin-login">
          <div className="container-fluid p-0">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className>
                  <div className="row">
                    <div className="col-md-6 left-login-content">
                      <div className="welcome">
                        <h6>Welcome</h6>
                        <h1 style={{ fontSize: '36px' }}>
                          CityRide
                          <br />
                          Referral Login
                        </h1>
                        <Formik
                          initialValues={{
                            email: '',
                            password: '',
                          }}
                          validationSchema={LoginShema}
                          onSubmit={values => {
                            console.log('Moeeddddd:', values);
                            userLoginRequest(values);
                          }}
                        >
                          {({
                            errors,
                            touched,
                            isSubmitting,
                            setFieldValue,
                          }) => (
                            <Form className="form-material">
                              <div className="form-group">
                                <label>
                                  Username <span className="help" />
                                </label>

                                <Field
                                  type="text"
                                  name="email"
                                  className="form-control form-control-line"
                                />
                                {errors.email && touched.email ? (
                                  <div className="errorMsg pl-0">
                                    {errors.email}
                                  </div>
                                ) : null}
                                <label>
                                  Password <span className="help" />
                                </label>

                                <Field
                                  type="password"
                                  name="password"
                                  className="form-control form-control-line"
                                />
                                {errors.password && touched.password ? (
                                  <div className="errorMsg pl-0">
                                    {errors.password}
                                  </div>
                                ) : null}
                                {/* <div className="mt-2">
                                  {' '}
                                  <a href className="text-muted ">
                                    Forgot Password?
                                  </a>
                                  <br />
                                </div> */}
                                {credentialError ? (
                                  <div>{credentialError}</div>
                                ) : null}
                                <button
                                  type="submit"
                                  className="btn btn-rounded  btn-primary"
                                >
                                  LOGIN
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                    <div className="col-md-6 right-login-pic align-self-center">
                      <img src={LogoImg} className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LoadingOverlay>
    </div>
  );
}

ReferalLogin.propTypes = {};

export default ReferalLogin;
