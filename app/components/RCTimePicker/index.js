/**
 *
 * TimePicker
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

// , { onChange, value, ...rest }
const RCTimePicker = props => {
  const [meTime, setApiArrivalTime] = useState(
    moment()
      .hour(0)
      .minute(0),
  );

  // function onTimeChange(myVal) {
  //   // setApiArrivalTime('');
  //   props.form.setFieldValue(props.field.name, '');
  //   console.log('My Val', myVal);
  //   if (props.at_value) {
  //     console.log('Insideeeeeee', props.field.value);

  //     setApiArrivalTime(meTime);
  //     console.log('Selected Time:', myVal);

  //     // props.form.setFieldValue(props.field.name, '');
  //   }
  //   // if (props.sec_before_value) {
  //   //   console.log('props vaaaaaaaaaaaa:', props.sec_before_value);
  //   //   setApiArrivalTime('');
  //   // }

  //   // console.log('Time Picker Propssss....:', props);
  //   // props.form.setFieldValue(props.field.name, value);
  // }

  function onChange(value) {
    // console.log(value && value.format('h:mm'));
    // console.log('Just Time ', value.format('h:mm'));

    const timeIs = value.format('hh:mm');
    // console.log('String TimeIs', timeIs.toString());
    setApiArrivalTime(value);
    console.log('Propsxxxxxx', props);
    var convertTimeObject = null;
    if (props.form.values.arrival_date) {
      convertTimeObject = new Date(
        props.form.values.arrival_date + ' ' + timeIs.toString(),
      );
    } else if (props.form.values.departure_date) {
      convertTimeObject = new Date(
        props.form.values.departure_date + ' ' + timeIs.toString(),
      );
    }
    var myTime = moment(convertTimeObject);
    setApiArrivalTime(myTime);
    if (props.onSetArrivalTime) {
      props.onSetArrivalTime(timeIs.toString());
    }
    if (props.onSetDepartureTime) {
      props.onSetDepartureTime(timeIs.toString());
    }
    // console.log('props:', props);
    props.form.setFieldValue(props.field.name, moment(convertTimeObject));

    // props.form.setFieldValue(props.field.name, value);
  }

  useEffect(() => {
    // console.log('Heree123123', props);
    if (props.at_value) {
      var convertTimeObject = null;
      if (props.form.values.arrival_date) {
        convertTimeObject = new Date(
          props.form.values.arrival_date + ' ' + props.at_value,
        );
      } else if (props.form.values.departure_date) {
        convertTimeObject = new Date(
          props.form.values.departure_date + ' ' + props.at_value,
        );
      } else if (props.form.values.seconds_before_pick) {
        convertTimeObject = new Date(
          props.form.values.seconds_before_pick + ' ' + props.at_value,
        );
      }

      var myTime = moment(convertTimeObject);
      setApiArrivalTime(myTime);
      // console.log('props:', props);
      props.form.setFieldValue(props.field.name, moment(convertTimeObject));
    }
  }, [props.at_value, meTime.length]);

  return (
    <div>
      <TimePicker
        // style={{ width: 100 }}
        // defaultValue={arrivalTime}
        value={meTime}
        // defaultValue={moment()
        //   .hour(0)
        //   .minute(0)}
        showSecond={false}
        className="form-control"
        id="arrivaltime"
        name="arrival_time"
        // format={'h:mm'}
        onChange={onChange}
      />
    </div>
  );
};

RCTimePicker.propTypes = {
  // onChange: PropTypes.func.isRequired,
  // value: PropTypes.instanceOf(moment),
};

export default RCTimePicker;
