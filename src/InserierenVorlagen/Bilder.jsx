import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes, faQuestionCircle, faFilePdf, faCopy } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import '../Erfassen/Erfassen.scss';

function Bilder() {
  const [artworkData, setArtworkData] = useState({
    "Künstler": '',
    "Motiv": '',
    "Material": '',
    "Masse (LxBxH)": '',
    "Zustand": '',
  });

  const [frameData, setFrameData] = useState({
    "Marke": '',
    "Material": '',
    "Masse (LxBxH)": '',
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
    setArtworkData({
      "Künstler": '',
      "Motiv": '',
      "Material": '',
      "Masse (LxBxH)": '',
      "Zustand": '',
    });

    setFrameData({
      "Marke": '',
      "Material": '',
      "Masse (LxBxH)": '',
      "Zustand": '',
    });

    setCopiedData('');
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    // Informationen zum Kunstwerk hinzufügen
    Object.entries(artworkData).forEach(([label, value]) => {
      doc.text(20, yPos, `${label}: ${value}`);
      yPos += 10;
    });

    // Informationen zum Rahmen hinzufügen
    yPos += 10; // Abstand zwischen Kunstwerk und Rahmen
    Object.entries(frameData).forEach(([label, value]) => {
      doc.text(20, yPos, `${label}: ${value}`);
      yPos += 10;
    });

    doc.save('exported-data.pdf');
  };

  const handleInputChange = (label, value, dataType) => {
    if (dataType === 'artwork') {
      setArtworkData((prevData) => ({
        ...prevData,
        [label]: value,
      }));
    } else if (dataType === 'frame') {
      setFrameData((prevData) => ({
        ...prevData,
        [label]: value,
      }));
    }
  };

  const handleCopyAll = () => {
    let text = '';

       // Füge den Werbetext hinzu
    text += "\n(Werbetext, Beschreibung vom Bild oder Rahmen)\n\n";
  
    // Kopiere "Bei Bild" (fett)
    text += "Bei Bild:\n";
  
    // Informationen zum Kunstwerk kopieren
    Object.entries(artworkData).forEach(([label, value]) => {
      text += `${label}: ${value}\n`;
    });
  
    text += "\n"; // Abstand zwischen Kunstwerk und Rahmen
  
    // Kopiere "Bei Rahmen" (fett)
    text += "Bei Rahmen:\n";
  
    // Informationen zum Rahmen kopieren
    Object.entries(frameData).forEach(([label, value]) => {
      text += `${label}: ${value}\n`;
    });
  

  
    // Füge den Restwert-Text hinzu
    text += "\nProjekt Restwert Schönbühl\nÖffnungszeiten: Montag - Freitag 08:00 - 12:00 Uhr und 13:00 - 16:30 Uhr";
  
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
        <h2>Bei Bild</h2>
        {Object.entries(artworkData).map(([label, value]) => (
          <div key={label} className="input-field">
            <label style={{ fontSize: '18px', marginRight: '10px' }}>{label}:</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(label, e.target.value, 'artwork')}
            />
          </div>
        ))}
      
        <h2>Bei Rahmen</h2>
        {Object.entries(frameData).map(([label, value]) => (
          <div key={label} className="input-field">
            <label style={{ fontSize: '18px', marginRight: '10px' }}>{label}:</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(label, e.target.value, 'frame')}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bilder;
