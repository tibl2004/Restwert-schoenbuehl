import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import "./Admin.scss";

function formatDatum(enddatum) {
  const date = new Date(enddatum);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
}

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    axios.get("https://users-8a52.onrender.com/users")
      .then(response => {
        setAdmins(response.data);
      })
      .catch(error => {
        console.error("Fehler beim Abrufen der Daten: " + error);
      });
  }, []);

  const handleInputChange = (e, adminId) => {
    const { name, value } = e.target;
    const updatedAdmins = admins.map(admin => {
      if (admin.id === adminId) {
        return { ...admin, [name]: value };
      }
      return admin;
    });
    setAdmins(updatedAdmins);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://users-8a52.onrender.com/users", newAdmin)
      .then(response => {
        axios.get("https://users-8a52.onrender.com/users")
          .then(response => {
            setAdmins(response.data);
          })
          .catch(error => {
            console.error("Fehler beim Abrufen der Daten: " + error);
          });
      })
      .catch(error => {
        console.error("Fehler beim Erstellen des neuen Admins: " + error);
      });
  };

  const handleDeleteAdmin = (adminId) => {
    axios.delete(`https://users-8a52.onrender.com/users/${adminId}`)
      .then(response => {
        axios.get("https://users-8a52.onrender.com/users")
          .then(response => {
            setAdmins(response.data);
          })
          .catch(error => {
            console.error("Fehler beim Abrufen der Daten: " + error);
          });
      })
      .catch(error => {
        console.error("Fehler beim Löschen des Admins: " + error);
      });
  };

  const handleEditAdmin = (adminId) => {
    setEditMode(adminId);
  };

  const handleSaveAdmin = (adminId) => {
    const editedAdmin = admins.find(admin => admin.id === adminId);
    axios.put(`https://users-8a52.onrender.com/users/${adminId}`, editedAdmin)
      .then(response => {
        setEditMode(null);
      })
      .catch(error => {
        console.error("Fehler beim Speichern der Änderungen: " + error);
      });
  };

  return (
    <div className="admin-container">
      <Link to="/admincreate">
        <button className="add">+</button>
      </Link>

      <h1>Admins:</h1>
      <div className="admin-list">
        {admins.map(admin => (
          <div className="admin-item" key={admin.id}>
            {admin.id === editMode ? (
              <div>
                <input
                  type="text"
                  name="vorname"
                  value={admin.vorname}
                  onChange={(e) => handleInputChange(e, admin.id)}
                />
                <input
                  type="text"
                  name="nachname"
                  value={admin.nachname}
                  onChange={(e) => handleInputChange(e, admin.id)}
                />
                <input
                  type="text"
                  name="username"
                  value={admin.username}
                  onChange={(e) => handleInputChange(e, admin.id)}
                />
                <input
                  type="text"
                  name="password"
                  value={admin.password}
                  onChange={(e) => handleInputChange(e, admin.id)}
                />
                <input
                  type="text"
                  name="enddatum"
                  value={admin.enddatum}
                  onChange={(e) => handleInputChange(e, admin.id)}
                />
                <button onClick={() => handleSaveAdmin(admin.id)}>Speichern</button>
              </div>
            ) : (
              <div className="admin-details">
                <p className="box-content"><strong>Vorname:</strong> {admin.vorname}</p>
                <p className="box-content"><strong>Name:</strong> {admin.nachname}</p>
                <p className="box-content"><strong>Benutzername:</strong> {admin.username}</p>
                <p className="box-content"><strong>Passwort:</strong> {admin.password}</p>
                <p className="box-content"><strong>Enddatum:</strong> {formatDatum(admin.enddatum)}</p>
                <div className="admin-buttons">
                  <button className="bearbeiten" onClick={() => handleEditAdmin(admin.id)}>Bearbeiten</button>
                  <button className="delete" onClick={() => handleDeleteAdmin(admin.id)}>Löschen</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admins;
