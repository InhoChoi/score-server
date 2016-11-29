import { API_URL } from '../config'
import { REGISTER_WAITING, REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_SERVER_ERROR } from '../constants'
import { push } from 'react-router-redux'
import axios from 'axios'

export function register(name, email, password) {
  return async dispatch => {
    dispatch({ type: REGISTER_WAITING});
    try {
      const response = await axios.post(API_URL + '/user', { name, email, password });
      dispatch({ type: REGISTER_SUCCESS, code: response.status});
      dispatch(push('/'));
    } catch (e) {
      if (e.response.status >= 500 ){
        dispatch({ type: REGISTER_SERVER_ERROR, code: e.response.status});
      }else if( error.response.status >= 400){
        dispatch({ type: REGISTER_FAIL, code: e.response.status});
      }
    }
  }
}
