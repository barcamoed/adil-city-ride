import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Formik, Form, Field, getIn } from 'formik';
import { mapSchema } from '../Login/schema';
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    console.log('This.Props', this.props);
    this.props.form.setFieldValue('destination', address);
    this.setState({ address });
    this.props.onSetAbc(address);
    console.log('State Address', address);
  };

  handleSelect = address => {
    console.log('Address geocode:', geocodeByAddress(address));
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.onSetAbc(latLng || 'Rizwannnnnn'))
      .catch(error => console.error('Error', error));
    this.setState({ address });
    localStorage.setItem('address', address);
  };
  componentDidMount() {
    console.log('localStorage address', localStorage.getItem('address'));
    if (
      localStorage.getItem('address') &&
      localStorage.getItem('address') != undefined
    ) {
      this.props.form.setFieldValue(
        'destination',
        localStorage.getItem('address'),
      );
      var address = localStorage.getItem('address');
      this.setState({ address });
      console.log('Inside LocationSearch Input Iffff:', this.state.address);
      localStorage.removeItem('address');
    }
    // localStorage.removeItem('address');
    // this.props.form.setFieldValue('destination', '');
  }
  componentDidUpdate() {
    // console.log('Value Selected...state updated....');
    // if (localStorage.getItem('address')) {
    // }
  }

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
                destination: '',
              }}
              validationSchema={mapSchema}
              onSubmit={values => {
                // orderRequest(values);
                console.log('Moeed:', values);
              }}
            >
              {({ errors, touched }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input',
                    })}
                  />
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
