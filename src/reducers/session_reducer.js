import {
  LOG_IN_SUCCESS,
  REGISTER_SUCCESS, 
  UPDATE_USER_DETAILS, 
  RESET_PASSWORD, 
  UPDATE_PASSWORD,
  USER_LOGOUT,
  UPDATE_USER_CONTACT
} from '../actions/types';  
import {browserHistory} from 'react-router';
import swal from 'sweetalert2';

const INITIAL_STATE = {headers: {}, shouldRedirect: false,  loggedIn: false, userData: {}, update: false};

export default function SessionReducer(state = INITIAL_STATE, action) {  
	let result = Object.assign({}, state);
  let updatedUserData = null;;
  switch(action.type) {
    case LOG_IN_SUCCESS:
      return { ...result, shouldRedirect: true, loggedIn: true};
    case REGISTER_SUCCESS:
      browserHistory.push('/');
      return { ...result, shouldRedirect: true, loggedIn: true};
    case UPDATE_USER_DETAILS:
      updatedUserData = JSON.stringify(action.payload.data);
      localStorage.setItem('userData', updatedUserData)
      browserHistory.push('/home');
    	return {...result, userData: action.payload.data, update: true}
    case RESET_PASSWORD:
      browserHistory.push('/');
      break;
    case UPDATE_PASSWORD:
      browserHistory.push('/login');
      break;
    case USER_LOGOUT:
      browserHistory.push('/login');
      break;
    case UPDATE_USER_CONTACT:
      swal({
        title: `<h3>Updated contact number</p>`,
        type: 'success',
        timer: 2500,
        allowOutsideClick: false,
        showConfirmButton: false
      })
      updatedUserData = JSON.stringify(action.payload.data);
      localStorage.setItem('userData', updatedUserData);
      return {...result, userData: action.payload.data, update: true}
    default: 
      return state;
  }
}