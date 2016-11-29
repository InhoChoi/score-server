import { REGISTER_WAITING, REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_SERVER_ERROR } from '../constants'

const initialState = {
  fetching: false,
  code: 0
}

export default function register(state = initialState, action) {
  if(action.type === REGISTER_SUCCESS) {
    return { fetch: false, code: action.code}
  }
  else if(action.type === REGISTER_WAITING) {
    return { fetch: true, code: action.code}
  }
  else if(action.type === REGISTER_FAIL) {
    return { fetch: false, code: action.code}
  }
  else if(action.type === REGISTER_SERVER_ERROR) {
    return { fetch: false, code: action.code}
  }
  return state
}
