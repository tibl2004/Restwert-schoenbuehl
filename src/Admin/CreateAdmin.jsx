import React, { useState } from "react";
import axios from "axios";

function CreateAdmin() {
  const [newAdmin, setNewAdmin] = useState({
    vorname: "",
    nachname: "",
    username: "",
    password: "",
    enddatum: "",
    isAdmin: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setNewAdmin({ ...newAdmin, [name]: inputValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isoEnddatum = newAdmin.enddatum;
    newAdmin.enddatum = isoEnddatum;

    const apiUrl = newAdmin.isAdmin
      ? "https://users-8a52.onrender.com/admins"
      : "https://users-8a52.onrender.com/users";

    axios
      .post(apiUrl, newAdmin)
      .then((response) => {
        console.log("Neuer Admin wurde erstellt.");

        const redirectUrl = newAdmin.isAdmin ? "/admins" : "/users";
        window.location = redirectUrl;
      })
      .catch((error) => {
        console.error("Fehler beim Erstellen des neuen Admins: " + error);
      });
  };

  return (
    <div>
      <h2>Neuen Admin erstellen:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="vorname"
          placeholder="Vorname"
          value={newAdmin.vorname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nachname"
          placeholder="Name"
          value={newAdmin.nachname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Benutzername"
          value={newAdmin.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Passwort"
          value={newAdmin.password}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="enddatum"
          placeholder="Enddatum (YYYY-MM-DD)"
          value={newAdmin.enddatum}
          onChange={handleInputChange}
        />
        <label>
          Admin-Rolle:
          <input
            type="checkbox"
            name="isAdmin"
            checked={newAdmin.isAdmin}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Admin erstellen</button>
      </form>
    </div>
  );
}

export default CreateAdmin;
