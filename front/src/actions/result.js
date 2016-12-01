import { GET_RESULT_LIST_WAITING, GET_RESULT_LIST_SUCCESS, GET_RESULT_LIST_FAIL } from '../constants'
import { API_URL } from '../config'
import axios from 'axios'

export function getResults(){
  return async dispatch =>{
    dispatch({type: GET_RESULT_LIST_WAITING});
    try {
      const token = localStorage.getItem('token');
      const results = (await axios.get(API_URL + '/result',{
        headers: {
          token
        }
      })).data;
      dispatch({type: GET_RESULT_LIST_SUCCESS, results});
    } catch (e) {
      dispatch({type: GET_RESULT_LIST_FAIL});
    }
  };
}
