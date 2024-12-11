import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Vérifie que les mots de passe correspondent
    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas !');
      return;
    }

    // Vérifie le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Email invalide !');
      return;
    }

    const userData = { name, email, password };

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const result = await response.json();
        setMessage(result.message || 'Erreur lors de l\'inscription');
      } else {
        const result = await response.json();
        setMessage(result.message); // Affiche le message du backend
      }
    } catch (error) {
      console.error('Erreur :', error);
      setMessage('Une erreur est survenue lors de la communication avec le serveur.');
    }
  };

  return (
    <div className="register-container">
      <h1>Créer un compte</h1>
      <form id="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nom complet</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Entrez votre nom complet"
          required
        />

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
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Créez un mot de passe"
          required
        />

        <label htmlFor="confirm-password">Confirmez le mot de passe</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmez votre mot de passe"
          required
        />

        <button type="submit">S'inscrire</button>
      </form>

      {message && <p className="message">{message}</p>}

      <p className="already-account">
        Vous avez déjà un compte ? <Link to="/connexion">Connectez-vous</Link>
      </p>
    </div>
  );
};

export default Register;
