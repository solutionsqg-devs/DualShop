import React from 'react';

const ConsentModal = ({ onAccept }) => {
  return (
    <div className="consent-modal">
      <div className="consent-content">
        <h2>Consentimiento para Almacenamiento</h2>
        <p>¿Te gustaría permitir el almacenamiento de tu carrito en tu dispositivo?</p>
        <button onClick={onAccept}>Sí, permitir</button>
      </div>
    </div>
  );
};

export default ConsentModal;
