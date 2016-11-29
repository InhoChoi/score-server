import { API_URL } from '../config'
import { LOGIN_WAITING, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants'
import { push } from 'react-router-redux'
import axios from 'axios'

export function login(email, password) {
  return async dispatch => {
    dispatch({type: LOGIN_WAITING});
    try {
      const token = (await axios.post(API_URL + '/auth', {email, password})).data.token;
      const userid = (await axios.get(API_URL + '/auth', {headers: {token}})).data.userid;

      localStorage.setItem('token', token);
      dispatch({type: LOGIN_SUCCESS, token, userid});
      dispatch(push('/'));
    } catch (e) {
      dispatch({type: LOGIN_FAIL});
    }
  }
}
