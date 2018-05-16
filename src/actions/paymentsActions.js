import {GET_PAYMENTS, API_URL} from './types';
import axios from 'axios';

export function getPayments() {
	const request = axios.get(`${API_URL}/payments`, {
		headers: sessionStorage
	});
	return{
		type: GET_PAYMENTS,
		payload: request
	};
}