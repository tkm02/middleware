import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';

const API_URL = 'http://localhost:5000';

function Form() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ firstname: '', lastname: '', class: '', eventId: '' });
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateQRCode = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    try {
      const response = await axios.post(`${API_URL}/ticket`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setQrCode(response.data.qrCodeBase64);
      console.log(qrCode);
      
      
    } catch (error) {
      console.error('Erreur lors de la génération du QR code:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Générer un QR Code</h2>
      <form onSubmit={generateQRCode} className="form">
        <input name="lastname" placeholder="Nom" onChange={handleInputChange} required className="input" />
        <input name="firstname" placeholder="Prénom" onChange={handleInputChange} required className="input" />
        <input name="class" placeholder="Classe" onChange={handleInputChange} required className="input" />
        <select name="eventId" onChange={handleInputChange} required className="select">
          <option value="">Sélectionnez un événement</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>{event.name}</option>
          ))}
        </select>
        <button type="submit" className="button primary">Générer QR Code</button>
      </form>

      {qrCode && ( 
        <div className="qr-code">
          <h3>Votre QR Code</h3>
          <img src={qrCode} alt="QR Code" className="qr-image" />
        </div>
      )}
    </div>
  );
}

export default Form;
