/**
 *
 * AdminLogin
 *
 */

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { LoginShema } from '../Login/schema';
import LogoImg from '../../assets/images/logo.png';
import '../../assets/css/dashboard.css';
import '../../assets/css/dashboardcore.css';
import {
  IDENTIFIER,
  GET_AFFILIATE_USER_LOGIN_KEY,
} from '../../utils/constants';
import { postRequest } from '../../utils/requests';
const AdminLogin = props => {
  const [credentialError, setError] = useState('');
  useEffect(() => {}, [credentialError]);
  const adminLoginRequest = values => {
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

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    postRequest(formData, headers).then(data => {
      console.log('Response Dataaaaaaaa:', data);
      console.log('Props:', props);
      if (data.status == 'ok' && data.access == '1') {
        localStorage.setItem(
          'admin_details',
          JSON.stringify(data.user_details),
        );
        setError('');
        props.history.push('/admin/referrals');
      } else if (data.status == 'error' && data.access == '0' && data.message) {
        console.log('Response', data);
        setError(data.message);
      }
    });
  };
  return (
    <div>
      <section className="admin-login">
        <div className="container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className>
                <div className="row">
                  <div className="col-md-6 left-login-content">
                    <div className="welcome">
                      <h6>Welcome</h6>
                      <h1>
                        CityRide
                        <br />
                        Admin Login
                      </h1>
                      <Formik
                        initialValues={{
                          email: '',
                          password: '',
                        }}
                        validationSchema={LoginShema}
                        onSubmit={values => {
                          console.log('Moeeddddd:', values);
                          adminLoginRequest(values);
                        }}
                      >
                        {({ errors, touched, isSubmitting, setFieldValue }) => (
                          <Form className="form-material">
                            <div className="form-group">
                              <label>
                                Username <span className="help" />
                              </label>
                              {errors.email && touched.email ? (
                                <div className="errorLogin">{errors.email}</div>
                              ) : null}

                              <Field
                                type="text"
                                name="email"
                                className="form-control form-control-line"
                              />
                              <label>
                                Password <span className="help" />
                              </label>
                              {errors.password && touched.password ? (
                                <div className="errorLogin">
                                  {errors.password}
                                </div>
                              ) : null}
                              <Field
                                type="password"
                                name="password"
                                className="form-control form-control-line"
                              />
                              <div className="mt-2">
                                {' '}
                                <a href className="text-muted ">
                                  Forgot Password?
                                </a>
                                <br />
                              </div>
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
    </div>
  );
};

AdminLogin.propTypes = {};

export default AdminLogin;
