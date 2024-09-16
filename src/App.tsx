import React from 'react';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <h1>Debugging Before:::</h1>
    <Outlet />
      <h1>Debugging After:::</h1>
  </div>
  );
}

export default App;