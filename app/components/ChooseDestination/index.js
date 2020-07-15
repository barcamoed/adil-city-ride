/**
 *
 * ChooseDestination
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import arrowrightImg from '../../assets/images/arrowright.png';
import destination1Img from '../../assets/images/destination1.jpg';
import destination2Img from '../../assets/images/destination2.jpg';
import destination3Img from '../../assets/images/destination3.jpg';
import destination4Img from '../../assets/images/destination4.jpg';
import destination5Img from '../../assets/images/destination5.jpg';
import destination6Img from '../../assets/images/destination6.jpg';
import destination7Img from '../../assets/images/destination7.jpg';
import destination8Img from '../../assets/images/destination8.jpg';
import { IDENTIFIER, GETKEY } from '../../utils/constants';
import { postRequest } from '../../utils/requests';
// import '../../assets/js/custom';
const ChooseDestination = () => {
  var aloop = [];
  const [myloop, setArray] = useState(aloop);
  const [fakeLoop, setFArray] = useState(aloop);
  console.log('myLoop', myloop);

  var outerLoopSize = 0;
  var newAirportsArray = [];
  var i = 0;
  function customJS() {
    console.log('Inside customJS function');
    $(window).scroll(function() {
      let sticky = $('#site-header');
      var scroll = $(window).scrollTop();
      if (scroll >= 400) sticky.addClass('sticky');
      else sticky.removeClass('sticky');
    });

    /* City Airports active */
    $('.cityairport .card').click(function() {
      $('.cityairport .card').removeClass('active');
      $(this).addClass('active');
    });

    /* faqs */
    $('.accordion .card-header').click(function() {
      $('.accordion .card').removeClass('active');
      $(this)
        .parent()
        .toggleClass('active');
    });

    /* tooltip */
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

    // /* choose slider */
    console.log('Desktop Slider');
    $('.choosedesktopslider').owlCarousel({
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
        1000: {
          items: 1,
        },
      },
    });
    /* choose slider mobile */
    console.log('Mobile Slider');
    $('.choosemobileslider').owlCarousel({
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
          items: 2,
        },
        768: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });
    /* driver slider */
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
    /* car slider */
    // $('.carslider').owlCarousel({
    //   loop: false,
    //   margin: 0,
    //   nav: true,
    //   dots: false,
    //   dotsContainer: '.rightdots',
    //   dotsSpeed: 1000,

    //   responsive: {
    //     0: {
    //       items: 1,
    //     },
    //     600: {
    //       items: 1,
    //     },
    //     991: {
    //       items: 2,
    //     },
    //     1000: {
    //       items: 3,
    //     },
    //   },
    // });
  }
  useEffect(() => {
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
    };
    const params = new URLSearchParams();
    params.append('command', 'get_cities');
    params.append('identifier', IDENTIFIER);
    params.append('key', GETKEY());
    params.append('data', []);

    //
    if (!localStorage.getItem('CityAirports')) {
      postRequest(params, headers).then(data => {
        console.log('City Dataaaaaaaa:', data.cities.length);
        for (var j = 0; j < data.cities.length; ) {
          console.log('City Dataaaaaaaammmmmmmm');
          data['cities'][j]['airports'].forEach(element => {
            console.log('elementMMMM', element);
            newAirportsArray[j] = element;
            newAirportsArray[j].city = data['cities'][j]['city'];
          });
          j++;
        }
        console.log('newAirportsArray:', newAirportsArray);
        localStorage.setItem('CityAirports', JSON.stringify(newAirportsArray));
        setArray(newAirportsArray);
        customJS();
      });
    } else {
      // localStorage.removeItem('CityAirports');
      localStorageData();
      console.log('Inside Else');
    }

    const interval = setInterval(() => {
      console.log('This will run every 3 second!');
      var myNewAirportsArray = [];
      // setArray([]);
      postRequest(params, headers).then(data => {
        data.forEach(element => {
          outerLoopSize = outerLoopSize + element.airports.length;
          element.airports.forEach(airport => {
            myNewAirportsArray[i] = airport;
            myNewAirportsArray[i].city = element.city;
            i++;
          });
        });
        localStorage.clear();
        var filteredArray = myNewAirportsArray.filter(function(el) {
          return el != null;
        });

        console.log('Interval Before setArray', filteredArray);
        localStorage.setItem('CityAirports', JSON.stringify(filteredArray));

        setArray(filteredArray);
        // newAirportsArray = [];
        console.log('newAirportsArray after setting empty', filteredArray);
        customJS();
      });
    }, 30000000);
    return () => clearInterval(interval);
  }, []);

  async function localStorageData() {
    let CityAirports = JSON.parse(localStorage.getItem('CityAirports'));
    console.log(
      'LocalStorage inside async Func',
      JSON.parse(localStorage.getItem('CityAirports')),
    );
    await setArray(CityAirports);
    customJS();
  }

  var innerLoopStart = 0;
  var loopLength = myloop.length;
  const outerLoopLimit = Math.ceil(loopLength / 8);
  var innerLoopEnd = 8;

  // for (var i = 0; i < cityAndAirports.length; i++) {}
  return (
    <div>
      <section className="choose">
        <div className="container ">
          <div className="col-md-12 p-0">
            <h2 className="bb">Choose the Destintation </h2>
          </div>
        </div>
        <div className="container max1080">
          <div className="row">
            <div className="col-md-12">
              <div className="owl-carousel owl-theme chooseslider choosedesktopslider">
                {myloop && myloop.length > 0
                  ? myloop.slice(0, outerLoopLimit).map((item1, key1) => {
                      return (
                        <div className="item">
                          {loopLength - innerLoopStart < 8
                            ? (innerLoopEnd = loopLength)
                            : (innerLoopEnd = innerLoopStart + 8)}

                          {myloop
                            .slice(innerLoopStart, innerLoopEnd)
                            .map((airport, key) => {
                              return (
                                <a href="#">
                                  <div className="choosebox">
                                    <img
                                      src={destination1Img}
                                      alt="Destintation"
                                    />
                                    <div className="choosedesc">
                                      <p className="cityname">
                                        {airport.ap_iata}
                                      </p>
                                      <h3>{airport.ap_name} </h3>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <p className="state">{airport.city}</p>
                                        <img
                                          src={arrowrightImg}
                                          className="arrowright"
                                          alt="arrow"
                                        />
                                        {/* {key} */}
                                      </div>
                                    </div>
                                  </div>

                                  {key == 7
                                    ? (innerLoopStart = innerLoopStart + 8)
                                    : null}
                                </a>
                              );
                            })}
                        </div>
                      );
                    })
                  : 'Loading...'}
              </div>
              <div className="owl-carousel owl-theme chooseslider choosemobileslider">
                {myloop && myloop.length > 0
                  ? myloop.slice(0, loopLength).map((item, key) => {
                      return (
                        <div className="item">
                          <a href="#">
                            <div className="choosebox">
                              <img src={destination1Img} alt="Destintation" />
                              <div className="choosedesc">
                                <p className="cityname">{item.ap_iata}</p>
                                <h3>{item.ap_name}</h3>
                                <div className="d-flex align-items-center justify-content-between">
                                  <p className="state">{item.city}</p>
                                  <img
                                    src={arrowrightImg}
                                    className="arrowright"
                                    alt="arrow"
                                  />
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      );
                    })
                  : 'Loading...'}
                {/* <div className="item">
                  <a href="#">
                    <div className="choosebox">
                      <img src={destination2Img} alt="Destintation" />
                      <div className="choosedesc">
                        <p className="cityname">LHR</p>
                        <h3>Heathrow Airport</h3>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="state">London</p>
                          <img
                            src={arrowrightImg}
                            className="arrowright"
                            alt="arrow"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="item">
                  <a href="#">
                    <div className="choosebox">
                      <img src={destination2Img} alt="Destintation" />
                      <div className="choosedesc">
                        <p className="cityname">LHR</p>
                        <h3>Heathrow Airport</h3>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="state">London</p>
                          <img
                            src={arrowrightImg}
                            className="arrowright"
                            alt="arrow"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

ChooseDestination.propTypes = {};

export default ChooseDestination;
