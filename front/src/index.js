import './index.css'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, Redirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store'
import { API_URL } from './config'
import axios from 'axios'

import App from './components/App'
import Home from './pages/Home'
import Login from './pages/Login'
import Problem from './pages/Problem'
import ProblemDetail from './pages/ProblemDetail'
import ProblemSubmit from './pages/ProblemSubmit'
import Result from './pages/Result'
import ResultDetail from './pages/ResultDetail'

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const isAuth = async (nextState, replace, callback) => {
  if( localStorage.getItem('token') ){
    try {
      await axios.get(API_URL + '/auth', { headers: { token: localStorage.getItem('token')}});
    } catch (e) {
      replace('/login');
    }
  }
  callback();
};

const isNeedLogin = async (nextState, replace, callback) => {
  if( localStorage.getItem('token') ){
    try {
      await axios.get(API_URL + '/auth', { headers: { token: localStorage.getItem('token')}});
      replace('/');
    } catch (e) {
    }
  }
  callback();
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} onEnter={isAuth}>
        <Route path="/" component={Home} />
        <Route path="/problem" component={Problem}/>
        <Route path="/problem/:id" component={ProblemDetail}/>
        <Route path="/problem/:id/submit" component={ProblemSubmit}/>
        <Route path="/result" component={Result}/>
        <Route path="/result/:id" component={ResultDetail}/>
      </Route>
      <Route path="/login" component={Login} onEnter={isNeedLogin}/>
      <Redirect from="*" to="/"/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
