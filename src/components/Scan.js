import React, { useState } from 'react';
import { QrReader } from '@chaiwei/react-qr-reader';

const API_URL = 'http://localhost:5000';

function Scan() {
  const [scanResult, setScanResult] = useState(null);
  const [eventId, setEventId] = useState('');
  const [error, setError] = useState('');

  const handleScan = async (result) => {
    if (result && eventId) {
      console.log("Scan result: ", result?.text);  // Pour déboguer
      try {
        const response = await fetch(`${API_URL}/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ participantId: result?.text, scannerId: eventId }),
        });
        if (!response.ok) throw new Error('Erreur lors de la vérification du QR code');
        const data = await response.json();
        setScanResult(data);
      } catch (error) {
        console.error('Erreur:', error);
        setScanResult({ valid: false, message: 'Erreur lors de la vérification' });
      }
    }
  };

  const handleError = (err) => {
    console.error("Erreur du QR Reader: ", err);  // Pour capturer les erreurs
    setError('Impossible d\'accéder à la caméra.');
  };

  return (
    <div className="qr-scanner-container">
      <h2>Scanner un QR Code</h2>
      <input 
        type="text" 
        placeholder="ID de l'événement" 
        value={eventId} 
        onChange={(e) => setEventId(e.target.value)}
        className="input"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <QrReader
        constraints={{ facingMode: ''}}
        onResult={handleScan}
        onError={handleError}  // Capture des erreurs
        style={{ width: '100%', maxWidth: '400px' }}
      />
      {scanResult && (
        <div className={`scan-result ${scanResult.valid ? 'valid' : 'invalid'}`}>
          <h3>Résultat du scan</h3>
          <p className={scanResult.valid ? 'valid' : 'invalid'}>
            {scanResult.message}
          </p>
          {scanResult.valid && scanResult.participant && (
            <p>
              Participant: {scanResult.participant.name} {scanResult.participant.surname}, 
              Classe: {scanResult.participant.classe}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Scan;
