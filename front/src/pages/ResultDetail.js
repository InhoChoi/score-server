import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

function ResultDetail({ results, params }) {
  const result = results.filter((result) => result.id === parseInt(params.id, 10));
  if( result.length === 0 ) {
    browserHistory.push('/result');
    return <div></div>;
  }

  let status = '';
  if( result[0].status === 'Correct'){
    status = <p className="btn btn-success">정답</p>;
  }else if( result[0].status === 'Wrong'){
    status = <p className="btn btn-danger">오답</p>;
  }else if( result[0].status === 'Complie Error'){
    status = <p className="btn btn-danger">컴파일 에러</p>;
  }else if( result[0].status === 'Timeout'){
    status = <p className="btn btn-danger">시간 초과</p>;
  }else{
    status = <p className="btn btn-warning">대기중</p>;
  }


  return(
    <div>
        <div className="panel panel-info">
          <div className="panel-heading">결과 상세정보</div>
          <ul className="list-group">
            <li className="list-group-item">{status}</li>
          </ul>
          <ul className="list-group">
            <li className="list-group-item">제출 된코드</li>
          </ul>
          <div className="panel-body">
            <div className="form-group">
              <textarea className="form-control" rows="8" value={result[0].code} readOnly></textarea>
            </div>

          </div>
          <ul className="list-group">
            <li className="list-group-item">결과 메시지</li>
          </ul>
          <div className="panel-body">
            <textarea className="form-control" rows="8" value={result[0].output} readOnly></textarea>
          </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  results: state.result.results
});
export default connect(mapStateToProps)(ResultDetail);
