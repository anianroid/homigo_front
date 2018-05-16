import {
  GET_PAYMENTS, 
  GET_PAYMENT,
  GET_BOOKING_PAYMENT_DETAILS, 
  GET_RENT_PAYMENT_DETAILS,
  GET_FINE_PAYMENT_DETAILS,
  GET_OTHER_DUE_PAYMENT_DETAILS,
  PAYMENT_SUCCESSFUL, 
  GET_DEPOSIT_PAYMENT_DETAILS,  
  GET_PENDING_MONTHLYRENTS,
  GET_PENDING_FINES,
  GET_PENDING_OTHERDUES
} from '../actions/types';
import {browserHistory} from 'react-router';

const INITIAL_STATE = {all: [], payment: null, paymentData: null, pending: {monthlyRents: [], fines: [], otherDues: []}};

export default function(state = INITIAL_STATE, action){
	let result = Object.assign({}, state);
  switch(action.type){
    case GET_PAYMENTS:
      return { ...result, all: action.payload.data};
    case GET_PAYMENT:
      return { ...result, payment: action.payload.data};
    case GET_BOOKING_PAYMENT_DETAILS:
    	browserHistory.push('/payments/new/booking');
      localStorage.setItem('booking', JSON.stringify(action.payload.data));
    	return { ...result, paymentData: action.payload.data};	
    case GET_RENT_PAYMENT_DETAILS:
      browserHistory.push('/payments/new/rent');
      return { ...result, paymentData: action.payload.data};
    case GET_FINE_PAYMENT_DETAILS:
      browserHistory.push('/payments/new/miscellaneous');
      return { ...result, paymentData: action.payload.data}; 
    case GET_OTHER_DUE_PAYMENT_DETAILS:
      browserHistory.push('/payments/new/miscellaneous');
      return { ...result, paymentData: action.payload.data};  
    case GET_DEPOSIT_PAYMENT_DETAILS:
      return { ...result, paymentData: action.payload.data};
    case GET_PENDING_MONTHLYRENTS:
      localStorage.setItem('pendingMonthlyRents', JSON.stringify(action.payload.data.filter(item => !item.status)));
      return { 
        ...result, 
        pending: {
          ...result.pending, 
          monthlyRents: action.payload.data.filter(item => !item.status)
        }
      };
    case GET_PENDING_FINES:
      localStorage.setItem('pendingFines', JSON.stringify(action.payload.data.filter(item => !item.status)));
      return { 
        ...result, 
        pending: 
          {
            ...result.pending, 
            fines: action.payload.data.filter(item => !item.status)
          }
      };
    case GET_PENDING_OTHERDUES:
      localStorage.setItem('pendingOtherDues', JSON.stringify(action.payload.data.filter(item => !item.status)));
      return { 
        ...result, 
        pending: {
          ...result.pending, 
          otherDues: action.payload.data.filter(item => !item.status)
        }
      };
    case PAYMENT_SUCCESSFUL:
      localStorage.setItem('razorpayPaymentInfo', JSON.stringify(action.payload.data));
      browserHistory.push('/invoice');
      break;
    default:
      return state;
  }
}
