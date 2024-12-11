const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',      // Hôte MySQL
  user: 'root',           // Nom d'utilisateur
  password: 'root',       // Mot de passe
  database: 'mydb'        // Nom de la base de données
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = db;
