import { LOGIN_WAITING, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants'

const initialState = {
  fetching: false,
  token: '',
  userid: ''
};

export default function auth(state = initialState, action) {
  if(action.type === LOGIN_WAITING) {
    return { fetch: false, token: '', userid: ''}
  }
  else if(action.type === LOGIN_SUCCESS) {
    return { fetch: true, token: action.token, userid: action.userid}
  }
  else if(action.type === LOGIN_FAIL) {
    return { fetch: false, token: '', userid: ''}
  }
  return state
}
