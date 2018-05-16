import {MAP_MOD, SET_ZOOM} from '../actions/types';

const INITIAL_STATE = {map_center: { lat: 12.945073, lng: 77.669901 }, zoom: 13};

export default function(state = INITIAL_STATE, action){
	let result = Object.assign({}, state);
  switch(action.type){
    case MAP_MOD:
    	const {zoom, map_center} = action.payload;
      return {result, map_center: map_center, zoom: zoom};
    case SET_ZOOM:
    	const map_zoom = action.payload.zoom;
    	return {result, zoom: map_zoom};
    default:
      return state;
  }
}
