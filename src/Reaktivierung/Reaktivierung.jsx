import React, { useState } from 'react';
import './Reaktiverung.scss';

function Reaktivierung() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return ` / ${day}.${month}.${year}`;
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  const copyToClipboard = () => {
    const formattedDate = formatDate(selectedDate);
    navigator.clipboard.writeText(formattedDate).then(() => {
      
    });
  };

  return (
    <div>
      <h1>Reaktivierung</h1>
      <div className='formatierung'>
      <label htmlFor="datePicker">Wähle ein Datum: </label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate.toISOString().split('T')[0]}
        onChange={handleDateChange}
      />
      <button onClick={copyToClipboard}>Kopieren</button>
      </div>
    </div>
  );
}

export default Reaktivierung;
