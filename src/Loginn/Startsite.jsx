import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Startsite.scss';

function Startsite() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkLogin = async (username, password) => {
    try {
      const userResponse = await fetch('https://users-8a52.onrender.com/users');
      const adminsResponse = await fetch('https://users-8a52.onrender.com/admins');

      const userData = await userResponse.json();
      const adminsData = await adminsResponse.json();

      // Check if the username and password match any user or admin
      const userFound = userData.find(user => user.username === username && user.password === password);
      const adminFound = adminsData.find(admin => admin.username === username && admin.password === password);

      if (userFound || adminFound) {
        setLoginSuccessful(true);

        // Senden Sie eine PUT-Anfrage, um den loggedIn-Status auf dem Server zu aktualisieren
        if (userFound) {
          await axios.put(`https://users-8a52.onrender.com/users/${userFound.id}`, {
            ...userFound,
            loggedIn: true
          });
        } else if (adminFound) {
          await axios.put(`https://users-8a52.onrender.com/admins/${adminFound.id}`, {
            ...adminFound,
            loggedIn: true
          });
        }
      } else {
        setErrorMessage('Falscher Benutzername oder Passwort');
        setLoginAttempted(true);
      }
    } catch (error) {
      console.error('Error checking login:', error);
      setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      setLoginAttempted(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    await checkLogin(username, password);
  };

  const handleInputChange = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    setTimeout(() => {
      setShowLoginForm(true);
    }, 2000);
  }, []);

  useEffect(() => {
    // Zurücksetzen des Login-Versuch-Status, wenn loginAttempted sich ändert
    if (loginAttempted) {
      setLoginAttempted(false);
    }
  }, [loginAttempted]);

  useEffect(() => {
    if (loginSuccessful) {
      window.location = '/mainsite';
      console.log('Login erfolgreich! Weiterleitung zur Hauptseite...');
    }
  }, [loginSuccessful]);

  return (
    <div className='login'>
      <div className={`Circle ${showLoginForm ? 'visible' : ''} ${loginSuccessful ? 'login-successful' : ''}`}>
        {showLoginForm && (
          <form className='LoginForm' onSubmit={handleLogin}>
            <h1>Login</h1>
            <input
              type='text'
              placeholder='Benutzername'
              disabled={loginAttempted}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={handleInputChange}
            />
            <input
              type='password'
              placeholder='Passwort'
              disabled={loginAttempted}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleInputChange}
            />
            <div className='error-message'>{errorMessage}</div>
            <button type='submit' disabled={loginAttempted}>
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Startsite;
