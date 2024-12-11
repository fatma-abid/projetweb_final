import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Solaire() {
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
        // Si le produit existe déjà, met à jour la quantité côté backend et frontend
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
  

  const products5 = [
    {
      id: '39',
      img: '39.jpg',
      nom: 'AVENE',
      description: 'AVENE FLUIDE MINÉRAL TEINTÉ SPF50+ 40ML.',
      prix: 55.0,
    },
    {
      id: '40',
      img: '40.jpg',
      nom: 'AVENE',
      description: 'AVENE Cicalfate Lotion asséchante réparatrice 40ML',
      prix: 51.0,
    },
    {
      id: '41',
      img: '41.jpg',
      nom: 'AVENE',
      description: 'AVENE CICALFATE+ Gel cicatrice 30ML',
      prix: 49.0,
    },
    {
      id: '42',
      img: '42.jpg',
      nom: 'AVENE',
      description: 'AVENE CICALFATE+ Spray Asséchant Réparateur 100ML',
      prix: 36.0,
    },
    {
      id: '43',
      img: '43.jpg',
      nom: 'SVR',
      description: 'SVR SUN SECURE Fluide Toucher Sec SPF50+',
      prix: 119.0,
    },
    {
      id: '44',
      img: '44.jpg',
      nom: 'SVR',
      description: 'SVR AK SECURE DM Protect',
      prix: 55.0,
    },
    {
      id: '45',
      img: '45.jpg',
      nom: 'PHARMACERIS',
      description:
        'PHARMACERIS A CORNEO-SENSILIUM - Crème Apaisante Réparatrice 75ML',
      prix: 30.0,
    },
    {
      id: '46',
      img: '46.jpg',
      nom: 'DERMEDIC',
      description: 'DERMEDIC SUNBRELLA BABY SPRAY SPF 50+ 150ML',
      prix: 37.0,
    },
  ];
  const products6 = [
   
    {
      id: '47',
      img: '47.jpg',
      nom: 'MUSTELA',
      description: 'MUSTELA BEBE CREME NOURRISSANTE AU COLD CREAM 40 ML.',
      prix: 21.0,
    },
    {
      id: '48',
      img: '48.webp',
      nom: 'PHYTEAL',
      description: 'PHYTEAL ÉCRAN SOLAIRE TEINTE BEIGE DORÉ SPF 50+ GEL PHYTOVERA GRATUIT.',
      prix: 37.0,
    },
    {
      id: '49',
      img: '49.jpg',
      nom: 'SVR',
      description: 'SVR SUN SECURE CRÈME SPF 50+.',
      prix: 53.0,
    },
    {
      id: '50',
      img: '50.jpg',
      nom: 'ADERMA',
      description: 'ADERMA CYTELIUM SPRAY ASSÉCHANT APAISANT 100ML.',
      prix: 38.0,
    },
    {
      id: '51',
      img: '51.jpg',
      nom: 'JOUVENCE',
      description: 'JOUVENCE EAU FLORALE 150ML.',
      prix: 19.0,
    },
    {
      id: '52',
      img: '52.jpg',
      nom: 'Pharmaceris',
      description: 'PHARMACERIS FOND DE TEINT FLUID 02 SPF50+ 30ML.',
      prix: 39.0,
    },
    {
      id: '53',
      img: '53.jpg',
      nom: 'Pharmaceris',
      description: 'PHARMACERIS S BODY LOTION SPF50+ 150ML.',
      prix: 42.0,
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
        <img src="/crema.jpg" alt="Image avant produits" width="100%" />
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
            {products5.map((produit) => (
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
            {products6.map((produit) => (
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
  <p>Protégez votre peau des rayons UV tout en profitant du soleil grâce à notre gamme de produits solaires. Que vous soyez à la plage ou en ville, nos crèmes, huiles et sprays solaires vous offrent une protection optimale tout en nourrissant votre peau. Découvrez nos solutions adaptées à chaque type de peau pour un bronzage en toute sécurité !</p>
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

export default Solaire;
