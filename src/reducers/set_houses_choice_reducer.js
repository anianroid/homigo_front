import {SET_HOUSES_CHOICE} from '../actions/types';

const INITIAL_STATE = {housesChoice: 0};

export default function(state = INITIAL_STATE, action){
	let result = Object.assign({}, state);
  switch(action.type){
    case SET_HOUSES_CHOICE:
      return { ...result, housesChoice: action.payload.data};
    default:
      return state;
  }
}
