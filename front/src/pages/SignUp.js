import React from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/user'

class SignUp extends React.Component {
  componentWillMount() {
    this.state = {email: '', password1: '', password2: '', name: ''};
    this.handlerLogin = this.handlerLogin.bind(this);
    this.handlerChangeEmail = this.handlerChangeEmail.bind(this);
    this.handlerChangeName = this.handlerChangeName.bind(this);
    this.handlerChangePassword1 = this.handlerChangePassword1.bind(this);
    this.handlerChangePassword2 = this.handlerChangePassword2.bind(this);
  }

  handlerChangeEmail(event){
    this.setState({email: event.target.value});
  }

  handlerChangeName(event){
    this.setState({name: event.target.value});
  }

  handlerChangePassword1(event){
    this.setState({password1: event.target.value});
  }

  handlerChangePassword2(event){
    this.setState({password2: event.target.value});
  }

  handlerLogin(event){
    event.preventDefault();

    const { register } = this.props;
    const { name, email, password1, password2 } = this.state;

    if( email === '' || password1 === '' || password2 === '' || name === ''){
      return alert('회원가입 양식을 채워주세요.');
    }

    if( password1 !== password2){
      return alert('암호가 일치하지 않습니다.');
    }

    register(name, email, password1)
  }

  _errorRender(){
    const { error } = this.props;
    if( error === false) return '';

    return (
      <p className="bg-danger text-center" style={{padding: '5px', 'marginBottom': '0px'}}>회원가입이 실패했습니다.</p>
    )
  }

  render() {
    return (
      <div>
        <div className="text-center">
          <h3>회원 가입</h3>
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
                  <label htmlFor="name">이름</label>
                  <input type="text" className="form-control" onChange={this.handlerChangeName} placeholder="Name"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">암호</label>
                  <input type="password" className="form-control" onChange={this.handlerChangePassword1} placeholder="Password"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">재입력</label>
                  <input type="password" className="form-control" onChange={this.handlerChangePassword2} placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">회원가입</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.user.error
});
export default connect(mapStateToProps, {register})(SignUp);
