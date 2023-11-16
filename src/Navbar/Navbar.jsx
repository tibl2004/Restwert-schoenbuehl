import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import logo from '../Logo.jpeg';

function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const currentPath = window.location.pathname; // Aktuelle URL-Pfad ermitteln

  useEffect(() => {
    // Hier rufen wir die Benutzerdaten ab, um den eingeloggten Benutzer zu ermitteln
    axios.get('https://users-8a52.onrender.com/users')
      .then(response => {
        const users = response.data;
        const loggedInUser = users.find(user => user.loggedIn);
        if (loggedInUser) {
          setLoggedInUser(loggedInUser);
        }
      })
      .catch(error => {
        console.error('Fehler beim Abrufen des eingeloggten Benutzers: ', error);
      });
  }, []);

  const handleLogout = () => {
    // Hier kannst du den Logout-Code einfügen, um loggedIn auf false zu setzen
    // und den Benutzer zur Login-Seite weiterzuleiten
    axios.put(`https://users-8a52.onrender.com/users/${loggedInUser.id}`, {
      ...loggedInUser,
      loggedIn: false,
    })
      .then(() => {
        setLoggedInUser(null); // Den eingeloggten Benutzer im State entfernen
        window.location = '/login'; // Zur Login-Seite weiterleiten
      })
      .catch(error => {
        console.error('Fehler beim Ausloggen: ', error);
      });
  };

  return (
    <div className='navbar'>
      <div className='logo-container'>
        <div className='version-label'>V.2.3</div>
        <img src={logo} alt="Restwert" />
      </div>
      <ul className='links'>
        <li>
          <Link to="/mainsite" className={currentPath === '/mainsite' ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li>
    <Link to="/artikel" className={currentPath.startsWith('/artikel') ? 'active' : ''}>
      Artikel
    </Link>
    <ul className="submenu">
      <li>
        <Link to="/artikel/erfassen" className={currentPath === '/artikel/erfassen' ? 'active' : ''}>
          Erfassen
        </Link>
      </li>
      <li>
        <Link to="/artikel/inserieren" className={currentPath === '/artikel/inserieren' ? 'active' : ''}>
          Inserieren
        </Link>
      </li>
      <li>
        <Link to="/artikel/schluss" className={currentPath === '/artikel/schluss' ? 'active' : ''}>
          Schluss
        </Link>
      </li>
    </ul>
  </li>

       
        <li>
          <Link to="/versand" className={currentPath === '/versand' ? 'active' : ''}>
            Versand
          </Link>
        </li>
        <li>
          <Link to="/reaktivierung" className={currentPath === '/reaktivierung' ? 'active' : ''}>
            Reaktivierung
          </Link>
        </li>
        
        <li>
          <Link to="/symbole" className={currentPath === '/symbole' ? 'active' : ''}>
            Symbole
          </Link>
        </li>
      

        {loggedInUser ? (
          <>
            <li>
              <Link to="/admins" className={currentPath === '/admins' ? 'active' : ''}>
                Admins
              </Link>
            </li>
            <li>
              <Link to="/tagesplanung" className={currentPath === '/tagesplanung' ? 'active' : ''}>
                Tagesplanung
              </Link>
            </li>
            <li>
              <Link to="/interner-verkauf" className={currentPath === '/interner-verkauf' ? 'active' : ''}>
                Interner Verkauf
              </Link>
            </li>
            <div>
              <p>{loggedInUser.username}</p>
            </div>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className={currentPath === '/login' ? 'active' : ''}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
