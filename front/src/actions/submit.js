import { SUBMIT_CODE_INIT, SUBMIT_CODE_WAITING, SUBMIT_CODE_SUCCESS, SUBMIT_CODE_FAIL} from '../constants'
import { API_URL } from '../config'
import { push } from 'react-router-redux'
import axios from 'axios'

export function submitCode(problemid, code){
  return async dispatch=>{
    dispatch({type: SUBMIT_CODE_WAITING});
    try {
      const token = localStorage.getItem('token');
      await axios.post(API_URL + '/problem/' + problemid + '/submit',{
        code
      },{
        headers: {
          token
        }
      });
      dispatch({type: SUBMIT_CODE_SUCCESS});
      dispatch(push('/result'));
    } catch (e) {
      dispatch({type: SUBMIT_CODE_FAIL});
    }
  }
}

export function initSubmitCode(problemid, code){
  return dispatch=>{
    dispatch({type: SUBMIT_CODE_INIT});
  }
}
