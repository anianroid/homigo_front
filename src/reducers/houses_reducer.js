import {GET_HOUSES, GET_HOUSE} from '../actions/types';

const INITIAL_STATE = {all: [], house: null};

export default function(state = INITIAL_STATE, action){
	let result = Object.assign({}, state);
  switch(action.type){
    case GET_HOUSES:
      return { ...result, all: action.payload.data};
    case GET_HOUSE:
      return { ...result, house: action.payload.data};
    default:
      return state;
  }
}
