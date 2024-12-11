import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import './panier.css'; // Assurez-vous que ce fichier existe et est dans le bon répertoire

type Produit = {
  id: string;
  nom: string;
  prix: number;
  quantite: number;
};

const Panier = () => {
  const [panier, setPanier] = useState<Produit[]>([]);
  const [total, setTotal] = useState<string>("0.000");
  const navigate = useNavigate(); // For navigation after successful checkout

  useEffect(() => {
    // Get the panier data from localStorage
    const storedPanier = JSON.parse(localStorage.getItem("panier") || "[]");
    setPanier(storedPanier);
    calculerTotal(storedPanier);
  }, []);

  const calculerTotal = (panier: Produit[]) => {
    const totalValue = panier.reduce(
      (acc, item) => acc + item.prix * item.quantite,
      0
    );
    setTotal(totalValue.toFixed(3));
  };

  const handleQuantiteChange = (index: number, action: string) => {
    const updatedPanier = [...panier];
    if (action === "increment") {
      updatedPanier[index].quantite += 1;
    } else if (action === "decrement" && updatedPanier[index].quantite > 1) {
      updatedPanier[index].quantite -= 1;
    }
    setPanier(updatedPanier);
    localStorage.setItem("panier", JSON.stringify(updatedPanier));
    calculerTotal(updatedPanier);
  };

  const handleDelete = async (index: number) => {
   
    const panierList = JSON.parse(localStorage.getItem("panier") || "[]");
    const produit = panierList[index];
    // Call API to delete from the backend
    try {
      const response = await axios.post(
        "http://localhost:5000/api/delete-panier",
        {
          panierid: produit.panierid, // panier id
          idd: produit.id, // product id
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // If successful, remove the product from localStorage and update the cart
        const updatedPanier = panierList.filter((item: Produit) => item.id !== produit.id);
        setPanier(updatedPanier);
        localStorage.setItem("panier", JSON.stringify(updatedPanier));
        calculerTotal(updatedPanier);
        alert("Produit supprimé avec succès.");
      } else {
        alert("Erreur lors de la suppression du produit.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      alert("Erreur lors de la suppression du produit. Veuillez réessayer.");
    }
  };

  const handleCheckout = async () => {
    const panierList = JSON.parse(localStorage.getItem("panier") || "[]");
    if (panierList.length === 0) {
      alert("Votre panier est vide !");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/update-panier",
        panierList,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        navigate("/paiement");
      } else {
        alert("Une erreur est survenue lors de la mise à jour du panier.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du panier:", error);
      alert("Erreur lors de la mise à jour du panier. Veuillez réessayer.");
    }
  };

  return (
    <div className="cart-container page-connexion">
      <header>
        <h1>Votre Panier</h1>
      </header>
      <main>
        <div className="cart-items">
          {panier.length > 0 ? (
            panier.map((produit, index) => (
              <div className="cart-item" key={index}>
                <img
                  src={`/${produit.id}.jpg`}
                  alt={produit.nom}
                  onError={(e) => {
                    e.currentTarget.src = `/${produit.id}.webp`;
                    e.currentTarget.onerror = () => {
                      e.currentTarget.src = "/default.jpg";
                    };
                  }}
                />
                <div className="cart-item-info">
                  <h3>{produit.nom}</h3>
                  <p>{produit.prix.toFixed(3)} TND</p>
                </div>
                <div className="cart-item-actions">
                  <button
                    onClick={() => handleQuantiteChange(index, "decrement")}
                  >
                    -
                  </button>
                  <span>{produit.quantite}</span>
                  <button
                    onClick={() => handleQuantiteChange(index, "increment")}
                  >
                    +
                  </button>
                  <button onClick={() => handleDelete(index)}>Supprimer</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart">
              <p>Votre panier est vide.</p>
              <Link to="/" className="btn-back-shopping">
                Retourner à l'achat
              </Link>
            </div>
          )}
        </div>
        {panier.length > 0 && (
          <div className="cart-summary">
            <h2>Total</h2>
            <p>{total} TND</p>
            <button onClick={handleCheckout} className="btn-passer-caisse">
              Passer à la caisse
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Panier;
