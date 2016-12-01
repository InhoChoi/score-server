import { GET_PROBLEM_LIST_WAITING, GET_PROBLEM_LIST_SUCCESS, GET_PROBLEM_LIST_FAIL } from '../constants'

const initialState = {
  fetching: false,
  error: false,
  problems: [],
};

export default function problem(state = initialState, action) {
  if(action.type === GET_PROBLEM_LIST_WAITING) {
    return { fetch: false, error: false, problems: []}
  }
  else if(action.type === GET_PROBLEM_LIST_SUCCESS) {
    return { fetch: true, error: false, problems: action.problems}
  }
  else if(action.type === GET_PROBLEM_LIST_FAIL) {
    return { fetch: false, error: true, problems: []}
  }
  return state
}
