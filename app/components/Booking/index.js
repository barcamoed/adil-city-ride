/**
 *
 * Booking
 *
 */

// import DatePicker from 'react-datepicker';
import React, { useState, useEffect, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useCookies } from 'react-cookie';
import { Formik, Form, Field } from 'formik';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';
import HashLoader from 'react-spinners/HashLoader';
import Modal from 'react-modal';
import car1Img from '../../assets/images/car1.png';
import Header from '../Header';
import Footer from '../Footer';
import infoImg from '../../assets/images/info.png';

import tickImg from '../../assets/images/tick.png';
import leftangleImg from '../../assets/images/leftangle.png';

import { bookingSchema } from '../Login/schema';
import RCTimePicker from '../RCTimePicker/index';

import {
  IDENTIFIER,
  GET_FLIGHT_DETAILS_KEY,
  GET_CHECK_LOCATION_KEY,
  GET_CREATE_RESERVATION_KEY,
  GET_CREATE_BOOKING_KEY,
} from '../../utils/constants';
import { postRequest } from '../../utils/requests';
import LocationSearchInput from '../LocationSearchInput/index';

Modal.setAppElement('#app'); // For Modal used below
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '560px',
    width: '100%',
    heigh: '50%',
  },
  overlay: { zIndex: 1000 },
};
const customStyles2 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '1080px',
    width: '100%',
    heigh: '50%',
  },
  overlay: { zIndex: 1000 },
};

