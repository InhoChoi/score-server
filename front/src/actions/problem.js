import { GET_PROBLEM_LIST_WAITING, GET_PROBLEM_LIST_SUCCESS, GET_PROBLEM_LIST_FAIL } from '../constants'
import { API_URL } from '../config'
import axios from 'axios'

export function getProblems(){
  return async dispatch => {
    dispatch({type: GET_PROBLEM_LIST_WAITING});
    try {
      const token = localStorage.getItem('token');
      const problems = (await axios.get(API_URL + '/problem',{
        headers: {
          token
        }
      })).data;
      dispatch({type: GET_PROBLEM_LIST_SUCCESS, problems});
    } catch (e) {
      dispatch({type: GET_PROBLEM_LIST_FAIL});
    }
  }
}
