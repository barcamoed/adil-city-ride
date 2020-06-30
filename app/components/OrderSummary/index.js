/**
 *
 * OrderSummary
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function OrderSummary() {
  return (
    <div>
      <Header />
      <section className="banner innerbanner ordersummary">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <h1 className="text-center">Hey Peter!</h1>
              <p>
                Your order has been received and approved, the order and order
                confirmation
                <br /> has been sent to you by e-mail. Order number: 525440
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="ordersummarycontent">
        <div className="container">
          <div className="row">
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
            <div className="col-md-12">
              <div className="ordersummarywrap passengerinfo">
                <h2>Passenger information</h2>
                <hr />
                <div className="summarydetail">
                  <div className="eachdetail">
                    <span className="blue">Full name:</span>
                    <p>Peter</p>
                  </div>
                  <div className="eachdetail">
                    <span className="blue">Last Name:</span>
                    <p>Smith</p>
                  </div>
                  <div className="eachdetail">
                    <span className="blue">Note</span>
                    <p />
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
}

OrderSummary.propTypes = {};

export default OrderSummary;
