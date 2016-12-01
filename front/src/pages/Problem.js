import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getProblems } from '../actions/problem'

class Problem extends React.Component {
  componentWillMount() {
    const { getProblems } = this.props;
    getProblems();
  }

  dateFormat(date){
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
  }

  _renderProblem(){
    const { fetching, error, problems } = this.props;
    if( error === true) return '';
    if( fetching === true) return <p style={{marginLeft: '10px'}}> 불러오는중... </p>;

    const list = problems.map((problem) => {
      return(
        <tr key={problem.id}>
          <th className="text-center" style={{verticalAlign: 'middle'}}>{problem.id}</th>
          <th style={{verticalAlign: 'middle'}}>{this.dateFormat(problem.createdAt)}</th>
          <th style={{verticalAlign: 'middle'}}><Link to={"/problem/"+problem.id}>{problem.title}</Link></th>
          <th><Link className="btn btn-info" style={{fontSize: '14px'}} to={"/problem/"+problem.id+"/submit"}>제출하기</Link></th>
        </tr>
      )
    });

    return (
      <tbody>
        {list}
      </tbody>
    );
  }

  render(){
    return(
      <div>
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">문제 리스트</h3>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="col-md-1 text-center">#</th>
                <th className="col-md-2">생성 날짜</th>
                <th className="col-md-8">문제 제목</th>
                <th className="col-md-1">제출하기</th>
              </tr>
            </thead>
              {this._renderProblem()}
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  fetching: state.problem.fetching,
  error: state.problem.error,
  problems: state.problem.problems
});
export default connect(mapStateToProps, {getProblems})(Problem);
