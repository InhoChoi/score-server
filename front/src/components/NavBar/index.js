import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import './index.css'

function NavBar({ dispatch }){
  return(
    <div>
      <div className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Score Server</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="/" activeClassName="active">Home</Link></li>
              <li><Link to="/register" activeClassName="active">문제 등록하기</Link></li>
              <li><Link to="/problem" activeClassName="active">문제</Link></li>
              <li><Link to="/result" activeClassName="active">결과 확인</Link></li>
              <li><Link to="/login" onClick={()=>{ dispatch(logout()); }}>로그아웃</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect()(NavBar);
