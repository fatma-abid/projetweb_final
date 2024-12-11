const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { addPanier } = require('../controllers/panierController.js'); // Importer le contrôleur

const router = express.Router();




// Route pour l'enregistrement des utilisateurs
router.post('/register', registerUser);

// Route pour la connexion des utilisateurs
router.post('/login', loginUser);

// Route pour l'ajout d'un produit au panier
router.post('/panier', addPanier);



module.exports = router;
