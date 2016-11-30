import React from 'react';
import NavBar from '../NavBar'

function App({ children }){
  return(
    <div>
      <NavBar />
      <div className="container">
        { children }
      </div>
    </div>
  )
}

export default App;
