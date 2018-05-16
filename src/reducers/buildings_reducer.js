import {
  GET_BUILDINGS, 
  GET_BUILDING, 
  SET_VISIBLITY_FILTER, 
  GET_BUILDINGS_SELECT, 
  GET_ROOMS, 
  GET_PROPERTIES_FOR_BUILDING,
  SCHEDULE_VISIT
} from '../actions/types';

const INITIAL_STATE = {all: [], building: null, properties: [], show: [], rooms: [], filter: null, visit: null};

export default function(state = INITIAL_STATE, action){
	let result = Object.assign({}, state);
  switch(action.type){
    case GET_BUILDINGS:
      localStorage.setItem('buildings', action.payload.data);
      return { ...result, all: action.payload.data, show: action.payload.data};
    case GET_BUILDING:
      localStorage.setItem('building', JSON.stringify(action.payload.data));
      return { ...result, building: action.payload.data};
    case GET_PROPERTIES_FOR_BUILDING:
      localStorage.setItem('building_properties', JSON.stringify(action.payload.data.filter(house => house.active)));
      return { ...result, properties: action.payload.data.filter(house => house.active === true)};
    case SET_VISIBLITY_FILTER:
    	return { ...result, show: result.all.filter(building => building.location === action.filter), filter: action.filter };
    case GET_ROOMS:
      return { ...result, rooms: action.payload.data}
    case  SCHEDULE_VISIT:
      return { ...result, visit: action.payload.data}
    default:
      return state;
  }
}
