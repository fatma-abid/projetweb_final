const db = require('../config/db');

// Contrôleur pour ajouter un produit au panier
const addPanier = (req, res) => {
  // Récupérer les données envoyées depuis le frontend (id utilisateur, id produit, nom produit, prix total)
  const { utilisateur_id, produit_id, produit_name, prix_total } = req.body;

  // Vérifier si toutes les données sont présentes
  if (!utilisateur_id || !produit_id || !produit_name || !prix_total) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  // Requête pour insérer le produit dans la table panier
  const insertQuery = `
    INSERT INTO panier (utilisateur_id, produit_id, produit_name, prix_total, date_ajout)
    VALUES (?, ?, ?, ?, NOW())`;

  // Exécution de la requête SQL pour insérer les données
  db.query(insertQuery, [utilisateur_id, produit_id, produit_name, prix_total], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout au panier :', err);
      return res.status(500).json({ message: 'Erreur du serveur lors de l\'ajout.' });
    }

    res.status(201).json({ message: 'Produit ajouté au panier avec succès.' });
  });
};

module.exports = { addPanier };
