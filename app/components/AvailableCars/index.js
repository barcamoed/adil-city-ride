/**
 *
 * AvailableCars
 *
 */

import React, { useState, useEffect, useRef } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import LoadingOverlay from 'react-loading-overlay';
import { Router, browserHistory } from 'react-router';
import HashLoader from 'react-spinners/HashLoader';
import car1Img from '../../assets/images/car1.png';
import { IDENTIFIER, GETVEHICLESKEY } from '../../utils/constants';
import { postRequest } from '../../utils/requests';
import ReactGMap from '../ReactGMap/index';
import messages from './messages';

Modal.setAppElement('#app'); // For Modal used below
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: { zIndex: 1000 },
};

const AvailableCars = props => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [ap_iata, setAp_iata] = useState(null);
  const [availableCars, setAvailableCars] = useState([]);
  const [noResultVehicles, setNoResultFound] = useState('');
  const [roundTrip, setRoundTrip] = useState(null);
  const [oneWayTrip, setOneWayTrip] = useState(null);
  const [selectTripTypeError, setSelectTripTypeError] = useState(null);
  const [myObj, setMyObj] = useState({});
  const [vehiclesCount, setVehiclesCount] = useState('');
  const [isActive, setLodaerIsActive] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    const unmounted = false;
    let i = 0;
    const airports = JSON.parse(localStorage.getItem('CityAirports'));
    for (i = 0; i < airports.length; i++) {
      if (airports[i].ap_name == props.myData.From) {
        setAp_iata(airports[i].ap_iata);
      }
    }

    const myData1 = props.myData;
    myData1.ap_iata = ap_iata;
    setMyObj(myData1);
    if (myObj.isAdvanced == false && myObj.switched == false) {
      const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
      };

      const formData = new FormData();
      const data = {
        command: 'get_vehicles',
        identifier: IDENTIFIER,
        key: GETVEHICLESKEY(),
        data: {
          ap_code: myObj.ap_iata,
          destination_id: myObj.Destination,
          pax_num: myObj.pax_num,
        },
      };

      for (const dataKey in data) {
        if (dataKey === 'data') {
          // append nested object
          for (const previewKey in data[dataKey]) {
            formData.append(`data[${previewKey}]`, data[dataKey][previewKey]);
          }
        } else {
          formData.append(dataKey, data[dataKey]);
        }
      }
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }
      setLodaerIsActive(true);
      postRequest(formData, headers).then(data => {
        if (data.status == 'ok') {
          // console.log('Data Status:', data.status);
          const vehiclesData = data.vehicles;
          setAvailableCars(vehiclesData);
          setVehiclesCount(vehiclesData.length);
          setLodaerIsActive(false);
          // window.dispatchEvent(new Event('resize'));

          // setFormData(myObj);
        } else if (data.status == 'no_results') {
          const noResultFound = 'No Result Found';
          setNoResultFound(noResultFound);
          setLodaerIsActive(false);
          // setFormData(myObj);
        }
      });
    } else if (myObj.isAdvanced == false && myObj.switched == true) {
      // console.log(
      //   'Switcheddddd and Not Advancedddddddddd asdfsadfsdfasdfsdf',
      //   myObj,
      // );
      const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
      };

      const formData = new FormData();
      const data = {
        command: 'get_vehicles',
        identifier: IDENTIFIER,
        key: GETVEHICLESKEY(),
        data: {
          ap_code: myObj.ap_iata,
          destination_id: myObj.Destination,
          pax_num: myObj.pax_num,
        },
      };

      for (const dataKey in data) {
        if (dataKey === 'data') {
          // append nested object
          for (const previewKey in data[dataKey]) {
            formData.append(`data[${previewKey}]`, data[dataKey][previewKey]);
          }
        } else {
          formData.append(dataKey, data[dataKey]);
        }
      }
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }
      setLodaerIsActive(true);
      postRequest(formData, headers).then(data => {
        if (data.status == 'ok') {
          // console.log('Data Status:', data.status);
          const vehiclesData = data.vehicles;
          setAvailableCars(vehiclesData);
          setVehiclesCount(vehiclesData.length);
          // window.dispatchEvent(new Event('resize'));
          setLodaerIsActive(false);

          // setFormData(myObj);
        } else if (data.status == 'no_results') {
          const noResultFound = 'No Result Found';
          setNoResultFound(noResultFound);
          // setFormData(myObj);
        }
      });
    } else if (myObj.isAdvanced == true && myObj.switched == true) {
      // console.log(
      //   'Switcheddddd and Advancedddddddddd In Available Cars Comp',
      //   myObj,
      // );
      const destinationLatLng = `(${myObj.Destination.lat}, ${
        myObj.Destination.lng
      })`;
      // console.log('myStructured Destination:', destinationLatLng);
      const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
      };

      const formData = new FormData();
      const data = {
        command: 'get_vehicles',
        identifier: IDENTIFIER,
        key: GETVEHICLESKEY(),
        data: {
          ap_code: myObj.ap_iata,
          is_advanced: '1',
          destination_point: destinationLatLng,
          pax_num: myObj.pax_num,
        },
      };

      for (const dataKey in data) {
        if (dataKey === 'data') {
          // append nested object
          for (const previewKey in data[dataKey]) {
            formData.append(`data[${previewKey}]`, data[dataKey][previewKey]);
          }
        } else {
          formData.append(dataKey, data[dataKey]);
        }
      }
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }
      setLodaerIsActive(true);
      postRequest(formData, headers).then(data => {
        if (data.status == 'ok') {
          // console.log('Data Status ok:', data);
          const vehiclesData = data.vehicles;
          setAvailableCars(vehiclesData);
          setVehiclesCount(vehiclesData.length);
          // window.dispatchEvent(new Event('resize'));
          setLodaerIsActive(false);
          // setFormData(myObj);
        } else if (data.status == 'no_results') {
          const noResultFound = 'No Result Found';
          setNoResultFound(noResultFound);
          setLodaerIsActive(false);
          // setFormData(myObj);
        }
      });
    } else if (myObj.isAdvanced == true && myObj.switched == false) {
      // console.log('Advanceddddd....', myObj);
      const destinationLatLng = `(${myObj.Destination.lat}, ${
        myObj.Destination.lng
      })`;
      // console.log('myStructured Destination:', destinationLatLng);

      const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
      };

      const formData = new FormData();
      const data = {
        command: 'get_vehicles',
        identifier: IDENTIFIER,
        key: GETVEHICLESKEY(),
        data: {
          ap_code: myObj.ap_iata,
          is_advanced: '1',
          destination_point: destinationLatLng,
          pax_num: myObj.pax_num,
        },
      };

      for (const dataKey in data) {
        if (dataKey === 'data') {
          // append nested object
          for (const previewKey in data[dataKey]) {
            formData.append(`data[${previewKey}]`, data[dataKey][previewKey]);
          }
        } else {
          formData.append(dataKey, data[dataKey]);
        }
      }
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }
      setLodaerIsActive(true);
      postRequest(formData, headers).then(data => {
        // console.log('Data Status:', data);
        if (data.status == 'ok') {
          // console.log('Data Status:', data.status);
          const vehiclesData = data.vehicles;
          setAvailableCars(vehiclesData);
          setVehiclesCount(vehiclesData.length);

          setLodaerIsActive(false);
        } else if (data.status == 'no_results') {
          const noResultFound = 'No Result Found';
          setNoResultFound(noResultFound);
          setLodaerIsActive(false);
          // setFormData(myObj);
        }
      });
    }

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
  }, [
    props.myData.ap_iata,
    availableCars.length,
    props.myData.From,
    vehiclesCount,
  ]);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#3C84BB';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const onRoundTripChecked = (
    priceVal,
    vehicle_id,
    currency,
    sec_bef_pick,
    max_pax,
    release_hours,
  ) => {
    const route = 'rt';
    const vehicleObj = {
      vehicle_id,
      route,
      price: priceVal,
      currency,
      seconds_before_pick: sec_bef_pick,
      max_pax,
      release_hours,
    };
    if (oneWayTrip) {
      setOneWayTrip(null);
    }
    setRoundTrip(vehicle_id);
    localStorage.setItem('vehicleObj', JSON.stringify(vehicleObj));
    // console.log('VehicleObject.. .. ..', localStorage.getItem('vehicleObj'));
  };

  const onOneWayChecked = (
    priceVal,
    vehicle_id,
    currency,
    sec_bef_pick,
    max_pax,
    release_hours,
  ) => {
    const route = 'ow';
    const vehicleObj = {
      vehicle_id,
      route,
      price: priceVal,
      currency,
      seconds_before_pick: sec_bef_pick,
      max_pax,
      release_hours,
    };

    if (roundTrip) {
      setRoundTrip(null);
    }
    setOneWayTrip(vehicle_id);
    localStorage.setItem('vehicleObj', JSON.stringify(vehicleObj));
  };

  const goToBookingForm = item => {
    // console.log('Inisde function goToBookingForm');
    if (!roundTrip && !oneWayTrip) {
      localStorage.setItem('myGeneralObj', JSON.stringify(props));
      const route = 'rt';
      const vehicleObj = {
        vehicle_id: item.vehicle_id,
        route,
        price: item.rt_price,
        currency: item.currency,
        seconds_before_pick: item.seconds_before_pick,
        max_pax: item.max_pax,
        release_hours: item.release_hours,
      };
      if (vehicleObj.route == 'rt') {
        localStorage.setItem('flightType', 'both');
      } else if (vehicleObj.route == 'ow' && props.myData.switched != true) {
        localStorage.setItem('flightType', 'justArrival');
      } else if (vehicleObj.route == 'ow' && props.myData.switched == true) {
        localStorage.setItem('flightType', 'justDeparture');
      }
      // console.log('OBJECTTTTTT', vehicleObj);
      localStorage.setItem('vehicleObj', JSON.stringify(vehicleObj));
      // console.log(
      //   'Storage OBJECTTTTTT',
      //   JSON.parse(localStorage.getItem('vehicleObj')),
      // );
      window.location.href = 'http://localhost:3000/booking';
    } else {
      if (roundTrip) {
        localStorage.setItem('flightType', 'both');
      } else if (oneWayTrip && props.myData.switched != true) {
        localStorage.setItem('flightType', 'justArrival');
      } else if (oneWayTrip && props.myData.switched == true) {
        localStorage.setItem('flightType', 'justDeparture');
      }
      localStorage.setItem('myGeneralObj', JSON.stringify(props));
      // console.log('ELSEEEEEEEEEE');
      window.location.href = 'http://localhost:3000/booking';
    }
  };
  return (
    <div>
      <section className="cars">
        <div className="container ">
          <div className="col-md-12 p-0">
            <h2 className="bb">
              Available Cars{' '}
              <span className="count">
                {vehiclesCount}
                <span />
              </span>
            </h2>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="viewmap">
                <div className="input-group">
                  <div className="fromdes">
                    <div className="values">
                      <p>
                        Values based on route
                        <br /> to selected destination:
                      </p>
                    </div>
                    <div className="from">
                      <i className="fas fa-plane-departure" />
                      <div className>
                        <label>From</label>

                        {!props.myData.switched && !props.myData.isAdvanced ? (
                          <p>{props.myData.From}</p>
                        ) : props.myData.switched &&
                          !props.myData.isAdvanced ? (
                          <p>{props.myData.dropDownDestinationText}</p>
                        ) : !props.myData.switched &&
                          props.myData.isAdvanced ? (
                          <p>{props.myData.From}</p>
                        ) : props.myData.switched && props.myData.isAdvanced ? (
                          <p>{props.myData.destination_address}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="des">
                      <i className="fas fa-map-marker-alt" />
                      <div className>
                        <label>Destination</label>
                        {!props.myData.switched && !props.myData.isAdvanced ? (
                          <p>{props.myData.dropDownDestinationText}</p>
                        ) : props.myData.switched &&
                          !props.myData.isAdvanced ? (
                          <p>{props.myData.From}</p>
                        ) : !props.myData.switched &&
                          props.myData.isAdvanced ? (
                          <p>{props.myData.destination_address}</p>
                        ) : props.myData.switched && props.myData.isAdvanced ? (
                          <p>{props.myData.From}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={openModal}
                      type="button"
                    >
                      <i className="far fa-map" /> View Map
                    </button>
                    <div>
                      <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Map Modal"
                      >
                        <h2
                          className="mb-4"
                          ref={_subtitle => (subtitle = _subtitle)}
                        >
                          Map
                        </h2>
                        {typeof props.myData.Destination === 'string' ? (
                          <ReactGMap
                            containerElement={
                              <div style={{ height: `100%`, width: '100%' }} />
                            }
                            mapElement={<div style={{ height: `100%` }} />}
                            isMarkerShown
                            origin={props.myData.apLatLong}
                            destination={props.myData.destLatLng}
                          />
                        ) : (
                          <ReactGMap
                            containerElement={
                              <div style={{ height: `100%`, width: '100%' }} />
                            }
                            mapElement={<div style={{ height: `100%` }} />}
                            isMarkerShown
                            origin={props.myData.apLatLong}
                            destination={props.myData.Destination}
                          />
                        )}
                        {/* <button onClick={closeModal}>close</button> */}
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className>
          <div className="container max1080">
            <div className="row">
              <div className="col-md-12">
                {availableCars && availableCars.length > 0 ? (
                  <div className="owl-carousel owl-theme carslider">
                    {/* {availableCars.length} */}

                    {!noResultVehicles &&
                    availableCars &&
                    availableCars.length > 0
                      ? availableCars.map((item, index) => (
                          <div className="item" key={index}>
                            <div className="carbox">
                              <div className="bluebg" />
                              <img src={car1Img} alt="cars" />
                              <div className="choosedesc">
                                <h4>{item.vehicle_name}</h4>
                                <p className="grey">
                                  Max Passengers:{' '}
                                  <span className="blue">{item.max_pax}</span>
                                </p>
                                <p className="grey">
                                  Max Luggage:{' '}
                                  <span className="blue">
                                    {item.max_luggage}
                                  </span>
                                </p>
                                <p className="grey">
                                  CXL Deadline:{' '}
                                  <span className="blue">{item.cxl_days}</span>
                                </p>
                              </div>
                              <div>
                                <div className="selecttrip">
                                  {!roundTrip || !oneWayTrip ? (
                                    <p>{selectTripTypeError}</p>
                                  ) : null}
                                  <label className="radiowrap">
                                    Round Trip{' '}
                                    <span className="blue">
                                      {item.rt_price}
                                      {item.currency == 'EUR' ? '€' : '$'}
                                    </span>
                                    <input
                                      type="radio"
                                      value={item.rt_price}
                                      // checked={true}
                                      checked={roundTrip === item.vehicle_id}
                                      // defaultChecked={index}
                                      onChange={e =>
                                        onRoundTripChecked(
                                          item.rt_price,
                                          item.vehicle_id,
                                          item.currency,
                                          item.seconds_before_pick,
                                          item.max_pax,
                                          item.release_hours,
                                        )
                                      }
                                      name="radio"
                                    />
                                    <span className="checkmark" />
                                  </label>
                                  <label className="radiowrap">
                                    One Way{' '}
                                    <span className="blue">
                                      {item.ow_price}
                                      {item.currency == 'EUR' ? '€' : '$'}
                                    </span>
                                    <input
                                      type="radio"
                                      checked={oneWayTrip === item.vehicle_id}
                                      value={item.ow_price}
                                      onChange={e =>
                                        onOneWayChecked(
                                          item.ow_price,
                                          item.vehicle_id,
                                          item.currency,
                                          item.seconds_before_pick,
                                          item.max_pax,
                                          item.release_hours,
                                        )
                                      }
                                      name="radio"
                                    />
                                    <span className="checkmark" />
                                  </label>
                                </div>
                                <div className="booknow">
                                  <button
                                    type="button"
                                    name="button"
                                    className="btn btnstyle4 btn-block "
                                    onClick={() => goToBookingForm(item)}
                                  >
                                    Book Now
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : noResultVehicles}
                  </div>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

AvailableCars.propTypes = {};

export default AvailableCars;
