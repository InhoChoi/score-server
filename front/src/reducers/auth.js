import { LOGIN_WAITING, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants'

const initialState = {
  fetching: false,
  error: false,
  token: '',
  userid: ''
};

export default function auth(state = initialState, action) {
  if(action.type === LOGIN_WAITING) {
    return { fetching: false, error: false, token: '', userid: ''}
  }
  else if(action.type === LOGIN_SUCCESS) {
    return { fetching: true, error: false, token: action.token, userid: action.userid}
  }
  else if(action.type === LOGIN_FAIL) {
    return { fetching: false, error: true, token: '', userid: ''}
  }
  return state
}
