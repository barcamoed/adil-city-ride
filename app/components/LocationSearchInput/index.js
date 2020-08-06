import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

// import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, Field, getIn } from 'formik';
import { mapSchema } from '../Login/schema';
var myClick = 0;
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      disableField: null,
      enableField: null,
      myClick: 0,
    };
    // this.handleClick = this.handleClick.bind(this);
    // this.onFocus = this.onFocus.bind(this);
    // this.onBlur = this.onBlur.bind(this);
  }

  handleChange = address => {
    // console.log('This.Propssssssssssssssssssssss', this.props.field.name);
    if (this.props.field.name == 'destination') {
      // console.log('Advance 123123123 Seeeeeee', address);
      this.props.form.setFieldValue('destination', address);
      this.setState({ address });
      this.props.onSetFeildText(address);
      // console.log('State Address', address);
    } else if (this.props.field.name == 'address_search') {
      this.props.form.setFieldValue('address_search', address);
      this.setState({ address });
      this.props.onSetFeildText(address);
      // console.log('State Address', address);
    }
  };

  handleSelect = address => {
    // console.log('Address geocode:', geocodeByAddress(address));
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.onSetAbc(latLng))
      .catch(error => console.error('Error', error));
    this.setState({ address });
    localStorage.setItem('address', address);
    this.onBlur();
  };
  componentDidMount() {
    // console.log('localStorage address', localStorage.getItem('address'));
    // console.log('Propsssssssssszzzzzzzzzzzzz', this.props);

    if (
      this.props.field.name == 'address_search' &&
      this.props.myProp.isAdvanced == true
    ) {
      // console.log('Inside Iff props matchessssssssssss');
      var address = this.props.myProp.destination_address;
      this.setState({ address });
      this.setState({ disableField: true });
      this.setState({ enableField: false });
      // this.props.onSetFeildText(address);
    } else {
      this.setState({ disableField: false });
      this.setState({ enableField: true });
    }
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    // console.log('Value Selected...state updated....');
    // if (localStorage.getItem('address')) {
    // }
    if (prevState.myClick != this.state.myClick) {
      // console.log('Component Updated');
    }
  }

  handleClick() {
    // console.log('Indieeeeeeeeeeeeeeeemmmmmmmmmmmmmmmmm');
    // this.setState({ myClick: 1 });
    // console.log('dhfgfhf', this.state.myClick);
    // myClick = 1;
  }
  onFocus = () => {
    console.log('On Focus');
    this.setState({ myClick: 1 });
    // myClick = 1;
  };
  onBlur = () => {
    console.log('On Blur', this.state.myClick);
    console.log('On Blur Called');
    this.setState({ myClick: 0 });
    // myClick = 0;
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {/* {({ errors, touched }) => ( */}
            <Formik
              initialValues={{
                destination: this.state.address,
              }}
              validationSchema={mapSchema}
              onSubmit={values => {
                // orderRequest(values);
                // console.log('Moeed Valuessssss:', values);
              }}
            >
              {({ errors, touched }) => (
                <div>
                  {this.props.myProp && this.props.field.name ? (
                    <React.Fragment>
                      <input
                        className="focus-visible"
                        // onClick={this.handleClick()}
                        // onFocus={this.onFocus}
                        // onBlur={this.onBlur}
                        readOnly={
                          this.props.myProp.isAdvanced &&
                          this.props.field.name == 'address_search'
                            ? this.state.disableField
                            : this.state.enableField
                        }
                        {...getInputProps({
                          placeholder: 'Search Places ...',
                          onFocus: this.onFocus,
                          onBlur: () => this.onBlur(),
                          className:
                            myClick == 1
                              ? 'location-search-input w-100 textarea focus-visible'
                              : 'location-search-input w-100 textarea',
                        })}
                      />
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
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <input
                        // className={this.myClick == 1 ? 'focus-visible' : ''}
                        // className="focus-visible"
                        // onClick={this.handleClick}

                        {...getInputProps({
                          placeholder: 'Search Places ...',
                          onFocus: this.onFocus,
                          onBlur: () => this.onBlur(),

                          className:
                            this.state.myClick == 1
                              ? 'location-search-input w-100 textarea focus-visible'
                              : 'location-search-input w-100 textarea',
                        })}
                      />
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
                    </React.Fragment>
                  )}
                </div>
              )}
            </Formik>
            {/* )} */}

            {/* </Formik> */}
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

LocationSearchInput.propTypes = {};

export default LocationSearchInput;
