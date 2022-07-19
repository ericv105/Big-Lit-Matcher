import React, { useState, useEffect, Fragment } from 'react';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message))
  },[data])

  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <p>{!data ? "Loading..." : data}</p>
        </header>
      </div>
      <div>
        
      </div>
    </Fragment>
    
  );
}

export default App;
