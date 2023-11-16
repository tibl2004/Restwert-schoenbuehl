import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tagesplanung.scss";

function Tagesplanung() {
  const [boxes, setBoxes] = useState([]);
  const [names, setNames] = useState([]); // Zustand für die Liste der Namen
  const [newName, setNewName] = useState(""); // Zustand für den neuen Namen
  const [nameBoxesMap, setNameBoxesMap] = useState({});

  useEffect(() => {
    // Axios-Aufruf, um Boxen abzurufen
    axios.get("https://users-8a52.onrender.com/boxes")
      .then((response) => {
        setBoxes(response.data);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Daten: ", error);
        // Set a default value for boxes or handle the error in some way
        setBoxes([]);
      });
  }, []);

  const handleDrop = (e, name) => {
    e.preventDefault();
    const boxId = e.dataTransfer.getData("boxId");

    // Hier fügen wir die Box zum Namen hinzu
    const updatedNameBoxesMap = { ...nameBoxesMap };
    updatedNameBoxesMap[name] = [...(updatedNameBoxesMap[name] || []), boxId];
    setNameBoxesMap(updatedNameBoxesMap);
  };

  const handleDragStart = (e, boxId) => {
    e.dataTransfer.setData("boxId", boxId);
  };

  const handleAddNameClick = () => {
    if (newName.trim() !== "") {
      setNames([...names, newName]);
      setNewName("");
    }
  };

  return (
    <div className="App">
      <h1>Tagesplanung</h1>
      <div className="box-container">
        <div className="addNameContainer">
          <input
            type="text"
            placeholder="Neuer Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleAddNameClick}>Hinzufügen</button>
        </div>
        {names.map((name, index) => (
          <div
            key={index}
            className="name-container"
            onDrop={(e) => handleDrop(e, name)}
            onDragOver={(e) => e.preventDefault()}
          >
            <p>{name}</p>
            {nameBoxesMap[name] && nameBoxesMap[name].map((boxId, boxIndex) => {
              const box = boxes.find((box) => box.id === boxId);
              if (box) {
                return (
                  <div key={boxIndex} className="box-in-name-container">
                    <div
                      style={{ backgroundColor: box.backgroundColor }}
                      className="box-content"
                      draggable
                      onDragStart={(e) => handleDragStart(e, box.id)}
                    >
                      {box.text}
                    </div>
                  </div>
                );
              }
              return null; // Wenn keine passende Box gefunden wurde
            })}
          </div>
        ))}
        {boxes && boxes.map((box, index) => (
          <div
            key={index}
            className="aufgaben"
            style={{ backgroundColor: box.backgroundColor }}
            draggable
            onDragStart={(e) => handleDragStart(e, box.id)}
          >
            {box.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tagesplanung;
