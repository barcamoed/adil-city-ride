/**
 *
 * AvailableCars
 *
 */

import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import car1Img from '../../assets/images/car1.png';
import car2Img from '../../assets/images/car2.png';
import car3Img from '../../assets/images/car3.png';
import { IDENTIFIER, GETVEHICLESKEY } from '../../utils/constants';
import { postRequest } from '../../utils/requests';
import request from '../../utils/apiWrappers';
import { FormattedMessage } from 'react-intl';
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
};
function AvailableCars(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [ap_iata, setAp_iata] = useState(null);
  var [myObj, setMyObj] = useState({});

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    console.log('Data coming inside props from HomeFilters:', props);
    var i = 0;
    const airports = JSON.parse(localStorage.getItem('CityAirports'));
    console.log('airports:', airports);
    for (i = 0; i < airports.length; i++) {
      if (airports[i].ap_name == props.myData.From) {
        setAp_iata(airports[i].ap_iata);
      }
    }

    var myData1 = props.myData;
    myData1.ap_iata = ap_iata;
    setMyObj(myData1);
    console.log('myyobj', myObj);
    if (myObj.isAdvanced == false && myObj.switched == false) {
      const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Headers': '*',
      };
      const params = new URLSearchParams();

      const abc = {
        command: 'get_vehicles',
        identifier: IDENTIFIER,
        key: GETVEHICLESKEY(),
        data: {
          ap_code: 'FCO',
          destination_id: '0',
          is_advanced: '1',
          destination_point: '(41.9017996, 12.485742)',
          pax_num: '2',
        },
      };

      params.append('command', 'get_vehicles');
      params.append('identifier', IDENTIFIER);
      params.append('key', GETVEHICLESKEY());
      var dataToSend = {
        ap_code: myObj.ap_iata,
        destination_id: myObj.Destination,
        is_advanced: '0',
        pax_num: myObj.pax_num,
      };

      params.append('data', dataToSend);
      // console.log('Data To Send:', dataToSend);

      params.forEach(function(value1, key) {
        console.log(key, value1);
        // if (key == 'data')
        // var m = value1;
        // m.forEach(function(value, key) {
        //   console.log('m val:',value)

        // })
      });

      // request.post(params).then(data => {
      //   console.log('Wrappperrrrrrrrrrrr:', data);
      // });
      const myVar = JSON.stringify(abc);
      console.log('Params:', myVar);
      postRequest(myVar, headers).then(data => {
        console.log('Response:', data);
        // data.forEach(element => {
        //   console.log('Each Vehvcle:', element);
        //   // element.airports.forEach(airport => {
        //   //   newAirportsArray[i] = airport;
        //   //   newAirportsArray[i].city = element.city;
        //   //   i++;
        //   // });
        // });
        // localStorage.setItem('CityAirports', JSON.stringify(newAirportsArray));
        // console.log(' Inside Ifffffff');
        // setArray(newAirportsArray);
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
  });

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
  return (
    <div>
      <section className="cars">
        <div className="container ">
          <div className="col-md-12 p-0">
            <h2 className="bb">
              Available Cars{' '}
              <span className="count">
                3<span />
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
                      <i class="fas fa-plane-departure" />
                      <div className>
                        <label>From</label>
                        <p>Rome Airport Fiumicino</p>
                      </div>
                    </div>
                    <div className="des">
                      <i className="fas fa-map-marker-alt" />
                      <div className>
                        <label>Destination</label>
                        <p>Zone 3</p>
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
                        contentLabel="Example Modal"
                      >
                        <h2 ref={_subtitle => (subtitle = _subtitle)}>Map</h2>
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d83907.59515727437!2d2.3529858436156954!3d48.91325171356301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x47e6703bb5abfe17%3A0x67d9ee40dcd96ca0!2sNouvel%20H%C3%B4tel%20Eiffel%2C%20Rue%20des%20Volontaires%2C%20Paris%2C%20France!3m2!1d48.843395!2d2.3068478!4m5!1s0x47e61622698d2851%3A0x8f4061ad11f6f5fd!2sAeroport%20Paris%20Charles-de-Gaulle%20TERMINAL%20L%2C%20Le%20Mesnil-Amelot%2C%20France!3m2!1d49.0057827!2d2.5847271!5e0!3m2!1sen!2s!4v1588700343560!5m2!1sen!2s"
                          width="100%"
                          height="100%"
                          frameBorder={0}
                          style={{ border: 0 }}
                          allowFullScreen
                          aria-hidden="false"
                          tabIndex={0}
                        />
                        {/* <button onClick={closeModal}>close</button> */}
                        <div>I am a modal</div>
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
                <div className="owl-carousel owl-theme carslider">
                  <div className="item">
                    <div className="carbox">
                      <div className="bluebg" />
                      <img src={car1Img} alt="cars" />
                      <div className="choosedesc">
                        <h4>Standard Car</h4>
                        <p className="grey">
                          Max Passengers:{' '}
                          <span className="blue">3 Passengers</span>
                        </p>
                        <p className="grey">
                          Max Luggage:{' '}
                          <span className="blue">2 Large, 4 Small</span>
                        </p>
                        <p className="grey">
                          CXL Deadline: <span className="blue">2 Days</span>
                        </p>
                      </div>
                      <div className="selecttrip">
                        <label className="radiowrap">
                          Round Trip <span className="blue">54€</span>
                          <input
                            type="radio"
                            defaultChecked="checked"
                            name="radio"
                          />
                          <span className="checkmark" />
                        </label>
                        <label className="radiowrap">
                          One Way <span className="blue">54€</span>
                          <input type="radio" name="radio" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="booknow">
                        <button
                          type="button"
                          name="button"
                          className="btn btnstyle4 btn-block "
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="carbox">
                      <div className="bluebg" />
                      <img src={car2Img} alt="cars" />
                      <div className="choosedesc">
                        <h4>Shuttle</h4>
                        <p className="grey">
                          Max Passengers:{' '}
                          <span className="blue">2 Passengers</span>
                        </p>
                        <p className="grey">
                          Max Luggage:{' '}
                          <span className="blue">6 Large, 12 Small</span>
                        </p>
                        <p className="grey">
                          CXL Deadline: <span className="blue">2 Days</span>
                        </p>
                      </div>
                      <div className="selecttrip">
                        <label className="radiowrap">
                          Round Trip <span className="blue">30€</span>
                          <input
                            type="radio"
                            defaultChecked="checked"
                            name="radio"
                          />
                          <span className="checkmark" />
                        </label>
                        <label className="radiowrap">
                          One Way <span className="blue">15€</span>
                          <input type="radio" name="radio" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="booknow">
                        <button
                          type="button"
                          name="button"
                          className="btn btnstyle4 btn-block "
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="carbox">
                      <div className="bluebg" />
                      <img src={car3Img} alt="cars" />
                      <div className="choosedesc">
                        <h4>Standard Car</h4>
                        <p className="grey">
                          Max Passengers:{' '}
                          <span className="blue">7 Passengers</span>
                        </p>
                        <p className="grey">
                          Max Luggage:{' '}
                          <span className="blue">4 Large, 8 Small</span>
                        </p>
                        <p className="grey">
                          CXL Deadline: <span className="blue">2 Days</span>
                        </p>
                      </div>
                      <div className="selecttrip">
                        <label className="radiowrap">
                          Round Trip <span className="blue">60€</span>
                          <input
                            type="radio"
                            defaultChecked="checked"
                            name="radio"
                          />
                          <span className="checkmark" />
                        </label>
                        <label className="radiowrap">
                          One Way <span className="blue">30€</span>
                          <input type="radio" name="radio" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="booknow">
                        <button
                          type="button"
                          name="button"
                          className="btn btnstyle4 btn-block "
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="carbox">
                      <div className="bluebg" />
                      <img src={car1Img} alt="cars" />
                      <div className="choosedesc">
                        <h4>Standard Car</h4>
                        <p className="grey">
                          Max Passengers:{' '}
                          <span className="blue">3 Passengers</span>
                        </p>
                        <p className="grey">
                          Max Luggage:{' '}
                          <span className="blue">2 Large, 4 Small</span>
                        </p>
                        <p className="grey">
                          CXL Deadline: <span className="blue">2 Days</span>
                        </p>
                      </div>
                      <div className="selecttrip">
                        <label className="radiowrap">
                          Round Trip <span className="blue">54€</span>
                          <input
                            type="radio"
                            defaultChecked="checked"
                            name="radio"
                          />
                          <span className="checkmark" />
                        </label>
                        <label className="radiowrap">
                          One Way <span className="blue">54€</span>
                          <input type="radio" name="radio" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="booknow">
                        <button
                          type="button"
                          name="button"
                          className="btn btnstyle4 btn-block "
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

AvailableCars.propTypes = {};

export default AvailableCars;
