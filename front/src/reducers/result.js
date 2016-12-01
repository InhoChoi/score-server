import { GET_RESULT_LIST_WAITING, GET_RESULT_LIST_SUCCESS, GET_RESULT_LIST_FAIL } from '../constants'

const initialState = {
  fetching: false,
  error: false,
  results: []
}

export default function result(state = initialState, action) {
  if(action.type === GET_RESULT_LIST_WAITING){
    return {fetching: true, error: false, results: []};
  }else if(action.type === GET_RESULT_LIST_SUCCESS){
    return {fetching: false, error: false, results: action.results};
  }else if(action.type === GET_RESULT_LIST_FAIL){
    return {fetching: false, error: true, results: []};
  }
  return state;
}
