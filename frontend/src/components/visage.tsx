import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
function Visage() {
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
        // Si le produit existe déjà, met à jour la quantité uniquement côté frontend
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
        // Si le produit n'existe pas, ajoute un nouveau produit
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
  

  
  const produits3 = [
    {
      id: '7',
      img: '7.jpg',
      nom: 'LIRENE',
      description: 'LIRENE Gel Exfoliant Menthe 150 ML Peau Mixte a Grasse',
      prix: 15.000,
    },
    {
      id: '8',
      img: '8.jpg',
      nom: 'FLIGORA',
      description: 'Masque mask super perfecteur oxygen glow FLIGORA',
      prix: 99.000,
    },
    {
      id: '9',
      img: '9.jpg',
      nom: 'SVR',
      description: 'SVR SUN SECURE Fluide Toucher Sec SPF50+',
      prix: 55.00,
    },
    {
      id: '10',
      img: '10.jpg',
      nom: 'SVR',
      description: 'SVR SEBIACLEAR SERUM 30ML',
      prix: 69.000,
    },
    {
      id: '11',
      img: '11.jpg',
      nom: 'NUXE',
      description: 'NUXE REVE DE MIEL SOIN DES LEVRES AU MIEL 10ML',
      prix: 49.000,
    },
    {
      id: '12',
      img: '12.webp',
      nom: 'AVENE',
      description: 'AVENE gelee gommante visage douceur 75ML',
      prix: 36.000,
    },
    {
      id: '13',
      img: '13.jpg',
      nom: 'SVR',
      description: 'SVR AMPOULE C ANTI-OX - Concentré Régénérant 30ML',
      prix: 119.000,
    },
    {
      id: '14',
      img: '14.jpg',
      nom: 'AVENE',
      description: 'AVENE FLUIDE MINÉRAL TEINTÉ SPF50+ 40ML.',
      prix: 55.0,
    }
  ];
  
  const produits4 = [
    {
      id: '15',
      img: '15.jpg',
      nom: 'DUCRAY',
      description: 'DUCRAY KERACNYL SÉRUM 30ML',
      prix: 55.500,
    },
    {
      id: '16',
      img: '16.jpg',
      nom: 'DERMEDIC',
      description: 'DERMEDIC NEOVISAGE FOND DE TEINT SPF 50+ SAND 30ML',
      prix: 33.000,
    },
    {
      id: '17',
      img: '17.jpg',
      nom: 'SVR',
      description: 'SVR TOPIALYSE GEL LAVANT FLACON POMPE 1L',
      prix: 41.000,
    },
    {
      id: '18',
      img: '18.jpg',
      nom: 'MIROSA',
      description: 'MIROSA CRÈME ANTI CERNES – 20ml',
      prix: 20.000,
    },
    {
      id: '19',
      img: '19.jpg',
      nom: 'SVR',
      description: 'SVR TOPIALYSE BAUME LAVANT APAISANT 200ML',
      prix: 36.000,
    },
    {
      id: '20',
      img: '20.jpg',
      nom: 'NOREVA',
      description: 'NOREVA TRIO WHITE XP CONTOUR DES YEUX ANTI TACHES',
      prix: 63.000,
    },
    {
      id: '21',
      img: '21.jpg',
      nom: 'DERMEDIC',
      description: 'DERMEDIC SUNBRELLA Crème SPF50+ Peaux normales et sèches',
      prix: 28.000,
    },
    {
      id: '22',
      img: '22.jpg',
      nom: 'LAINO',
      description: 'LAINO MASQUE SOIN ÉCLAT',
      prix: 18.000,
    }

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
        <img src="/creme.jpeg" alt="Image avant produits" width="100%" />
      </div>

      {/* Contenu principal */}
      <div className="container">
        <div className="header-section">
          <h1>Bienvenue sur SoinShop</h1>
          <p>Découvrez nos meilleurs produits pour votre bien-être.</p>
        </div>



{/* Première ligne de produits */}
<div className="products-section">
          <h2>Nos produits populaires</h2>
          <div className="products-grid">
            {produits3.map((produit) => (
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

      {/* Deuxième ligne de produits */}

      <div className="products-section">
          <h2>Nos nouveautés</h2>
          <div className="products-grid">
            {produits4.map((produit) => (
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
  <p>Nos soins du visage sont conçus pour nourrir, hydrater et révéler l'éclat naturel de votre peau. Découvrez des produits adaptés à tous les types de peau pour un teint lumineux et une peau parfaitement lisse. Prenez soin de vous avec nos solutions innovantes et de qualité !</p>
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
export default Visage;
