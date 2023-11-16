import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

function Artikel() {
  const handleBoxClick = (title) => {
    // Add your logic here to execute when a box is clicked.
    console.log(`Box "${title}" was clicked.`);
  };

  
  return (
    <div className="container">
      <Link to="/erfassen">
        <Box
          title="Erfassen"
          text="Hier kannst du Artikel erfassen und dann in die Datenbank kopieren."
          onClick={() => handleBoxClick('Erfassen')}
        />
      </Link>
      <Link to="/inserieren">
        <Box
          title="Inserieren"
          text="Hier kannst du den Inhalt von der Datenbank einfügen in die Vorlagen und dann generieren lassen."
          onClick={() => handleBoxClick('Inserieren')}
        />
      </Link>
    
      <Link to="/schluss">
        <Box
          title="Schluss"
          text="Hier kannst du den Schluss kopieren, ohne es jedes Mal einzugeben."
          onClick={() => handleBoxClick('Schluss')}
        />
      </Link>
      
    </div>
  );
}

function Box({ title, text, onClick }) {
  return (
    <div>
      <button className="box" onClick={onClick}>
        <p><strong>{title}</strong></p>
        <p>{text}</p>
      </button>
    </div>
)}

export default Artikel;
