import React from 'react'
import { connect } from 'react-redux'
import { registerProblem } from '../actions/problem'

class RegisterProblem extends React.Component {
  componentWillMount(){
    this.state = {title: '', content: '', input: '', output: ''};
    this.handlerRegister = this.handlerRegister.bind(this);
    this.handlerChangeTitle = this.handlerChangeTitle.bind(this);
    this.handlerChangeContent = this.handlerChangeContent.bind(this);
    this.handlerChangeInput = this.handlerChangeInput.bind(this);
    this.handlerChangeOutput = this.handlerChangeOutput.bind(this);
  }

  handlerRegister(){
    const { registerProblem } = this.props;
    const { title, content, input, output} = this.state;

    if(title === '' || content === '' || input === '' || output === ''){
      return alert('모든 항목에 입력이 필요합니다.');
    }

    registerProblem(title, content, input, output);
  }

  handlerChangeTitle(event){
    this.setState({title: event.target.value});
  }

  handlerChangeContent(event){
    this.setState({content: event.target.value});
  }

  handlerChangeInput(event){
    this.setState({input: event.target.value});
  }

  handlerChangeOutput(event){
    this.setState({output: event.target.value});
  }

  render(){
    return(
      <div>
        <div className="panel panel-info">
          <div className="panel-heading">
            문제 등록하기
          </div>

          <ul className="list-group">
            <li className="list-group-item">제목</li>
            <div className="panel-body">
              <div className="form-group">
                <input className="form-control" onChange={this.handlerChangeTitle}></input>
              </div>
            </div>
            <li className="list-group-item">설명</li>
            <div className="panel-body">
              <div className="form-group">
                <textarea className="form-control" rows="10" onChange={this.handlerChangeContent}></textarea>
              </div>
            </div>
            <li className="list-group-item">테스트 케이스</li>
            <div className="panel-body">
              <div className="col-sm-6 form-group">
                <label>입력값</label>
                <textarea className="form-control" rows="10" onChange={this.handlerChangeInput}></textarea>
              </div>
              <div className="col-sm-6 form-group">
                <label>출력값</label>
                <textarea className="form-control" rows="10" onChange={this.handlerChangeOutput}></textarea>
              </div>
            </div>
          </ul>
          <div className="panel-footer">
            <button className="btn btn-info" onClick={this.handlerRegister}>제출하기</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps,{registerProblem})(RegisterProblem);
