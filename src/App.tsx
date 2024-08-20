import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/hero/Hero';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import GiveItem from './pages/GiveItem';
import SearchItems from './pages/SearchItems';

function App() {
  return (
    <Router>
  
        <Routes>
        <Route path="/" element={
          <div className="App">
            <h1>Give and/or Take Hub</h1>
            <Hero />
          </div>
        } />
          <Route path="/" element={<Hero />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/give" element={<GiveItem />} />
          <Route path="/search" element={<SearchItems />} />
        </Routes>
    </Router>
  );
}

export default App;