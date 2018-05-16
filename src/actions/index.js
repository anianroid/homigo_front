import {
	GET_BUILDINGS, 
	GET_BUILDING, 
	GET_DOCUMENTS, 
	GET_DOCUMENT, 
	API_URL, 
	SET_VISIBLITY_FILTER, 
	MAP_MOD, 
	SET_ZOOM, 
	SET_HOUSES_CHOICE, 
	GET_BOOKINGS, 
	GET_BOOKING,
	GET_ACTIVE_BOOKINGS, 
	GET_PAYMENTS, 
	CHANGE_DASHBOARD_VIEW, 
	GET_BUILDINGS_SELECT, 
	GET_ROOMS, 
	GET_BOOKING_PAYMENT_DETAILS, 
	UPLOAD_DOCUMENT, 
	PAYMENT_SUCCESSFUL, 
	GET_HOUSES, 
	GET_HOUSE, 
	GET_DEPOSIT_PAYMENT_DETAILS, 
	GET_RENT_PAYMENT_DETAILS, 
	GET_FINE_PAYMENT_DETAILS, 
	GET_OTHER_DUE_PAYMENT_DETAILS, 
	GET_PROPERTIES_FOR_BUILDING, 
	SCHEDULE_VISIT,
	MOVEOUT_REQUEST,
	NO_ACTIVE_BOOKINGS,
	GET_PENDING_MONTHLYRENTS,
  GET_PENDING_FINES,
  GET_PENDING_OTHERDUES,
  UPDATE_KYC_DETAILS_SUCCESS,
  UPDATE_KYC_DETAILS_FAILED,
  DOCUMENT_UPLOAD_SUCCESS,
  GET_PAYMENT,
  UPDATE_USER_DETAILS,
  GET_AGREEMENT,
  UPDATE_USER_CONTACT,
  GET_WALLET_TRANSACTIONS,
  GET_WALLET_DETAILS
} from './types';
import axios from 'axios';
import swal from 'sweetalert2';
import {browserHistory} from 'react-router';
	
	export function getProperties() {
		const request = axios.get(`${API_URL}/buildings`);
		return{
			type: GET_HOUSES,
			payload: request
		};
	}

	export function getHouse() {
		const request = axios.get(`${API_URL}/buildings`);
		return{
			type: GET_HOUSE,
			payload: request
		};
	}

	export function getHouses() {
		const request = axios.get(`${API_URL}/buildings`);
		return{
			type: GET_BUILDINGS,
			payload: request
		};
	}

	export function getBuilding(id) {
		return axios.get(`${API_URL}/buildings/`+id).then(
			(response) => {
				return {
					type: GET_BUILDING,
					payload: response
				}
			}
		);
		
	}

	export function getPropertiesForBuilding(id) {
		return axios.get(`${API_URL}/buildings/`+id+`/properties`).then(
			(response) => {
				return {
					type: GET_PROPERTIES_FOR_BUILDING,
					payload: response
				}
			}
		);
		
	}


	export function getRooms(buildingId, propertyId) {
		return axios.get(`${API_URL}/buildings/`+buildingId+`/properties/`+propertyId+`/rooms`).then(
			(response) => {
				return {
					type: GET_ROOMS,
					payload: response
				}
			}
		);
	}

	export function getDocuments() {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.get(`${API_URL}/documents`).then(
			(response) => {
				return {
					type: GET_DOCUMENTS,
					payload: response
				}
			}
		);
	}

	export function getDocument(id) {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.get(`http://localhost:5000/hives/`+id+`.json`).then(
			(response) => {
				return {
					type: GET_BUILDING,
					payload: response
				}
			}
		);
	}

	export function uploadDocument(document) {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else  {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.post(`${API_URL}/documents`, document)
			.then(
				(response) => {
					swal({
			      title: 'Document succefully uploaded!',
			      type: 'success',
			      timer: 2500,
			      allowOutsideClick: false,
			      showConfirmButton: false
			    });
			    return {
			    	type: 'DOCUMENT_UPLOAD_SUCCESS',
			    	payload: response
			    }
				}
			)
			.catch(
				(error) => {
					swal({
			      title: 'Document upload error!',
			      type: 'error',
			      timer: 2500,
			      allowOutsideClick: false,
			      showConfirmButton: false
			    });
		  	}
		  )
	}

	export function fliterOnClick(filter) {
		return {
			type: SET_VISIBLITY_FILTER,
			filter: filter
		}
	}

	export function fliterBuildings(filter) {
		return {
			type: SET_VISIBLITY_FILTER,
			filter: filter
		}
	}

	export function changeMapState(latLng, zoom) {
		return{
			type: MAP_MOD,
			payload: {
				map_center: latLng,
				zoom: zoom
			}
		}
	}

	export function setZoom(zoom) {
		return{
			type: SET_ZOOM,
			payload: {
				zoom: zoom
			}
		}
	}

	export function changeHousesChoice(choice) {
		return {
			type: SET_HOUSES_CHOICE,
			payload: {
				data: choice
			}
		}
	}

	export function getBookings() {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.get(`${API_URL}/bookings`).then(
			(response) => {
				return {
					type: GET_BOOKINGS,
					payload: response
				}
			}
		);
	}

	export function getBooking(id) {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.get(`${API_URL}/bookings/${id}`).then(
			(response) => {
				return {
					type: GET_BOOKING,
					payload: response
				}
			}
		);
	}

	export function getActiveBookings() {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.get(`${API_URL}/bookings/active`)
			.then(
				(response) => {
					return {
						type: GET_ACTIVE_BOOKINGS,
						payload: response
					}
				}
			)
			.catch(
				(error) => {
					return {
						type: NO_ACTIVE_BOOKINGS,
						payload: error.response
					}
		  	}
		  )
	}

	export function getPayments() {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.get(`${API_URL}/payments`).then(
			(response) => {
				return {
					type: GET_PAYMENTS,
					payload: response
				}
			}
		);
	}

	export function changeDashboardView(nextView) {
		return {
			type: CHANGE_DASHBOARD_VIEW,
			payload: {
				nextView: nextView
			}
		}
	}

	export function getBookingPaymentDetails(id) {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.get(`${API_URL}/bookings/${id}/pay`).then(
			(response) => {
				return {
					type: GET_BOOKING_PAYMENT_DETAILS,
					payload: response
				}
			}
		);
	}

	export function getDepositPaymentDetails(id) {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.get(`${API_URL}/bookings/${id}/pay_securitydeposit?amount=${localStorage.depositValue}`)
		.then(
			(response) => {
				return {
					type: GET_DEPOSIT_PAYMENT_DETAILS,
					payload: response
				}
			}
		)
		.catch(error =>{
			swal({
	      title: error.response.data.status,
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
	  })
	}

	export function getFinePaymentDetails(id) {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.get(`${API_URL}/fines/${id}/pay`)
		.then(
			(response) => {
				return {
					type: GET_FINE_PAYMENT_DETAILS,
					payload: response
				}
			}
		)
		.catch(error =>{
			swal({
	      title: error.response.data,
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
	  })
	}

	export function getOtherDuePaymentDetails(id) {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.get(`${API_URL}/otherdues/${id}/pay`)
		.then(
			(response) => {
				return {
					type: GET_OTHER_DUE_PAYMENT_DETAILS,
					payload: response
				}
			}
		)
		.catch(error =>{
	  	swal({
	      title: error.response.data.status,
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
	  })
	}

	export function getRentPaymentDetails(id) {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.get(`${API_URL}/monthlyrents/${id}/pay`)
		.then(
			(response) => {
				return {
					type: GET_RENT_PAYMENT_DETAILS,
					payload: response
				}
			}
		)
		.catch(error =>{
			swal({
	      title: error.response.data.status,
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
	  })
	}


	export function createBooking(booking) {
		axios.defaults.headers = JSON.parse(sessionStorage.headers);
		let data = booking;
		localStorage.setItem('booking', JSON.stringify(data));
		return axios.post(`${API_URL}/bookings`, data)
	  .then(response => {
	  	localStorage.setItem('bookingResponse', JSON.stringify(response.data));
	    return getBookingPaymentDetails(response.data.id);
	  })
	  .catch(error =>{
	  	swal({
	      title: error.response.data.errors[0],
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
	  })
	}

	export function recordTokenPayment(data) {
		axios.defaults.headers = JSON.parse(sessionStorage.headers);
		return axios.post(`${API_URL}/payments`, data)
	  .then(response => {
	    return {
				type: PAYMENT_SUCCESSFUL,
				payload: response
			}
	  })
	  .catch(error =>{
	    swal({
	      title: error.response.data.errors[0],
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
	  })
	}

	export function recordMiscellaneousPayment(data) {
		axios.defaults.headers = JSON.parse(sessionStorage.headers);
		return axios.post(`${API_URL}/payments`, data)
	  .then(response => {
	    return {
				type: PAYMENT_SUCCESSFUL,
				payload: response
			}
	  })
	  .catch(error =>{
	    swal({
	      title: error.response.data.errors[0],
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
	  })
	}

	export function scheduleVisit(data) {
		return axios.post(`${API_URL}/visitors`, data)
	  .then(response => {
	  	swal({
	      title: response.data.status,
	      type: 'success',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
	    return {
				type: SCHEDULE_VISIT,
				payload: response
			}
	  })
	  .catch(error =>{
	    swal({
	      title: error.response.data.errors[0],
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
	  })
	}

	export function moveoutRequest(data) {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.post(`${API_URL}/bookings/${data.booking_id}/moveout`, data)
	  .then(response => {
	  	swal({
	  		type: 'success',
	      title: `Moveout request raised successfully`,
	      allowOutsideClick: false,
	      onOpen: () => {
	      }
	    })
	    return {
				type: MOVEOUT_REQUEST,
				payload: true
			}
	  })
	  .catch(error =>{
	  	swal({
	      title: `Moveout request failed. \n${error.response.data.error}`,
	      timer: 2500,
	      allowOutsideClick: false,
	      type: 'error',
	      showConfirmButton: false
	    })
	  })
	}

	export function getPendingOtherDues() {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.get(`${API_URL}/otherdues`)
		.then(
			(response) => {
				return {
					type: GET_PENDING_OTHERDUES,
					payload: response
				}
			}
		)
		.catch(error =>{
			console.log(error.response);
			swal({
	      title: error.response.data.errors[0],
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
	  })
	}

	export function getPendingFines() {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.get(`${API_URL}/fines`)
		.then(
			(response) => {
				return {
					type: GET_PENDING_FINES,
					payload: response
				}
			}
		)
		.catch(error =>{
			swal({
	      title: 'NA',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
	  })
	}

	export function getPendingMonthlyRents() {
		if(sessionStorage.headers) {
			axios.defaults.headers = JSON.parse(sessionStorage.headers);
		}
		else {
			swal({
	      title: 'Please login to continue',
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
			browserHistory.push('/login');
		}
		return axios.get(`${API_URL}/monthlyrents`)
		.then(
			(response) => {
				return {
					type: GET_PENDING_MONTHLYRENTS,
					payload: response
				}
			}
		)
		.catch(error =>{
			swal({
	      title: error.response.data.errors[0],
	      type: 'warning',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
	  })
	}

	export function updateUserKycDetails(data) {
		axios.defaults.headers = JSON.parse(sessionStorage.headers);
		return axios.patch(`${API_URL}/doc_details`, data)
	  .then(response => {
	    return {
				type: UPDATE_KYC_DETAILS_SUCCESS,
				payload: response
			}
	  })
	  .catch(error =>{
	    return {
				type: UPDATE_KYC_DETAILS_FAILED,
				payload: error.response
			}
	  })
	}

	export function getPayment(id) {
		axios.defaults.headers = JSON.parse(sessionStorage.headers);
		return axios.get(`${API_URL}/payments/${id}`)
	  .then(response => {
	    return {
				type: GET_PAYMENT,
				payload: response
			}
	  })
	  .catch(error =>{
	  	swal({
	      title: error.response,
	      type: 'error',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
	  })
	}


	export function updateUserDetails(data) {
		axios.defaults.headers = JSON.parse(sessionStorage.headers);
		return axios.patch(`${API_URL}/doc_details`, data)
	  .then(response => {
	    return {
				type: UPDATE_USER_DETAILS,
				payload: response
			}
	  })
	  .catch(error =>{
	    swal({
	      title: error.response,
	      type: 'error',
	      timer: 2500,
	      allowOutsideClick: false,
	      showConfirmButton: false
	    });
	  })
	}

	export function getAgreementForBooking(booking_id) {
		axios.defaults.headers = JSON.parse(sessionStorage.headers);
		return axios.get(`${API_URL}/bookings/${booking_id}/agreement`)
	  .then(response => {
	    return {
				type: GET_AGREEMENT,
				payload: response
			}
	  })
	  .catch(error => {
	  	let errors = error.response.data.errors;
	    swal({
	      title: `<h3>
	      					Agreemnt generation failed because
	      				</h3>
      					<ul>
      						${errors.map(error => {
      							return (`<li>${error}</li>`)
      						})}
      					</ul>`,
	      type: 'error',
	      timer: 5500,
	      allowOutsideClick: false,
	      showConfirmButton: false,
	      allowOutsideClick: false
	    })
	  })
	}

	export function updateUserContact(data) {
		axios.defaults.headers = JSON.parse(sessionStorage.headers);
		return axios.patch(`${API_URL}/doc_details`, data)
	  .then(response => {
	    return {
				type: UPDATE_USER_CONTACT,
				payload: response
			}
	  })
	  .catch(error =>{
	  	console.log(error.response);
	  })
	}

	export function getWalletDetails() {
		axios.defaults.headers = JSON.parse(sessionStorage.headers);
		return axios.get(`${API_URL}/wallet`)
	  .then(response => {
	    return {
				type: GET_WALLET_DETAILS,
				payload: response
			}
	  })
	  .catch(error =>{
	  	console.log(error.response.data.error);
	  	return true;
	  })
	}

	export function getWalletTransactions() {
		axios.defaults.headers = JSON.parse(sessionStorage.headers);
		return axios.get(`${API_URL}/wallet/transactions`)
	  .then(response => {
	    return {
				type: GET_WALLET_TRANSACTIONS,
				payload: response
			}
	  })
	  .catch(error =>{
	  	console.log(error.response.data.error);
	  	return true;
	  })
	}










