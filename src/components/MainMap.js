import React from 'react';
import {connect} from 'react-redux';
import {changeMapState,  setZoom} from '../actions/index';

const markerOk = require('../assets/icons/map_marker.png');
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
    const renderMarkers = () => {
      return props.buildings.show.map(building => {
        let id = building.id;
        let latitude = building.latitude;
        let longitude = building.longitude;
        let iconUrl = markerOk;
        return (
          <Marker
            key = {id}
            position={{ lat: latitude, lng: longitude }}
            onClick={() => {props.onMarkerClick(id); props.changeMapState({ lat: latitude, lng: longitude }, 15);}}
            icon={{
              url: iconUrl
            }}
          />
        )
      });
    }
    if(props.buildings.show) {
      return (
        <GoogleMap
          zoom={props.mapConfig.zoom}
          center={props.mapConfig.map_center}
          defaultOptions = {{ styles: [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"weight":1}]},{"elementType":"labels","stylers":[{"visibility":"simplified"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#a0a0a0"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#d4ffdc"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#eaeaea"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#dfdfdf"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#e1e1e1"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#a4c8df"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"},{"visibility":"off"}]}] }}
          ref={props.onMapMounted}
        >
         {renderMarkers()}
        </GoogleMap>
      );
    }
  }
);

function mapStateToProps(state) {
  return {buildings: state.buildings, mapConfig: state.mapConfig};
}

export default connect(mapStateToProps, {changeMapState: changeMapState,  setZoom: setZoom })(MainMap);

