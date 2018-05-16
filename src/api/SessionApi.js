import axios from 'axios';
import {API_URL} from '../actions/types';
class SessionApi {  

  static login(credentials) {

    return axios.post(`http://localhost:5000/api/v1/auth/sign_in`, credentials)
      .then(response => {
        return response;
      })
      .catch(error =>{
        throw(error);
      })
  } 
}

export default SessionApi;