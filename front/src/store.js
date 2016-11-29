import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware} from 'react-router-redux'
import * as reducers from './reducers';

export default function configureStore(browserHistory){
  const reduxRouterMiddleware = routerMiddleware(browserHistory);
  return createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer
    }),
    applyMiddleware(reduxRouterMiddleware, thunk)
  );
}
