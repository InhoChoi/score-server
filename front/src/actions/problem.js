import { GET_PROBLEM_LIST_WAITING, GET_PROBLEM_LIST_SUCCESS, GET_PROBLEM_LIST_FAIL } from '../constants'
import { API_URL } from '../config'
import { push } from 'react-router-redux'
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


export function registerProblem(title, content, input, output){
  return async dispatch => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(API_URL + '/problem',{
        title,
        content,
        testcase: [{
          input,
          output,
        }]
      },{
        headers:{
          token
        }
      });
      dispatch(push('/problem'));
    } catch (e) {
      dispatch(push('/'));
    }
  }
}
