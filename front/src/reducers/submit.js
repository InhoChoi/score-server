import { SUBMIT_CODE_INIT, SUBMIT_CODE_WAITING, SUBMIT_CODE_SUCCESS, SUBMIT_CODE_FAIL} from '../constants'

const initialState = {
  posting: false,
  error: false
};

export default function submit(state = initialState, action){
  if( action.type === SUBMIT_CODE_INIT ){
    return { posting: false, error: false};
  }else if( action.type === SUBMIT_CODE_WAITING){
    return { posting: true, error: false};
  }else if( action.type === SUBMIT_CODE_SUCCESS){
    return { posting: false, error: false};
  }else if( action.type === SUBMIT_CODE_FAIL){
    return { posting: false, error: true};
  }
  return state;
}
