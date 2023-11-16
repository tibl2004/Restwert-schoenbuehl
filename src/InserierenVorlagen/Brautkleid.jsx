import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes, faQuestionCircle, faFilePdf, faCopy } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import '../Erfassen/Erfassen.scss';

function Brautkleid() {
  const [data, setData] = useState({
    "Details (Spitze, Floral, Stickereien, Glitzer, etc.)": '',
    "Grösse Modell": '',
    "Marke / Designer / Linie": '',
    "Farbe": '',
    "Material": '',
    "Schnitt / Ausschnitt": '',
    "Gewicht": '',
    "Grösse": '',
    "Brustumfang": '',
    "Taillenumfang": '',
    "Hüftumfang": '',
    "Schleppenlänge": '',
    "Alter / Jahr gekauft wurde": '',
    "Neupreis": '',
    "Zustand": '',
  });

  const [copiedData, setCopiedData] = useState('');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const pdfRef = useRef();

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const closeOverlay = () => {
    setIsOverlayVisible(false);
  };

  const handleClearAll = () => {
    setData({
      "Details": '',
      "Grösse Modell": '',
      "Marke / Designer / Linie": '',
      "Farbe": '',
      "Material": '',
      "Schnitt / Ausschnitt": '',
      "Gewicht": '',
      "Grösse": '',
      "Brustumfang": '',
      "Taillenumfang": '',
      "Hüftumfang": '',
      "Schleppenlänge": '',
      "Alter / Jahr gekauft wurde": '',
      "Neupreis": '',
      "Zustand": '',
    });
    setCopiedData('');
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    Object.entries(data).forEach(([label, value]) => {
      doc.text(20, yPos, `${label}: ${value}`);
      yPos += 10;
    });

    doc.text(
      20,
      yPos + 20,
      "Werbetext und Beschreibung\n\nProjekt Restwert Schönbühl\nÖffnungszeiten: Montag - Freitag 08:00 - 12:00 Uhr und 13:00 - 16:30 Uhr"
    );

    doc.save('exported-data.pdf');
  };

  const handleInputChange = (label, value) => {
    setData((prevData) => ({
      ...prevData,
      [label]: value,
    }));
  };

  const handleCopyAll = () => {
    let text = '';
    Object.entries(data).forEach(([label, value]) => {
      text += `${label}: ${value}\n`;
    });

    text += "Werbetext und Beschreibung\n\n Projekt Restwert Schönbühl\nÖffnungszeiten: Montag - Freitag 08:00 - 12:00 Uhr und 13:00 - 16:30 Uhr";

    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setCopiedData(text);
    } catch (error) {
      console.error('Kopieren fehlgeschlagen:', error);
    }
  };

  return (
    <div className="App">
      <div className='button-container'>
        <button
          onClick={handleClearAll}
          style={{
            backgroundColor: 'red',
            color: 'white',
          }}
        >
          <span className="trash-icon">
            <FontAwesomeIcon icon={faTrash} /> Alle Eingaben Löschen
          </span>
        </button>
        <button onClick={toggleOverlay} className="question-button">
          <FontAwesomeIcon icon={faQuestionCircle} /> Tutorial
        </button>
        <button onClick={handleExportToPDF} className="export-button">
          <FontAwesomeIcon icon={faFilePdf} /> PDF Exportieren
        </button>
        <button
          onClick={handleCopyAll}
          style={{
            backgroundColor: 'limegreen',
            color: 'white',
          }}
        >
          <FontAwesomeIcon icon={faCopy} /> Alle Eingaben Kopieren
        </button>
        {isOverlayVisible && (
          <div className="overlay">
            <button className="close-button" onClick={closeOverlay}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            {/* Hier den Inhalt des Overlays platzieren */}
            Hier kommt das Tutorial hin. Es folgt beim nächsten Update. ...
          </div>
        )}
      </div>

      <div className="input-container">
        {Object.entries(data).map(([label, value]) => (
          <div key={label} className="input-field">
            <label style={{ fontSize: '18px', marginRight: '10px' }}>{label}:</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(label, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brautkleid;
