/**
 *
 * Contact
 *
 */

import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import whatsappImg from '../../assets/images/whatsapp.png';
import { Formik, Form, Field, useField } from 'formik';
import { ContactUsSchema } from '../Login/schema';
import { IDENTIFIER, GET_CONTACT_US_KEY } from '../../utils/constants';
import { postRequest } from '../../utils/requests';

const MyTextArea = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      {/* <label htmlFor={props.id || props.name}>{label}</label> */}
      <textarea className="text-area" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="errorMsg">{meta.error}</div>
      ) : null}
    </>
  );
};

const Contact = () => {
  const [submitError, setSubmitError] = useState('');

  const postContactData = values => {
    console.log('My Post Data Func', values);
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
    };

    let formData = new FormData();
    let data = {
      command: 'send_contact_form',
      identifier: IDENTIFIER,
      key: GET_CONTACT_US_KEY(),
      data: {
        client_name: values.name,
        client_phone: values.phone,
        client_email: values.email,
        contact_message: values.message,
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
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    postRequest(formData, headers).then(data => {
      console.log('Dataaaaaaaaaaa...', data);
      if (data.status == 'ok') {
        alert('Submitted');
        window.location.href = 'http://localhost:3000/';
      } else {
        console.log('Error');
        setSubmitError('There was some error in submission');
      }
    });
  };

  return (
    <div>
      <Header />

      <div>
        <section className="banner innerbanner contact">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-12">
                <h1 className="text-center">Contact Us</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="onlywhatsapp">
          <div className="container ">
            <div className="row">
              <div className="col-md-12">
                <div className="contact">
                  <a href="#" className="btn btnstyle1">
                    <img src={whatsappImg} alt="img-fluid" /> Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="contactcontent">
          <div className="container">
            <div className="contactwrap">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h2>How can we help?</h2>
                  </div>
                  <div className="col-md-12">
                    <Formik
                      enableReinitialize
                      initialValues={{
                        name: '',
                        email: '',
                        phone: '',
                        message: '',
                      }}
                      validationSchema={ContactUsSchema}
                      onSubmit={(values, { setSubmitting }) => {
                        // console.log('Values...', values);
                        postContactData(values);
                        // setTimeout(() => {
                        //   alert(JSON.stringify(values, null, 2));
                        //   setSubmitting(false);
                        // }, 400);
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form className="contactform">
                          <div className="form-group">
                            <Field
                              type="text"
                              className="form-control"
                              placeholder="Your name *"
                              name="name"
                            />
                            {errors.name && touched.name && (
                              <div className="errorMsg">{errors.name}</div>
                            )}
                          </div>
                          <div className="form-group">
                            <Field
                              type="tel"
                              className="form-control"
                              placeholder="Phone *"
                              name="phone"
                            />
                            {errors.phone && touched.phone && (
                              <div className="errorMsg">{errors.name}</div>
                            )}
                          </div>
                          <div className="form-group">
                            <Field
                              type="email"
                              className="form-control"
                              placeholder="Email *"
                              name="email"
                            />
                            {errors.email && touched.email && (
                              <div className="errorMsg">{errors.name}</div>
                            )}
                          </div>
                          <div className="form-group">
                            <MyTextArea
                              className="form-control"
                              placeholder="Message *"
                              defaultValue={''}
                              label="First Name"
                              name="message"
                            />
                          </div>
                          <div className="form-group text-center">
                            <button type="submit" className="btn btnstyle4">
                              Send
                            </button>
                            {submitError ? <div>{submitError}</div> : null}
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                  <div className="col-md-12">
                    <div className="contactdetails">
                      <p>Phone number: 03-6133800</p>
                      <p>
                        We write: Ariel Sharon Street 4 Givatayim Postal Code
                        5320047 Israel
                      </p>
                      <p />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="divbluebg" />
        </section>
      </div>

      <Footer />
    </div>
  );
};

Contact.propTypes = {};

export default Contact;
