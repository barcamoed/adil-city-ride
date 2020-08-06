/**
 *
 * Ordernumber
 *
 */

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import Header from '../Header';
import Footer from '../Footer';
import { IDENTIFIER, GET_RESERVATION_DETAILS_KEY } from '../../utils/constants';
import { postRequest } from '../../utils/requests';
import searchImg from '../../assets/images/search.png';
import { OrderNumberSchema } from '../Login/schema';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '560px',
    width: '100%',
    heigh: '50%',
  },
  overlay: { zIndex: 1000 },
};
const Ordernumber = props => {
  const [orderNumber, setOrderNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [showModal, setShowReservationModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
        } else if (data.result == 'error') {
          console.log('Nothing Found or Error', data);
          setErrorMsg(data.error_message.toUpperCase());
          setShowReservationModal(true);
          setTimeout(() => {
            setShowReservationModal(false);
          }, 5000);
          const noResultFound = 'No Result Found';
        }
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
                  order_number: orderNumber,
                  last_name: lastName,
                }}
                validationSchema={OrderNumberSchema}
                onSubmit={values => {
                  // orderRequest(values);
                  handleClick();
                  // console.log('My Valuessssss:', values);
                }}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form>
                    <div className="input-group">
                      <Field
                        type="text"
                        name="order_number"
                        className="form-control"
                        placeholder="6 Digits"
                        value={orderNumber}
                        onChange={e => {
                          handleOrder(e);
                          const someValue = e.currentTarget.value;
                          setFieldValue('order_number', someValue);
                        }}
                      />

                      <Field
                        type="text"
                        name="last_name"
                        className="form-control"
                        placeholder="Last name"
                        value={lastName}
                        onChange={e => {
                          handleOrder(e);
                          const someValue = e.currentTarget.value;
                          setFieldValue('last_name', someValue);
                        }}
                      />

                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary searchbtn"
                          type="submit"
                          // onClick={handleClick}
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

      {showModal ? (
        <Modal
          isOpen={showModal}
          // onAfterOpen={afterOpenModal}
          // onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Reservation"
          shouldCloseOnOverlayClick={true}
        >
          <div className="reservation">
            <h2>We could not find your booking</h2>
            <p>{errorMsg}</p>
            {/* <h3 ref={_subtitle => (subtitle = _subtitle)}>
                Reservation ID: {res_ID}
              </h3> */}
          </div>

          {/* <h4></h4> */}
        </Modal>
      ) : null}

      <Footer />
    </div>
  );
};

Ordernumber.propTypes = {};

export default Ordernumber;
