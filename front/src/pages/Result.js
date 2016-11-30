import React from 'react'
import { Link } from 'react-router'

function Result() {
  return(
    <div>
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">결과 리스트</h3>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="col-md-1 text-center">#</th>
              <th className="col-md-2">제출 날짜</th>
              <th className="col-md-6">문제 제목</th>
              <th className="col-md-3">결과</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text-center" style={{verticalAlign: 'middle'}}>1</th>
              <th style={{verticalAlign: 'middle'}}>2016-11-31 11:22</th>
              <th style={{verticalAlign: 'middle'}}><Link to="/problem/1">문제에 대한 제목이 나옵니다.</Link></th>
              <th style={{verticalAlign: 'middle'}}><Link className="btn btn-danger" to="/result/1">컴파일 에러</Link></th>
            </tr>
            <tr>
              <th className="text-center" style={{verticalAlign: 'middle'}}>1</th>
              <th style={{verticalAlign: 'middle'}}>2016-11-31 11:22</th>
              <th style={{verticalAlign: 'middle'}}><Link to="/problem/1">문제에 대한 제목이 나옵니다.</Link></th>
              <th style={{verticalAlign: 'middle'}}><Link className="btn btn-danger" to="/result/1">오답</Link></th>
            </tr>
            <tr>
              <th className="text-center" style={{verticalAlign: 'middle'}}>1</th>
              <th style={{verticalAlign: 'middle'}}>2016-11-31 11:22</th>
              <th style={{verticalAlign: 'middle'}}><Link to="/problem/1">문제에 대한 제목이 나옵니다.</Link></th>
              <th style={{verticalAlign: 'middle'}}><Link className="btn btn-success" to="/result/1">정답</Link></th>
            </tr>
            <tr>
              <th className="text-center" style={{verticalAlign: 'middle'}}>1</th>
              <th style={{verticalAlign: 'middle'}}>2016-11-31 11:22</th>
              <th style={{verticalAlign: 'middle'}}><Link to="/problem/1">문제에 대한 제목이 나옵니다.</Link></th>
              <th style={{verticalAlign: 'middle'}}><Link className="btn btn-warning" to="/result/1">대기중</Link></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Result;
