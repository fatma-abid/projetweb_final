const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

// Contrôleur pour l'enregistrement des utilisateurs
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  // Vérifier si l'utilisateur existe déjà
  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur.' });

    if (results.length > 0) {
      return res.status(400).json({ message: 'L\'email existe déjà.' });
    }

    // Hachage du mot de passe avec bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Erreur lors du hachage du mot de passe.' });

      // Insérer un nouvel utilisateur
      const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.query(insertQuery, [name, email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur.' });

        res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
      });
    });
  });
};

// Contrôleur pour la connexion des utilisateurs
const loginUser = (req, res) => {

  const { email, password } = req.body;
console.log('MOEZ');
  if (!email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  // Vérifier si l'utilisateur existe
  const userQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(userQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur.' });

    if (results.length === 0) {
      return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    }

    const user = results[0];

    // Comparer le mot de passe
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Erreur lors de la comparaison du mot de passe.' });

      if (!isMatch) {
        return res.status(400).json({ message: 'Mot de passe incorrect.' });
      }

      // Créer un token JWT
      const token = jwt.sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });

      res.json({ message: 'Connexion réussie', user,token });
    });
  });
};

module.exports = { registerUser, loginUser };
