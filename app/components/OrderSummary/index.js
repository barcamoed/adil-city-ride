/**
 *
 * OrderSummary
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const OrderSummary = () => {
  const [orderData, setOrderData] = useState({});
  useEffect(() => {
    if (localStorage.getItem('order_detail')) {
      console.log(
        'Local Storage Dataaaaa.',
        JSON.parse(localStorage.getItem('order_detail')),
      );
      setOrderData(JSON.parse(localStorage.getItem('order_detail')));
    }
  }, [orderData.length]);

  console.log('order_Dataaaa', orderData);
  return (
    <div>
      <Header />
      <section className="banner innerbanner ordersummary">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <h1 className="text-center">
                Hey {JSON.parse(localStorage.getItem('order_detail')).last_name}
                !
              </h1>
              <p>
                Your order has been received and approved, the order and order
                confirmation
                <br /> has been sent to you by e-mail. Order number:{' '}
                {JSON.parse(localStorage.getItem('order_detail')).res_id}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="ordersummarycontent">
        <div className="container">
          <div className="row">
            {JSON.parse(localStorage.getItem('order_detail')).transfers.length >
            1 ? (
              <div>
                <div className="col-md-6">
                  <div className="ordersummarywrap">
                    <h2>Arrival Details</h2>
                    <hr />
                    <div className="summarydetail">
                      <div className="eachdetail">
                        <span className="blue">From:</span>
                        <p>
                          John F. Kennedy International Airport – JFK 95 West
                          Broadway, New York NY 10007
                        </p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Pick-up date:</span>
                        <p>2020-04-07</p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Pick-up time:</span>
                        <p>00:15</p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Passengers:</span>
                        <p>1 (Standard Car)</p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Service type:</span>
                        <p>Private service</p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Flight number:</span>
                        <p>W6 1387</p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Price:</span>
                        <p>41 EUR </p>
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
                        <p>95 West Broadway, New York NY 10007</p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">To:</span>
                        <p>John F. Kennedy International Airport – JFK</p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Pick-up date:</span>
                        <p>2020-04-07</p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Pick-up time:</span>
                        <p>00:15</p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Passengers:</span>
                        <p>1 (Standard Car)</p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Service type:</span>
                        <p>Private service</p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Flight number:</span>
                        <p>W6 1387</p>
                      </div>
                      <div className="eachdetail">
                        <span className="blue">Price:</span>
                        <p>41 EUR </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-md-6">
                <div className="ordersummarywrap">
                  <h2>
                    {JSON.parse(localStorage.getItem('order_detail'))
                      .transfers[0].depart_time
                      ? 'Return Details'
                      : 'Arrival Details'}
                  </h2>
                  <hr />
                  <div className="summarydetail">
                    <div className="eachdetail">
                      <span className="blue">From:</span>
                      <p>
                        {
                          JSON.parse(localStorage.getItem('order_detail'))
                            .transfers[0].pick_location
                        }
                      </p>
                    </div>
                    <div className="eachdetail">
                      <span className="blue">To:</span>
                      <p>
                        {
                          JSON.parse(localStorage.getItem('order_detail'))
                            .transfers[0].drop_location
                        }
                      </p>
                    </div>
                    <div className="eachdetail">
                      <span className="blue">
                        {JSON.parse(localStorage.getItem('order_detail'))
                          .transfers[0].depart_time
                          ? 'Departing date'
                          : 'Pickup date'}
                      </span>
                      <p>
                        {
                          JSON.parse(localStorage.getItem('order_detail'))
                            .transfers[0].date
                        }
                      </p>
                    </div>
                    <div className="eachdetail">
                      <span className="blue">
                        {JSON.parse(localStorage.getItem('order_detail'))
                          .transfers[0].depart_time
                          ? 'Departing time'
                          : 'Pickup time'}
                      </span>
                      <p>
                        {JSON.parse(localStorage.getItem('order_detail'))
                          .transfers[0].depart_time
                          ? JSON.parse(localStorage.getItem('order_detail'))
                              .transfers[0].depart_time
                          : JSON.parse(localStorage.getItem('order_detail'))
                              .transfers[0].time}
                      </p>
                    </div>
                    <div className="eachdetail">
                      <span className="blue">Passengers:</span>
                      <p>
                        {
                          JSON.parse(localStorage.getItem('order_detail'))
                            .transfers[0].pax_num
                        }
                      </p>
                    </div>
                    <div className="eachdetail">
                      <span className="blue">Service type:</span>
                      <p>
                        {
                          JSON.parse(localStorage.getItem('order_detail'))
                            .transfers[0].service_type
                        }
                      </p>
                    </div>
                    <div className="eachdetail">
                      <span className="blue">Flight number:</span>
                      <p>
                        {
                          JSON.parse(localStorage.getItem('order_detail'))
                            .transfers[0].flight_num
                        }
                      </p>
                    </div>
                    <div className="eachdetail">
                      <span className="blue">Price:</span>
                      <p>
                        {
                          JSON.parse(localStorage.getItem('order_detail'))
                            .transfers[0].price
                        }{' '}
                        {
                          JSON.parse(localStorage.getItem('order_detail'))
                            .transfers[0].currency
                        }{' '}
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
                      {
                        JSON.parse(localStorage.getItem('order_detail'))
                          .first_name
                      }
                    </p>
                  </div>
                  <div className="eachdetail">
                    <span className="blue">Last Name:</span>
                    <p>
                      {
                        JSON.parse(localStorage.getItem('order_detail'))
                          .last_name
                      }
                    </p>
                  </div>
                  <div className="eachdetail">
                    <span className="blue">Remarks:</span>
                    <p>
                      {JSON.parse(localStorage.getItem('order_detail')).remark}
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
