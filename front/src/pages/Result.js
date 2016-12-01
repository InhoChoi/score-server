import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getResults } from '../actions/result'

class Result extends React.Component{
  componentWillMount() {
    const { getResults } = this.props;
    getResults();
  }

  dateFormat(date){
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
  }

  _renderResult(){
    const { fetching, error, results } = this.props;
    if( error === true) return '';
    if( fetching === true) return '';

    const list = results.map((result)=>{
      let status = '';
      if( result.status === 'Correct'){
        status = <Link className="btn btn-success" to={"/result/"+result.id}>정답</Link>;
      }else if( result.status === 'Wrong'){
        status = <Link className="btn btn-danger" to={"/result/"+result.id}>오답</Link>;
      }else if( result.status === 'Complie Error'){
        status = <Link className="btn btn-danger" to={"/result/"+result.id}>컴파일 에러</Link>;
      }else{
        status = <Link className="btn btn-warning" to={"/result/"+result.id}>대기중</Link>;
      }
      return(
        <tr key={result.id}>
          <th className="text-center" style={{verticalAlign: 'middle'}}>{result.id}</th>
          <th style={{verticalAlign: 'middle'}}>{this.dateFormat(result.createdAt)}</th>
          <th style={{verticalAlign: 'middle'}}><Link to="/problem/1">{result.title}</Link></th>
          <th style={{verticalAlign: 'middle'}}>{status}</th>
        </tr>
      )
    });

    return list;
  }
  render(){
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
                <th className="col-md-7">문제 제목</th>
                <th className="col-md-2">결과</th>
              </tr>
            </thead>
            <tbody>
              {this._renderResult()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  fetching: state.result.fetching,
  error: state.result.error,
  results: state.result.results
});
export default connect(mapStateToProps, {getResults})(Result);
