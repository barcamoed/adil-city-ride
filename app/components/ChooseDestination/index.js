/**
 *
 * ChooseDestination
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import moment from 'moment';

import { useCookies } from 'react-cookie';
import LoadingOverlay from 'react-loading-overlay';
import HashLoader from 'react-spinners/HashLoader';
import arrowrightImg from '../../assets/images/arrowright.png';
import { IDENTIFIER, GETKEY } from '../../utils/constants';
import { postRequest } from '../../utils/requests';

const ChooseDestination = (props, { prop }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie_days']);
  const [isActive, setIsActive] = useState(false);

  const aloop = [];
  const [myloop, setArray] = useState(aloop);
  const newAirportsArray = [];
  function customJS() {
    $(window).scroll(function() {
      const sticky = $('#site-header');
      const scroll = $(window).scrollTop();
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
  }
  useEffect(() => {
    // console.log('My pppppppp', props);
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
    };
    const params = new URLSearchParams();
    params.append('command', 'get_cities');
    params.append('identifier', IDENTIFIER);
    params.append('key', GETKEY());
    const ref_id = localStorage.getItem('ref_id');
    // console.log('Ref ID', ref_id);
    // console.log('COOKIEEEEE', cookies);
    if (
      props.prop.match.params.id &&
      props.prop.match.url == `/ref/${props.prop.match.params.id}`
    ) {
      // console.log(
      //   'Dateeeeeeeeeee',
      //   new Date(
      //     moment()
      //       .add(5, 'days')
      //       .format('DD-MM-YY')
      //       .toString(),
      //   ),
      // );
      if (ref_id != null && props.prop.match.params.id == ref_id) {
        localStorageData();
      } else {
        localStorage.setItem('ref_id', props.prop.match.params.id);
        params.append('data[referral_id]', props.prop.match.params.id);
        // for (const [key, value] of params) {
        //   console.log('key:', key, 'value:', value);
        // }
        // console.log('Url is /ref/id && id exists');
        setIsActive(true);
        postRequest(params, headers).then(data => {
          // console.log('Cookie Days from request:', data.referral.cookie_days);

          setCookie('cookie_days', data.referral.cookie_days, {
            path: '/',
            expires: new Date(
              moment()
                .add(data.referral.cookie_days, 'days')
                .format('DD-MM-YY')
                .toString(),
            ),
          });

          let i = 0;
          for (var j = 0; j < data.cities.length; ) {
            data.cities[j].airports.forEach(element => {
              newAirportsArray[i] = element;
              newAirportsArray[i].city = data.cities[j].city;
              i++;
            });
            j++;
          }

          localStorage.setItem(
            'CityAirports',
            JSON.stringify(newAirportsArray),
          );
          localStorage.setItem('ref_id', props.prop.match.params.id);

          localStorage.setItem('apRequestTime', JSON.stringify(new Date()));
          setArray(newAirportsArray);
          customJS();
          setIsActive(false);
        });
      }
    } else if (!props.prop.match.params.id) {
      // console.log('No ID IN URLL So No Cookie', cookies);
      // localStorage.removeItem('ref_id');
      // removeCookie('cookie_days');
      if (!localStorage.getItem('CityAirports')) {
        params.append('data', []);

        setIsActive(true);
        postRequest(params, headers).then(data => {
          console.log('City Data mmm nnn kkk lll:', data.cities.length);
          let i = 0;
          for (var j = 0; j < data.cities.length; ) {
            data.cities[j].airports.forEach(element => {
              newAirportsArray[i] = element;
              newAirportsArray[i].city = data.cities[j].city;
              i++;
            });
            j++;
          }

          localStorage.setItem(
            'CityAirports',
            JSON.stringify(newAirportsArray),
          );
          localStorage.setItem('apRequestTime', JSON.stringify(new Date()));
          setArray(newAirportsArray);
          customJS();
          setIsActive(false);
        });
      } else if (JSON.parse(localStorage.getItem('apRequestTime'))) {
        // console.log(
        //   'AP Request Time LocalStorage:',
        //   JSON.parse(localStorage.getItem('CityAirports')),
        // );
        const hours =
          Math.abs(
            new Date(JSON.parse(localStorage.getItem('apRequestTime'))) -
              new Date(),
          ) / 36e5;

        if (hours > 2) {
          setIsActive(true);
          postRequest(params, headers).then(data => {
            let i = 0;
            console.log('City Data abc def ghi:', data.cities.length);
            for (var j = 0; j < data.cities.length; ) {
              console.log('City Dataa');
              data.cities[j].airports.forEach(element => {
                // console.log('elementMMMM', element);
                newAirportsArray[i] = element;
                newAirportsArray[i].city = data.cities[j].city;
                i++;
              });
              j++;
            }
            // console.log('newAirportsArray:', newAirportsArray);
            localStorage.setItem(
              'CityAirports',
              JSON.stringify(newAirportsArray),
            );
            localStorage.setItem('apRequestTime', JSON.stringify(new Date()));
            setArray(newAirportsArray);
            customJS();
            setIsActive(false);
          });
        } else {
          localStorageData();
          // console.log('Less than 2 hrs Inside Else');
        }
      }
    }
  }, []);

  async function localStorageData() {
    const CityAirports = JSON.parse(localStorage.getItem('CityAirports'));
    // console.log(
    //   'LocalStorage inside async Func',
    //   JSON.parse(localStorage.getItem('CityAirports')),
    // );
    await setArray(CityAirports);
    customJS();
  }

  let innerLoopStart = 0;
  const loopLength = myloop.length;
  const outerLoopLimit = Math.ceil(loopLength / 8);
  let innerLoopEnd = 8;
  const onAirportClick = (searchField, passengers) => {
    // console.log('Airport Clicked', searchField, passengers);
    // console.log('Chose Desination Props', props);
    props.onAirportValues({ searchField, passengers });
  };
  // for (var i = 0; i < cityAndAirports.length; i++) {}
  return (
    <div>
      <section className="choose">
        <div className="container ">
          <div className="col-md-12 p-0">
            <h2 className="bb">Choose City </h2>
          </div>
        </div>
        <div className="container max1080">
          <div className="row">
            <div className="col-md-12">
              <div className="owl-carousel owl-theme chooseslider choosedesktopslider">
                {myloop && myloop.length > 0 ? (
                  myloop.slice(0, outerLoopLimit).map((item1, key1) => (
                    <div className="item">
                      <span className="d-none">
                        {loopLength - innerLoopStart < 8
                          ? (innerLoopEnd = loopLength)
                          : (innerLoopEnd = innerLoopStart + 8)}
                      </span>
                      {myloop
                        .slice(innerLoopStart, innerLoopEnd)
                        .map((airport, key) => (
                          <a onClick={() => onAirportClick(airport.city, '2')}>
                            <div className="choosebox">
                              <img src={airport.ap_image} alt="Destintation" />
                              <div className="choosedesc">
                                <p className="cityname">{airport.ap_iata}</p>
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
                            <span className="d-none">
                              {key == 7 ? (innerLoopStart += 8) : null}
                            </span>
                          </a>
                        ))}
                    </div>
                  ))
                ) : (
                  <LoadingOverlay
                    styles={{
                      overlay: {
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        top: '0px',
                        left: '0px',
                        display: '-webkit - box',
                        display: '-webkit - flex',
                        display: '-ms - flexbox',
                        display: 'flex',
                        'text-align': 'center',
                        'font-size': '1.2em',
                        color: '#000',
                        background: 'rgba(0, 0, 0, 0)',
                        zIndex: 800,
                        // -webkit-transition: opacity 500ms ease-in;
                        // transition: opacity 500ms ease-in;
                        opacity: 1,
                      },
                    }}
                    active={isActive}
                    spinner
                    spinner={<HashLoader />}
                  />
                )}
              </div>
              <div className="owl-carousel owl-theme chooseslider choosemobileslider">
                {myloop && myloop.length > 0 ? (
                  myloop.slice(0, loopLength).map((item, key) => (
                    <div className="item">
                      <a onClick={() => onAirportClick(airport.city, '2')}>
                        <div className="choosebox">
                          <img src={item.ap_image} alt="Destintation" />
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
                  ))
                ) : (
                  <LoadingOverlay
                    styles={{
                      overlay: {
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        top: '0px',
                        left: '0px',
                        display: '-webkit - box',
                        display: '-webkit - flex',
                        display: '-ms - flexbox',
                        display: 'flex',
                        'text-align': 'center',
                        'font-size': '1.2em',
                        color: '#000',
                        background: 'rgba(0, 0, 0, 0)',
                        zIndex: 800,
                        // -webkit-transition: opacity 500ms ease-in;
                        // transition: opacity 500ms ease-in;
                        opacity: 1,
                      },
                    }}
                    active={isActive}
                    spinner
                    spinner={<HashLoader />}
                  />
                )}
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
