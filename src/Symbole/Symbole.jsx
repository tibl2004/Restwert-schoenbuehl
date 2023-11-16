import React, { useState } from 'react';
import './Symbole.scss'; // Stellen Sie sicher, dass der Import-Pfad korrekt ist

const Symbol = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000); // Zurücksetzen nach 1 Sekunde
      })
      .catch(error => {
        console.error('Fehler beim Kopieren: ', error);
      });
  };

  return (
    <div className="symbol">
      <span>{content}</span>
      <button
        onClick={copyToClipboard}
        className={copied ? 'copied' : ''}
      >
        {copied ? '✔' : 'Kopieren'}
      </button>
    </div>
  );
}

const Symbole = () => {
  const symbols = ['Ø', '♀', '♂'];

  return (
    <div className='App'>
    <h1>Symbole</h1>
      {symbols.map((symbol, index) => (
        <Symbol key={index} content={symbol} />
      ))}
    </div>
  );
}

export default Symbole;
