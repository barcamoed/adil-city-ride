/**
 *
 * Faq
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import whatsappImg from '../../assets/images/whatsapp.png';
import downangleImg from '../../assets/images/downangle.png';

function Faq() {
  useEffect(() => {
    $(".accordion .card-header").click(function(){
      $(".accordion .card").removeClass("active");
      $(this).parent().toggleClass("active");
    });
  }, []);
  return (
    <div>
      <Header />

      <div>
        <section className="banner innerbanner faq">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-12">
                <h1 className="text-center">FAQ</h1>
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
        <section className="faqcontent">
          <div className="container">
            <div className="faqwrap">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 v-line">
                    <p>
                      Do you have a question? We have concentrated the questions
                      and answers we have encountered over the years.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      Missing an answer? Please fill out the contact form here
                      and we will come back with a reply as soon as possible.
                    </p>
                  </div>
                  <div className="col-md-12">
                    <div className="accordion" id="faqs">
                      <div className="card">
                        <div
                          className="card-header"
                          data-toggle="collapse"
                          data-target="#faq1"
                          aria-expanded="true"
                          aria-controls="faq1"
                        >
                          <h2 className="mb-0">Is my order approved?</h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div id="faq1" className="collapse" data-parent="#faqs">
                          <div className="card-body">Is my order approved?</div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq2"
                          aria-expanded="false"
                          aria-controls="faq2"
                        >
                          <h2 className>
                            I made a reservation and there where changes in the
                            number of passengers or destination. How do I change
                            the booking?
                          </h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq2"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq3"
                          aria-expanded="false"
                          aria-controls="faq3"
                        >
                          <h2 className>
                            What is the difference between a private transfer
                            service and a shared shuttle service?
                          </h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq3"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq4"
                          aria-expanded="false"
                          aria-controls="faq4"
                        >
                          <h2 className>
                            Are the prices shown on the site to any person or to
                            all passengers?
                          </h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq4"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq5"
                          aria-expanded="false"
                          aria-controls="faq5"
                        >
                          <h2 className>
                            Do I have to pays extras beyond what appears on the
                            site?
                          </h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq5"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq6"
                          aria-expanded="false"
                          aria-controls="faq6"
                        >
                          <h2 className>Should I live a tip to the driver?</h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq6"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq7"
                          aria-expanded="false"
                          aria-controls="faq7"
                        >
                          <h2 className>How many luggage can I bring?</h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq7"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq8"
                          aria-expanded="false"
                          aria-controls="faq8"
                        >
                          <h2 className>Where will the driver wait for me?</h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq8"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq9"
                          aria-expanded="false"
                          aria-controls="faq9"
                        >
                          <h2 className>
                            My flight was denied or delayed. What should I do?
                          </h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq9"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq10"
                          aria-expanded="false"
                          aria-controls="faq10"
                        >
                          <h2 className>
                            I went out to the reception hall but I can’t see the
                            driver. What should I do?
                          </h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq10"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq11"
                          aria-expanded="false"
                          aria-controls="faq11"
                        >
                          <h2 className>
                            My flight landed on time but I was delayed in the
                            terminal. Will the drive wait for me?
                          </h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq11"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq12"
                          aria-expanded="false"
                          aria-controls="faq12"
                        >
                          <h2 className>
                            How do I know when I’m being picked back from the
                            hotel?
                          </h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq12"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq13"
                          aria-expanded="false"
                          aria-controls="faq13"
                        >
                          <h2 className>
                            Can I take unusual gear such as wheelchair, scuba
                            gear, bicycle and any unusual gear that does not fit
                            in a suitcase or bag?
                          </h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq13"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq14"
                          aria-expanded="false"
                          aria-controls="faq14"
                        >
                          <h2 className>
                            I can’t find the destination I want to pick up on
                            the site. Can I still place an order?
                          </h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq14"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq15"
                          aria-expanded="false"
                          aria-controls="faq15"
                        >
                          <h2 className>
                            We are a large group of people. Can you provide us
                            with a transfer service?
                          </h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq15"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq16"
                          aria-expanded="false"
                          aria-controls="faq16"
                        >
                          <h2 className>
                            What is the deadline to place an order?
                          </h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq16"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          data-toggle="collapse"
                          data-target="#faq17"
                          aria-expanded="false"
                          aria-controls="faq17"
                        >
                          <h2 className>
                            Have I returned from traveling and I’m not satisfied
                            with the service?
                          </h2>
                          <img src={downangleImg} alt="downangle" />
                        </div>
                        <div
                          id="faq17"
                          className="collapse"
                          data-parent="#faqs"
                          aria-labelledby="faqs"
                        >
                          <div className="card-body">
                            Any change, such as change in number of passengers,
                            change of pick-up / pick-up time, number of luggage
                            allowed per passenger, must be notified by email
                            directly or via the contact page on the website.
                          </div>
                        </div>
                      </div>
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

Faq.propTypes = {};

export default Faq;
