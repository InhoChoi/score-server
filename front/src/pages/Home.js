import React from 'react'

function Home({fetching, code, create_token}) {
  return (
    <div>
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">공지사항</h3>
        </div>
        <div className="panel-body">
          공지사항이 들어가는 공간입니다.
        </div>
      </div>
    </div>
  )
}

export default Home
