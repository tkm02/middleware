import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Form from './components/Form';
import Scan from './components/Scan';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/generate">Générer QR Code</Link></li>
            <li><Link to="/scan">Scanner QR Code</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Form />} />
          <Route path="/scan" element={<Scan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;