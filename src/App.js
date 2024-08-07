import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/hero';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import GiveItem from './pages/GiveItem';
import SearchItems from './pages/SearchItems';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Give and Take Hub</h1>
        <Routes>
          <Route exact path="/" component={Hero} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/give" element={<GiveItem />} />
          <Route path="/search" element={<SearchItems />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;