import React, { useState } from 'react';
import './Versand.scss';

function Versand() {
  const tableData = [
    { id: 1, format: 'B5', dicke: '2 cm', gewicht: '1 - 100g', porto: 'CHF 0.90', faktura: 'CHF 1.05' },
    { id: 2, format: '', dicke: '', gewicht: '101 - 250g', porto: 'CHF 1.15', faktura: 'CHF 1.55' },
    { id: 3, format: '', dicke: '2 - 5 cm', gewicht: '1 - 100g', porto: 'CHF 2.40', faktura: 'CHF 2.55' },
    { id: 4, format: '', dicke: '', gewicht: '101 - 250g', porto: 'CHF 2.65', faktura: 'CHF 3.05' },
    { id: 5, format: 'Grossbrief (bis B4)', dicke: '2 cm', gewicht: '1 - 500 g', porto: 'CHF 1.85', faktura: 'CHF 2.55' },
    { id: 6, format: '', dicke: '', gewicht: '501 - 1000 g', porto: 'CHF 3.65', faktura: 'CHF 4.05' },
  ];

  const pakete = [
    { id: 1, masse: 'Bis 60.0 cm x 40.0 cm x 41.0 cm', gewicht: 'Bis 2 kg', priceStandard: 'CHF 8.50', priceExtra: 'CHF 12.50' },
    { id: 2, masse: '', gewicht: 'Bis 5 kg', priceStandard: 'CHF 10.00', priceExtra: 'CHF 14.00' },
    { id: 3, masse: '', gewicht: 'Bis 10 kg', priceStandard: 'CHF 12.00', priceExtra: 'CHF 16.00' },
    { id: 4, masse: '', gewicht: 'Bis 30 kg', priceStandard: 'CHF 15.00', priceExtra: 'CHF 19.00' },
  ];

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    const [, amount] = text.split(' ');

    const tempInput = document.createElement('input');
    tempInput.value = amount;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 3000);
  };

  const handlePaketPrice = (id, text) => {
    const [, amount] = text.split(' ');

    const tempInput = document.createElement('input');
    tempInput.value = amount;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 3000);
  };

  return (
    <div>
      <h1>Versand</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Format</th>
            <th>Dicke *</th>
            <th>Gewicht</th>
            <th>Portokosten Post</th>
            <th>Faktura-Preis **</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData) => (
            <tr key={rowData.id}>
              <td>{rowData.format}</td>
              <td>{rowData.dicke}</td>
              <td>{rowData.gewicht}</td>
              <td>{rowData.porto}</td>
              <td
                id={`fak-${rowData.id}`}
                onClick={() => handleCopy(`fak-${rowData.id}`, rowData.faktura)}
                className={copiedId === `fak-${rowData.id}` ? 'copied' : ''}
              >
                {rowData.faktura}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>* Dicke = Kuvert + Inhalt</p>
      <p>** Faktura-Preis = Portokosten Post + Zuschlag für Verpackungsmaterial</p>

      <h2>Pakete</h2>

      <table border="1" className='pakete-table'>
        <thead>
          <tr>
            <th>Masse</th>
            <th>Gewicht</th>
            <th>Preis Standard</th>
            <th>Preis Extra</th>
          </tr>
        </thead>
        <tbody>
          {pakete.map((paket, index) => (
            <tr key={paket.id}>
              {index === 0 ? (
                <>
                  <td rowSpan={pakete.length}>{paket.masse}</td>
                </>
              ) : null}
              <td>{paket.gewicht}</td>
              <td
                id={`paket-${paket.id}`}
                onClick={() => handlePaketPrice(`paket-${paket.id}`, paket.priceStandard)}
                className={copiedId === `paket-${paket.id}` ? 'copied' : ''}
              >
                {paket.priceStandard}
              </td>
              <td>{paket.priceExtra}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Versand;
