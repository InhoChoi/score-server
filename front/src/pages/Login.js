import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { login } from '../actions/auth'

class Login extends React.Component {
  componentWillMount() {
    this.state = {email: '', password: ''};
    this.handlerLogin = this.handlerLogin.bind(this);
    this.handlerChangeEmail = this.handlerChangeEmail.bind(this);
    this.handlerChangePassword = this.handlerChangePassword.bind(this);
  }

  handlerChangeEmail(event){
    this.setState({email: event.target.value});
  }

  handlerChangePassword(event){
    this.setState({password: event.target.value});
  }

  handlerLogin(event){
    const { login } = this.props;

    event.preventDefault();
    login(this.state.email, this.state.password);
  }

  _errorRender(){
    const { login_error } = this.props;
    if( login_error === false) return '';

    return (
      <p className="bg-danger text-center" style={{padding: '5px', 'marginBottom': '0px'}}>로그인 실패하였습니다</p>
    )
  }
  render() {
    return (
      <div>
        <div className="text-center">
          <h1> Score Server </h1>
        </div>
        <br/>
        <div className="col-md-offset-4 col-md-4">
          <div className="panel panel-default">
            {this._errorRender()}
            <div className="panel-body">
              <form onSubmit={this.handlerLogin}>
                <div className="form-group">
                  <label htmlFor="email">이메일</label>
                  <input type="email" className="form-control" onChange={this.handlerChangeEmail} placeholder="Email"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">암호</label>
                  <input type="password" className="form-control" onChange={this.handlerChangePassword} placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">로그인</button>
                <Link style={{marginLeft: '10px'}} className="btn btn-primary" to="/signup">회원가입</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login_error: state.auth.error
});
export default connect(mapStateToProps, {login})(Login);
