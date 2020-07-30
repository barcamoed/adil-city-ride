import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, Field, getIn } from 'formik';
import { mapSchema } from '../Login/schema';
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', disableField: null, enableField: null };
  }

  handleChange = address => {
    console.log('This.Propssssssssssssssssssssss', this.props.field.name);
    if (this.props.field.name == 'destination') {
      console.log('Advance 123123123 Seeeeeee', address);
      this.props.form.setFieldValue('destination', address);
      this.setState({ address });
      this.props.onSetFeildText(address);
      console.log('State Address', address);
    } else if (this.props.field.name == 'address_search') {
      this.props.form.setFieldValue('address_search', address);
      this.setState({ address });
      this.props.onSetFeildText(address);
      console.log('State Address', address);
    }
  };

  handleSelect = address => {
    console.log('Address geocode:', geocodeByAddress(address));
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.onSetAbc(latLng))
      .catch(error => console.error('Error', error));
    this.setState({ address });
    localStorage.setItem('address', address);
  };
  componentDidMount() {
    console.log('localStorage address', localStorage.getItem('address'));
    console.log('Propsssssssssszzzzzzzzzzzzz', this.props);

    if (
      this.props.field.name == 'address_search' &&
      this.props.myProp.isAdvanced == true
    ) {
      console.log('Inside Iff props matchessssssssssss');
      var address = this.props.myProp.destination_address;
      this.setState({ address });
      this.setState({ disableField: true });
      this.setState({ enableField: false });
    } else {
      this.setState({ disableField: false });
      this.setState({ enableField: true });
    }
    // if (
    //   localStorage.getItem('address') &&
    //   localStorage.getItem('address') != undefined
    // ) {
    //   this.props.form.setFieldValue(
    //     'destination',
    //     localStorage.getItem('address'),
    //   );
    //   var address = localStorage.getItem('address');
    //   this.setState({ address });
    //   console.log('Inside LocationSearch Input Iffff:', this.state.address);
    //   localStorage.removeItem('address');
    // }
  }
  componentDidUpdate() {
    // console.log('Value Selected...state updated....');
    // if (localStorage.getItem('address')) {
    // }
  }

  // editField = () => {
  //   console.log('Edit Field Calledddddddddd');
  //   this.setState({ disableField: false, enableField: true });
  // };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {/* <Formik
              initialValues={{
                destination: '',
              }}
              validationSchema={bookingSchema}
              onSubmit={values => {
                // orderRequest(values);
                console.log('Moeed:', values);
              }}
            > */}
            {/* {({ errors, touched }) => ( */}
            <Formik
              initialValues={{
                destination: this.state.address,
              }}
              validationSchema={mapSchema}
              onSubmit={values => {
                // orderRequest(values);
                console.log('Moeed Valuessssssssssssssssss:', values);
              }}
            >
              {({ errors, touched }) => (
                <div>
                  {this.props.myProp && this.props.field.name ? (
                    <span>
                      <input
                        readOnly={
                          this.props.myProp.isAdvanced &&
                          this.props.field.name == 'address_search'
                            ? this.state.disableField
                            : this.state.enableField
                        }
                        {...getInputProps({
                          placeholder: 'Search Places ...',
                          className: 'location-search-input',
                        })}
                      />
                      {/* <FontAwesomeIcon onClick={this.editField} icon={faEdit} /> */}
                    </span>
                  ) : (
                    <span>
                      <input
                        {...getInputProps({
                          placeholder: 'Search Places ...',
                          className: 'location-search-input',
                        })}
                      />
                    </span>
                  )}
                </div>
              )}
            </Formik>
            {/* )} */}
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
            {/* </Formik> */}
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

LocationSearchInput.propTypes = {};

export default LocationSearchInput;
