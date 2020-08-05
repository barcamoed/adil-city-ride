import React, { Component } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
} from 'react-google-maps';
class ReactGMap extends Component {
  state = {
    directions: null,
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();
    // console.log('PropssssZZZZZZZZZZZZZZZ', this.props);
    const origin = this.props.origin;
    const destination = this.props.destination;

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log('Result.....', result);
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      },
    );
  }
  componentDidUpdate(prevProps) {
    if (prevProps.destination !== this.props.destination) {
      const directionsService = new google.maps.DirectionsService();
      const origin = this.props.origin;
      const destination = this.props.destination;
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            // console.log('Component props Changed', result);
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        },
      );
    }
  }

  render() {
    const ReactGMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
        defaultZoom={13}
      >
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));

    return (
      <div>
        <ReactGMap
          containerElement={<div style={{ height: `300px`, width: '100%' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

ReactGMap.propTypes = {};

export default ReactGMap;
