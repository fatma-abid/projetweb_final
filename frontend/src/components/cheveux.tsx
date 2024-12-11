import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
function Cheveux() {
  const [panier, setPanier] = useState(
    JSON.parse(localStorage.getItem('panier') || '[]')
  );

  const ajouterAuPanier = async (id, nom, prix) => {
    const utilisateur_id = localStorage.getItem('userId'); // Récupère l'ID utilisateur
  
    if (!utilisateur_id) {
      alert("Vous devez être connecté pour ajouter des produits au panier.");
      return;
    }
  
    // Obtenir la date et l'heure actuelles au format ISO
    const now = new Date();
    const date_ajout = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  
    const produitExistant = panier.find((produit) => produit.id === id);
    let nouveauPanier;
  
    try {
      if (produitExistant) {
        // Si le produit existe déjà, met à jour la quantité uniquement côté backend et frontend
        const updatedQuantite = produitExistant.quantite + 1;
  
        await axios.put(`http://localhost:5000/api/panier/${produitExistant.panierid}`, {
          quantite: updatedQuantite,
          prix_total: prix * updatedQuantite, // Mise à jour du prix total
        });
  
        nouveauPanier = panier.map((produit) =>
          produit.id === id
            ? { ...produit, quantite: updatedQuantite }
            : produit
        );
      } else {
        // Si le produit n'existe pas, ajoute un nouveau produit côté backend et frontend
        const response = await axios.post('http://localhost:5000/api/panier', {
          utilisateur_id,
          produit_id: id,
          produit_name: nom,
          prix_total: prix,
          date_ajout,
        });
  
        const panierid = response.data.panierId;
  
        nouveauPanier = [...panier, { id, nom, prix, quantite: 1, panierid }];
      }
  
      // Met à jour le panier dans le state et le localStorage
      setPanier(nouveauPanier);
      localStorage.setItem('panier', JSON.stringify(nouveauPanier));
      alert("Produit ajouté au panier avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la mise à jour au panier :", error);
      alert(
        error.response?.data?.message || "Erreur du serveur. Veuillez réessayer plus tard."
      );
    }
  };
  

  const produits1 = [
    {
      id: '23',
      img: '23.jpg',
      nom: 'DUCRAY',
      description: 'DUCRAY-ANAPHASE+ Shampooing complément antichute 200ML',
      prix: 35.0,
    },
    {
      id: '24',
      img: '24.jpg',
      nom: 'BEESLINE',
      description: 'BEESLINE MASQUE POINTS NOIRS',
      prix: 3.0,
    },
    {
      id: '25',
      img: '25.jpg',
      nom: 'PHYTEAL',
      description: 'PHYTEAL ULTRALISS SÉRUM TRAITANT À LA KÉRATINE, 40ml',
      prix: 40.0,
    },
    {
      id: '26',
      img: '26.jpg',
      nom: 'PHARMACERIS',
      description: 'PHARMACERIS H SHAMPOOING H-PURIN DRY ANTI-PELLICULES-SÉCHES',
      prix: 29.0,
    },
    {
      id: '27',
      img: '27.jpg',
      nom: 'PHARMACERIS',
      description: 'PHARMACERIS SHAMPOOING H-SEBOPURIN CHEVEUX GRAS',
      prix: 25.0,
    },
    {
      id: '28',
      img: '28.jpg',
      nom: 'PHARMACERIS',
      description: 'PHARMACERIS H BAUME STIMULANT POUSSE DES CHEVEUX H-STIMULIN 150ML',
      prix: 43.5,
    },
    {
      id: '29',
      img: '29.jpg',
      nom: 'ALMAFLORE',
      description: "ALMAFLORE Bain d'huile 100ML",
      prix: 18.0,
    },
    {
      id: '30',
      img: '30.jpg',
      nom: 'NUXE',
      description: 'NUXE HUILE PRODIGIEUSE FLORALE 50ML',
      prix: 72.0,
    },

  ];

  const produits2 = [
    {
      id: '31',
      img: '31.jpg',
      nom: 'PHYTEAL',
      description: 'PHYTEAL ARGASKIN HUILE D’ARGAN 100% PURE ET NATURELLE',
      prix: 28.5,
    },
    {
      id: '32',
      img: '32.jpg',
      nom: 'BIOXSINE',
      description: 'BIOXSINE FEMINA SHAMPOING AUX HERBES ANTI-CHUTE CHEVEUX SECS-NORMAUX 300ML',
      prix: 36.0,
    },
    {
      id: '33',
      img: '33.jpg',
      nom: 'BIOXSINE',
      description: 'BIOXSINE shampooing cheveux normaux/secs, 300ml',
      prix: 36.0,
    },
    {
      id: '34',
      img: '34.webp',
      nom: 'PHYTEAL',
      description: 'PHYTEAL PACK PHYTEAL ULTRALISS',
      prix: 82.0,
    },
    {
      id: '35',
      img: '35.jpg',
      nom: 'INODERMA',
      description: 'ALOHA MONOI HAIR MIST SPF15 150ML',
      prix: 35.0,
    },
    {
      id: '36',
      img: '36.webp',
      nom: 'ALMAFLORE',
      description: 'ALMAFLORE VITAMINE E',
      prix: 10.5,
    },
    {
      id: '37',
      img: '37.webp',
      nom: 'CYTOL NAT',
      description: 'CYTOL CYTOLNAT CYTOLCAP Sérum Capillaire Réparateur , 50ml',
      prix: 24.0,
    },
    {
      id: '38',
      img: '38.webp',
      nom: 'CYTOL NAT',
      description: 'CYTOL CYTOLNAT CYTOLCAP HUILE REVITALISANTE 50ML',
      prix: 11.0,
    },

  ];

  return (
    <div>
      <div className="top-bar">
        La vitalité s'invite chez vous
      </div>
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
        <img src="/cheveux.webp" alt="Image avant produits" width="100%" />
      </div>

      {/* Contenu principal */}
      <div className="container">
        <div className="header-section">
          <h1>Bienvenue sur SoinShop</h1>
          <p>Découvrez nos meilleurs produits pour votre bien-être.</p>
        </div>

        {/* Section de produits */}
        <div className="products-section">
          <h2>Nos produits populaires</h2>
          <div className="products-grid">
            {produits1.map((produit) => (
              <div key={produit.id} className="product-card">
                <img src={`/${produit.img}`} alt={produit.nom} />
                <h3>{produit.nom}</h3>
                <p>{produit.description}</p>
                <p className="price">{(produit.prix).toFixed(3)} TND</p>
                <button onClick={() => ajouterAuPanier(produit.id, produit.nom, produit.prix)}>
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section Nouveautés */}
        <div className="products-section">
          <h2>Nos nouveautés</h2>
          <div className="products-grid">
            {produits2.map((produit) => (
              <div key={produit.id} className="product-card">
                <img src={`/${produit.img}`} alt={produit.nom} />
                <h3>{produit.nom}</h3>
                <p>{produit.description}</p>
                <p className="price">{(produit.prix ).toFixed(3)} TND</p>
                <button onClick={() => ajouterAuPanier(produit.id, produit.nom, produit.prix)}>
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="intro-section">
  <p>Nos produits sont soigneusement sélectionnés pour répondre aux besoins de vos cheveux et améliorer leur vitalité. Découvrez des soins adaptés à chaque type de cheveux et offrez-leur ce qu'il y a de meilleur pour une chevelure éclatante de santé !</p>
</div>

      <div className="nos_marques">Nos Marques</div>
      <div className="brand-banner">
        <div className="brand-slider">
          <div className="brand-group">
            {['m1.png', 'm2.png', 'm3.png', 'm4.jpg'].map((logo, index) => (
              <img src={`/${logo}`} alt={`Logo ${index + 1}`} key={index} />
            ))}
          </div>
          <div className="brand-group">
            {['m5.png', 'm6.jpg', 'm7.png', 'm8.png'].map((logo, index) => (
              <img src={`/${logo}`} alt={`Logo ${index + 5}`} key={index + 4} />
            ))}
          </div>
        </div>
      </div>




      {/* Section Contact */}
      <div className="features-section">
        {[
          { img: 'temps.png', title: 'Livraison rapide', description: 'Livraison à domicile en 48 à 72 H' },
          { img: 'livraison.png', title: 'Livraison gratuite', description: 'Dès 99 DT d\'achat dans toute la Tunisie' },
          { img: 'securite.png', title: 'Paiement 100% sécurisé', description: 'Paiement à la livraison' },
          { img: 'service.png', title: 'Service client', description: '6J/7 de 09h:00 à 18h:00' },
        ].map((feature, index) => (
          <div className="feature" key={index}>
            <img src={`/${feature.img}`} alt={feature.title} className="feature-icon" />
            <h4>{feature.title}</h4>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      <section className="contact-section">
      <Link to="/contact">
      <h5>Contactez-nous</h5>
      </Link>
      </section>

      <footer>
  <div className="footer-content">
    <div className="footer-item">
      <img src="/logoSoinFooter.png" alt="Logo de SoinShop" />
      <p className="about-box">
        <strong>À propos de nous :</strong><br />
        SoinShop est N°1 parapharmacie en ligne en Tunisie. Vous trouverez chez SoinShop.tn tous vos produits parapharmaceutiques (santé, beauté, minceur...)
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
export default Cheveux;
