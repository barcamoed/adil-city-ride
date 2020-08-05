/**
 *
 * HomeFilters
 *
 */

import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Formik, Form, Field, FormikConsumer } from 'formik';
import { FormattedMessage } from 'react-intl';

import switchImg from '../../assets/images/switch.png';
import LocationSearchInput from '../LocationSearchInput/index';
import AvailableCars from '../AvailableCars/index';
import { mapSchema } from '../Login/schema';
import ReactGMap from '../ReactGMap/index';

var filteredAirports = [];
const HomeFilters = props => {
  // console.log('Propsssssssssssssssssss', props && props);
  var [selectOptions, setSelectOptions] = useState(true);
  var LocationSeacrh = (
    <Field
      name="destination"
      onSetAbc={value => setAdvnacedSearchVal(value)}
      onSetFeildText={value => setAdvnacedSearchFieldText(value)}
      component={LocationSearchInput}
    />
  );
  var first = (
    <div className="form-group">
      <Field name="from" className="form-control form-control-sm" />
    </div>
  );
  var second = (
    <div>
      {selectOptions ? (
        <Field
          as="select"
          name="destination"
          className="form-control form-control-sm"
          onChange={getOnChangeVal}
        >
          <option value="">Select</option>
          {selecetdApDestinations && selecetdApDestinations.length > 0
            ? selecetdApDestinations.map((destination, key) => {
                return (
                  <option value={destination.id}>{destination.name}</option>
                );
              })
            : 'Loading...'}
        </Field>
      ) : (
        LocationSeacrh
      )}

      <div id="map" />
    </div>
  );
  const [showFromFirst, setSwitch] = useState([first, second]);
  const [ap_name, setCardName] = useState('');
  const [activate, activateCardClass] = useState('');
  var [airportsArray, setAirportsArray] = useState([]);
  const [selecetdApFromValue, setFromValue] = useState('');
  const [selecetdApDestinations, setDestinations] = useState([]);
  const [selecetdApDestinationIdValue, setDestinationIDValue] = useState(null);
  const [showCarsSection, setCarsSection] = useState(false);
  const [myData, setmyData] = useState({});
  const [advnacedSearchVal, setAdvnacedSearchVal] = useState(null);
  const [advnacedSearchFieldText, setAdvnacedSearchFieldText] = useState(null);
  var [switchCheck, setSwitchCheck] = useState(0);
  const [apLatLong, setApLatLong] = useState({});
  const [destLatLng, setDestinationLatLng] = useState({});
  const [dropDownDestinationText, setDropDownDestinationText] = useState('');

  function changePosition() {
    if (switchCheck == 0) {
      setSwitchCheck(1);
      // console.log('Switched');
    } else if (switchCheck == 1) {
      setSwitchCheck(0);
      // console.log('Not Switched');
    }
    // console.log('After Switch Val:', switchCheck);

    var mfirst = showFromFirst[0];
    showFromFirst[0] = showFromFirst[1];
    showFromFirst[1] = mfirst;
    const newArr = [showFromFirst[0], showFromFirst[1]];
    setSwitch(newArr);
  }
  function apSelected(airport) {
    setApLatLong({
      lat: parseFloat(airport.ap_latitude),
      lng: parseFloat(airport.ap_longitude),
    });

    activateCardClass('card active');
    setCardName(airport.ap_name);
    setFromValue(airport.ap_name);
    setDestinations(airport.destinations);
    second = (
      <div className="form-group">
        {selectOptions == true ? (
          <div class="select">
            <Field
              as="select"
              name="destination"
              className="form-control form-control-sm"
              onChange={getOnChangeVal}
            >
              <option value="">Select</option>
              {airport.destinations && airport.destinations.length > 0
                ? airport.destinations.map((destination, key) => {
                    return (
                      <option key={key} value={destination.id}>
                        {destination.name}
                      </option>
                    );
                  })
                : 'Loading...'}
            </Field>
          </div>
        ) : (
          LocationSeacrh
        )}

        <div id="map" />
      </div>
    );

    const newArr = [first, second];
    setSwitch(newArr);
    // console.log('selectedApDestinationss:', selecetdApDestinations);
  }
  function getOnChangeVal(e) {
    // console.log('Selected Dest ID hereeeeee', e.target.value);
    setDestinationIDValue(e.target.value);
  }

  const myArray = JSON.parse(localStorage.getItem('CityAirports'));
  var myAirports = [];
  // console.log('airportsArray bahirrrrr', airportsArray);
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].city == props.searchData.searchField) {
      myAirports[i] = myArray[i];
    }
    filteredAirports = myAirports.filter(function(el) {
      return el != null;
    });
  }

  useEffect(() => {
    // console.log('filteredAirports.length:', filteredAirports.length);
    if (filteredAirports.length > 0) {
      setAirportsArray(filteredAirports);
      if (filteredAirports.length == 1) {
      }
    }
    if (switchCheck == 1 && selectOptions == false) {
      const newArr = [second, first];
      setSwitch(newArr);
    } else if (switchCheck == 0 && selectOptions == false) {
      const newArr = [first, second];
      setSwitch(newArr);
    }

    if (switchCheck == 1) {
      // console.log('Switcheddddd');
    }
    if (switchCheck == 0) {
      // console.log(' Notttt.....Switcheddddd');
    }

    if (
      Object.keys(destLatLng).length === 0 &&
      destLatLng.constructor === Object &&
      selecetdApDestinationIdValue != null
    ) {
      selecetdApDestinations.map((item, key) => {
        if (item.id == selecetdApDestinationIdValue) {
          // console.log('ID Matched here', item);
          setDestinationLatLng({
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lng),
          });
          setDropDownDestinationText(item.name);
        }
      });
    }

    var date = new Date().toISOString().slice(0, 10);
    // function initAutocomplete() {
    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     center: { lat: -33.8688, lng: 151.2195 },
    //     zoom: 13,
    //     mapTypeId: 'roadmap',
    //   });
    //   // Create the search box and link it to the UI element.
    //   var input = document.getElementById('pac-input');
    //   var searchBox = new google.maps.places.SearchBox(input);
    //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    //   // Bias the SearchBox results towards current map's viewport.
    //   map.addListener('bounds_changed', function() {
    //     searchBox.setBounds(map.getBounds());
    //   });

    //   var markers = [];
    //   // Listen for the event fired when the user selects a prediction and retrieve
    //   // more details for that place.
    //   searchBox.addListener('places_changed', function() {
    //     var places = searchBox.getPlaces();

    //     if (places.length == 0) {
    //       return;
    //     }

    //     // Clear out the old markers.
    //     markers.forEach(function(marker) {
    //       marker.setMap(null);
    //     });
    //     markers = [];

    //     // For each place, get the icon, name and location.
    //     var bounds = new google.maps.LatLngBounds();
    //     places.forEach(function(place) {
    //       if (!place.geometry) {
    //         console.log('Returned place contains no geometry');
    //         return;
    //       }
    //       var icon = {
    //         url: place.icon,
    //         size: new google.maps.Size(71, 71),
    //         origin: new google.maps.Point(0, 0),
    //         anchor: new google.maps.Point(17, 34),
    //         scaledSize: new google.maps.Size(25, 25),
    //       };

    //       // Create a marker for each place.
    //       markers.push(
    //         new google.maps.Marker({
    //           map: map,
    //           icon: icon,
    //           title: place.name,
    //           position: place.geometry.location,
    //         }),
    //       );

    //       if (place.geometry.viewport) {
    //         // Only geocodes have viewport.
    //         bounds.union(place.geometry.viewport);
    //       } else {
    //         bounds.extend(place.geometry.location);
    //       }
    //     });
    //     map.fitBounds(bounds);
    //   });
    // }
    if (apLatLong && destLatLng) {
      // console.log('apLat Long', apLatLong);
      // console.log('destLatLng mmm', destLatLng);
      // forceUpdate();
      // console.log('Updateddddddddddddd', apLatLong);
    }
    if (advnacedSearchVal != null) {
      setDestinationLatLng(advnacedSearchVal);
      // forceUpdate();
    }
  }, [
    props.searchData.searchField,
    selectOptions,
    apLatLong,
    selecetdApDestinationIdValue,
    destLatLng,
    // advnacedSearchVal,
  ]);

  var subtitle;

  const advancedSearchClicked = () => {
    // console.log('Before Changingggggg....', selectOptions);
    setSelectOptions(!selectOptions);
  };

  async function fetchCarsToSelect() {
    // setPropsSearchData(props.searchData);
    // console.log('Inside Car Fetching Method', switchCheck);
    if (switchCheck == 1) {
      // console.log('switchCheck is checked to 1:Switched');
      await setCarsSection(true);
      if (selectOptions) {
        // console.log(
        //   'Switched and not advanced inside HomeFilterssssssssssssss',
        // );
        await setmyData({
          searchField: props.searchData.searchField,
          From: selecetdApFromValue,
          Destination: selecetdApDestinationIdValue,
          pax_num: props.searchData.passengers,
          switched: true,
          isAdvanced: false,
          apLatLong: apLatLong,
          destLatLng: destLatLng,
          dropDownDestinationText: dropDownDestinationText,
        });
      } else if (!selectOptions) {
        // console.log(
        //   'Switched and Advanced inside HomeFiltersccccccccccc',
        //   advnacedSearchFieldText,
        // );
        await setmyData({
          searchField: props.searchData.searchField,
          From: selecetdApFromValue,
          Destination: advnacedSearchVal,
          pax_num: props.searchData.passengers,
          switched: true,
          isAdvanced: true,
          destination_address: advnacedSearchFieldText,
          apLatLong: apLatLong,
          destLatLng: destLatLng,
          dropDownDestinationText: dropDownDestinationText,
        });
      }
    } else if (switchCheck == 0) {
      // console.log('switchCheck is checked to 0: Not Switched');
      await setCarsSection(true);
      if (selectOptions) {
        // console.log('Not Switched Not Advanced');
        // console.log('From', selecetdApFromValue);
        // console.log('Destination ID', selecetdApDestinationIdValue);
        // console.log('props from Home Page', props);

        await setmyData({
          searchField: props.searchData.searchField,
          From: selecetdApFromValue,
          Destination: selecetdApDestinationIdValue,
          pax_num: props.searchData.passengers,
          switched: false,
          isAdvanced: false,
          apLatLong: apLatLong,
          destLatLng: destLatLng,
          dropDownDestinationText: dropDownDestinationText,
        });
        // console.log('myData:', myData);
      } else if (selectOptions == false) {
        // console.log('Not Switched But Advanced');
        // console.log('From', selecetdApFromValue);
        // console.log('Destination ID', selecetdApDestinationIdValue);
        // console.log('Props from Home Page', props);
        await setmyData({
          searchField: props.searchData.searchField,
          From: selecetdApFromValue,
          Destination: advnacedSearchVal,
          pax_num: props.searchData.passengers,
          switched: false,
          isAdvanced: true,
          destination_address: advnacedSearchFieldText,
          apLatLong: apLatLong,
          destLatLng: destLatLng,
          dropDownDestinationText: dropDownDestinationText,
        });
      }
    }
  }

  return (
    <div>
      <section className="cityairport">
        <div className="container">
          <div className="col-md-12 p-0">
            <h2 className="bb">
              City Airports{' '}
              <span className="count">
                {airportsArray.length}
                <span />
              </span>
            </h2>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {airportsArray && airportsArray.length > 1
              ? airportsArray.map(item => (
                  <div className="col-md-6">
                    <div
                      onClick={() => apSelected(item)}
                      className={
                        activate && ap_name == item.ap_name
                          ? 'card active'
                          : 'card'
                      }
                    >
                      <div className="row no-gutters">
                        <div className="col-md-5">
                          <img
                            src={item.ap_image}
                            className="card-img"
                            alt="destination"
                          />
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <p className="cityname">{item.ap_iata}</p>
                            <h3>{item.ap_name}</h3>
                            <p className="state">
                              {item.city}
                              {/* , {item.country} */}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : airportsArray && airportsArray.length == 1
              ? airportsArray.map(item => (
                  <div className="col-md-6">
                    <div
                      onLoad={() => apSelected(item)}
                      className={
                        activate && ap_name == item.ap_name
                          ? 'card active'
                          : 'card'
                      }
                    >
                      <div className="row no-gutters">
                        <div className="col-md-5">
                          <img
                            src={item.ap_image}
                            className="card-img"
                            alt="destination"
                          />
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <p className="cityname">{item.ap_iata}</p>
                            <h3>{item.ap_name}</h3>
                            <p className="state">
                              {item.city}
                              {/* , {item.country} */}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : 'Loading...'}
          </div>
        </div>
      </section>
      <section className="destination">
        <div className="container ">
          <div className="col-md-12 p-0">
            <h2 className="bb">Choose the Destintation</h2>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="row no-gutters">
                  <div className="col-lg-7 col-md-12">
                    <div className="card-body">
                      <div className="switch">
                        <a onClick={changePosition}>
                          <img src={switchImg} alt="switch" />
                        </a>
                      </div>
                      <div className="filters">
                        <Formik
                          enableReinitialize
                          initialValues={{
                            from:
                              activate == 'card active'
                                ? selecetdApFromValue
                                : '',
                            destination: selecetdApDestinationIdValue,
                          }}
                          validationSchema={mapSchema}
                          onSubmit={values => {
                            fetchCarsToSelect();
                            // console.log(
                            //   'Moeed Values inFormik submit:',
                            //   values,
                            // );
                          }}
                        >
                          {({ errors, touched }) => (
                            <Form className="form">
                              {/* {showFromFirst[0].props.children.props.children ==
                              'Destination' ? (
                                <label>From</label>
                              ) : null} */}
                              <div className="form-group">
                                <label>From</label>
                                {showFromFirst[0]}
                              </div>
                              {errors.from &&
                              touched.from &&
                              switchCheck == 0 ? (
                                <div className="errorMsg">{errors.from}</div>
                              ) : errors.destination &&
                                touched.destination &&
                                switchCheck == 1 ? (
                                <div className="errorMsg">
                                  {errors.destination}
                                </div>
                              ) : null}

                              <div className="form-group">
                                <label>Destination</label>
                                {showFromFirst[1]}
                              </div>

                              {errors.destination &&
                              touched.destination &&
                              switchCheck == 0 ? (
                                <div className="errorMsg">
                                  {errors.destination}
                                </div>
                              ) : errors.from &&
                                touched.from &&
                                switchCheck == 0 ? (
                                <div className="errorMsg">{errors.from}</div>
                              ) : null}

                              <div className="form-group">
                                <button
                                  type="submit"
                                  className="btn btnstyle4"
                                  name="button"
                                  // onClick={fetchCarsToSelect}
                                >
                                  Continue
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                      <div className="advancesearchlink">
                        <a onClick={advancedSearchClicked}>Advanced Search</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-12">
                    {Object.keys(apLatLong).length != 0 &&
                    apLatLong.constructor === Object &&
                    (Object.keys(destLatLng).length != 0 &&
                      destLatLng.constructor === Object) &&
                    advnacedSearchVal == null ? (
                      <ReactGMap
                        containerElement={
                          <div style={{ height: `100%`, width: '100%' }} />
                        }
                        mapElement={<div style={{ height: `100%` }} />}
                        isMarkerShown
                        origin={{ lat: apLatLong.lat, lng: apLatLong.lng }}
                        destination={{
                          lat: destLatLng.lat,
                          lng: destLatLng.lng,
                        }}
                      />
                    ) : null}

                    {Object.keys(apLatLong).length != 0 &&
                    apLatLong.constructor === Object &&
                    advnacedSearchVal != null ? (
                      <ReactGMap
                        containerElement={
                          <div style={{ height: `100%`, width: '100%' }} />
                        }
                        mapElement={<div style={{ height: `100%` }} />}
                        isMarkerShown
                        origin={{ lat: apLatLong.lat, lng: apLatLong.lng }}
                        destination={{
                          lat: advnacedSearchVal.lat,
                          lng: advnacedSearchVal.lng,
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showCarsSection ? <AvailableCars myData={myData} /> : null}
    </div>
  );
};

HomeFilters.propTypes = {};

export default HomeFilters;
