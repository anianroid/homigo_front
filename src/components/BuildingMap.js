import React from 'react';
import {connect} from 'react-redux';
import {changeMapState,  setZoom} from '../actions/index';

const markerOk = require('../assets/icons/map_marker@2x.png');
const { compose, withProps, withHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");


const MainMap = compose(
  withHandlers(() => {
    const refs = {
      map: undefined,
    }

    return {
      onMapMounted: () => ref => {
        refs.map = ref
      },
      onZoomChanged: ({ onZoomChange }) => () => {
        onZoomChange(refs.map.getZoom())
      }
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => {
    if(props.building) {
      let iconUrl = markerOk;
      return (
        <GoogleMap
          zoom={props.mapConfig.zoom}
          center={{ lat: props.building.latitude, lng: props.building.longitude }}
          options = {{scrollWheel: false, gestureControl: 'none', panControl: false, zoomControl: true, navigationControl: false, mapTypeControl: false, scaleControl: false}}
          ref={props.onMapMounted}
        >
          <Marker
            position={{ lat: props.building.latitude, lng: props.building.longitude }}
            onClick={() => {props.onMarkerClick(props.building.id); props.changeMapState({ lat: props.building.latitude, lng: props.building.longitude }, 15);}}
            icon={{
              url: iconUrl
            }}
          />
        </GoogleMap>
      );
    }
  }
);

function mapStateToProps(state) {
  return {mapConfig: state.mapConfig};
}

export default connect(mapStateToProps, {changeMapState: changeMapState,  setZoom: setZoom })(MainMap);

