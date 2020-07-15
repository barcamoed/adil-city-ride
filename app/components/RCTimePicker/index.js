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

const RCTimePicker = (props, { onChange, value, ...rest }) => {
  const [meTime, setApiArrivalTime] = useState(moment('00:00', 'hh:mm'));
  function onTimeChange(value) {
    // setApiArrivalTime('');

    if (props.at_value) {
      console.log('Insideeeeeee', props.field.value);
      setApiArrivalTime('');
      console.log('Selected Time:', value);
      // props.form.setFieldValue(props.field.name, '');
    }
    // if (props.sec_before_value) {
    //   console.log('props vaaaaaaaaaaaa:', props.sec_before_value);
    //   setApiArrivalTime('');
    // }

    // console.log('Time Picker Propssss....:', props);
    // props.form.setFieldValue(props.field.name, value);
  }

  useEffect(() => {
    console.log('Heree123123', props);
    if (props.at_value) {
      console.log(
        'props.forms.value.departure_date:',
        props.form.values.departure_date,
      );
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
      console.log('props:', props);
      props.form.setFieldValue(props.field.name, moment(convertTimeObject));
    }
  }, [props.at_value, meTime.length]);

  return (
    <div>
      <TimePicker
        // style={{ width: 100 }}
        // defaultValue={arrivalTime}
        value={meTime}
        showSecond={false}
        className="form-control"
        id="arrivaltime"
        name="arrival_time"
        // value={props.at_value}
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
