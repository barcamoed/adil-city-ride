/**
 *
 * OrderSummary
 *
 */

import React, { useState, useEffect } from 'react';
import { IDENTIFIER, GET_RESERVATION_DETAILS_KEY } from '../../utils/constants';
import { postRequest } from '../../utils/requests';
import Header from '../Header';
import Footer from '../Footer';

const OrderSummary = props => {
  const [orderData, setOrderData] = useState({});
  useEffect(() => {
    console.log('Order Details Obj', localStorage.getItem('order_detail'));
    if (JSON.parse(localStorage.getItem('order_detail')) != null) {
      // console.log(
      //   'Local Storage Dataaaaa.',
      //   JSON.parse(localStorage.getItem('order_detail')),
      // );
      setOrderData(JSON.parse(localStorage.getItem('order_detail')));
    }
    if (
      localStorage.getItem('lastNameAndOrderNo') != null ||
      localStorage.getItem('lastNameAndOrderNo') != undefined
    ) {
      console.log(
        'Order No and Last Name inStoareg',
        JSON.parse(localStorage.getItem('lastNameAndOrderNo')),
      );

      const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
      };

      let formData = new FormData();
      let data = {
        command: 'get_reservation_details',
        identifier: IDENTIFIER,
        key: GET_RESERVATION_DETAILS_KEY(),
        data: {
          res_id: JSON.parse(localStorage.getItem('lastNameAndOrderNo'))
            .reservation_id,
          last_name: JSON.parse(localStorage.getItem('lastNameAndOrderNo'))
            .last_name,
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
          setOrderData(reservation_details);
        } else if (data.result == 'error') {
          console.log('Nothing Found or Error', data);
          // setErrorMsg(data.error_message.toUpperCase());
          // setShowReservationModal(true);
          // setTimeout(() => {
          //   setShowReservationModal(false);
          // }, 5000);
          // const noResultFound = 'No Result Found';
        }
      });

      // props.history.push('/order-number');
    }
  }, [orderData.length]);

  console.log(
    'order_Dataaaa',
    JSON.parse(localStorage.getItem('order_detail')),
  );
  return (
    <div>
      <Header props={props} />
      <section className="banner innerbanner ordersummary">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <h1 className="text-center">
                Hey{' '}
                {JSON.parse(localStorage.getItem('order_detail')) != null &&
                JSON.parse(localStorage.getItem('order_detail')).last_name
                  ? JSON.parse(localStorage.getItem('order_detail')).last_name
                  : null}
                !
              </h1>
              <p>
                Your order has been received and approved, the order and order
                confirmation
                <br /> has been sent to you by e-mail. Order number:{' '}
                {JSON.parse(localStorage.getItem('order_detail')) != null &&
                JSON.parse(localStorage.getItem('order_detail')).res_id
                  ? JSON.parse(localStorage.getItem('order_detail')).res_id
                  : null}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="ordersummarycontent">
        <div className="container">
          <div className="row">
            {JSON.parse(localStorage.getItem('order_detail')) != null &&
            JSON.parse(localStorage.getItem('order_detail')).transfers &&
            JSON.parse(localStorage.getItem('order_detail')).transfers.length >
              1 ? (
              <React.Fragment>
                <div className="col-md-6">
                  <div className="ordersummarywrap">
                    <h2>Arrival Details</h2>
                    <hr />
                    <div className="summarydetail">
                      <div className="eachdetail">
                        <span className="blue">From:</span>
                        <p>
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[0].pick_location
                            : null}
                        </p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Pick-up date:</span>
                        <p>
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[0].date
                            : null}
                        </p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Pick-up time:</span>
                        <p>
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[0].time
                            : null}
                        </p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Passengers:</span>
                        <p>
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[0].pax_num
                            : null}
                        </p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Service type:</span>
                        <p>
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[0].service_type
                            : null}
                        </p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Flight number:</span>
                        <p>
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[0].flight_num
                            : null}
                        </p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Price:</span>
                        <p>
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[0].price
                            : null}{' '}
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[0].currency
                            : null}{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="ordersummarywrap">
                    <h2>Return Details</h2>
                    <hr />
                    <div className="summarydetail">
                      <div className="eachdetail">
                        <span className="blue">From:</span>
                        <p>
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[1].pick_location
                            : null}
                        </p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">To:</span>
                        <p>
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[1].drop_location
                            : null}
                        </p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Pick-up date:</span>
                        <p>
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[1].date
                            : null}
                        </p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Depart time:</span>
                        <p>
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[1].depart_time
                            : null}
                        </p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Passengers:</span>
                        <p>
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[1].pax_num
                            : null}
                        </p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Service type:</span>
                        <p>
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[1].service_type
                            : null}
                        </p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Flight number:</span>
                        <p>
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[1].flight_num
                            : null}
                        </p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Price:</span>
                        <p>
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[1].price
                            : null}{' '}
                          {JSON.parse(localStorage.getItem('order_detail')) !=
                          null
                            ? JSON.parse(localStorage.getItem('order_detail'))
                                .transfers[1].currency
                            : null}{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <div className="col-md-6">
                <div className="ordersummarywrap">
                  <h2>
                    {JSON.parse(localStorage.getItem('order_detail')) != null &&
                    JSON.parse(localStorage.getItem('order_detail'))
                      .transfers[0].depart_time
                      ? 'Return Details'
                      : 'Arrival Details'}
                  </h2>
                  <hr />
                  <div className="summarydetail">
                    <div className="eachdetail">
                      <span className="blue">From:</span>
                      <p>
                        {JSON.parse(localStorage.getItem('order_detail')) !=
                        null
                          ? JSON.parse(localStorage.getItem('order_detail'))
                              .transfers[0].pick_location
                          : null}
                      </p>
                    </div>
                    <div className="eachdetail">
                      <span className="blue">To:</span>
                      <p>
                        {JSON.parse(localStorage.getItem('order_detail')) !=
                        null
                          ? JSON.parse(localStorage.getItem('order_detail'))
                              .transfers[0].drop_location
                          : null}
                      </p>
                    </div>
                    <div className="eachdetail">
                      <span className="blue">
                        {JSON.parse(localStorage.getItem('order_detail')) !=
                          null &&
                        JSON.parse(localStorage.getItem('order_detail'))
                          .transfers[0].date
                          ? 'Departing date'
                          : 'Pickup date'}
                      </span>
                      <p>
                        {JSON.parse(localStorage.getItem('order_detail')) !=
                        null
                          ? JSON.parse(localStorage.getItem('order_detail'))
                              .transfers[0].date
                          : null}
                      </p>
                    </div>
                    <div className="eachdetail">
                      <span className="blue">
                        {JSON.parse(localStorage.getItem('order_detail')) !=
                          null &&
                        JSON.parse(localStorage.getItem('order_detail'))
                          .transfers[0].depart_time
                          ? 'Departing time'
                          : 'Pickup time'}
                      </span>
                      <p>
                        {JSON.parse(localStorage.getItem('order_detail')) !=
                          null &&
                        JSON.parse(localStorage.getItem('order_detail'))
                          .transfers[0].depart_time
                          ? JSON.parse(localStorage.getItem('order_detail'))
                              .transfers[0].depart_time
                          : JSON.parse(localStorage.getItem('order_detail')) !=
                              null &&
                            JSON.parse(localStorage.getItem('order_detail'))
                              .transfers[0].time
                          ? JSON.parse(localStorage.getItem('order_detail'))
                              .transfers[0].time
                          : null}
                      </p>
                    </div>
                    <div className="eachdetail">
                      <span className="blue">Passengers:</span>
                      <p>
                        {JSON.parse(localStorage.getItem('order_detail')) !=
                        null
                          ? JSON.parse(localStorage.getItem('order_detail'))
                              .transfers[0].pax_num
                          : null}
                      </p>
                    </div>
                    <div className="eachdetail">
                      <span className="blue">Service type:</span>
                      <p>
                        {JSON.parse(localStorage.getItem('order_detail')) !=
                        null
                          ? JSON.parse(localStorage.getItem('order_detail'))
                              .transfers[0].service_type
                          : null}
                      </p>
                    </div>
                    <div className="eachdetail">
                      <span className="blue">Flight number:</span>
                      <p>
                        {JSON.parse(localStorage.getItem('order_detail')) !=
                        null
                          ? JSON.parse(localStorage.getItem('order_detail'))
                              .transfers[0].flight_num
                          : null}
                      </p>
                    </div>
                    <div className="eachdetail">
                      <span className="blue">Price:</span>
                      <p>
                        {JSON.parse(localStorage.getItem('order_detail')) !=
                        null
                          ? JSON.parse(localStorage.getItem('order_detail'))
                              .transfers[0].price
                          : null}{' '}
                        {JSON.parse(localStorage.getItem('order_detail')) !=
                        null
                          ? JSON.parse(localStorage.getItem('order_detail'))
                              .transfers[0].currency
                          : null}{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="col-md-12">
              <div className="ordersummarywrap passengerinfo">
                <h2>Passenger information</h2>
                <hr />
                <div className="summarydetail">
                  <div className="eachdetail">
                    <span className="blue">First name:</span>
                    <p>
                      {JSON.parse(localStorage.getItem('order_detail')) != null
                        ? JSON.parse(localStorage.getItem('order_detail'))
                            .first_name
                        : null}
                    </p>
                  </div>
                  <div className="eachdetail">
                    <span className="blue">Last Name:</span>
                    <p>
                      {JSON.parse(localStorage.getItem('order_detail')) != null
                        ? JSON.parse(localStorage.getItem('order_detail'))
                            .last_name
                        : null}
                    </p>
                  </div>
                  <div className="eachdetail">
                    <span className="blue">Remarks:</span>
                    <p>
                      {JSON.parse(localStorage.getItem('order_detail')) != null
                        ? JSON.parse(localStorage.getItem('order_detail'))
                            .remark
                        : null}
                    </p>
                    {/* <p /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

OrderSummary.propTypes = {};

export default OrderSummary;
