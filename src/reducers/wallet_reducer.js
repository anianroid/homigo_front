import {
  GET_WALLET_DETAILS,
  GET_WALLET_TRANSACTIONS
} from '../actions/types';
import {browserHistory} from 'react-router';

const INITIAL_STATE = {all: [], credits: [], debits: [], details: ''};

export default function(state = INITIAL_STATE, action){
	let result = Object.assign({}, state);
  switch(action.type){
    case GET_WALLET_DETAILS:
      return { ...result, details: action.payload.data};
    case GET_WALLET_TRANSACTIONS:
      return { ...result, all: action.payload.data};
    default:
      return state;
  }
}
