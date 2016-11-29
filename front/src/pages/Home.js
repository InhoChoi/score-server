import React from 'react'
import { connect } from 'react-redux'
import { increase, decrease } from '../actions/count'

function Home({ number, increase, decrease }) {
  return (
    <div className="container">
      <div className="col-md-12">
        변경된 숫자: {number}
      </div>
      <div className="col-md-12">
        <a className="col-md-6 btn btn-default" onClick={() => increase(1)}>Increase</a>
        <a className="col-md-6 btn btn-default" onClick={() => decrease(1)}>Decrease</a>
      </div>
    </div>
  )
}

export default connect(
  state => ({ number: state.count.number }),
  { increase, decrease }
)(Home)
