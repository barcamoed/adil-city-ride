/**
 *
 * About
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import whatsappImg from '../../assets/images/whatsapp.png';
// import '../../assets/css/style.css';

function About() {
  return (
    <div>
      <Header />

      <div>
        <section className="banner innerbanner about">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-12">
                <h1 className="text-center">About</h1>
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
        <section className="aboutcontent">
          <div className="container">
            <div className="aboutwrap">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h2>CityRide - That's how a trip begins!</h2>
                  </div>
                  <div className="col-md-6">
                    <p>
                      CityRide was established in 2011 by tourism professionals
                      who recognized the need for an Israeli tourist in a
                      foreign country to find the safest, most reliable and fast
                      way to reach their destination.
                    </p>
                    <p>
                      During the years of operation, we have been able to
                      formulate a customer service-focused team, accessing a
                      current technological product to international standards
                      and adding services according to the frequently changing
                      tourism map, especially in view of the growth of
                      non-coastal flights.
                    </p>
                    <p>
                      We provide transfer services to individuals, business
                      travelers and groups who want to reach the hotel /
                      apartment / conference / seaport / train station or any
                      other destination conveniently and safely.
                    </p>
                    <p>
                      We all know the moment we landed, we passed a passport
                      review, collected our luggage, walked out of the reception
                      hall and asked ourselves what now? How to get to the
                      hotel?
                    </p>
                    <p>
                      There is nothing more annoying than a taxi driver who
                      decided to do a circular tour of the bustling streets of
                      the city and meanwhile got a pulse. us.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      In order to avoid unnecessary hassles and to start the
                      right leg trip you should book transfers from the airport
                      in advance, when you book transfers from the airport to
                      the hotel or any other destination you get a pre-set price
                      which is independent of traffic, closed roads or anything
                      else that causes a delay. The price paid when placing the
                      order is the final price.
                    </p>
                    <p>
                      Using our services will ensure you a calm and stress-free
                      landing as even if your flight is delayed the driver who
                      should meet you up to date at the right arrival and await
                      you upon your landing.
                    </p>
                    <p>
                      We operate a remittance service all over the world and
                      also reach exotic and unconventional destinations. Thanks
                      to a collaborative set with a variety of service providers
                      all over the world, we are proud to offer a wide range of
                      services ranging from discounted shared shuttles to
                      service in luxury vehicles and large groups. We also
                      gained extensive experience in shuttle service around
                      major exhibitions in Europe and the Far East.
                    </p>
                    <p>
                      <b>
                        We will be happy to assist you with any questions or
                        requests:
                      </b>
                    </p>
                  </div>
                  <div className="col-md-12">
                    <div className="text-center">
                      <a href="#" className="btn btnstyle3">
                        Contact Us
                      </a>
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
}

About.propTypes = {};

export default About;
