import {
  GET_DOCUMENTS, 
  GET_DOCUMENT, 
  UPDATE_KYC_DETAILS_SUCCESS, 
  UPDATE_KYC_DETAILS_FAILED, 
  DOCUMENT_UPLOAD_SUCCESS
} from '../actions/types';
import swal from 'sweetalert2';
const INITIAL_STATE = {all: [], document: null, user_doc_details: false};

export default function(state = INITIAL_STATE, action){
	let result = Object.assign({}, state);
  switch(action.type){
    case GET_DOCUMENTS:
      return { ...result, all: action.payload.data, show: action.payload.data};
    case GET_DOCUMENT:
      return { ...result, document: action.payload.data};
    case UPDATE_KYC_DETAILS_SUCCESS:
      localStorage.setItem('userData', JSON.stringify(action.payload.data))
      swal({
        title: `<h3>Detials have been updated!</p>`,
        timer: 2500,
        allowOutsideClick: false,
        showConfirmButton: false
      })
      return { ...result, user_doc_details: true};
    case UPDATE_KYC_DETAILS_FAILED:
      swal({
        title: `<h3>Update failed!</h3><p>${action.payload.data}</p>`,
        timer: 2500,
        allowOutsideClick: false,
        showConfirmButton: false
      })
    case DOCUMENT_UPLOAD_SUCCESS:
      return { ...result, all: [...result.all, action.payload.data], show: [...result.show, action.payload.data]};
    default:
      return state;
  }
}
