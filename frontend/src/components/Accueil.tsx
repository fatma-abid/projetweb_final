import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Accueil.css';

function Accueil() {
  const [panier, setPanier] = useState(
    JSON.parse(localStorage.getItem('panier') || '[]')
  );

  const ajouterAuPanier = async (id, nom, prix) => {
    const utilisateur_id = localStorage.getItem('userId'); // Retrieve userId from localStorage

    if (!utilisateur_id) {
      alert("Vous devez être connecté pour ajouter des produits au panier.");
      return;
    }
  const now = new Date();
  const date_ajout = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`; // Current date in ISO format
    const produit_name = nom;
    const prix_total = prix;
    const produit_id=id;
    console.log(prix_total);
    console.log(produit_name);
    console.log(date_ajout);
    console.log(id);
    try {
      const response = await axios.post('http://localhost:5000/api/panier', {

        utilisateur_id,
        produit_id,
        produit_name,
        prix_total,
        date_ajout,
      });
      console.log(response);
      if (response.status === 201) {
        alert("Produit ajouté au panier avec succès !");
        const produitExistant = panier.find((produit) => produit.id === id);
        const panierid=response.data.panierId;
        let nouveauPanier;
        if (produitExistant) {
          nouveauPanier = panier.map((produit) =>
            produit.id === id
              ? { ...produit, quantite: produit.quantite + 1 }
              : produit
          );
        } else {
          nouveauPanier = [...panier, { id, nom, prix, quantite: 1 , panierid}];
        }

        setPanier(nouveauPanier);
        localStorage.setItem('panier', JSON.stringify(nouveauPanier));
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
      alert(
        error.response?.data?.message || "Erreur du serveur. Veuillez réessayer plus tard."
      );
    }
  };

  const produits = [
    { id: '1', nom: 'KératiLiss', prix: 15.000, description: 'Pour une chevelure éclatante et saine.', img: '1.jpg' },
    { id: '2', nom: 'Masque Nourrissant', prix: 52.000, description: 'Hydratation en profondeur pour vos cheveux.', img: '2.jpg' },
    { id: '3', nom: 'Huile de Monoi', prix: 60.000, description: 'Pour des cheveux doux et brillants.', img: '3.jpg' },
  ];

  const produits1 = [
    { id: '4', nom: 'Coloration Naturelle', prix: 40.000, description: 'Couleur vibrante et éclatante.', img: '4.jpg' },
    { id: '5', nom: 'Sérum Réparateur', prix: 65.000, description: 'Pour des pointes renforcées.', img: '5.jpg' },
    { id: '6', nom: 'Après-shampooing Brillance', prix: 50.000, description: 'Protection et éclat longue durée.', img: '6.jpg' },
  ];

  return (
    <div>
      <div className="top-bar">La vitalité s'invite chez vous</div>
      <header>
        <div className="logo-container">
          <img src="/logoSoinShop.png" alt="Logo" width="50" />
          <h1>SoinShop</h1>
        </div>
        <div className="login-container">
          <Link to="/connexion">
            <img src="/logg.png" alt="Connexion" width="40" />
          </Link>
          <Link to="/panier">
            <img src="/panier.png" alt="Panier" width="50" />
          </Link>
        </div>
      </header>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/visage">Visage</Link>
        <Link to="/cheveux">Cheveux</Link>
        <Link to="/solaire">Solaire</Link>
      </nav>

      {/* Image avant les produits */}
      <div className="product-image">
        <img src="/accueil.png" alt="Image avant produits" width="100%" />
      </div>

      {/* Contenu principal */}
      <div className="container">
        <div className="header-section">
          <h1>Bienvenue sur SoinShop</h1>
          <p>Découvrez nos meilleurs produits pour votre bien-être.</p>
        </div>

        {/* Section de produits */}
        <div className="pruduct-page">
          <h2>Nos produits populaires</h2>
          <div className="products-grid">
            {produits.map((produit) => (
              <div key={produit.id} className="product-card">
                <img src={`/${produit.img}`} alt={produit.nom} />
                <h3>{produit.nom}</h3>
                <p>{produit.description}</p>
                <p className="price">{produit.prix.toFixed(3)} TND</p>
                <button onClick={() => ajouterAuPanier(produit.id, produit.nom, produit.prix)}>
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section Nouveautés */}
        <div className="product-page">
          <h2 className="products-title">Nouveautés</h2>
          <div className="products-grid">
            {produits1.map((produit) => (
              <div key={produit.id} className="product-card">
                <img src={`/${produit.img}`} alt={produit.nom} />
                <h3>{produit.nom}</h3>
                <p>{produit.description}</p>
                <p className="price">{produit.prix.toFixed(3)} TND</p>
                <button onClick={() => ajouterAuPanier(produit.id, produit.nom, produit.prix)}>
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-item">
            <img src="/logoSoinFooter.png" alt="Logo de SoinShop" />
            <p className="about-box">
              <strong>À propos de nous :</strong><br />
              SoinShop est N°1 parapharmacie en ligne en Tunisie.
            </p>
          </div>
          <div className="footer-item">
            <p>
              <strong>Service client :</strong><br />
              Téléphone<br />
              +216 70 667 000<br /><br />
              Email<br />
              <a href="contact.html">contact@SoinShop.tn</a>
            </p>
          </div>
          <div className="footer-item">
            <p>
              <strong>Horaires :</strong><br />
              Lundi - Vendredi : 9h à 18h<br />
              Samedi : 10h à 14h
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 SoinShop. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default Accueil;
