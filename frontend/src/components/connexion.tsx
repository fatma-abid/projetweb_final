import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './connexion.css';

const Connexion: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(null);

    const userData = { email, password };

    try {
      const response = await axios.post('http://localhost:5000/api/login', userData, {
        headers: { 'Content-Type': 'application/json' },
      });

      setIsSuccess(true);
      setMessage('Connexion réussie');
      console.log(response);
      localStorage.removeItem('panier');
      localStorage.setItem('token', response.data.token); // Save token
      localStorage.setItem('userId', response.data.userId); // Save userId
      navigate('/accueil'); // Redirect immediately after successful login
    } catch (error: any) {
      setIsSuccess(false);
      if (error.response) {
        // Response with an error from the server
        setMessage(error.response.data.message || 'Utilisateur non trouvé');
      } else {
        // Network or other error
        setMessage('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="log-container">
      <h1>Connectez-vous</h1>
      <form id="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre e-mail"
          required
        />

        <label htmlFor="password">Mot de passe</label>
        <div className="password-container">
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            required
          />
          <span className="toggle-password" onClick={togglePassword}>
            {passwordVisible ? '🙈' : '👁'}
          </span>
        </div>

        <div className="button-container">
          <button type="submit" disabled={loading}>
            {loading ? 'Connexion en cours...' : 'Connexion'}
          </button>
        </div>
      </form>

      {message && (
        <p className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</p>
      )}

      <p className="create-account">
        Pas de compte ? <Link to="/register">Créez-en un</Link>
      </p>
    </div>
  );
};

export default Connexion;