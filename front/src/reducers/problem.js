import { GET_PROBLEM_LIST_WAITING, GET_PROBLEM_LIST_SUCCESS, GET_PROBLEM_LIST_FAIL } from '../constants'

const initialState = {
  fetching: false,
  error: false,
  complete: false,
  problems: [],
};

export default function problem(state = initialState, action) {
  if(action.type === GET_PROBLEM_LIST_WAITING) {
    return { fetching: true, error: false, ...state}
  }
  else if(action.type === GET_PROBLEM_LIST_SUCCESS) {
    return { fetching: false, complete: true, error: false, problems: action.problems}
  }
  else if(action.type === GET_PROBLEM_LIST_FAIL) {
    return { fetching: false, error: true, ...state}
  }
  return state
}
