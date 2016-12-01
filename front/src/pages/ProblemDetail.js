import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'

function ProblemDetail({ params, problems }) {
  const problem = problems.filter((problem) => problem.id === parseInt(params.id, 10));
  if( problem.length === 0 ) {
    browserHistory.push('/problem');
    return <div></div>;
  }

  return(
    <div>
      <div className="panel panel-info">
        <div className="panel-heading">
          <h1 className="panel-title">{problem[0].title}</h1>
        </div>
        <div className="panel-body">
          {problem[0].content}
        </div>
        <div className="panel-footer">
          <Link className="btn btn-info text-left" to={"/problem/"+problem[0].id+"/submit"}>제출하기</Link>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => ({
  problems: state.problem.problems
});
export default connect(mapStateToProps)(ProblemDetail);
