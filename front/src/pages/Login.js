import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth'

class Login extends React.Component {
  componentWillMount() {
  }
  render() {
    const { login } = this.props;
    return (
      <div className="container">
        <div className="col-md-12">
          <a className="col-md-12 btn btn-default" onClick={() => login("2","3")}>Login</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {login})(Login);
