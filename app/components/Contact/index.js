/**
 *
 * Contact
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

function Contact() {
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
                    <form className="contactform">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your name *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Phone *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email *"
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          placeholder="Message *"
                          defaultValue={''}
                        />
                      </div>
                      <div className="form-group text-center">
                        <button type="submit" className="btn btnstyle4">
                          Send
                        </button>
                      </div>
                    </form>
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
}

Contact.propTypes = {};

export default Contact;
