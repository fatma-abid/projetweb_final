const express = require('express');
const db = require('./config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

app.use(cors());
app.use(express.json()); // Pour traiter les requêtes JSON

// Fonction pour exécuter les requêtes SQL de manière async
const dbQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// Route pour gérer les inscriptions
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Veuillez remplir tous les champs.' });
  }

  try {
    // Vérifiez si l'email est déjà utilisé
    const userQuery = 'SELECT * FROM users WHERE email = ?';
    const result = await dbQuery(userQuery, [email]);

    if (result.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer l'utilisateur
    const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const insertResult = await dbQuery(insertQuery, [name, email, hashedPassword]);

    // Obtenir l'ID de l'utilisateur inséré
    const userId = insertResult.insertId;

    // Créer un panier pour l'utilisateur
    

    res.status(201).json({ message: 'Inscription réussie et panier créé !', userId: userId });
  } catch (err) {
    console.error('Erreur lors de l\'inscription :', err);
    res.status(500).json({ message: 'Erreur du serveur. Veuillez réessayer plus tard.' });
  }
});



// Route pour gérer la connexion
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
console.log(email);
  try {console.log('ftayma');
    const userQuery = 'SELECT * FROM users WHERE email = ?';
    const result = await dbQuery(userQuery, [email]);

    if (result.length === 0) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });
const userId=user.id;
console.log(token);
    res.json({ message: 'Connexion réussie', userId,token });

  } catch (err) {
    console.error('Erreur lors de la connexion :', err);
    res.status(500).json({ message: 'Erreur du serveur. Veuillez réessayer plus tard.' });
  }
});

// Route pour ajouter un produit au panier
app.post('/api/panier', async (req, res) => {
  const { utilisateur_id, produit_id, produit_name, prix_total, date_ajout } = req.body;

  // Log les données reçues dans le corps de la requête

  if (!utilisateur_id || !produit_id || !produit_name || !prix_total || !date_ajout) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    // Vérifier si ce produit existe déjà dans le panier pour cet utilisateur
    const checkQuery = 'SELECT * FROM panier WHERE utilisateur_id = ? AND produit_id = ?';
    const checkResult = await dbQuery(checkQuery, [utilisateur_id, produit_id]);

      // Log du résultat de la requête de vérification

    if (checkResult.length > 0) {
      return res.status(400).json({ message: 'Ce produit est déjà dans votre panier.' });
    }

    // Insérer un nouveau produit dans le panier
    const insertQuery = 'INSERT INTO panier (utilisateur_id, produit_id, produit_name, prix_total, date_ajout) VALUES (?, ?, ?, ?, ?)';
    const insertResult = await dbQuery(insertQuery, [utilisateur_id, produit_id, produit_name, prix_total, date_ajout]);
    console.log(insertResult.insertId);
    const panier = insertResult.insertId;
    

    res.status(201).json({
      message: 'Produit ajouté au panier avec succès.',
      panierId:panier // Return the panier_id
    });
  } catch (err) {
    console.error('Erreur lors de l\'ajout au panier :', err); // Log l'erreur
    res.status(500).json({ message: 'Erreur du serveur. Veuillez réessayer plus tard.' });
  }
});
app.post('/api/delete-panier', (req, res) => {
  const { panierid, idd } = req.body;
  const panier_id = panierid;
  const produit_id = idd;

  console.log(produit_id); // Just to verify that idd is being received correctly.

  if (!panierid || !idd) {
    return res.status(400).json({ message: 'Panierid et id sont nécessaires.' });
  }

  // SQL query to delete the item from the panier
  const deleteQuery = `
    DELETE FROM panier
    WHERE panier_id = ? AND produit_id = ?;
  `;

  // Execute the delete query using callback
  db.query(deleteQuery, [panier_id, produit_id], (error, result) => {
    if (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      return res.status(500).json({ message: 'Erreur du serveur. Veuillez réessayer plus tard.' });
    }

    // If no rows were affected, that means the item was not found
   /* if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Produit non trouvé dans le panier.' });
    }*/

    // Respond with success
    res.status(200).json({ message: 'Produit supprimé avec succès.' });
  });
});






app.post('/api/update-panier', async (req, res) => {
  const panierList = req.body; // The array of panier items sent from the front-end
panierData=panierList;
console.log(panierData);
  // Validate input
  if (!Array.isArray(panierData) || panierData.length === 0) {
    return res.status(400).json({ message: 'Panier vide ou données invalides.' });
  }

  try {
    // Start a transaction
    await dbQuery('START TRANSACTION');

    // Prepare all update queries
    const updateQueries = panierData.map(item => {
      console.log(item);
      const { panierid,  id, prix ,quantite} = item;
          const prix_total=prix*quantite;
          const panier_id=panierid;
          const produit_id=id;
          
      // Prepare the query to update the prix_total in the user's panier based on panier_id
      const updateQuery = `
        UPDATE panier
        SET prix_total = ?
        WHERE panier_id = ?  AND produit_id = ?;
      `;
      
      return dbQuery(updateQuery, [prix_total, panier_id, produit_id]);
    });

    // Execute all the update queries in parallel
    await Promise.all(updateQueries);

    // Commit the transaction if all queries succeed
    await dbQuery('COMMIT');
    
    res.status(200).json({ message: 'Panier mis à jour avec succès.' });
  } catch (error) {
    // Rollback the transaction in case of any error
    await dbQuery('ROLLBACK');
    console.error('Erreur lors de la mise à jour du panier:', error);
    res.status(500).json({ message: 'Erreur du serveur. Veuillez réessayer plus tard.' });
  }
});




// Route pour récupérer le panier de l'utilisateur
app.get('/api/obtenir-panier', async (req, res) => {
  const utilisateur_id = req.query.utilisateur_id; // ID utilisateur passé en paramètre

  if (!utilisateur_id) {
    return res.status(400).json({ message: 'L\'ID utilisateur est requis.' });
  }

  try {
    const panierQuery = 'SELECT * FROM panier WHERE utilisateur_id = ?';
    const panier = await dbQuery(panierQuery, [utilisateur_id]);

    res.json(panier); // Retourne le panier au frontend
  } catch (err) {
    console.error('Erreur lors de la récupération du panier :', err);
    res.status(500).json({ message: 'Erreur du serveur. Veuillez réessayer plus tard.' });
  }
});


// Démarrage du serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
