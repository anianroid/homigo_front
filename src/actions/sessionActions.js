import * as types from './types';
import axios from 'axios';
import swal from 'sweetalert2';

export function loginSuccess() {
  return {type: types.LOG_IN_SUCCESS};
}

export function logInUser(credentials) {
  return axios.post(`${types.LOGIN_URL}`, credentials)
  .then(response => {
    sessionStorage.setItem('headers', JSON.stringify(response.headers));
    sessionStorage.setItem('userData', JSON.stringify(response.data.data));
    localStorage.setItem('userData', JSON.stringify(response.data.data));
    return loginSuccess();
  })
  .catch(error =>{
    swal({
      title: error.response.data.errors[0],
      type: "warning",
      showConfirmButton: false,
      timer: 2500
    });
  })
}

export function googleLogin(token){
  return axios.get(`${types.API_URL}` +'/apiauth/google?access_token='+token)
  .then(response => {
    sessionStorage.setItem('headers', JSON.stringify(response.data.token_data));
    sessionStorage.setItem('userData', JSON.stringify(response.data.user));
    localStorage.setItem('userData', JSON.stringify(response.data.user));
    return loginSuccess();
  })
  .catch(error => {
    swal({
      title: 'Login through Google failed! Please try alternative option',
      type: "error",
      showConfirmButton: false,
      timer: 2500
    });
  })
}

export function facebookLogin(token){
  return axios.get(`${types.API_URL}` +'/apiauth/facebook?access_token='+token)
  .then(response => {
    sessionStorage.setItem('headers', JSON.stringify(response.data.token_data));
    sessionStorage.setItem('userData', JSON.stringify(response.data.user));
    localStorage.setItem('userData', JSON.stringify(response.data.user));
    return loginSuccess();
  })
  .catch(error => {
    swal({
      title: 'Login through Facebook failed! Please try alternative option',
      type: "error",
      showConfirmButton: false,
      timer: 2500
    });
  })
}

export function registerSuccess() {
  return {type: types.REGISTER_SUCCESS};
}

export function registerUser(credentials) {
  return axios.post(`${types.REGISTER_URL}`, credentials)
  .then(response => {
    sessionStorage.setItem('headers', JSON.stringify(response.headers));
    sessionStorage.setItem('userData', JSON.stringify(response.data.data));
    localStorage.setItem('userData', JSON.stringify(response.data.data));
    return registerSuccess();
  })
  .catch(error =>{
    swal({
      title: error.response.data.errors.full_messages[0],
      timer: 2500,
      type: 'error',
      showConfirmButton: false,
    });
  })
}

export function resetPassword(email) {
  let credentials = {email: email, redirect_url: types.REDIRECT_URL}
  return axios.post(`${types.API_URL}/auth/password`, credentials)
  .then(response => {
    swal({
      title: response.data.message,
      timer: 2500,
      allowOutsideClick: false,
      showConfirmButton: false
    })
    return {
      type: types.RESET_PASSWORD
    }
  })
  .catch(error =>{
    swal({
      title: error.response.data.errors[0],
      type: 'warning',
      timer: 2500,
      allowOutsideClick: false,
      showConfirmButton: false
    })
  })
}

export function updatePassword(credentials) {
  axios.defaults.headers = credentials.headers;
  return axios.put(`${types.API_URL}/auth/password`, credentials)
  .then(response => {
    swal({
      title: response.data.message,
      type: 'success',
      timer: 2500,
      allowOutsideClick: false,
      showConfirmButton: false
    });
    return {
      type: types.UPDATE_PASSWORD,
      payload: response.data.data
    }
  })
  .catch(error =>{
    swal({
      title: error.response.data,
      type: 'success',
      timer: 2500,
      allowOutsideClick: false,
      showConfirmButton: false
    });
  })
}

export function resendConfirmation(email) {
  return axios.post(`${types.API_URL}/auth/confirmation`, {email: email, redirect_url: `${types.APP_URL}/confirm`})
  .then(response => {
    swal({
      title: response.data.message,
      timer: 2500,
      allowOutsideClick: false,
      showConfirmButton: false
    });
  })
  .catch(error =>{
    swal({
      title: `<ul style="padding-left: 0;">
                ${error.response.data.errors.map(error => {
                  return (`<li>${error}</li>`)
                })}
              </ul>`,
      type: 'warning',
      timer: 2500,
      allowOutsideClick: false,
      showConfirmButton: false
    });
  })
}


export function userLogout() {
  sessionStorage.removeItem('headers');
  sessionStorage.removeItem('userData');
  localStorage.removeItem('userData');
  return {
    type: types.USER_LOGOUT
  };
}
