/**
 *
 * Login
 *
 */

// import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
// import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import formImage from '../../assets/images/form-image1.png';
// import logoImage from '../../assets/images/logo-white.png';
import { BASE_URL } from '../../utils/constants';
import { LoginShema } from './schema';

/////

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
// import formImage from '../../assets/images/form-image1.png';
// import logoImage from '../../assets/images/logo-white.png';
// import { Formik, Form, Field } from 'formik';
// import { Link } from 'react-router-dom';

// const Login = ({ history }) => {
//   return (
//     <section className="section-forget">
//       <div className="container-fluid p-0">
//         <div className="row no-gutters">
//           <div className="col-md-7">
//             <div className="bg-blue login-con">
//               <Link to="/">
//                 <img src={logoImage} className="logo-white" alt="logo-img" />
//               </Link>
//               <img
//                 src={formImage}
//                 className="img-form mx-auto d-block"
//                 alt="form-img"
//               />
//             </div>
//           </div>
//           <div className="col-md-5">
//             <div className="form-main form-demo">
//               <h1 className="main-title pb-f ">Login to Dashboard</h1>
//               <Formik
//                 initialValues={{
//                   email: '',
//                   password: '',
//                 }}
//                 // validationSchema={LoginShema}
//                 // onSubmit={values => {
//                 //   loginRequest(values);
//                 // }}
//               >
//                 <div>
//                   <Form disabled={false} noValidate>
//                     <div className="form-group">
//                       <Field type="email" name="email" placeholder="Email" />
//                       {/* {errors.email && touched.email ? ( */}
//                       {/* <p className="validationErrorMessage" /> */}
//                       {/* ) : null} */}
//                     </div>
//                     <div className="form-group">
//                       <Field
//                         type="password"
//                         name="password"
//                         className={
//                           errors.password && touched.password
//                             ? 'form-control validation addCross'
//                             : 'form-control'
//                         }
//                         placeholder="Password"
//                       />
//                     </div>

//                     <button
//                       id="btn-search"
//                       type="submit"
//                       className="btn btn-outline btn-md btn-demo mb-20"
//                     >
//                       Login
//                     </button>

//                     <button className="btn btn-outline btn-md btn-demo mb-20">
//                       <i className="fa fa-refresh fa-spin" />
//                       Loading
//                     </button>

//                     <div className="login-stats">
//                       <input type="checkbox" name="remember" />
//                       <span className="remember">Remember me</span>
//                       <Link to="/forgot-password" className="f-pwd">
//                         Forget Password
//                       </Link>
//                       <Link to="/register" className="accont">
//                         Don’t have an account yet?{' '}
//                       </Link>
//                       <Link to="/register" className="login">
//                         Register
//                       </Link>
//                     </div>
//                   </Form>
//                   {/* )} */}
//                 </div>
//               </Formik>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

///

const Login = ({ history }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      history.push('/dashboard');
    } else {
      localStorage.clear();
    }
  }, []);
  function loginRequest(userInfo) {
    setLoading(true);
    const { email, password } = userInfo;
    axios
      .post(`${BASE_URL}auth/login`, { email, password })
      .then(response => {
        // toast.success('you are logged In Successfuly!');
        const { token, userId, name } = response && response.data;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('name', name);
        localStorage.setItem('email', response && response.data.email);

        history.push('/dashboard');
        setLoading(false);
      })
      .catch(err => {
        const { data } = err.response;
        setLoading(false);
        // toast.error(data.message);
      })
      .then(() => {
        setLoading(false);
      });
    // userLoginRequest('auth/login', { email, password }, history);
  }
  return (
    <section className="section-forget">
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div className="col-md-7">
            <div className="bg-blue login-con">
              <Link to="/">
                <img src={logoImage} className="logo-white" alt="logo-img" />
              </Link>
              <img
                src={formImage}
                className="img-form mx-auto d-block"
                alt="form-img"
              />
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-main form-demo">
              <h1 className="main-title pb-f ">Login to Dashboard</h1>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={LoginShema}
                onSubmit={values => {
                  loginRequest(values);
                }}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form disabled={isSubmitting} noValidate>
                    <div className="form-group">
                      <Field
                        type="email"
                        name="email"
                        className={
                          errors.email && touched.email
                            ? 'form-control validation addCross'
                            : 'form-control'
                        }
                        placeholder="Email"
                      />
                      {errors.email && touched.email ? (
                        <p className="validationErrorMessage">{errors.email}</p>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <Field
                        type="password"
                        name="password"
                        className={
                          errors.password && touched.password
                            ? 'form-control validation addCross'
                            : 'form-control'
                        }
                        placeholder="Password"
                      />
                      {errors.password && touched.password ? (
                        <p className="validationErrorMessage">
                          {errors.password}
                        </p>
                      ) : null}
                    </div>

                    {!loading ? (
                      <button
                        id="btn-search"
                        type="submit"
                        className="btn btn-outline btn-md btn-demo mb-20"
                      >
                        Login
                      </button>
                    ) : (
                      <button className="btn btn-outline btn-md btn-demo mb-20">
                        <i className="fa fa-refresh fa-spin" />
                        Loading
                      </button>
                    )}
                    <div className="login-stats">
                      <input type="checkbox" name="remember" />
                      <span className="remember">Remember me</span>
                      <Link to="/forgot-password" className="f-pwd">
                        Forget Password
                      </Link>
                      <Link to="/register" className="accont">
                        Don’t have an account yet?{' '}
                      </Link>
                      <Link to="/register" className="login">
                        Register
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Login.propTypes = {};

export default Login;
