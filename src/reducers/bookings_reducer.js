import {GET_BOOKINGS, GET_BOOKING, GET_ACTIVE_BOOKINGS, NO_ACTIVE_BOOKINGS, MOVEOUT_REQUEST, GET_AGREEMENT} from '../actions/types';
import {browserHistory} from 'react-router';
import swal from 'sweetalert2';
const INITIAL_STATE = {all: [], booking: null, active: [], moveout_request: false, agreement_token: ''};

export default function(state = INITIAL_STATE, action){
	let result = Object.assign({}, state);
  switch(action.type){
    case GET_BOOKINGS:
      return { ...result, all: action.payload.data};
    case GET_BOOKING:
      return { ...result, booking: action.payload.data};
    case GET_ACTIVE_BOOKINGS:
      localStorage.setItem('activeBooking', JSON.stringify(action.payload.data))
      return { ...result, active: action.payload.data};
    case GET_AGREEMENT:
      return { ...result, agreement_token: action.payload.data}
    case NO_ACTIVE_BOOKINGS:
      swal({
        title: `<h3>No active booking associated with your account!</p>`,
        timer: 2500,
        allowOutsideClick: false,
        showConfirmButton: false
      })
      //browserHistory.push('/houses');
      return { ...result, active: null};
    case MOVEOUT_REQUEST:
      return { ...result, moveout_request: true}
    default:
      return state;
  }
}
