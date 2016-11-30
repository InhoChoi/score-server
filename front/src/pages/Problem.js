import React from 'react'
import { Link } from 'react-router'

function Problem() {
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
          <tbody>
            <tr>
              <th className="text-center" style={{verticalAlign: 'middle'}}>1</th>
              <th style={{verticalAlign: 'middle'}}>2016-11-31 11:22</th>
              <th style={{verticalAlign: 'middle'}}><Link to="/problem/1">문제에 대한 제목이 나옵니다.</Link></th>
              <th><Link className="btn btn-info" style={{fontSize: '14px'}} to="/problem/1/submit">제출하기</Link></th>
            </tr>
            <tr>
              <th className="text-center" style={{verticalAlign: 'middle'}}>1</th>
              <th style={{verticalAlign: 'middle'}}>2016-11-31 11:22</th>
              <th style={{verticalAlign: 'middle'}}><Link to="/problem/1">문제에 대한 제목이 나옵니다.</Link></th>
              <th><Link className="btn btn-info" style={{fontSize: '14px'}} to="/problem/1/submit">제출하기</Link></th>
            </tr>
            <tr>
              <th className="text-center" style={{verticalAlign: 'middle'}}>1</th>
              <th style={{verticalAlign: 'middle'}}>2016-11-31 11:22</th>
              <th style={{verticalAlign: 'middle'}}><Link to="/problem/1">문제에 대한 제목이 나옵니다.</Link></th>
              <th><Link className="btn btn-info" style={{fontSize: '14px'}} to="/problem/1/submit">제출하기</Link></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Problem;
