import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'

function ProblemDetail({ params, problems }) {
  const problem = problems.filter((problem) => problem.id === parseInt(params.id, 10));
  if( problem.length === 0 ) {
    browserHistory.push('/problem');
    return <div></div>;
  }

  const splitedContent = problem[0].content.split('\n');
  let count = 0;
  const content =  splitedContent.map((content)=>{
    return <p key={count++}> {content}</p>
  });

  return(
    <div>
      <div className="panel panel-info">
        <div className="panel-heading">
          <h1 className="panel-title">{problem[0].title}</h1>
        </div>
        <div className="panel-body">
          {content}
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
