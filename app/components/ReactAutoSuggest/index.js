import React from 'react';
import Autosuggest from 'react-autosuggest';
import { IDENTIFIER, GETKEY } from '../../utils/constants';
import { postRequest } from '../../utils/requests';

// Imagine you have a list of languages that you'd like to autosuggest.
var mlanguages = [];
console.log('first Console at top', mlanguages);
console.log('Second Console at top', mlanguages);
// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  console.log('Languagessssssssssssssssssss', mlanguages);
  var langReturns = mlanguages.filter(
    lang => lang.city.toLowerCase().slice(0, inputLength) === inputValue,
  );

  if (langReturns.length > 1) {
    // langReturns.pop();
    console.log('New Lang returned', langReturns);
    for (var i = 0; i < langReturns.length - 1; i++) {
      if (langReturns[i].city == langReturns[i + 1].city) {
        langReturns.splice(i + 1, 1);
      } else {
        langReturns[i] = langReturns[i];
      }
    }
    console.log(' langReturns after Checkingggg....', langReturns);
  }

  return inputLength === 0 ? [] : langReturns;
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.city;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.city}</div>;

class ReactAutoSuggest extends React.Component {
  constructor(props) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      languages: [],
      value: '',
      suggestions: [],
    };
  }

  componentDidMount = () => {
    // console.log('If ComponentDidM 1');
    console.log('propsssssiiiiiiiieeeeeeee', this.props);
    if (localStorage.getItem('CityAirports')) {
      // console.log('If ComponentDidM 1');
      this.setState({
        languages: JSON.parse(localStorage.getItem('CityAirports')),
      });
      mlanguages = JSON.parse(localStorage.getItem('CityAirports'));
      console.log('If ComponentDidM 1 state', this.state.languages);
      console.log('If ComponentDidM 1', mlanguages);
    } else {
      console.log('Else ComponentDidM 2');
      const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
      };
      const params = new URLSearchParams();
      params.append('command', 'get_cities');
      params.append('identifier', IDENTIFIER);
      params.append('key', GETKEY());
      params.append('data', []);

      var outerLoopSize = 0;
      var newAirportsArray = [];
      var i = 0;

      {
        postRequest(params, headers).then(data => {
          console.log('City Dataaaaaaaa:', data.cities.length);
          for (var j = 0; j < data.cities.length; ) {
            console.log('City Dataaaaaaaammmmmmmm');
            data['cities'][j]['airports'].forEach(element => {
              console.log('elementMMMM', element);
              newAirportsArray[j] = element;
              newAirportsArray[j].city = data['cities'][j]['city'];
            });
            j++;
          }

          console.log('Else ComponentDidM 2 arrayyyy', newAirportsArray);
          localStorage.setItem(
            'CityAirports',
            JSON.stringify(newAirportsArray),
          );
          localStorage.setItem('apRequestTime', JSON.stringify(new Date()));
          this.setState({ languages: newAirportsArray });
          mlanguages = JSON.parse(localStorage.getItem('CityAirports'));
          console.log('after Post request state is:', this.state.languages);
          console.log('mlanguages after request:', mlanguages);
        });
      }

      // postRequest(params, headers).then(data => {
      //   data.forEach(element => {
      //     outerLoopSize = outerLoopSize + element.airports.length;
      //     element.airports.forEach(airport => {
      //       newAirportsArray[i] = airport;
      //       newAirportsArray[i].city = element.city;
      //       i++;
      //     });
      //   });
      //   console.log('Else ComponentDidM 2 arrayyyy', newAirportsArray);
      //   localStorage.setItem('CityAirports', JSON.stringify(newAirportsArray));

      //   this.setState({ languages: newAirportsArray });
      //   mlanguages = JSON.parse(localStorage.getItem('CityAirports'));
      //   console.log('after Post request state:', this.state.languages);
      //   console.log('mlanguages:', mlanguages);
      //   // customJS();
      // });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.setApValue !== this.props.setApValue) {
      this.setState({
        value: this.props.setApValue,
      });
      this.props.form.setFieldValue('searchField', this.props.setApValue);
      console.log('asdfsadfsadfasdfdasd');
    }
    // console.log('PRev Props', prevProps);
    // console.log('NEwwwwww Props', this.props);
    //When user directly selects Airport.
    // if (prevProps.setApValue !== this.props.setApValue) {
    //   console.log('Inside If PRev Props', prevProps);
    //   this.setState({
    //     value: this.props.setApValue,
    //   });
    //   this.props.form.setFieldValue('searchField', this.props.setApValue);
    // }
    // else {
    //   // this.onChange;
    // }
  }

  onChange = (event, { newValue }) => {
    // console.log('New Valueeeeeee:::', newValue);
    // console.log('New Props Valueeeeeee:::', this.props);
    this.setState({
      value: newValue,
    });
    this.props.form.setFieldValue('searchField', newValue);
    this.props.onGetSearchVal(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    // var makeItTrue = false;
    // if (this.props.setApValue != undefined) {
    //   makeItTrue = true;
    // }
    const inputProps = {
      placeholder: 'Search City',
      value,
      onChange: this.onChange,
      // disabled: makeItTrue,
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default ReactAutoSuggest;
