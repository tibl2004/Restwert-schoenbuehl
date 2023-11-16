import React, { useState } from 'react';
import './Schluss.scss'; // Stellen Sie sicher, dass der Import-Pfad zur CSS-Datei korrekt ist

function Schluss() {
  const restwertText = "Projekt Restwert Schönbühl";
  const oeffnungszeitenText = "Öffnungszeiten: Montag - Freitag 08:00 - 12:00 Uhr und 13:00 - 16:30 Uhr";
  const copiedText = `${restwertText}\n${oeffnungszeitenText}`;

  const handleCopyText = () => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = copiedText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    } catch (error) {
      console.error('Kopieren fehlgeschlagen:', error);
    }
  };

  return (
    <div className="App">
      <div>
        <strong className="fett">{restwertText}</strong>
        <br />
        {oeffnungszeitenText}
      </div>
      <button onClick={handleCopyText}>Kopieren</button>
    </div>
  );
}

export default Schluss;