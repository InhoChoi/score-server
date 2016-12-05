import { API_URL } from '../config'
import { REGISTER_WAITING, REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_SERVER_ERROR } from '../constants'
import { login } from './auth'
import axios from 'axios'

export function register(name, email, password) {
  return async dispatch => {
    dispatch({ type: REGISTER_WAITING});
    try {
      const response = await axios.post(API_URL + '/user', { name, email, password });
      dispatch({ type: REGISTER_SUCCESS, code: response.status});
      dispatch(login(email, password));
    } catch (e) {
      if (e.response.status >= 500 ){
        dispatch({ type: REGISTER_SERVER_ERROR, code: e.response.status});
      }else if( e.response.status >= 400){
        dispatch({ type: REGISTER_FAIL, code: e.response.status});
      }
    }
  }
}
