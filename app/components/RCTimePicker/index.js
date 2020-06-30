/**
 *
 * TimePicker
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const RCTimePicker = props => {
  function onTimeChange(value) {
    console.log('Selected Time:', value);
    props.form.setFieldValue(props.field.name, value);
  }

  return (
    <div>
      <TimePicker
        // style={{ width: 100 }}
        defaultValue=""
        showSecond={false}
        className="form-control"
        id="arrivaltime"
        name="arrival_time"
        // format={format}
        onChange={val => onTimeChange(val)}
      />
    </div>
  );
};

RCTimePicker.propTypes = {};

export default RCTimePicker;
