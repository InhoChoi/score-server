import { LOGIN_WAITING, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants'

const initialState = {
  fetching: false,
  error: false,
  token: '',
  userid: ''
};

export default function auth(state = initialState, action) {
  if(action.type === LOGIN_WAITING) {
    return { fetch: false, error: false, token: '', userid: ''}
  }
  else if(action.type === LOGIN_SUCCESS) {
    return { fetch: true, error: false, token: action.token, userid: action.userid}
  }
  else if(action.type === LOGIN_FAIL) {
    return { fetch: false, error: true, token: '', userid: ''}
  }
  return state
}
