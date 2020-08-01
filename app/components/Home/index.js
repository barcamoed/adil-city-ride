/**
 *
 * Home
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';
import ChooseDestination from '../ChooseDestination';
import HomeFilters from '../HomeFilters';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import searchImg from '../../assets/images/search.png';
import whatsappImg from '../../assets/images/whatsapp.png';
import book1Img from '../../assets/images/book1.png';
import book2Img from '../../assets/images/book2.png';
import book3Img from '../../assets/images/book3.png';
import book4Img from '../../assets/images/book4.png';
import driver1Img from '../../assets/images/driver1.jpg';
import driver2Img from '../../assets/images/driver2.jpg';
import driver3Img from '../../assets/images/driver3.jpg';
import { Formik, Form, Field } from 'formik';
import { searchSchema } from '../Login/schema';
import { Link } from 'react-router-dom';
// import '../../assets/css/style.css';
import MyAutosuggest from '../ReactAutoSuggest';
const Home = props => {
  // console.log('Historyyyyyyyyyyyyy:', history);
  const [showFilter, setShowFilters] = useState(false);
  const [showAPFilter, setShowAirportFilters] = useState(false);

  const [searchValAndPassengers, setSearchValAndPassengers] = useState({});
  const [airportSelectedValues, setAirportSelectValues] = useState({});
  const [paxVal, setPaxVal] = useState('2');
  const [searchVal, setSearchField] = useState('');

  // console.log('sssssssssssssssssssssss', searchVal);
  console.log(
    'Airport Selected Values Coming from Choose Destination',
    airportSelectedValues && airportSelectedValues,
  );
  function handleSearch(values) {
    console.log('City Search Clicked.a.a.a.a', values);
    setSearchValAndPassengers(values);
    setShowFilters(true);
    setShowAirportFilters(false);
    setPaxVal(values.passengers);
  }
  console.log(
    'searchValAndPassengers',
    searchValAndPassengers && searchValAndPassengers,
  );
  useEffect(() => {
    console.log('airportSelectedValues', airportSelectedValues);
    if (
      Object.keys(airportSelectedValues).length != 0 &&
      airportSelectedValues.constructor === Object
    ) {
      console.log('aaaaaaaaa', airportSelectedValues);
      setPaxVal('2');
      setSearchValAndPassengers({
        searchField: airportSelectedValues.searchField,
        passengers: paxVal,
      });
      setShowAirportFilters(true);
      setShowFilters(false);
    }
    // if (searchValAndPassengers && searchValAndPassengers) {
    //   console.log('Yessssssss searchValAndPassengers', searchValAndPassengers);

    // }

    var date = new Date().toISOString().slice(0, 10);
    $(window).scroll(function() {
      var sticky = $('#site-header'),
        scroll = $(window).scrollTop();
      if (scroll >= 400) sticky.addClass('sticky');
      else sticky.removeClass('sticky');
    });

    /*City Airports active*/
    $('.cityairport .card').click(function() {
      $('.cityairport .card').removeClass('active');
      $(this).addClass('active');
    });

    /*faqs*/
    $('.accordion .card-header').click(function() {
      $('.accordion .card').removeClass('active');
      $(this)
        .parent()
        .toggleClass('active');
    });

    /*tooltip*/
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

    /*driver slider*/
    $('.driverslider').owlCarousel({
      loop: false,
      margin: 0,
      nav: true,
      dots: false,
      dotsContainer: '.rightdots',
      dotsSpeed: 1000,
      mouseDrag: false,
      touchDrag: false,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        768: {
          items: 1,
        },

        991: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });
    /*car slider*/
    $('.carslider').owlCarousel({
      loop: false,
      margin: 0,
      nav: true,
      dots: false,
      dotsContainer: '.rightdots',
      dotsSpeed: 1000,

      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        991: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });
  }, [searchValAndPassengers.length, airportSelectedValues]);

  function selectPax(e, setFieldValue) {
    console.log('Selected Val', e.target.value);
    console.log(
      'airportSelectedValues.searchField',
      airportSelectedValues.searchField,
    );
    setPaxVal(e.target.value);

    // setAirportSelectValues({
    //   searchField: searchVal,
    //   passengers: e.target.value,
    // });
  }
  function setDefaultPaxVal(setFieldValue) {
    setPaxVal('2');
    setFieldValue('passengers', '2');
    console.log('Default Pax Val');
    // return paxVal;
  }

  return (
    <div>
      <Header />

      <div>
        <section className="banner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-12">
                <h1>
                  <span>Worldwide</span>
                  <br />
                  Transportation Solutions
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="search">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Formik
                  initialValues={{
                    searchField: '',
                  }}
                  validationSchema={searchSchema}
                  onSubmit={values => {
                    handleSearch(values);
                    console.log('Moeeddddd:', values);
                  }}
                >
                  {({ errors, touched, isSubmitting, setFieldValue }) => (
                    <Form disabled={isSubmitting} noValidate>
                      <div className="input-group">
                        

                        <Field
                          type="text"
                          name="searchField"
                          className="form-control"
                          aria-label="Text input with dropdown button"
                          setApValue={airportSelectedValues.searchField}
                          onGetSearchVal={value => setSearchField(value)}
                          component={MyAutosuggest}
                        />
                        

                        <div className="input-group-append">
                          
                          <Field
                            as="select"
                            name="passengers"
                            className="form-control"
                            // defaultValue={showAPFilter ? '2' : paxVal}
                            value={showAPFilter ? paxVal : paxVal}
                            onChange={e => {
                              selectPax(e);
                              setFieldValue('passengers', e.target.value);
                            }}
                          >
                            <option value="">Select Passengers</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </Field>
                        </div>
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-secondary searchbtn"
                            type="submit"
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
                      {errors.passengers && touched.passengers ? (
                            <div className="errorMsg">{errors.passengers}</div>
                          ) : null}
                      {errors.searchField && touched.searchField ? (
                          <div className="errorMsg">{errors.searchField}</div>
                        ) : null}
                    </Form>
                  )}
                </Formik>

                <div className="contact">
                  <Link to="/contact" className="btn btnstyle1">
                    <img src={whatsappImg} alt="img-fluid" /> Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <ChooseDestination /> */}

        {showFilter && !showAPFilter ? (
          <HomeFilters searchData={searchValAndPassengers} />
        ) : !showFilter && !showAPFilter ? (
          <ChooseDestination
            onAirportValues={value => setAirportSelectValues(value)}
          />
        ) : showAPFilter && !showFilter ? (
          <HomeFilters searchData={searchValAndPassengers} />
        ) : null}

        {/* {showAPFilter && !showFilter ? (
          <HomeFilters searchData={searchValAndPassengers} />
        ) : null} */}

        <section className="book">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>Why book with us</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="bookbox">
                  <img src={book1Img} alt="book" />
                  <p>
                    24/7 online
                    <br />
                    customer support.
                  </p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bookbox">
                  <img src={book2Img} alt="book" />
                  <p>Immediate confirmation.</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bookbox">
                  <img src={book3Img} alt="book" />
                  <p>10 Years of experience.</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bookbox">
                  <img src={book4Img} alt="book" />
                  <p>Verified drivers</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="drivers">
          <div className="container ">
            <div className="col-md-12">
              <h2>Our Drivers</h2>
            </div>
          </div>
          <div className="container max1080">
            <div className="row">
              <div className="col-md-12">
                <div className="owl-carousel owl-theme driverslider">
                  <div className="item">
                    <a href="#">
                      <div className="driverbox">
                        <div className="bluebg" />
                        <img src={driver1Img} alt="drivers" />
                        <div className="choosedesc">
                          <h4>Marco</h4>
                          <p className="cityname">venice</p>
                          <hr />
                          <p>
                            Our Marco in Venice always welcomes our customers
                            with a big smile. Marco will introduce you to the
                            Italian atmosphere, before you even arrive at the
                            hotel.
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="item">
                    <a href="#">
                      <div className="driverbox">
                        <div className="bluebg" />
                        <img src={driver2Img} alt="drivers" />
                        <div className="choosedesc">
                          <h4>Petco</h4>
                          <p className="cityname">Burgesses</p>
                          <hr />
                          <p>
                            Everyone loves our talented Burgos driver Petco. He
                            is funny, friendly and always ready to help with the
                            best recommendations and tips, traveling with Petco
                            always end with a big smile.
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="item">
                    <a href="#">
                      <div className="driverbox">
                        <div className="bluebg" />
                        <img src={driver3Img} alt="drivers" />
                        <div className="choosedesc">
                          <h4>Caludio</h4>
                          <p className="cityname">Rome</p>
                          <hr />
                          <p>
                            Our elegants drivers in Rome will meet you and
                            accompany you directly to your destination. The best
                            way to start your style trip in the historic capital
                            of Italy.
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="item">
                    <a href="#">
                      <div className="driverbox">
                        <div className="bluebg" />
                        <img src={driver1Img} alt="drivers" />
                        <div className="choosedesc">
                          <h4>Marco</h4>
                          <p className="cityname">venice</p>
                          <hr />
                          <p>
                            Our Marco in Venice always welcomes our customers
                            with a big smile. Marco will introduce you to the
                            Italian atmosphere, before you even arrive at the
                            hotel.
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

Home.propTypes = {};

export default Home;
