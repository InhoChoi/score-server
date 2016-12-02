import React from 'react'
import { connect } from 'react-redux'
import { submitCode, initSubmitCode } from '../actions/submit'
import { browserHistory } from 'react-router'

class ProblemSubmit extends React.Component{
  componentWillMount(){
    const { initSubmitCode, problems, params } = this.props;

    const problem = problems.filter((problem) => problem.id === parseInt(params.id, 10));
    if( problem.length === 0 ) return browserHistory.push('/problem');

    initSubmitCode();
    this.state = {code: ''};
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.handlerChangeCode = this.handlerChangeCode.bind(this);
  }

  handlerSubmit(){
    const { params, submitCode } = this.props;
    const id = parseInt(params.id, 10);

    submitCode(id, this.state.code);
  }

  handlerChangeCode(event){
    this.setState({code: event.target.value});
  }

  _renderButton(){
    const { posting, error } = this.props;
    if( posting === true)
      return <p className="btn btn-warning text-left">제출중...</p>;
    else if( error === true)
      return <p className="btn btn-danger text-left">제출 에러!</p>;

    return <p className="btn btn-info text-left" onClick={this.handlerSubmit}>제출하기</p>;
  }

  render(){
    return(
      <div>
        <div className="panel panel-info">
          <div className="panel-heading">코드 제출하기</div>
          <div className="panel-body">
            <div className="form-group">
              <textarea className="form-control" rows="20" onChange={this.handlerChangeCode}></textarea>
            </div>
          </div>
          <div className="panel-footer">
            {this._renderButton()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posting: state.submit.posting,
  error: state.submit.error,
  problems: state.problem.problems
});
export default connect(mapStateToProps,{submitCode, initSubmitCode})(ProblemSubmit);
