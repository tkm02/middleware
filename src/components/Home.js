import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
function Home() {
  return (
    <div className="home">
      <h1>Bienvenue sur le Système de QR Code pour Événements</h1>
      <p>Que souhaitez-vous faire ?</p>
      <div className="home-buttons">
        <Link to="/generate" className="button primary">Générer un QR Code</Link>
        <Link to="/scan" className="button secondary">Scanner un QR Code</Link>
      </div>
    </div>
  );
}

export default Home;