const Booking = props => {
  let subtitle;
  const [cookies, setCookie, removeCookie] = useCookies(['cookie_days']);
  const [type, setFlightType] = useState(localStorage.getItem('flightType'));
  const [arrival_flight_number, setArrival_flight_number] = useState('');
  const [departure_flight_number, setDeparture_flight_number] = useState('');
  const [showThis, setArrivalFlightError] = useState(false);
  const [showThis2, setDepartureFlightError] = useState(false);
  const [showBabyAges, setTodos] = useState('');
  const [showChildAges, setChildAgesData] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [email, setEmail] = useState('');
  const [arrival_date, setArrival_Date] = useState('');
  const [departure_date, setDeparture_Date] = useState('');

  const [arrival_time, setArrival_Time] = useState('');
  const [departure_time, setDeparture_Time] = useState('');
  const [vehicleObj, setVehicleObj] = useState({});
  const [myGeneralObj, setMyGeneralObj] = useState({});
  const [showArrivalAndDeparture, setShowArrivalAndDeparture] = useState(false);
  const [showJustDeparture, setShowJustDeparture] = useState(false);
  const [showJustArrival, setShowJustArrival] = useState(false);
  const [flight_Airport_Match_Error, set_Flight_Airport_Match_Error] = useState(
    '',
  );
  const [
    arrival_flight_Airport_Match_Error,
    set_Arrival_Flight_Airport_Match_Error,
  ] = useState('');

  const [
    departure_flight_Airport_Match_Error,
    set_Departure_Flight_Airport_Match_Error,
  ] = useState('');

  const [destination, setDestination] = useState('');
  const [advnacedSearchVal, setAdvnacedSearchVal] = useState(null);
  const [advnacedSearchFieldText, setAdvnacedSearchFieldText] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [babySelectedAge, setBabyAge] = useState('');
  const [babySelectedAge1, setBabyAge1] = useState('');
  const [childSelectedAge, setChildAge] = useState('');
  const [childSelectedAge1, setChildAge2] = useState('');
  const [wheelChairVal, setWheelChairVal] = useState('');
  const [remark, setRemark] = useState('');
  const [seconds_before_pick, setSeconds_before_pick] = useState('');
  const [pickUpTime, setPickUpTime] = useState('');
  const [babyObjects, setBabyObjects] = useState('');
  const [childObjects, setChildObjects] = useState('');
  const [differentVehicles, setDifferentVehicles] = useState([]);
  const [noMatchingVehicleError, setNoMatchingVehicleError] = useState('');

  const [showPaymentArea, setShowPayment] = useState(true);
  const [status3PriceError, setStatus3PriceError] = useState(null);
  const [contactByEmail, setContactByEmail] = useState(null);
  const [contactByWa, setContactByWa] = useState(null);
  const [contactEmail, setContactEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [showContactInfoError, setShowContactInfoError] = useState('');
  const [reqStatus, setReqStatus] = useState(null);
  const [isActive, setLodaerIsActive] = useState(false);

  const [showReservationIdModal, setShowReservationIdModal] = useState(false);
  const [res_ID, setReservationID] = useState(false);
  const [showDepartureTimeError, setDepartureTimeError] = useState('');
  // const prevCountRef = useRef();
  const [passengers, setPassengers] = useState([
    { id: '1', val: '1' },
    { id: '2', val: '2' },
    { id: '3', val: '3' },
    { id: '4', val: '4' },
    { id: '5', val: '5' },
    { id: '6', val: '6' },
    { id: '7', val: '7' },
    { id: '8', val: '8' },
    { id: '9', val: '9' },
    { id: '10', val: '10' },
    { id: '11', val: '11' },
    { id: '12', val: '12' },
    { id: '13', val: '13' },
    { id: '14', val: '14' },
    { id: '15', val: '15' },
    { id: '16', val: '16' },
    { id: '17', val: '17' },
    { id: '18', val: '18' },
    { id: '19', val: '19' },
    { id: '20', val: '20' },
    { id: '21', val: '21' },
    { id: '22', val: '22' },
    { id: '23', val: '23' },
    { id: '24', val: '24' },
    { id: '25', val: '25' },
    { id: '26', val: '26' },
    { id: '27', val: '27' },
    { id: '28', val: '28' },
    { id: '29', val: '29' },
    { id: '30', val: '30' },
    { id: '31', val: '31' },
    { id: '32', val: '32' },
    { id: '33', val: '33' },
    { id: '34', val: '34' },
    { id: '35', val: '35' },
    { id: '36', val: '36' },
    { id: '37', val: '37' },
    { id: '38', val: '38' },
    { id: '39', val: '39' },
    { id: '40', val: '40' },
    { id: '41', val: '41' },
    { id: '42', val: '42' },
    { id: '43', val: '43' },
    { id: '44', val: '44' },
    { id: '45', val: '45' },
    { id: '46', val: '46' },
    { id: '47', val: '47' },
    { id: '48', val: '48' },
    { id: '49', val: '49' },
    { id: '50', val: '50' },
  ]);

  const [paxSelected, setPaxSelected] = useState('');
  const selectBabyOptions = event => {
    const babyAges = [
      { title: '1', value: ['0.5', '1', '1.5', '2', '2.5'], age: '0.5' },
      { title: '2', value: ['0.5', '1', '1.5', '2', '2.5'], age: '1' },
    ];
    setTodos(babyAges);
    if (event == 1) {
      const filter = babyAges.filter(item => item.title === event);
      setTodos(filter);
      setBabyObjects(event);
    } else if (event == 2) {
      setTodos(babyAges);
      setBabyObjects(event);
    } else if (event == '') {
      const myAgesData = [];
      setTodos(myAgesData);
      setBabyObjects('');
    }
  };
  const selectChildOptions = event => {
    const childAgesData = [
      { title: '1', value: ['3', '3.5', '4', '4.5', '5', '5.5'], age: '3' },
      { title: '2', value: ['3', '3.5', '4', '4.5', '5', '5.5'], age: '4' },
    ];
    setChildAgesData(childAgesData);
    if (event == 1) {
      const filter = childAgesData.filter(item => item.title === event);
      setChildAgesData(filter);
      setChildObjects(event);
    } else if (event == 2) {
      setChildAgesData(childAgesData);
      setChildObjects(event);
    } else if (event == '') {
      const myAgesData = [];
      setChildAgesData(myAgesData);
      setChildObjects(event);
    }
  };

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const prevCount = usePrevious(departure_time);
  const prevShowPickUpTime = usePrevious(pickUpTime);

  useEffect(() => {
    // console.log('cookies Data:.:.:', cookies.hasOwnProperty('cookie_days'));

    const date = new Date().toISOString().slice(0, 10);
    let myVehicleObj = {};
    let myGeneralObj = {};
    if (
      localStorage.getItem('myGeneralObj') &&
      localStorage.getItem('vehicleObj')
    ) {
      myGeneralObj = JSON.parse(localStorage.getItem('myGeneralObj'));
      // console.log('myGeneral Obj', myGeneralObj.myData);
      myVehicleObj = JSON.parse(localStorage.getItem('vehicleObj'));
      // console.log('vehicleObj Obj', myVehicleObj);

      // setSeconds_before_pick(myVehicleObj.seconds_before_pick);
      // JSON.parse(
      //   localStorage.getItem('myGeneralObj'),
      // ).myData.pax_num
      setPaxSelected(myGeneralObj.myData.pax_num);
      setVehicleObj(myVehicleObj);
      setMyGeneralObj(myGeneralObj);
    }

    if (myVehicleObj && myVehicleObj.route == 'rt') {
      setShowArrivalAndDeparture(true);
      setFlightType('both');
      localStorage.setItem('flightType', 'both');
      // console.log('Set FlightType as Both');
    } else if (
      myVehicleObj &&
      myVehicleObj.route == 'ow' &&
      myGeneralObj.myData.switched == true
    ) {
      setShowJustDeparture(true);
      localStorage.setItem('flightType', 'justDeparture');
      setFlightType('justDeparture');
      // console.log('Set FlightType as justDeparture');
    } else if (
      myVehicleObj &&
      myVehicleObj.route == 'ow' &&
      myGeneralObj.myData.switched == false
    ) {
      setShowJustArrival(true);
      setFlightType('justArrival');
      localStorage.setItem('flightType', 'justArrival');
      // console.log('Set FlightType as justArrival');
    }
    if (
      advnacedSearchVal &&
      advnacedSearchVal &&
      myGeneralObj.myData.isAdvanced == false
    ) {
      const myGeneralObj1 = JSON.parse(localStorage.getItem('myGeneralObj'));
      // console.log('Hhhhhhhhhhhhhhhhhhhhhh', myGeneralObj1);
      const destinationLatLng = `(${advnacedSearchVal.lat}, ${
        advnacedSearchVal.lng
      })`;
      // console.log('myStructured Destination:', destinationLatLng);
      const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
      };

      const formData = new FormData();
      const data = {
        command: 'check_location',
        identifier: IDENTIFIER,
        key: GET_CHECK_LOCATION_KEY(),
        data: {
          ap_code: myGeneralObj1.myData.ap_iata,
          destination_id: myGeneralObj1.myData.Destination,
          destination_point: destinationLatLng,
          pax_num: myGeneralObj1.myData.pax_num,
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
        // console.log('Dataaaaaaaaaaa...', data);
        setLodaerIsActive(false);
        if (data.status == '1') {
          // console.log('Status==1', data);

          setShowPayment(true);
          setNoMatchingVehicleError('');
        } else if (data.status == '2') {
          const status2WithVehicles = data.vehicles;
          // console.log('Status==2', data);
          // setShowPayment(false);
          setReqStatus(2);
          setDifferentVehicles(status2WithVehicles);

          if (prevCount != undefined && prevCount != departure_time) {
            setIsOpen(false);
            // setShowPayment(true);
          } else {
            setIsOpen(true);
            // setShowPayment(true);
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
          setNoMatchingVehicleError('');
        } else if (data.status == '3') {
          setReqStatus(3);
          // console.log('Status==3', data.message);
          // setNoMatchingVehicleError(data.message);
          setShowPayment(false);
          setStatus3PriceError(3);
        }
      });
    }

    if (myVehicleObj.seconds_before_pick != 'null' && departure_time) {
      let myPickUpTime = null;
      const myString = (myVehicleObj.seconds_before_pick / 3600).toFixed(2);
      // console.log('My String:', myString);
      const myStringParts = myString.split('.');
      const hourDelta = myStringParts[0];
      const minuteDelta = myStringParts[1];
      const abc1 = moment(`${departure_date} ${departure_time}`);
      myPickUpTime = abc1
        .subtract({ hours: hourDelta, minutes: minuteDelta })
        .toString();
      setSeconds_before_pick(moment(myPickUpTime).format('hh:mm')); // To Show in the Rc Time Picker

      // console.log('Seconds Before Not NULLLL', myVehicleObj);
      setPickUpTime(
        moment(myPickUpTime)
          .format('hh:mm')
          .toString(),
      ); // To use in request
      // setIsOpen(false);
    }

    // To restrict past date
    $('#exp_date').attr('min', date);
    $('#arrivaldate').attr('min', date);
    $('#departuredate').attr('min', date);
  }, [
    vehicleObj.length,
    // myGeneralObj.myData,
    arrival_time,
    flight_Airport_Match_Error,
    advnacedSearchVal,
    differentVehicles.length,
    departure_time,
    // pickUpTime
    // showPaymentArea,
    // myGeneralObj.isAdvanced,
    // modalIsOpen,
    // departure_flight_Airport_Match_Error,
    // arrival_flight_Airport_Match_Error,
  ]);

  function handleFlightInputsChange(event) {
    const { value } = event.target;
    if (event.target.name == 'arrival_date') {
      setArrival_Date(value);
    } else if (event.target.name == 'departure_date') {
      // if (departure_flight_number) {
      //   console.log('Yessssssssssss');

      // }
      setDeparture_Date(value);
    }
  }
  function handleKeyUp(e, setFieldValue) {
    let flight_num = e.target.value;
    flight_num = flight_num.toUpperCase().replace(/\s/g, '');
    const regex = /^([A-Z][A-Z][A-Z]?|[A-Z][0-9]|[0-9][A-Z])[0-9]{1,4}$/.exec(
      flight_num,
    );
    if (regex != null) {
      setArrival_flight_number(
        `${regex[1]} ${flight_num.slice(
          flight_num.indexOf(regex[1]) + regex[1].length,
          flight_num.length,
        )}`,
      );
      setFieldValue(
        'arrival_flight_number',
        `${regex[1]} ${flight_num.slice(
          flight_num.indexOf(regex[1]) + regex[1].length,
          flight_num.length,
        )}`,
      );

      if (arrival_date) {
        const airline_iata = regex[1];
        const myFlight_num = flight_num.slice(
          flight_num.indexOf(regex[1]) + regex[1].length,
          flight_num.length,
        );
        const headers = {
          'Content-type': 'application/x-www-form-urlencoded',
        };

        const formData = new FormData();
        const data = {
          command: 'get_flight_details',
          identifier: IDENTIFIER,
          key: GET_FLIGHT_DETAILS_KEY(),
          data: {
            airline_iata,
            flight_num: myFlight_num,
            date_type: 'arriving',
            date: arrival_date,
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
          // console.log('Response Status:', data);
          if (data.status == 'ok') {
            setLodaerIsActive(false);
            // console.log('data.asdfasdfasdf :', data.data);
            if (data.data.arrival_airport == myGeneralObj.myData.ap_iata) {
              // console.log('Airport Matches');
              if (data.data.arrival_time) {
                const arrivalTime = data.data.arrival_time;
                if (showArrivalAndDeparture || showJustArrival) {
                  set_Arrival_Flight_Airport_Match_Error('');
                } else {
                  set_Flight_Airport_Match_Error('');
                  set_Arrival_Flight_Airport_Match_Error('');
                }
                setArrival_Time(arrivalTime);
              }
            } else if (
              data.data.arrival_airport != myGeneralObj.myData.ap_iata
            ) {
              if (showArrivalAndDeparture) {
                // console.log('Set Flight and Airport Match Errorrrrrrrr');
                set_Arrival_Flight_Airport_Match_Error(
                  'Flight Number and the Airport you selected donot match.',
                );
              } else {
                set_Flight_Airport_Match_Error(
                  'Flight Number and the Airport you selected donot match.',
                );
              }
            }
            if (
              ((arrival_date && data.data.arrival_time) ||
                (arrival_date && arrival_time)) &&
              JSON.parse(localStorage.getItem('vehicleObj')).route == 'ow'
            ) {
              const myDate = new Date(
                `${arrival_date} ${data.data.arrival_time}`,
              );
              var nowDatePlusReleaseHours = new Date(Date.now());
              nowDatePlusReleaseHours.setHours(
                nowDatePlusReleaseHours.getHours() + vehicleObj.release_hours,
              );
              const diffTime = Math.abs(nowDatePlusReleaseHours - myDate);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              // console.log(diffTime + ' milliseconds');
              // console.log(diffDays + ' days');
              if (diffDays > 0) {
                // console.log(
                //   'Show Payment Area and Continue normal reservation',
                // );
                setShowPayment(true);
              } else {
                // console.log(
                //   'Show Errors Area and Do create_booking_request on Subbmit',
                // );
                setShowPayment(false);
              }
            }

            const myPickUpTime = null;
            if (
              ((departure_date &&
                pickUpTime &&
                (arrival_date && data.data.arrival_time)) ||
                (arrival_date && arrival_time)) &&
              JSON.parse(localStorage.getItem('vehicleObj')).route == 'rt'
            ) {
              // console.log(
              //   'Both Arrival And Departure Set Inside Arrival Function',
              // );
              const myArrivalDate = new Date(
                `${arrival_date} ${data.data.arrival_time}`,
              );
              // console.log('Arrival Date:', myArrivalDate);
              const myDepartureDate = new Date(
                `${departure_date} ${pickUpTime}`,
              );
              // console.log('Departure Date:', myDepartureDate);
              if (myDepartureDate > myArrivalDate) {
                // console.log('myDepartureDate is Greater');
                var nowDatePlusReleaseHours = new Date(Date.now());
                nowDatePlusReleaseHours.setHours(
                  nowDatePlusReleaseHours.getHours() + vehicleObj.release_hours,
                );
                const diffTime = Math.abs(
                  nowDatePlusReleaseHours - myArrivalDate,
                );
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                // console.log(diffTime + ' milliseconds');
                // console.log(diffDays + ' days');
                if (diffDays > 0) {
                  // console.log(
                  //   'Show Payment Area and Continue normal reservation',
                  // );
                  setShowPayment(true);
                } else {
                  // console.log(
                  //   'Show Errors Area and Do create_booking_request on Subbmit',
                  // );
                  setShowPayment(false);
                }
              } else {
                // console.log('myArrivalDate is Greater');
                var nowDatePlusReleaseHours = new Date(Date.now());
                nowDatePlusReleaseHours.setHours(
                  nowDatePlusReleaseHours.getHours() + vehicleObj.release_hours,
                );
                const diffTime = Math.abs(
                  nowDatePlusReleaseHours - myDepartureDate,
                );
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays > 0) {
                  // console.log(
                  //   'Show Payment Area and Continue normal reservation',
                  // );
                  setShowPayment(true);
                } else {
                  // console.log(
                  //   'Show Errors Area and Do create_booking_request on Subbmit',
                  // );
                  setShowPayment(false);
                }
              }
            }

            // setFormData(myObj);
          } else if (data.status == 'error') {
            setLodaerIsActive(false);
            set_Arrival_Flight_Airport_Match_Error(data.data.message);
            // setFormData(myObj);
          }
        });
      }

      setArrivalFlightError(false);
      // console.log('departure_flight_number end', departure_flight_number);
    } else {
      setArrivalFlightError(true);
    }
  }

  function handleKeyUp1(e, setFieldValue) {
    let flight_num = e.target.value;
    flight_num = flight_num.toUpperCase().replace(/\s/g, '');
    const regex = /^([A-Z][A-Z][A-Z]?|[A-Z][0-9]|[0-9][A-Z])[0-9]{1,4}$/.exec(
      flight_num,
    );

    // console.log('Old PickUp Time........;;;;;;;;;........', pickUpTime);
    if (regex != null) {
      setDeparture_flight_number(
        `${regex[1]} ${flight_num.slice(
          flight_num.indexOf(regex[1]) + regex[1].length,
          flight_num.length,
        )}`,
      );
      setFieldValue(
        'departure_flight_number',
        `${regex[1]} ${flight_num.slice(
          flight_num.indexOf(regex[1]) + regex[1].length,
          flight_num.length,
        )}`,
      );

      if (departure_date) {
        const airline_iata = regex[1];
        const myFlight_num = flight_num.slice(
          flight_num.indexOf(regex[1]) + regex[1].length,
          flight_num.length,
        );
        const headers = {
          'Content-type': 'application/x-www-form-urlencoded',
        };

        const formData = new FormData();
        const data = {
          command: 'get_flight_details',
          identifier: IDENTIFIER,
          key: GET_FLIGHT_DETAILS_KEY(),
          data: {
            airline_iata,
            flight_num: myFlight_num,
            date_type: 'departing',
            date: departure_date,
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
          // console.log('Response Status:', data);
          if (data.status == 'ok') {
            setLodaerIsActive(false);
            // console.log('Departure Date and Time Selected:', data.data);
            let myPickUpTime = null;
            if (data.data.departure_airport == myGeneralObj.myData.ap_iata) {
              // console.log('Airport Matches:My Vehicles:');
              if (data.data.departure_time) {
                const departureTime = data.data.departure_time;
                if (showArrivalAndDeparture) {
                  set_Departure_Flight_Airport_Match_Error('');
                }
                set_Flight_Airport_Match_Error('');
                set_Departure_Flight_Airport_Match_Error('');
                setDeparture_Time(departureTime);
                // console.log('Departure date', departure_date);
                const dep_Date = new Date(departure_date);
                // console.log('dep_Date', dep_Date);

                const myString = (
                  vehicleObj.seconds_before_pick / 3600
                ).toFixed(2);
                // console.log('My String:', myString);
                const myStringParts = myString.split('.');
                const hourDelta = myStringParts[0];
                const minuteDelta = myStringParts[1];
                const abc1 = moment(
                  `${departure_date} ${data.data.departure_time}`,
                );
                myPickUpTime = abc1
                  .subtract({ hours: hourDelta, minutes: minuteDelta })
                  .toString();
                // console.log('Vehicle Obj', vehicleObj);
                setSeconds_before_pick(moment(myPickUpTime).format('hh:mm')); // To Show in the Rc Time Picker

                if (vehicleObj.seconds_before_pick != 'null') {
                  // console.log('Seconds Before Not NULLLL', vehicleObj);
                  setPickUpTime(
                    moment(myPickUpTime)
                      .format('hh:mm')
                      .toString(),
                  ); // To use in request
                } else {
                  setPickUpTime('null');
                }
              }
            } else if (
              data.data.departure_airport != myGeneralObj.myData.ap_iata
            ) {
              // console.log(
              //   'Flight Number and the Airport you selected do not match.',
              // );
              if (showArrivalAndDeparture) {
                // console.log('Set Flight and Airport Match Errorrrrrrrr');
                set_Departure_Flight_Airport_Match_Error(
                  'Flight Number and the Airport you selected do not match.',
                );
              } else {
                set_Flight_Airport_Match_Error(
                  'Flight Number and the Airport you selected do not match.',
                );
              }
            }

            if (
              ((departure_date &&
                moment(myPickUpTime)
                  .format('hh:mm')
                  .toString()) ||
                (departure_date && pickUpTime)) &&
              JSON.parse(localStorage.getItem('vehicleObj')).route == 'ow'
            ) {
              const myDate = new Date(
                `${departure_date} ${moment(myPickUpTime)
                  .format('hh:mm')
                  .toString()}`,
              );
              var nowDatePlusReleaseHours = new Date(Date.now());
              nowDatePlusReleaseHours.setHours(
                nowDatePlusReleaseHours.getHours() + vehicleObj.release_hours,
              );
              const diffTime = Math.abs(nowDatePlusReleaseHours - myDate);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              // console.log(diffTime + ' milliseconds');
              // console.log(diffDays + ' days');
              if (diffDays > 0) {
                // console.log(
                //   'Show Payment Area and Continue normal reservation',
                // );
                setShowPayment(true);
              } else {
                // console.log(
                //   'Show Errors Area and Do create_booking_request on Subbmit',
                // );
                setShowPayment(false);
              }
            }
            if (
              (departure_date &&
                moment(myPickUpTime)
                  .format('hh:mm')
                  .toString()) ||
              (((departure_date &&
                pickUpTime &&
                (arrival_date && data.data.arrival_time)) ||
                (arrival_date && arrival_time)) &&
                JSON.parse(localStorage.getItem('vehicleObj')).route == 'rt')
            ) {
              // console.log('Both Arrival And Departure Set Hereeee');
              const myArrivalDate = new Date(`${arrival_date} ${arrival_time}`);
              // console.log('Arrival Date:', myArrivalDate);
              const myDepartureDate = new Date(
                `${departure_date} ${moment(myPickUpTime)
                  .format('hh:mm')
                  .toString()}`,
              );
              // console.log('Departure Date:', myDepartureDate);
              if (myDepartureDate > myArrivalDate) {
                // console.log('myDepartureDate is Greater');
                var nowDatePlusReleaseHours = new Date(Date.now());
                nowDatePlusReleaseHours.setHours(
                  nowDatePlusReleaseHours.getHours() + vehicleObj.release_hours,
                );
                const diffTime = Math.abs(
                  nowDatePlusReleaseHours - myArrivalDate,
                );
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                // console.log(diffTime + ' milliseconds');
                // console.log(diffDays + ' days');
                if (diffDays > 0) {
                  // console.log(
                  //   'Show Payment Area and Continue normal reservation',
                  // );
                  setShowPayment(true);
                } else {
                  // console.log(
                  //   'Show Errors Area and Do create_booking_request on Subbmit',
                  // );
                  setShowPayment(false);
                }
              } else {
                // console.log('myArrivalDate is Greater');
                var nowDatePlusReleaseHours = new Date(Date.now());
                nowDatePlusReleaseHours.setHours(
                  nowDatePlusReleaseHours.getHours() + vehicleObj.release_hours,
                );
                const diffTime = Math.abs(
                  nowDatePlusReleaseHours - myDepartureDate,
                );
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                // console.log(diffTime + ' milliseconds');
                // console.log(diffDays + ' days');
                if (diffDays > 0) {
                  // console.log(
                  //   'Show Payment Area and Continue normal reservation',
                  // );
                  setShowPayment(true);
                } else {
                  // console.log(
                  //   'Show Errors Area and Do create_booking_request on Subbmit',
                  // );
                  setShowPayment(false);
                }
              }
            }
          } else if (data.status == 'error') {
            // console.log('Data Status Message', data.data.message);
            setLodaerIsActive(false);
            set_Departure_Flight_Airport_Match_Error(data.data.message);
            // setFormData(myObj);
          }
        });
      }
      setDepartureFlightError(false);
      // console.log('departure_flight_number end', departure_flight_number);
    } else {
      setDepartureFlightError(true);
    }
  }
  function handleChange(event) {
    const someValue = event.target.value;
    if (event.target.name == 'first_name') {
      setFirst_name(someValue);
    } else if (event.target.name == 'last_name') {
      setLast_name(someValue);
    } else if (event.target.name == 'email') {
      setEmail(someValue);
    } else if (event.target.name == 'phone_number') {
      setPhone_number(someValue);
    }

    if (first_name && last_name && email && phone_number) {
      const Passenger = {
        first_name,
        last_name,
        email,
        phone_number,
      };
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#3C84BB';
  }

  const handleTimeChange = value => setSeconds_before_pick(moment());

  function closeModal() {
    setIsOpen(false);
  }

  function handleBabyAgeSelect(e) {
    setBabyAge(e.target.value);
  }

  function handleBabyAge2Select(e) {
    // setBabyAge('');
    // setBabyAge1('');
    if (!babySelectedAge) {
      setBabyAge(e.target.value);
    } else if (babySelectedAge) {
      setBabyAge1(e.target.value);
    }
  }

  function handleChildAgeSelect(e) {
    console.log('Child Event Val', e.target.value);
    setChildAge(e.target.value);
  }

  function handleChildAge2Select(e) {
    if (!childSelectedAge) {
      setChildAge(e.target.value);
    } else if (childSelectedAge) {
      setChildAge2(e.target.value);
    }
  }

  function onWheelChairSelect(e) {
    setWheelChairVal(e.target.value);
  }

  function remarkEntered(e) {
    setRemark(e.target.value);
  }

  const passengersValChange = e => {
    setPaxSelected(e.target.value);
  };

  function saveNewVehicle(item) {
    // console.log('Newwwww Item', item);
    if (JSON.parse(localStorage.getItem('vehicleObj')).route == 'rt') {
      const myVehicleObj = {
        vehicle_id: item.vehicle_id,
        route: 'rt',
        price: item.rt_price,
        currency: item.currency,
        seconds_before_pick: item.seconds_before_pick,
        max_pax: item.max_pax,
        release_hours: item.release_hours,
      };
      const myData = {
        Destination: myGeneralObj.myData.Destination,
        From: myGeneralObj.myData.From,
        isAdvanced: true,
        ap_iata: myGeneralObj.myData.ap_iata,
        pax_num: myGeneralObj.myData.pax_num,
        searchField: myGeneralObj.myData.searchField,
        switched: myGeneralObj.myData.switched,
      };
      setMyGeneralObj({ myData });
      setVehicleObj(myVehicleObj);
      localStorage.setItem('vehicleObj', JSON.stringify(myVehicleObj));
      localStorage.setItem('myGeneralObj', JSON.stringify({ myData }));

      setIsOpen(false);
    } else if (JSON.parse(localStorage.getItem('vehicleObj')).route == 'ow') {
      // Default route=rt
      const myVehicleObj = {
        vehicle_id: item.vehicle_id,
        route: 'ow',
        price: item.ow_price,
        currency: item.currency,
        seconds_before_pick: item.seconds_before_pick,
        max_pax: item.max_pax,
        release_hours: item.release_hours,
      };
      const myData = {
        Destination: myGeneralObj.myData.Destination,
        From: myGeneralObj.myData.From,
        isAdvanced: true,
        ap_iata: myGeneralObj.myData.ap_iata,
        pax_num: myGeneralObj.myData.pax_num,
        searchField: myGeneralObj.myData.searchField,
        switched: myGeneralObj.myData.switched,
      };
      setMyGeneralObj({ myData });
      setVehicleObj(myVehicleObj);
      localStorage.setItem('vehicleObj', JSON.stringify(myVehicleObj));
      localStorage.setItem('myGeneralObj', JSON.stringify({ myData }));
      setIsOpen(false);
    }
    // console.log('Arrival Data and Time', arrival_date, arrival_time);
    if (arrival_date && arrival_time) {
      console.log('InsideM MMMMMMMMMMMm');
      var myDate = new Date(`${arrival_date} ${arrival_time}`);
      var nowDatePlusReleaseHours = new Date(Date.now());
      nowDatePlusReleaseHours.setHours(
        nowDatePlusReleaseHours.getHours() + vehicleObj.release_hours,
      );
      const diffTime = Math.abs(nowDatePlusReleaseHours - myDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // console.log(diffDays + ' days');
      if (diffDays > 0) {
        // console.log('Show Payment Area and Continue normal reservation');
        setShowPayment(true);
      } else {
        // console.log(
        //   'Show Errors Area and Do create_booking_request on Subbmit',
        // );
        setShowPayment(false);
      }
    } else if (
      departure_date &&
      JSON.parse(localStorage.getItem('vehicleObj')).seconds_before_pick !=
        'null'
    ) {
      var myPickUpTime = null;
      var myString = (
        JSON.parse(localStorage.getItem('vehicleObj')).seconds_before_pick /
        3600
      ).toFixed(2);
      // console.log('My Stringssssssssssssss:', myString);
      var myStringParts = myString.split('.');
      var hourDelta = myStringParts[0];
      var minuteDelta = myStringParts[1];
      var abc1 = moment(`${departure_date} ${departure_time}`);
      // console.log('My abc1:', abc1);
      myPickUpTime = abc1
        .subtract({ hours: hourDelta, minutes: minuteDelta })
        .toString();
      setSeconds_before_pick(moment(myPickUpTime).format('hh:mm')); // To Show in the Rc Time Picker
      setPickUpTime(
        moment(myPickUpTime)
          .format('hh:mm')
          .toString(),
      ); // To use in request

      // console.log(
      //   'MyPTTTTTTTT:',
      //   moment(myPickUpTime)
      //     .format('hh:mm')
      //     .toString(),
      // );
      var myDate = new Date(
        `${departure_date} ${moment(myPickUpTime)
          .format('hh:mm')
          .toString()}`,
      );
      // console.log('my Dateeee', myDate);
      var nowDatePlusReleaseHours = new Date(Date.now());
      nowDatePlusReleaseHours.setHours(
        nowDatePlusReleaseHours.getHours() + vehicleObj.release_hours,
      );
      const diffTime = Math.abs(nowDatePlusReleaseHours - myDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // console.log(diffTime + ' milliseconds');
      // console.log(diffDays + ' days');
      if (diffDays > 0) {
        // console.log('Show Payment Area and Continue normal reservation');
        setShowPayment(true);
      } else {
        // console.log(
        //   'Show Errors Area and Do create_booking_request on Subbmit',
        // );
        setShowPayment(false);
      }
    }

    if (departure_time && departure_date && pickUpTime) {
      // console.log('setPickup time Here Againnnnnnnnnnnnnnnn');

      var myPickUpTime = null;
      var myString = (
        JSON.parse(localStorage.getItem('vehicleObj')).seconds_before_pick /
        3600
      ).toFixed(2);
      // console.log('My String:', myString);
      var myStringParts = myString.split('.');
      var hourDelta = myStringParts[0];
      var minuteDelta = myStringParts[1];
      var abc1 = moment(`${departure_date} ${departure_time}`);
      myPickUpTime = abc1
        .subtract({ hours: hourDelta, minutes: minuteDelta })
        .toString();
      setSeconds_before_pick(moment(myPickUpTime).format('hh:mm')); // To Show in the Rc Time Picker

      setPickUpTime(
        moment(myPickUpTime)
          .format('hh:mm')
          .toString(),
      ); // To use in request
    }
  }

  function submitRequest() {
    // e.preventDefault();
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
    };

    // isAdvanced

    const formData = new FormData();
    if (
      myGeneralObj.myData.isAdvanced == false &&
      myGeneralObj.myData.switched == true &&
      vehicleObj.route == 'ow'
    ) {
      const destinationLatLng = `(${advnacedSearchVal.lat}, ${
        advnacedSearchVal.lng
      })`;
      // console.log('My Keyyyyy', GET_CREATE_RESERVATION_KEY());
      var myStringNumbers = departure_flight_number.replace(/\D/g, '').trim();
      var withNoDigits = departure_flight_number.replace(/[0-9]/g, '').trim();
      var babyObj1 = null;
      var babyObj2 = null;
      var childObj1 = null;
      var childObj2 = null;
      var wheelChairObj = null;
      if (babySelectedAge) {
        babyObj1 = {
          type: 'baby_seat',
          val: babySelectedAge,
        };
      }
      if (babySelectedAge1) {
        babyObj2 = {
          type: 'baby_seat',
          val: babySelectedAge1,
        };
      }
      if (childSelectedAge) {
        childObj1 = {
          type: 'child_seat',
          val: childSelectedAge,
        };
      }
      if (childSelectedAge1) {
        childObj2 = {
          type: 'child_seat',
          val: childSelectedAge1,
        };
      }

      if (wheelChairVal != '') {
        wheelChairObj = {
          type: 'endicape',
          val: 'Folding',
        };
      }

      const data = {
        command: 'create_reservation',
        identifier: IDENTIFIER,
        key: GET_CREATE_RESERVATION_KEY(),

        data: {
          environment: 'test',
          general: {
            city: myGeneralObj.myData.searchField,
            ap_code: myGeneralObj.myData.ap_iata,
            destination_id: myGeneralObj.myData.Destination,
            is_advanced: '0',
            destination_point: destinationLatLng,
            destination_address: advnacedSearchFieldText,
            pax_num: paxSelected,
            remark,
          },
          passenger: {
            first_name,
            last_name,
            email,
            phone: phone_number,
          },
          vehicle: {
            vehicle_id: vehicleObj.vehicle_id,
            route: vehicleObj.route,
            price: vehicleObj.price,
            currency: vehicleObj.currency,
          },
          services: [
            {
              type: 'departing',
              airline_iata: withNoDigits,
              flight_num: myStringNumbers,
              flight_date: departure_date,
              flight_time: departure_time,
              pick_time:
                vehicleObj.seconds_before_pick == 'null'
                  ? vehicleObj.seconds_before_pick
                  : pickUpTime,
            },
          ],
          extra_equipment: [
            babyObj1,
            babyObj2,
            childObj1,
            childObj2,
            wheelChairObj,
          ],
        },
      };

      for (const dataKey in data) {
        if (dataKey == 'command') {
          formData.append(`command`, 'create_reservation');
        } else if (dataKey == 'identifier') {
          formData.append(`identifier`, IDENTIFIER);
        } else if (dataKey == 'key') {
          formData.append(`key`, GET_CREATE_RESERVATION_KEY());
        }
        if (dataKey === 'data') {
          // append nested object
          for (const previewKey in data[dataKey]) {
            if (previewKey == 'environment') {
              formData.append(`data[${previewKey}]`, 'test');
            }

            if (previewKey == 'general') {
              if (
                cookies.hasOwnProperty('cookie_days') &&
                localStorage.getItem('ref_id')
              ) {
                // console.log('INSIDE');
                formData.append(
                  'data[general][referral_id]',
                  localStorage.getItem('ref_id'),
                );
              }

              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'passenger') {
              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'vehicle') {
              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'services') {
              if (data[dataKey][previewKey].length == 1) {
                for (const ipk in data[dataKey][previewKey][0]) {
                  formData.append(
                    `data[${previewKey}][${0}][${ipk}]`,
                    data[dataKey][previewKey][0][ipk],
                  );
                }
              } else if (data[dataKey][previewKey].length > 1) {
                var i = 0;
                for (const ipk in data[dataKey][previewKey][i]) {
                  formData.append(
                    `data[${previewKey}][${i}][${ipk}]`,
                    data[dataKey][previewKey][i][ipk],
                  );
                  if (data[dataKey][previewKey][i + 1]) {
                    i++;
                  }
                }
              }
            }
            if (previewKey == 'extra_equipment') {
              if (data[dataKey][previewKey].length == 1) {
                for (const ipk in data[dataKey][previewKey][0]) {
                  formData.append(
                    `data[${previewKey}][${0}][${ipk}]`,
                    data[dataKey][previewKey][0][ipk],
                  );
                }
              } else if (data[dataKey][previewKey].length > 1) {
                var i = 0;
                for (var a = 0; a < data[dataKey][previewKey].length; a++) {
                  for (const ipk in data[dataKey][previewKey][a]) {
                    formData.append(
                      `data[${previewKey}][${a}][${ipk}]`,
                      data[dataKey][previewKey][a][ipk],
                    );
                  }
                  if (data[dataKey][previewKey][a + 1]) {
                  }
                }
              }
            }
          }
        }
      }

      if (showPaymentArea) {
        // console.log('showPaymentArea is TrueeeeEEEEE', formData.append());
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ', ' + pair[1]);
        // }

        setLodaerIsActive(true);
        postRequest(formData, headers).then(data => {
          // console.log('Data Status:', data);
          if (data.status == 'ok') {
            setLodaerIsActive(false);
            // console.log('Data Status:', data.status);
            setReservationID(data.res_id);
            setShowReservationIdModal(true);
            setDepartureTimeError('');
          } else if (data.status == 'error') {
            setLodaerIsActive(false);
            if (data.message[0] == 'flight_time') {
              setDepartureTimeError('Wrong Departure Time');
            }
          }
        });
      } else if (!showPaymentArea) {
        if (
          (contactByEmail == 1 && contactEmail) ||
          (contactByWa == 1 && contactNumber)
        ) {
          // console.log('Not showPaymentArea');
          if (reqStatus == 3) {
            formData.append(`data[rejects][address]`, 1);
          } else {
            formData.append(`data[rejects][release_time]`, 1);
          }
          if (contactByEmail) {
            formData.append(`data[contact][contact_by_mail]`, 1);
            formData.append(`data[contact][email_address]`, contactEmail);
          }
          if (contactByWa) {
            formData.append(`data[contact][contact_by_wa]`, 1);
            formData.append(`data[contact][wa_number]`, contactNumber);
          }
          formData.set('command', 'create_booking_request');
          formData.set('key', GET_CREATE_BOOKING_KEY());
          // for (var pair of formData.entries()) {
          //   console.log(pair[0] + ', ' + pair[1]);
          // }
          setLodaerIsActive(true);
          postRequest(formData, headers).then(data => {
            // console.log('Data Status:', data);
            setLodaerIsActive(false);
            if (data.status == 'ok') {
              // console.log('Data Status:', data.status);
              setShowContactInfoError('');
              setStatus3PriceError(null);
              // setReservationID(data.res_id);
              // setShowReservationIdModal(true);
            }
          });
        } else {
          // console.log('Show Error To Select One');
          setShowContactInfoError('Select One of the following');
        }
      }
    } // if is_advanced=0/false && switched=true&& ow
    else if (
      myGeneralObj.myData.isAdvanced == true &&
      myGeneralObj.myData.switched == false &&
      vehicleObj.route == 'ow'
    ) {
      var destinationLatLng = null;
      if (
        myGeneralObj.myData.Destination.lat &&
        myGeneralObj.myData.Destination.lng
      ) {
        destinationLatLng = `(${myGeneralObj.myData.Destination.lat}, ${
          myGeneralObj.myData.Destination.lng
        })`;
      } else {
        destinationLatLng = `(${advnacedSearchVal.lat}, ${
          advnacedSearchVal.lng
        })`;
      }

      var myStringNumbers = arrival_flight_number.replace(/\D/g, '').trim();
      var withNoDigits = arrival_flight_number.replace(/[0-9]/g, '').trim();
      var babyObj1 = null;
      var babyObj2 = null;
      var childObj1 = null;
      var childObj2 = null;
      var wheelChairObj = null;
      if (babySelectedAge) {
        babyObj1 = {
          type: 'baby_seat',
          val: babySelectedAge,
        };
      }
      if (babySelectedAge1) {
        babyObj2 = {
          type: 'baby_seat',
          val: babySelectedAge1,
        };
      }
      if (childSelectedAge) {
        childObj1 = {
          type: 'child_seat',
          val: childSelectedAge,
        };
      }
      if (childSelectedAge1) {
        childObj2 = {
          type: 'child_seat',
          val: childSelectedAge1,
        };
      }

      if (wheelChairVal != '') {
        wheelChairObj = {
          type: 'endicape',
          val: 'Folding',
        };
      }

      const data = {
        command: 'create_reservation',
        identifier: IDENTIFIER,
        key: GET_CREATE_RESERVATION_KEY(),

        data: {
          environment: 'test',
          general: {
            city: myGeneralObj.myData.searchField,
            ap_code: myGeneralObj.myData.ap_iata,
            // destination_id: myGeneralObj.myData.Destination,
            is_advanced: '1',
            destination_point: destinationLatLng,
            destination_address: advnacedSearchFieldText,
            pax_num: paxSelected,
            remark,
          },
          passenger: {
            first_name,
            last_name,
            email,
            phone: phone_number,
          },
          vehicle: {
            vehicle_id: vehicleObj.vehicle_id,
            route: vehicleObj.route,
            price: vehicleObj.price,
            currency: vehicleObj.currency,
          },
          services: [
            {
              type: 'arriving',
              airline_iata: withNoDigits,
              flight_num: myStringNumbers,
              flight_date: arrival_date,
              flight_time: arrival_time,
              pick_time: 'null',
            },
          ],
          extra_equipment: [
            babyObj1,
            babyObj2,
            childObj1,
            childObj2,
            wheelChairObj,
          ],
        },
      };

      for (const dataKey in data) {
        if (dataKey == 'command') {
          formData.append(`command`, 'create_reservation');
        } else if (dataKey == 'identifier') {
          formData.append(`identifier`, IDENTIFIER);
        } else if (dataKey == 'key') {
          formData.append(`key`, GET_CREATE_RESERVATION_KEY());
        }
        if (dataKey === 'data') {
          // append nested object
          for (const previewKey in data[dataKey]) {
            if (previewKey == 'environment') {
              formData.append(`data[${previewKey}]`, 'test');
            }

            if (previewKey == 'general') {
              if (
                cookies.hasOwnProperty('cookie_days') &&
                localStorage.getItem('ref_id')
              ) {
                // console.log('INSIDE');
                formData.append(
                  'data[general][referral_id]',
                  localStorage.getItem('ref_id'),
                );
              }

              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'passenger') {
              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'vehicle') {
              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'services') {
              if (data[dataKey][previewKey].length == 1) {
                for (const ipk in data[dataKey][previewKey][0]) {
                  formData.append(
                    `data[${previewKey}][${0}][${ipk}]`,
                    data[dataKey][previewKey][0][ipk],
                  );
                }
              } else if (data[dataKey][previewKey].length > 1) {
                var i = 0;
                for (const ipk in data[dataKey][previewKey][i]) {
                  formData.append(
                    `data[${previewKey}][${i}][${ipk}]`,
                    data[dataKey][previewKey][i][ipk],
                  );
                  if (data[dataKey][previewKey][i + 1]) {
                    i++;
                  }
                }
              }
            }
            if (previewKey == 'extra_equipment') {
              if (data[dataKey][previewKey].length == 1) {
                for (const ipk in data[dataKey][previewKey][0]) {
                  formData.append(
                    `data[${previewKey}][${0}][${ipk}]`,
                    data[dataKey][previewKey][0][ipk],
                  );
                }
              } else if (data[dataKey][previewKey].length > 1) {
                var i = 0;
                for (var a = 0; a < data[dataKey][previewKey].length; a++) {
                  for (const ipk in data[dataKey][previewKey][a]) {
                    formData.append(
                      `data[${previewKey}][${a}][${ipk}]`,
                      data[dataKey][previewKey][a][ipk],
                    );
                  }
                  if (data[dataKey][previewKey][a + 1]) {
                    // console.log(
                    //   'Next Exists 1',
                    //   data[dataKey][previewKey][a + 1],
                    // );
                  }
                }
              }
            }
          }
        }
      }

      if (showPaymentArea) {
        // console.log('showPaymentArea is TrueeeeEEEEE', formData.append());
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ', ' + pair[1]);
        // }
        // console.log('Showing Payment Area');
        setLodaerIsActive(true);
        postRequest(formData, headers).then(data => {
          setLodaerIsActive(false);
          // console.log('Data Status:', data);
          if (data.status == 'ok') {
            setReservationID(data.res_id);
            setShowReservationIdModal(true);
            // console.log('Data Status:', data.status);
          }
        });
      } else if (!showPaymentArea) {
        if (
          (contactByEmail == 1 && contactEmail) ||
          (contactByWa == 1 && contactNumber)
        ) {
          // console.log('Not showPaymentArea');
          if (reqStatus == 3) {
            formData.append(`data[rejects][address]`, 1);
          } else {
            formData.append(`data[rejects][release_time]`, 1);
          }
          if (contactByEmail) {
            formData.append(`data[contact][contact_by_mail]`, 1);
            formData.append(`data[contact][email_address]`, contactEmail);
          }
          if (contactByWa) {
            formData.append(`data[contact][contact_by_wa]`, 1);
            formData.append(`data[contact][wa_number]`, contactNumber);
          }
          formData.set('command', 'create_booking_request');
          formData.set('key', GET_CREATE_BOOKING_KEY());
          // for (var pair of formData.entries()) {
          //   console.log(pair[0] + ', ' + pair[1]);
          // }
          setLodaerIsActive(true);
          postRequest(formData, headers).then(data => {
            // console.log('Data Status:', data);
            setLodaerIsActive(false);
            if (data.status == 'ok') {
              // console.log('Data Status:', data.status);
              setShowContactInfoError('');
              setStatus3PriceError(null);
              //   setReservationID(data.res_id);
              // setShowReservationIdModal(true);
            }
          });
        } else {
          // console.log('Show Error To Select One');
          setShowContactInfoError('Select One of the following');
        }
      }
    } // isAdvanced=true,switched=false,ow
    else if (
      myGeneralObj.myData.isAdvanced == true &&
      myGeneralObj.myData.switched == true &&
      vehicleObj.route == 'ow'
    ) {
      // console.log('Loggedddd', myGeneralObj.myData.destination_address);
      let myDestinationLatLng = null;
      let previousDestAddress = null;
      if (
        myGeneralObj.myData.destination_address &&
        myGeneralObj.myData.Destination.lat
      ) {
        destinationLatLng = `(${myGeneralObj.myData.Destination.lat}, ${
          myGeneralObj.myData.Destination.lng
        })`;
        previousDestAddress = myGeneralObj.myData.destination_address;
      } else {
        // console.log('Objeeeeeeeeee', advnacedSearchVal);
        myDestinationLatLng = `(${advnacedSearchVal.lat}, ${
          advnacedSearchVal.lng
        })`;
        previousDestAddress = advnacedSearchFieldText;
      }
      var myStringNumbers = departure_flight_number.replace(/\D/g, '').trim();
      var withNoDigits = departure_flight_number.replace(/[0-9]/g, '').trim();
      var babyObj1 = null;
      var babyObj2 = null;
      var childObj1 = null;
      var childObj2 = null;
      var wheelChairObj = null;
      if (babySelectedAge) {
        // console.log('1 baby Object');
        babyObj1 = {
          type: 'baby_seat',
          val: babySelectedAge,
        };
      }
      if (babySelectedAge1) {
        babyObj2 = {
          type: 'baby_seat',
          val: babySelectedAge1,
        };
      }
      if (childSelectedAge) {
        childObj1 = {
          type: 'child_seat',
          val: childSelectedAge,
        };
      }
      if (childSelectedAge1) {
        childObj2 = {
          type: 'child_seat',
          val: childSelectedAge1,
        };
      }

      if (wheelChairVal != '') {
        wheelChairObj = {
          type: 'endicape',
          val: 'Folding',
        };
      }

      const data = {
        command: 'create_reservation',
        identifier: IDENTIFIER,
        key: GET_CREATE_RESERVATION_KEY(),

        data: {
          environment: 'test',
          general: {
            city: myGeneralObj.myData.searchField,
            ap_code: myGeneralObj.myData.ap_iata,
            // destination_id: myGeneralObj.myData.Destination,
            is_advanced: '1',
            destination_point: myDestinationLatLng,
            destination_address: previousDestAddress,
            pax_num: paxSelected,
            remark,
          },
          passenger: {
            first_name,
            last_name,
            email,
            phone: phone_number,
          },
          vehicle: {
            vehicle_id: vehicleObj.vehicle_id,
            route: vehicleObj.route,
            price: vehicleObj.price,
            currency: vehicleObj.currency,
          },
          services: [
            {
              type: 'departing',
              airline_iata: withNoDigits,
              flight_num: myStringNumbers,
              flight_date: departure_date,
              flight_time: departure_time,
              pick_time: pickUpTime,
            },
          ],
          extra_equipment: [
            babyObj1,
            babyObj2,
            childObj1,
            childObj2,
            wheelChairObj,
          ],
        },
      };

      for (const dataKey in data) {
        if (dataKey == 'command') {
          formData.append(`command`, 'create_reservation');
        } else if (dataKey == 'identifier') {
          formData.append(`identifier`, IDENTIFIER);
        } else if (dataKey == 'key') {
          formData.append(`key`, GET_CREATE_RESERVATION_KEY());
        }
        if (dataKey === 'data') {
          // append nested object
          for (const previewKey in data[dataKey]) {
            if (previewKey == 'environment') {
              formData.append(`data[${previewKey}]`, 'test');
            }

            if (previewKey == 'general') {
              if (
                cookies.hasOwnProperty('cookie_days') &&
                localStorage.getItem('ref_id')
              ) {
                formData.append(
                  'data[general][referral_id]',
                  localStorage.getItem('ref_id'),
                );
              }

              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'passenger') {
              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'vehicle') {
              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'services') {
              if (data[dataKey][previewKey].length == 1) {
                for (const ipk in data[dataKey][previewKey][0]) {
                  formData.append(
                    `data[${previewKey}][${0}][${ipk}]`,
                    data[dataKey][previewKey][0][ipk],
                  );
                }
              } else if (data[dataKey][previewKey].length > 1) {
                var i = 0;
                for (const ipk in data[dataKey][previewKey][i]) {
                  formData.append(
                    `data[${previewKey}][${i}][${ipk}]`,
                    data[dataKey][previewKey][i][ipk],
                  );
                  if (data[dataKey][previewKey][i + 1]) {
                    i++;
                  }
                }
              }
            }
            if (previewKey == 'extra_equipment') {
              if (data[dataKey][previewKey].length == 1) {
                for (const ipk in data[dataKey][previewKey][0]) {
                  formData.append(
                    `data[${previewKey}][${0}][${ipk}]`,
                    data[dataKey][previewKey][0][ipk],
                  );
                }
              } else if (data[dataKey][previewKey].length > 1) {
                // console.log(
                //   'More than 1 Equipments',
                //   data[dataKey][previewKey],
                // );
                var i = 0;
                for (var a = 0; a < data[dataKey][previewKey].length; a++) {
                  for (const ipk in data[dataKey][previewKey][a]) {
                    formData.append(
                      `data[${previewKey}][${a}][${ipk}]`,
                      data[dataKey][previewKey][a][ipk],
                    );
                  }
                  if (data[dataKey][previewKey][a + 1]) {
                    // console.log(
                    //   'Next Exists 1',
                    //   data[dataKey][previewKey][a + 1],
                    // );
                  }
                }
              }
            }
          }
        }
      }

      if (showPaymentArea) {
        // console.log('showPaymentArea is TrueeeeEEEEE', formData.append());
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ', ' + pair[1]);
        // }
        // console.log('Showing Payment Area');
        setLodaerIsActive(true);
        postRequest(formData, headers).then(data => {
          // console.log('Data Status:', data);
          setLodaerIsActive(false);
          if (data.status == 'ok') {
            // console.log('Data Status:', data.status);
            setReservationID(data.res_id);
            setShowReservationIdModal(true);
          }
        });
      } else if (!showPaymentArea) {
        if (
          (contactByEmail == 1 && contactEmail) ||
          (contactByWa == 1 && contactNumber)
        ) {
          if (reqStatus == 3) {
            formData.append(`data[rejects][address]`, 1);
          } else {
            formData.append(`data[rejects][release_time]`, 1);
          }
          // console.log('Not showPaymentArea');
          formData.append(`data[rejects][release_time]`, 1);
          if (contactByEmail) {
            formData.append(`data[contact][contact_by_mail]`, 1);
            formData.append(`data[contact][email_address]`, contactEmail);
          }
          if (contactByWa) {
            formData.append(`data[contact][contact_by_wa]`, 1);
            formData.append(`data[contact][wa_number]`, contactNumber);
          }
          formData.set('command', 'create_booking_request');
          formData.set('key', GET_CREATE_BOOKING_KEY());
          setLodaerIsActive(true);
          postRequest(formData, headers).then(data => {
            setLodaerIsActive(false);
            // console.log('Data Status:', data);
            if (data.status == 'ok') {
              // console.log('Data Status:', data.status);
              // setReservationID(data.res_id);
              // setShowReservationIdModal(true);
            }
          });
        } else {
          // console.log('Show Error To Select One');
          setShowContactInfoError('Select One of the following');
        }
      }
    } // isAdvanced=true,switched=true,ow
    else if (
      myGeneralObj.myData.isAdvanced == false &&
      myGeneralObj.myData.switched == false &&
      vehicleObj.route == 'ow'
    ) {
      // console.log('myGObj.data', myGeneralObj.myData);
      const destinationLatLng = `(${advnacedSearchVal.lat}, ${
        advnacedSearchVal.lng
      })`;
      var myStringNumbers = arrival_flight_number.replace(/\D/g, '').trim();
      var withNoDigits = arrival_flight_number.replace(/[0-9]/g, '').trim();
      var babyObj1 = null;
      var babyObj2 = null;
      var childObj1 = null;
      var childObj2 = null;
      var wheelChairObj = null;
      if (babySelectedAge) {
        // console.log('1 baby Object');
        babyObj1 = {
          type: 'baby_seat',
          val: babySelectedAge,
        };
      }
      if (babySelectedAge1) {
        babyObj2 = {
          type: 'baby_seat',
          val: babySelectedAge1,
        };
      }
      if (childSelectedAge) {
        childObj1 = {
          type: 'child_seat',
          val: childSelectedAge,
        };
      }
      if (childSelectedAge1) {
        childObj2 = {
          type: 'child_seat',
          val: childSelectedAge1,
        };
      }

      if (wheelChairVal != '') {
        wheelChairObj = {
          type: 'endicape',
          val: 'Folding',
        };
      }

      const data = {
        command: 'create_reservation',
        identifier: IDENTIFIER,
        key: GET_CREATE_RESERVATION_KEY(),

        data: {
          environment: 'test',
          general: {
            city: myGeneralObj.myData.searchField,
            ap_code: myGeneralObj.myData.ap_iata,
            destination_id: myGeneralObj.myData.Destination,
            is_advanced: '0',
            destination_point: destinationLatLng,
            destination_address: advnacedSearchFieldText,
            pax_num: paxSelected,
            remark,
          },
          passenger: {
            first_name,
            last_name,
            email,
            phone: phone_number,
          },
          vehicle: {
            vehicle_id: vehicleObj.vehicle_id,
            route: vehicleObj.route,
            price: vehicleObj.price,
            currency: vehicleObj.currency,
          },
          services: [
            {
              type: 'arriving',
              airline_iata: withNoDigits,
              flight_num: myStringNumbers,
              flight_date: arrival_date,
              flight_time: arrival_time,
              pick_time: 'null',
            },
          ],
          extra_equipment: [
            babyObj1,
            babyObj2,
            childObj1,
            childObj2,
            wheelChairObj,
          ],
        },
      };

      for (const dataKey in data) {
        if (dataKey == 'command') {
          formData.append(`command`, 'create_reservation');
        } else if (dataKey == 'identifier') {
          formData.append(`identifier`, IDENTIFIER);
        } else if (dataKey == 'key') {
          formData.append(`key`, GET_CREATE_RESERVATION_KEY());
        }
        if (dataKey === 'data') {
          // append nested object
          for (const previewKey in data[dataKey]) {
            if (previewKey == 'environment') {
              formData.append(`data[${previewKey}]`, 'test');
            }

            if (previewKey == 'general') {
              if (
                cookies.hasOwnProperty('cookie_days') &&
                localStorage.getItem('ref_id')
              ) {
                // console.log('INSIDEEEEEEEEEEEEEEE');
                formData.append(
                  'data[general][referral_id]',
                  localStorage.getItem('ref_id'),
                );
              }
              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'passenger') {
              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'vehicle') {
              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'services') {
              if (data[dataKey][previewKey].length == 1) {
                for (const ipk in data[dataKey][previewKey][0]) {
                  formData.append(
                    `data[${previewKey}][${0}][${ipk}]`,
                    data[dataKey][previewKey][0][ipk],
                  );
                }
              } else if (data[dataKey][previewKey].length > 1) {
                var i = 0;
                for (const ipk in data[dataKey][previewKey][i]) {
                  formData.append(
                    `data[${previewKey}][${i}][${ipk}]`,
                    data[dataKey][previewKey][i][ipk],
                  );
                  if (data[dataKey][previewKey][i + 1]) {
                    i++;
                  }
                }
              }
            }
            if (previewKey == 'extra_equipment') {
              if (data[dataKey][previewKey].length == 1) {
                for (const ipk in data[dataKey][previewKey][0]) {
                  formData.append(
                    `data[${previewKey}][${0}][${ipk}]`,
                    data[dataKey][previewKey][0][ipk],
                  );
                }
              } else if (data[dataKey][previewKey].length > 1) {
                var i = 0;
                for (var a = 0; a < data[dataKey][previewKey].length; a++) {
                  for (const ipk in data[dataKey][previewKey][a]) {
                    formData.append(
                      `data[${previewKey}][${a}][${ipk}]`,
                      data[dataKey][previewKey][a][ipk],
                    );
                  }
                  if (data[dataKey][previewKey][a + 1]) {
                    // console.log(
                    //   'Next Exists 1',
                    //   data[dataKey][previewKey][a + 1],
                    // );
                  }
                }
              }
            }
          }
        }
      }

      if (showPaymentArea) {
        // console.log('showPaymentArea is TrueeeeEEEEE', formData.append());
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ', ' + pair[1]);
        // }

        setLodaerIsActive(true);
        postRequest(formData, headers).then(data => {
          // console.log('Data Status:', data);
          setLodaerIsActive(false);
          if (data.status == 'ok') {
            // console.log('Data Status:', data.status);
            setReservationID(data.res_id);
            setShowReservationIdModal(true);
          }
        });
      } else if (!showPaymentArea) {
        // console.log('Not showPaymentArea');
        if (
          (contactByEmail == 1 && contactEmail) ||
          (contactByWa == 1 && contactNumber)
        ) {
          if (reqStatus == 3) {
            formData.append(`data[rejects][address]`, 1);
          } else {
            formData.append(`data[rejects][release_time]`, 1);
          }
          if (contactByEmail) {
            formData.append(`data[contact][contact_by_mail]`, 1);
            formData.append(`data[contact][email_address]`, contactEmail);
          }
          if (contactByWa) {
            formData.append(`data[contact][contact_by_wa]`, 1);
            formData.append(`data[contact][wa_number]`, contactNumber);
          }
          formData.set('command', 'create_booking_request');
          formData.set('key', GET_CREATE_BOOKING_KEY());
          setLodaerIsActive(true);
          postRequest(formData, headers).then(data => {
            setLodaerIsActive(false);
            // console.log('Data Status:', data);
            if (data.status == 'ok') {
              // console.log('Data Status:', data.status);
            }
          });
        }
      }
    } // isAdvance=false,switched=false,ow
    else if (
      myGeneralObj.myData.isAdvanced == false &&
      JSON.parse(localStorage.getItem('vehicleObj')).route == 'rt'
      // myGeneralObj.myData.switched == false &&
    ) {
      //
      const destinationLatLng = `(${advnacedSearchVal.lat}, ${
        advnacedSearchVal.lng
      })`;
      var myStringNumbers = arrival_flight_number.replace(/\D/g, '').trim();
      var withNoDigits = arrival_flight_number.replace(/[0-9]/g, '').trim();
      var myStringNumbersDeparting = departure_flight_number
        .replace(/\D/g, '')
        .trim();
      var withNoDigitsDeparting = departure_flight_number
        .replace(/[0-9]/g, '')
        .trim();
      var babyObj1 = null;
      var babyObj2 = null;
      var childObj1 = null;
      var childObj2 = null;
      var wheelChairObj = null;
      if (babySelectedAge) {
        // console.log('1 baby Object');
        babyObj1 = {
          type: 'baby_seat',
          val: babySelectedAge,
        };
      }
      if (babySelectedAge1) {
        babyObj2 = {
          type: 'baby_seat',
          val: babySelectedAge1,
        };
      }
      if (childSelectedAge) {
        childObj1 = {
          type: 'child_seat',
          val: childSelectedAge,
        };
      }
      if (childSelectedAge1) {
        childObj2 = {
          type: 'child_seat',
          val: childSelectedAge1,
        };
      }

      if (wheelChairVal != '') {
        wheelChairObj = {
          type: 'endicape',
          val: 'Folding',
        };
      }

      const data = {
        command: 'create_reservation',
        identifier: IDENTIFIER,
        key: GET_CREATE_RESERVATION_KEY(),

        data: {
          environment: 'test',
          general: {
            city: myGeneralObj.myData.searchField,
            ap_code: myGeneralObj.myData.ap_iata,
            destination_id: myGeneralObj.myData.Destination,
            is_advanced: '0',
            destination_point: destinationLatLng,
            destination_address: advnacedSearchFieldText,
            pax_num: paxSelected,
            remark,
          },
          passenger: {
            first_name,
            last_name,
            email,
            phone: phone_number,
          },
          vehicle: {
            vehicle_id: vehicleObj.vehicle_id,
            route: vehicleObj.route,
            price: vehicleObj.price,
            currency: vehicleObj.currency,
          },
          services: [
            {
              type: 'arriving',
              airline_iata: withNoDigits,
              flight_num: myStringNumbers,
              flight_date: arrival_date,
              flight_time: arrival_time,
              pick_time: 'null',
            },
            {
              type: 'departing',
              airline_iata: withNoDigitsDeparting,
              flight_num: myStringNumbersDeparting,
              flight_date: departure_date,
              flight_time: departure_time,
              pick_time: pickUpTime,
            },
          ],
          extra_equipment: [
            babyObj1,
            babyObj2,
            childObj1,
            childObj2,
            wheelChairObj,
          ],
        },
      };

      for (const dataKey in data) {
        if (dataKey == 'command') {
          formData.append(`command`, 'create_reservation');
        } else if (dataKey == 'identifier') {
          formData.append(`identifier`, IDENTIFIER);
        } else if (dataKey == 'key') {
          formData.append(`key`, GET_CREATE_RESERVATION_KEY());
        }
        if (dataKey === 'data') {
          // append nested object
          for (const previewKey in data[dataKey]) {
            if (previewKey == 'environment') {
              formData.append(`data[${previewKey}]`, 'test');
            }

            if (previewKey == 'general') {
              if (
                cookies.hasOwnProperty('cookie_days') &&
                localStorage.getItem('ref_id')
              ) {
                // console.log('INSIDE');
                formData.append(
                  'data[general][referral_id]',
                  localStorage.getItem('ref_id'),
                );
              }
              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'passenger') {
              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'vehicle') {
              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'services') {
              if (data[dataKey][previewKey].length == 1) {
                for (const ipk in data[dataKey][previewKey][0]) {
                  formData.append(
                    `data[${previewKey}][${0}][${ipk}]`,
                    data[dataKey][previewKey][0][ipk],
                  );
                }
              } else if (data[dataKey][previewKey].length > 1) {
                var i = 0;
                for (var a = 0; a < data[dataKey][previewKey].length; a++) {
                  for (const ipk in data[dataKey][previewKey][a]) {
                    formData.append(
                      `data[${previewKey}][${a}][${ipk}]`,
                      data[dataKey][previewKey][a][ipk],
                    );
                  }
                  if (data[dataKey][previewKey][a + 1]) {
                    // console.log(
                    //   'Next Exists 1',
                    //   data[dataKey][previewKey][a + 1],
                    // );
                  }
                }
              }
            }
            if (previewKey == 'extra_equipment') {
              if (data[dataKey][previewKey].length == 1) {
                for (const ipk in data[dataKey][previewKey][0]) {
                  formData.append(
                    `data[${previewKey}][${0}][${ipk}]`,
                    data[dataKey][previewKey][0][ipk],
                  );
                }
              } else if (data[dataKey][previewKey].length > 1) {
                var i = 0;
                for (var a = 0; a < data[dataKey][previewKey].length; a++) {
                  for (const ipk in data[dataKey][previewKey][a]) {
                    formData.append(
                      `data[${previewKey}][${a}][${ipk}]`,
                      data[dataKey][previewKey][a][ipk],
                    );
                  }
                  if (data[dataKey][previewKey][a + 1]) {
                  }
                }
              }
            }
          }
        }
      }

      if (showPaymentArea) {
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ', ' + pair[1]);
        // }

        setLodaerIsActive(true);
        postRequest(formData, headers).then(data => {
          // console.log('Data Status:', data);
          setLodaerIsActive(false);
          if (data.status == 'ok') {
            // console.log('Data Status:', data.status);
            setReservationID(data.res_id);
            setShowReservationIdModal(true);
          }
        });
      } else if (!showPaymentArea) {
        if (
          (contactByEmail == 1 && contactEmail) ||
          (contactByWa == 1 && contactNumber)
        ) {
          // console.log('Not showPaymentArea');
          if (reqStatus == 3) {
            formData.append(`data[rejects][address]`, 1);
          } else {
            formData.append(`data[rejects][release_time]`, 1);
          }
          if (contactByEmail) {
            formData.append(`data[contact][contact_by_mail]`, 1);
            formData.append(`data[contact][email_address]`, contactEmail);
          }
          if (contactByWa) {
            formData.append(`data[contact][contact_by_wa]`, 1);
            formData.append(`data[contact][wa_number]`, contactNumber);
          }
          formData.set('command', 'create_booking_request');
          formData.set('key', GET_CREATE_BOOKING_KEY());
          // for (var pair of formData.entries()) {
          //   console.log(pair[0] + ', ' + pair[1]);
          // }
          setLodaerIsActive(true);
          postRequest(formData, headers).then(data => {
            setLodaerIsActive(false);
            // console.log('Data Status:', data);
            if (data.status == 'ok') {
              // console.log('Data Status:', data.status);
              setShowContactInfoError('');
              setStatus3PriceError(null);
            }
          });
        } else {
          // console.log('Show Error To Select One');
          setShowContactInfoError('Select One of the following');
        }
      }
    } // if() is_advanced=0/false && switched=false&& roudTrip
    else if (
      myGeneralObj.myData.isAdvanced == true &&
      JSON.parse(localStorage.getItem('vehicleObj')).route == 'rt'
      // myGeneralObj.myData.switched == false &&
    ) {
      //
      // console.log('IsAdvanced is TRUEEEE Heree', myGeneralObj);
      var destinationLatLng = null;
      if (
        myGeneralObj.myData.Destination.lat != undefined &&
        myGeneralObj.myData.Destination.lng != undefined
      ) {
        destinationLatLng = `(${myGeneralObj.myData.Destination.lat}, ${
          myGeneralObj.myData.Destination.lng
        })`;
      } else if (advnacedSearchVal) {
        destinationLatLng = `(${advnacedSearchVal.lat}, ${
          advnacedSearchVal.lng
        })`;
      }

      let myAdvnacedSearchFieldText = advnacedSearchFieldText;
      if (myAdvnacedSearchFieldText == null) {
        myAdvnacedSearchFieldText = myGeneralObj.myData.destination_address;
      }
      var myStringNumbers = arrival_flight_number.replace(/\D/g, '').trim();
      var withNoDigits = arrival_flight_number.replace(/[0-9]/g, '').trim();
      var myStringNumbersDeparting = departure_flight_number
        .replace(/\D/g, '')
        .trim();
      var withNoDigitsDeparting = departure_flight_number
        .replace(/[0-9]/g, '')
        .trim();
      var babyObj1 = null;
      var babyObj2 = null;
      var childObj1 = null;
      var childObj2 = null;
      var wheelChairObj = null;
      if (babySelectedAge) {
        // console.log('1 baby Object');
        babyObj1 = {
          type: 'baby_seat',
          val: babySelectedAge,
        };
      }
      if (babySelectedAge1) {
        babyObj2 = {
          type: 'baby_seat',
          val: babySelectedAge1,
        };
      }
      if (childSelectedAge) {
        childObj1 = {
          type: 'child_seat',
          val: childSelectedAge,
        };
      }
      if (childSelectedAge1) {
        childObj2 = {
          type: 'child_seat',
          val: childSelectedAge1,
        };
      }

      if (wheelChairVal != '') {
        wheelChairObj = {
          type: 'endicape',
          val: 'Folding',
        };
      }

      const data = {
        command: 'create_reservation',
        identifier: IDENTIFIER,
        key: GET_CREATE_RESERVATION_KEY(),

        data: {
          environment: 'test',
          general: {
            city: myGeneralObj.myData.searchField,
            ap_code: myGeneralObj.myData.ap_iata,
            // destination_id: myGeneralObj.myData.Destination,
            is_advanced: '1',
            destination_point: destinationLatLng,
            destination_address: myAdvnacedSearchFieldText,
            pax_num: paxSelected,
            remark,
          },
          passenger: {
            first_name,
            last_name,
            email,
            phone: phone_number,
          },
          vehicle: {
            vehicle_id: vehicleObj.vehicle_id,
            route: vehicleObj.route,
            price: vehicleObj.price,
            currency: vehicleObj.currency,
          },
          services: [
            {
              type: 'arriving',
              airline_iata: withNoDigits,
              flight_num: myStringNumbers,
              flight_date: arrival_date,
              flight_time: arrival_time,
              pick_time: 'null',
            },
            {
              type: 'departing',
              airline_iata: withNoDigitsDeparting,
              flight_num: myStringNumbersDeparting,
              flight_date: departure_date,
              flight_time: departure_time,
              pick_time: pickUpTime,
            },
          ],
          extra_equipment: [
            babyObj1,
            babyObj2,
            childObj1,
            childObj2,
            wheelChairObj,
          ],
        },
      };

      for (const dataKey in data) {
        if (dataKey == 'command') {
          formData.append(`command`, 'create_reservation');
        } else if (dataKey == 'identifier') {
          formData.append(`identifier`, IDENTIFIER);
        } else if (dataKey == 'key') {
          formData.append(`key`, GET_CREATE_RESERVATION_KEY());
        }
        if (dataKey === 'data') {
          // append nested object
          for (const previewKey in data[dataKey]) {
            if (previewKey == 'environment') {
              formData.append(`data[${previewKey}]`, 'test');
            }

            if (previewKey == 'general') {
              if (
                cookies.hasOwnProperty('cookie_days') &&
                localStorage.getItem('ref_id')
              ) {
                formData.append(
                  'data[general][referral_id]',
                  localStorage.getItem('ref_id'),
                );
              }
              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'passenger') {
              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'vehicle') {
              for (const ipk in data[dataKey][previewKey]) {
                formData.append(
                  `data[${previewKey}][${ipk}]`,
                  data[dataKey][previewKey][ipk],
                );
              }
            }
            if (previewKey == 'services') {
              if (data[dataKey][previewKey].length == 1) {
                for (const ipk in data[dataKey][previewKey][0]) {
                  formData.append(
                    `data[${previewKey}][${0}][${ipk}]`,
                    data[dataKey][previewKey][0][ipk],
                  );
                }
              } else if (data[dataKey][previewKey].length > 1) {
                var i = 0;
                for (var a = 0; a < data[dataKey][previewKey].length; a++) {
                  for (const ipk in data[dataKey][previewKey][a]) {
                    formData.append(
                      `data[${previewKey}][${a}][${ipk}]`,
                      data[dataKey][previewKey][a][ipk],
                    );
                  }
                  if (data[dataKey][previewKey][a + 1]) {
                  }
                }
              }
            }
            if (previewKey == 'extra_equipment') {
              if (data[dataKey][previewKey].length == 1) {
                for (const ipk in data[dataKey][previewKey][0]) {
                  formData.append(
                    `data[${previewKey}][${0}][${ipk}]`,
                    data[dataKey][previewKey][0][ipk],
                  );
                }
              } else if (data[dataKey][previewKey].length > 1) {
                var i = 0;
                for (var a = 0; a < data[dataKey][previewKey].length; a++) {
                  for (const ipk in data[dataKey][previewKey][a]) {
                    formData.append(
                      `data[${previewKey}][${a}][${ipk}]`,
                      data[dataKey][previewKey][a][ipk],
                    );
                  }
                  if (data[dataKey][previewKey][a + 1]) {
                  }
                }
              }
            }
          }
        }
      }

      if (showPaymentArea) {
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ', ' + pair[1]);
        // }
        // console.log('Showing Payment Area');
        setLodaerIsActive(true);
        postRequest(formData, headers).then(data => {
          setLodaerIsActive(false);
          // console.log('Data Status:', data);
          if (data.status == 'ok') {
            // console.log('Data Status:', data.status);
            setReservationID(data.res_id);
            setShowReservationIdModal(true);
          }
        });
      } else if (!showPaymentArea) {
        if (
          (contactByEmail == 1 && contactEmail) ||
          (contactByWa == 1 && contactNumber)
        ) {
          // console.log('Not showPaymentArea');
          if (reqStatus == 3) {
            formData.append(`data[rejects][address]`, 1);
          } else {
            formData.append(`data[rejects][release_time]`, 1);
          }
          if (contactByEmail) {
            formData.append(`data[contact][contact_by_mail]`, 1);
            formData.append(`data[contact][email_address]`, contactEmail);
          }
          if (contactByWa) {
            formData.append(`data[contact][contact_by_wa]`, 1);
            formData.append(`data[contact][wa_number]`, contactNumber);
          }
          formData.set('command', 'create_booking_request');
          formData.set('key', GET_CREATE_BOOKING_KEY());
          // for (var pair of formData.entries()) {
          //   console.log(pair[0] + ', ' + pair[1]);
          // }
          setLodaerIsActive(true);
          postRequest(formData, headers).then(data => {
            // console.log('Data Status:', data);
            setLodaerIsActive(false);
            if (data.status == 'ok') {
              // console.log('Data Status:', data.status);
              setShowContactInfoError('');
              setStatus3PriceError(null);
            }
          });
        } else {
          // console.log('Show Error To Select One');
          setShowContactInfoError('Select One of the following');
        }
      }
    }
  }

  function handleContactCheck(e) {
    if (e.currentTarget.name == 'checkboxG1') {
      setContactByEmail(1);
      // console.log('checkboxG1', e.currentTarget.value);
    } else if (e.currentTarget.name == 'checkboxG2') {
      setContactByWa(1);
    }
  }
  function handleInputValue(e) {
    if (e.currentTarget.name == 'contact_email') {
      setContactEmail(e.currentTarget.value);
    } else if (e.currentTarget.name == 'wa_number') {
      setContactNumber(e.currentTarget.value);
    }
  }

  return (
    <div>
      <LoadingOverlay active={isActive} spinner={<HashLoader />}>
        <Header props={props} />

        <div>
          <section className="banner innerbanner booking" />
          <section className="bookingcontent">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="bookingwrap">
                    <p className="text-center blue text-decoration-underline backsearch">
                      <img src={leftangleImg} alt /> Back to search options
                    </p>
                    <Formik
                      initialValues={{
                        // ordernumber: '',
                        first_name,
                        last_name,
                        phone_number,
                        email,
                        arrival_date,
                        arrival_flight_number,
                        arrival_time,
                        departure_date,
                        departure_flight_number,
                        departure_time,
                        destination,
                        remark,
                        type,
                        // card_holder_name: '',
                        // card_number: '',
                        // exp_date: '',
                        // cvv: '',
                      }}
                      validationSchema={bookingSchema}
                      onSubmit={values => {
                        // console.log('Moeed Booking Values:', values);
                        submitRequest();
                      }}
                      // validator={() => ({})}
                    >
                      {({ errors, touched, setFieldValue }) => (
                        <Form className="bookingform">
                          <h2>
                            Lead Passenger Details{' '}
                            <span
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Tooltip on top"
                            >
                              <img src={infoImg} />
                            </span>
                          </h2>
                          <hr />
                          <div className="form-row ">
                            <div className="form-group col-md-6 mw-470">
                              <label>Passenger first name</label>
                              <Field
                                type="text"
                                name="first_name"
                                className="form-control"
                                id="fname"
                                value={first_name}
                                onChange={e => {
                                  // call the built-in handleChange for formik
                                  handleChange(e);
                                  const someValue = e.currentTarget.value;
                                  setFieldValue('first_name', someValue);
                                }}
                              />

                              {errors.first_name && touched.first_name ? (
                                <div className="errorMsg">
                                  {errors.first_name}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-6 mw-470">
                              <label>Passenger last name</label>
                              <Field
                                type="text"
                                name="last_name"
                                className="form-control"
                                id="lname"
                                value={last_name}
                                onChange={e => {
                                  // call the built-in handleChange for formik
                                  handleChange(e);
                                  const someValue = e.currentTarget.value;
                                  setFieldValue('last_name', someValue);
                                }}
                              />

                              {errors.last_name && touched.last_name ? (
                                <div className="errorMsg">
                                  {errors.last_name}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-6 mw-470">
                              <label>Mobile phone</label>
                              <Field
                                type="tel"
                                name="phone_number"
                                className="form-control"
                                id="phone"
                                value={phone_number}
                                onChange={e => {
                                  // call the built-in handleChange for formik
                                  handleChange(e);
                                  const someValue = e.currentTarget.value;
                                  setFieldValue('phone_number', someValue);
                                }}
                              />

                              {errors.phone_number && touched.phone_number ? (
                                <div className="errorMsg">
                                  {errors.phone_number}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-6 mw-470">
                              <label>Email</label>
                              <Field
                                type="email"
                                name="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={e => {
                                  // call the built-in handleChange for formik
                                  handleChange(e);
                                  const someValue = e.currentTarget.value;
                                  setFieldValue('email', someValue);
                                }}
                              />
                              {errors.email && touched.email ? (
                                <div className="errorMsg">{errors.email}</div>
                              ) : null}
                            </div>
                          </div>
                          {showArrivalAndDeparture ? (
                            <div>
                              <h2>Arrival Flight Details</h2>
                              <hr />
                              <div className="form-row">
                                <div className="form-group col-md-4 mw-300">
                                  <label>Arrival date</label>
                                  <Field
                                    type="date"
                                    className="form-control"
                                    id="arrivaldate"
                                    value={arrival_date}
                                    name="arrival_date"
                                    onChange={e => {
                                      // call the built-in handleChange for formik
                                      handleFlightInputsChange(e);
                                      const someValue = e.currentTarget.value;
                                      setFieldValue('arrival_date', someValue);
                                      if (arrival_flight_number) {
                                        setArrival_flight_number('');
                                        setFieldValue(
                                          'arrival_flight_number',
                                          '',
                                        );
                                      }
                                    }}
                                  />
                                  {errors.arrival_date &&
                                  touched.arrival_date ? (
                                    <div className="errorMsg">
                                      {errors.arrival_date}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="form-group col-md-4 mw-360">
                                  <label>Flight number</label>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    id="fnumber"
                                    name="arrival_flight_number"
                                    onKeyUp={e => handleKeyUp(e, setFieldValue)}
                                  />
                                  {(errors.arrival_flight_number &&
                                    touched.arrival_flight_number) ||
                                  showThis ? (
                                    <div className="errorMsg">
                                      {errors.arrival_flight_number
                                        ? errors.arrival_flight_number
                                        : 'Invalid flight number'}
                                    </div>
                                  ) : null}
                                </div>

                                {!arrival_flight_Airport_Match_Error ? (
                                  <div className="form-group col-md-4 mw-200">
                                    <label>
                                      Arrival time{' '}
                                      <span>
                                        <img src={infoImg} />
                                      </span>
                                    </label>
                                    <Field
                                      type="time"
                                      className="form-control"
                                      id="arrivaltime"
                                      name="arrival_time"
                                      at_value={arrival_time}
                                      component={RCTimePicker}
                                    />

                                    {errors.arrival_time &&
                                    touched.arrival_time ? (
                                      <div className="errorMsg">
                                        {errors.arrival_time}
                                      </div>
                                    ) : null}
                                  </div>
                                ) : null}

                                {arrival_flight_Airport_Match_Error &&
                                arrival_flight_Airport_Match_Error ? (
                                  <div className="errorMsg">
                                    {arrival_flight_Airport_Match_Error}
                                  </div>
                                ) : null}
                              </div>

                              <h2>Departure Flight Details</h2>
                              <hr />
                              <div className="form-row">
                                <div className="form-group col-md-4 mw-300">
                                  <label>Departure date</label>
                                  <Field
                                    type="date"
                                    className="form-control"
                                    id="departuredate"
                                    name="departure_date"
                                    onChange={e => {
                                      // call the built-in handleChange for formik
                                      handleFlightInputsChange(e);
                                      const someValue = e.currentTarget.value;
                                      setFieldValue(
                                        'departure_date',
                                        someValue,
                                      );
                                      if (departure_flight_number) {
                                        setDeparture_flight_number('');
                                        setFieldValue(
                                          'departure_flight_number',
                                          '',
                                        );
                                      }
                                    }}
                                  />
                                  {errors.departure_date &&
                                  touched.departure_date ? (
                                    <div className="errorMsg">
                                      {errors.departure_date}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="form-group col-md-4 mw-360">
                                  <label>Flight number</label>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    id="fnumber"
                                    name="departure_flight_number"
                                    // onBlur={e => handleChange(e, setFieldValue)}
                                    onBlur={e => handleKeyUp1(e, setFieldValue)}
                                  />
                                  {(errors.departure_flight_number &&
                                    touched.departure_flight_number) ||
                                  showThis2 ? (
                                    <div className="errorMsg">
                                      {errors.departure_flight_number
                                        ? errors.departure_flight_number
                                        : 'Invalid flight number'}
                                    </div>
                                  ) : null}
                                </div>
                                {!departure_flight_Airport_Match_Error ? (
                                  <div className="form-group col-md-4 mw-200">
                                    <label>
                                      Departure time{' '}
                                      <span>
                                        <img src={infoImg} />
                                      </span>
                                    </label>

                                    <Field
                                      className="form-control"
                                      id="arrivaltime"
                                      name="departure_time"
                                      at_value={departure_time}
                                      component={RCTimePicker}
                                    />
                                    {errors.departure_time &&
                                    touched.departure_time ? (
                                      <div className="errorMsg">
                                        {errors.departure_time}
                                      </div>
                                    ) : null}
                                  </div>
                                ) : null}

                                {departure_flight_Airport_Match_Error &&
                                departure_flight_Airport_Match_Error ? (
                                  <div className="errorMsg">
                                    {departure_flight_Airport_Match_Error}
                                  </div>
                                ) : null}
                              </div>

                              {JSON.parse(localStorage.getItem('vehicleObj'))
                                .seconds_before_pick != 'null' &&
                              !departure_flight_Airport_Match_Error ? (
                                <div>
                                  <label>
                                    {/* {
                                    JSON.parse(
                                      localStorage.getItem('vehicleObj'),
                                    ).seconds_before_pick
                                  } */}
                                    Pickup Time{' '}
                                    <span>
                                      <img src={infoImg} />
                                    </span>
                                  </label>
                                  {/* {moment(departure_time, 'hh:mm')} */}

                                  <Field
                                    className="form-control"
                                    id="arrivaltime2"
                                    name="seconds_before_pick"
                                    at_value={seconds_before_pick}
                                    onChange={handleTimeChange}
                                    component={RCTimePicker}
                                  />
                                </div>
                              ) : null}
                            </div>
                          ) : null}

                          {showJustDeparture && !showArrivalAndDeparture ? (
                            <div>
                              <h2>Departure Flight Details</h2>
                              <hr />
                              <div className="form-row">
                                <div className="form-group col-md-4 mw-300">
                                  <label>Departure date</label>
                                  <Field
                                    type="date"
                                    className="form-control"
                                    id="departuredate"
                                    name="departure_date"
                                    value={departure_date}
                                    onChange={e => {
                                      // call the built-in handleChange for formik
                                      handleFlightInputsChange(e);
                                      const someValue = e.currentTarget.value;
                                      setFieldValue(
                                        'departure_date',
                                        someValue,
                                      );
                                      if (departure_flight_number) {
                                        setDeparture_flight_number('');
                                        setFieldValue(
                                          'departure_flight_number',
                                          '',
                                        );
                                      }
                                    }}
                                  />
                                  {errors.departure_date &&
                                  touched.departure_date ? (
                                    <div className="errorMsg">
                                      {errors.departure_date}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="form-group col-md-4 mw-360">
                                  <label>Flight number</label>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    id="fnumber"
                                    name="departure_flight_number"
                                    // onBlur={e => handleChange(e, setFieldValue)}
                                    onBlur={e => handleKeyUp1(e, setFieldValue)}
                                  />
                                  {(errors.departure_flight_number &&
                                    touched.departure_flight_number) ||
                                  showThis2 ? (
                                    <div className="errorMsg">
                                      {errors.departure_flight_number
                                        ? errors.departure_flight_number
                                        : 'Invalid flight number'}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="form-group col-md-4 mw-200">
                                  {!flight_Airport_Match_Error ? (
                                    <div>
                                      <label>
                                        Departure time{' '}
                                        <span>
                                          <img src={infoImg} />
                                        </span>
                                      </label>

                                      <Field
                                        className="form-control"
                                        id="arrivaltime1"
                                        name="departure_time"
                                        at_value={departure_time}
                                        component={RCTimePicker}
                                        onSetDepartureTime={value =>
                                          setDeparture_Time(value)
                                        }
                                      />
                                    </div>
                                  ) : null}

                                  {errors.departure_time &&
                                  touched.departure_time ? (
                                    <div className="errorMsg">
                                      {errors.departure_time}
                                    </div>
                                  ) : null}

                                  {departure_flight_Airport_Match_Error &&
                                  departure_flight_Airport_Match_Error ? (
                                    <div className="errorMsg">
                                      {departure_flight_Airport_Match_Error}
                                    </div>
                                  ) : null}
                                </div>

                                {JSON.parse(localStorage.getItem('vehicleObj'))
                                  .seconds_before_pick != 'null' &&
                                !flight_Airport_Match_Error ? (
                                  <div>
                                    <label>
                                      Pickup Time{' '}
                                      <span>
                                        <img src={infoImg} />
                                      </span>
                                    </label>
                                    {/* {moment(departure_time, 'hh:mm')} */}

                                    <Field
                                      className="form-control"
                                      id="arrivaltime2"
                                      name="seconds_before_pick"
                                      at_value={seconds_before_pick}
                                      onChange={handleTimeChange}
                                      component={RCTimePicker}
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ) : null}

                          {/* ///Just Arrival Time/// */}
                          {showJustArrival &&
                          !showJustDeparture &&
                          !showArrivalAndDeparture ? (
                            <div>
                              <h2>Arrival Flight Details</h2>
                              <hr />
                              <div className="form-row">
                                <div className="form-group col-md-4 mw-300">
                                  <label>Arrival date</label>
                                  <Field
                                    type="date"
                                    className="form-control"
                                    id="arrivaldate"
                                    name="arrival_date"
                                    value={arrival_date}
                                    onChange={e => {
                                      // call the built-in handleChange for formik
                                      handleFlightInputsChange(e);
                                      const someValue = e.currentTarget.value;
                                      setFieldValue('arrival_date', someValue);
                                      if (arrival_flight_number) {
                                        setArrival_flight_number('');
                                        setFieldValue(
                                          'arrival_flight_number',
                                          '',
                                        );
                                      }
                                    }}
                                  />
                                  {errors.arrival_date &&
                                  touched.arrival_date ? (
                                    <div className="errorMsg">
                                      {errors.arrival_date}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="form-group col-md-4 mw-360">
                                  <label>Flight number</label>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    id="fnumber"
                                    name="arrival_flight_number"
                                    onBlur={e => handleKeyUp(e, setFieldValue)}
                                  />
                                  {(errors.arrival_flight_number &&
                                    touched.arrival_flight_number) ||
                                  showThis ? (
                                    <div className="errorMsg">
                                      {errors.arrival_flight_number
                                        ? errors.arrival_flight_number
                                        : 'Invalid flight number'}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="form-group col-md-4 mw-200">
                                  {!flight_Airport_Match_Error ? (
                                    <div>
                                      <label>
                                        Arrival time{' '}
                                        <span>
                                          <img src={infoImg} />
                                        </span>
                                      </label>

                                      <Field
                                        type="time"
                                        className="form-control"
                                        id="arrivaltime"
                                        name="arrival_time"
                                        at_value={arrival_time}
                                        onSetArrivalTime={value =>
                                          setArrival_Time(value)
                                        }
                                        component={RCTimePicker}
                                      />
                                    </div>
                                  ) : null}

                                  {errors.arrival_time &&
                                  touched.arrival_time ? (
                                    <div className="errorMsg">
                                      {errors.arrival_time}
                                    </div>
                                  ) : null}

                                  {arrival_flight_Airport_Match_Error &&
                                  arrival_flight_Airport_Match_Error ? (
                                    <div className="errorMsg">
                                      {arrival_flight_Airport_Match_Error}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          ) : null}

                          <h2>Transfer Details </h2>
                          <hr />
                          <div className="form-row">
                            {JSON.parse(localStorage.getItem('myGeneralObj'))
                              .myData.isAdvanced == false ? (
                              <div className="form-group col-md-12">
                                <label>Address / Hotel</label>
                                <Field
                                  name="destination"
                                  className="form-control"
                                  id="address"
                                  onSetAbc={value =>
                                    setAdvnacedSearchVal(value)
                                  }
                                  onSetFeildText={value =>
                                    setAdvnacedSearchFieldText(value)
                                  }
                                  component={LocationSearchInput}
                                />
                                {errors.destination && touched.destination ? (
                                  <div className="errorMsg">
                                    {errors.destination}
                                  </div>
                                ) : null}

                                {noMatchingVehicleError ? (
                                  <div className="errorMsg">
                                    {noMatchingVehicleError}
                                  </div>
                                ) : null}
                              </div>
                            ) : (
                              <div className="form-group col-md-12">
                                <label>Address / Hotel</label>
                                <Field
                                  name="address_search"
                                  className="form-control"
                                  id="address"
                                  onSetAbc={value =>
                                    setAdvnacedSearchVal(value)
                                  }
                                  onSetFeildText={value =>
                                    setAdvnacedSearchFieldText(value)
                                  }
                                  myProp={
                                    JSON.parse(
                                      localStorage.getItem('myGeneralObj'),
                                    ).myData
                                  }
                                  component={LocationSearchInput}
                                />
                              </div>
                            )}
                            {/* <div className="form-group col-sm-12">
                            <a
                              href="#"
                              className="blue text-decoration-underline ml-15"
                            >
                              Advanced location search
                            </a>
                          </div> */}

                            <div className="form-group col-md-12">
                              <div className="selectwrap">
                                <label className="mb-0">
                                  Passengers numbers
                                </label>
                                <select
                                  className="form-control form-control-sm"
                                  onChange={e => passengersValChange(e)}
                                  value={paxSelected}
                                >
                                  {passengers
                                    .slice(
                                      0,
                                      JSON.parse(
                                        localStorage.getItem('vehicleObj'),
                                      ).max_pax,
                                    )
                                    .map(item => (
                                      <option key={item.id} value={item.val}>
                                        {item.val}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            </div>
                            <div className="form-group">
                              {/* <button
                              type="button"
                              className="btn btnstyle4 backbtn ml-15"
                              name="button"
                            >
                              <img src={btnarrowImg} alt /> Back to options
                            </button> */}
                            </div>
                          </div>
                          <h2>
                            Special Equipment{' '}
                            <span>
                              <img src={infoImg} />
                            </span>
                          </h2>
                          <hr />
                          <div className="form-row">
                            <div className="form-group col-lg-4 col-md-6">
                              <label>Request for:</label>
                              <div className="wrapfields">
                                <div className="selectwrap">
                                  <label className="mb-0 ml-0">Baby seat</label>
                                  <label className="mb-0 ml-0">Quantity</label>
                                  <select
                                    onChange={event =>
                                      selectBabyOptions(event.target.value)
                                    }
                                    className="form-control form-control-sm"
                                    defaultValue=""
                                  >
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                  </select>
                                </div>

                                {showBabyAges && showBabyAges.length > 0
                                  ? showBabyAges.map((item, key) => (
                                      <div className="selectwrap subfield">
                                        <label className="mb-0 ml-0 mr-5">
                                          Baby {item.title} Age
                                        </label>
                                        <select
                                          onChange={
                                            babyObjects == 1
                                              ? handleBabyAgeSelect
                                              : handleBabyAge2Select
                                          }
                                          className="form-control form-control-sm"
                                        >
                                          {/* <option>{item.age}</option> */}
                                          {item.value.map(age => (
                                            <option value={age}>{age}</option>
                                          ))}
                                        </select>
                                      </div>
                                    ))
                                  : null}
                                {/* <div className="selectwrap subfield border-top-0">
                                <label className="mb-0 ml-0 mr-5">Age 2</label>
                                <select className="form-control form-control-sm">
                                  <option>8 months</option>
                                  <option>2</option>
                                </select>
                              </div> */}
                              </div>
                            </div>
                            <div className="form-group  col-lg-4 col-md-6">
                              <label>Request for:</label>
                              <div className="wrapfields">
                                <div className="selectwrap">
                                  <label className="mb-0 ml-0">
                                    Child seat
                                  </label>
                                  <label className="mb-0 ml-0">Quantity</label>
                                  <select
                                    onChange={event =>
                                      selectChildOptions(event.target.value)
                                    }
                                    className="form-control form-control-sm"
                                    defaultValue=""
                                  >
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                  </select>
                                </div>

                                {showChildAges && showChildAges.length > 0
                                  ? showChildAges.map(item => (
                                      <div className="selectwrap subfield">
                                        <label className="mb-0 ml-0 mr-5">
                                          Child {item.title} Age
                                        </label>
                                        <select
                                          onChange={
                                            childObjects == 1
                                              ? handleChildAgeSelect
                                              : handleChildAge2Select
                                          }
                                          className="form-control form-control-sm"
                                        >
                                          {item.value.map(age => (
                                            <option value={age}>{age}</option>
                                          ))}
                                          {/* <option>{item.value}</option> */}
                                        </select>
                                      </div>
                                    ))
                                  : null}
                              </div>
                            </div>
                            <div className="form-group  col-lg-4 col-md-6">
                              <label>Request for:</label>
                              <div className="wrapfields">
                                <div className="selectwrap">
                                  <label className="mb-0 ml-0 mr-5">
                                    <span>
                                      <img src={infoImg} />
                                    </span>{' '}
                                    Folding wheelchair
                                  </label>
                                  <select
                                    onChange={onWheelChairSelect}
                                    className="form-control form-control-sm"
                                    value={wheelChairVal}
                                  >
                                    {/* <option value="">Select</option> */}
                                    <option value="folding">Yes</option>
                                    <option value="">No</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h2>Remark</h2>
                          <hr />
                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <Field
                                // onChange={remarkEntered}
                                onChange={e => {
                                  // call the built-in handleChange for formik
                                  remarkEntered(e);
                                  const someValue = e.currentTarget.value;
                                  setFieldValue('remark', someValue);
                                }}
                                type="text"
                                className="form-control"
                                name="remark"
                              />
                              {errors.remark && touched.remark ? (
                                <div className="errorMsg">{errors.remark}</div>
                              ) : null}
                            </div>
                          </div>
                          {showPaymentArea ? (
                            <div>
                              <h2>Payment</h2>
                              <hr />
                              <div className="if_not_calc_display_none ">
                                <div className="form-row">
                                  <div className="form-group col-md-12">
                                    <label>Card holder name</label>
                                    <Field
                                      type="text"
                                      name="card_holder_name"
                                      className="form-control"
                                    />

                                    {errors.card_holder_name &&
                                    touched.card_holder_name ? (
                                      <div className="errorMsg">
                                        {errors.card_holder_name}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label>Card Number</label>
                                    <div className="isvalid">
                                      <Field
                                        type="text"
                                        className="form-control"
                                        id="cardnumber"
                                        name="card_number"
                                      />
                                      {errors.card_number &&
                                      touched.card_number ? (
                                        <div className="errorMsg">
                                          {errors.card_number}
                                        </div>
                                      ) : (
                                        <img src={tickImg} alt />
                                      )}
                                    </div>
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label>Expiration Date</label>
                                    <Field
                                      type="date"
                                      // min={new Date()}
                                      max="2050-02-20"
                                      className="form-control"
                                      id="prev_dates"
                                      name="exp_date"
                                    />

                                    {errors.exp_date && touched.exp_date ? (
                                      <div className="errorMsg">
                                        {errors.exp_date}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label>CVV</label>
                                    <Field
                                      type="text"
                                      name="cvv"
                                      className="form-control"
                                    />

                                    {errors.cvv && touched.cvv ? (
                                      <div className="errorMsg">
                                        {errors.cvv}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="form-group col-md-12">
                                    <p>
                                      Amount:{' '}
                                      <b className="black">00.00 USD </b>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}
                          <div className="form-row">
                            {!showPaymentArea ? (
                              <div className="form-group col-md-12">
                                <div className="bookingnotvalid">
                                  {status3PriceError == 3 ? (
                                    <p className="invalid">
                                      The price is not valid for your selected
                                      address. Send Cityride a price request.
                                    </p>
                                  ) : (
                                    <p className="invalid">
                                      Booking cannot be instantly confirmed for
                                      these dates. Send Cityride a booking
                                      request.
                                    </p>
                                  )}
                                  <label className="ml-0">
                                    I would like to be contact by:
                                  </label>
                                  {showContactInfoError ? (
                                    <p>{showContactInfoError}</p>
                                  ) : null}
                                  <div className="mycheck border-top-0 pt-0">
                                    <div className="checks">
                                      <input
                                        type="checkbox"
                                        // checked={contactByEmail}
                                        // value={values.flag}
                                        id="checkboxG1"
                                        name="checkboxG1"
                                        className="css-checkbox"
                                        onChange={handleContactCheck}
                                      />
                                      <label
                                        htmlFor="checkboxG1"
                                        className="css-label ml-0"
                                      >
                                        Email to{' '}
                                      </label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="contact_email"
                                        onChange={handleInputValue}
                                      />
                                    </div>
                                    <div className="checks">
                                      <input
                                        type="checkbox"
                                        name="checkboxG2"
                                        id="checkboxG2"
                                        className="css-checkbox"
                                        onChange={handleContactCheck}
                                      />
                                      <label
                                        htmlFor="checkboxG2"
                                        className="css-label"
                                      >
                                        WhatsApp to{' '}
                                      </label>
                                      <input
                                        type="tel"
                                        className="form-control"
                                        id="whatsapp"
                                        name="wa_number"
                                        onChange={handleInputValue}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                            <div className="form-group col-md-12">
                              {/* <div className="mycheck">
                                <input
                                  type="checkbox"
                                  name="checkboxG3"
                                  id="checkboxG3"
                                  className="css-checkbox"
                                />
                                <label
                                  htmlFor="checkboxG3"
                                  className="css-label blue text-decoration-underline ml-0"
                                >
                                  Confirm terms and conditions
                                </label>
                                <input
                                  type="checkbox"
                                  name="checkboxG4"
                                  id="checkboxG4"
                                  className="css-checkbox"
                                />
                                <label
                                  htmlFor="checkboxG4"
                                  className="css-label"
                                >
                                  I wish to receive promotional content
                                </label>
                              </div> */}
                            </div>
                          </div>
                          {showDepartureTimeError ? (
                            <div className="form-group text-center">
                              <div className="errorMsg">
                                {showDepartureTimeError}
                              </div>
                            </div>
                          ) : null}

                          <div className="form-group text-center">
                            <button
                              type="submit"
                              // disabled={!_.isEmpty(errors)}
                              // onClick={submitRequest}
                              className="btn btnstyle4"
                            >
                              Continue
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Footer />

        {showReservationIdModal ? (
          <Modal
            isOpen={showReservationIdModal}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Reservation"
            shouldCloseOnOverlayClick
          >
            <div className="reservation">
              <h2>Thank you for booking</h2>
              <p>
                Your booking is confirmed with us. Please keep your below
                <br /> reservation number to check details in future.
              </p>
              <h3 ref={_subtitle => (subtitle = _subtitle)}>
                Reservation ID: {res_ID}
              </h3>
            </div>

            {/* <h4></h4> */}
          </Modal>
        ) : null}

        {modalIsOpen ? (
          <div className="selectcar">
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles2}
              contentLabel="Vehicles"
              shouldCloseOnOverlayClick={false}
            >
              <h2
                ref={_subtitle => (subtitle = _subtitle)}
                className="text-center"
              >
                Select Vehicle
              </h2>
              <p className="text-center selectcarpara">
                Due to change in address you need to select vehicle again.
              </p>
              <div className="row selectcarslider">
                <div className="col-md-12">
                  {differentVehicles && differentVehicles.length > 0 ? (
                    <div className="owl-carousel owl-theme carslider">
                      {/* {'aaaaaaaaaaaaaaaaaaaaaaaaaa'} */}
                      {differentVehicles && differentVehicles.length > 0
                        ? differentVehicles.map(item => (
                            <div className="item">
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
                                    <span className="blue">
                                      {item.cxl_days}
                                    </span>
                                  </p>
                                </div>
                                <div>
                                  {/* <div className="selecttrip">
                                  
                                  <label className="radiowrap">
                                    Round Trip{' '}
                                    <span className="blue">
                                      {item.rt_price}
                                      {item.currency == 'EUR' ? '€' : '$'}
                                    </span>
                                    <input
                                      type="radio"
                                      value={item.rt_price}
                                      defaultValue={item.rt_price}
                                      checked={roundTrip == item.rt_price}
                                      onChange={e =>
                                        onRoundTripChecked(
                                          item.rt_price,
                                          item.vehicle_id,
                                          item.currency,
                                          item.seconds_before_pick,
                                          item.max_pax,
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
                                      checked={oneWayTrip === item.ow_price}
                                      value={item.ow_price}
                                      onChange={e =>
                                        onOneWayChecked(
                                          item.ow_price,
                                          item.vehicle_id,
                                          item.currency,
                                          item.seconds_before_pick,
                                          item.max_pax,
                                        )
                                      }
                                      name="radio"
                                    />
                                    <span className="checkmark" />
                                  </label>
                                </div> */}
                                  <div className="booknow">
                                    <button
                                      type="button"
                                      name="button"
                                      className="btn btnstyle4 btn-block "
                                      onClick={() => saveNewVehicle(item)}
                                    >
                                      Book Now
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  ) : (
                    'null'
                  )}
                </div>
              </div>
            </Modal>
          </div>
        ) : null}
      </LoadingOverlay>
    </div>
  );
};

Booking.propTypes = {};

export default Booking;
