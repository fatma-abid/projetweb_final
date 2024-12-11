import React from 'react';
import './contact.css';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Merci pour votre message !');
  };

  return (
    <div className="contact-container">
      <h1>Contactez-nous</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Votre message</label>
        <textarea
          id="message"
          rows={6}
          placeholder="Écrivez votre message ici..."
          required
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Contact;
