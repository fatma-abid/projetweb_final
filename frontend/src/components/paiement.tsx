import React, { useState } from "react";
import "./paiement.css";  // Assurez-vous que votre fichier CSS est correctement importé

const PaymentForm = () => {
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Vous pouvez ajouter ici la logique pour envoyer les données à votre serveur (par exemple, avec fetch)
        console.log("Nom sur la carte :", name);
        console.log("Numéro de carte :", cardNumber);
        console.log("Date d'expiration :", expiry);
        console.log("CVV :", cvv);
    };

    return (
        <div className="payment-container">
            <h2>Payez en ligne</h2>
            <div className="card-icons">
                <img src="/visa.png" alt="Visa" />
                <img src="/mastercard.png" alt="MasterCard" />
                <img src="/amex.png" alt="American Express" />
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nom sur la carte</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom complet"
                    required
                />

                <label htmlFor="card-number">N° de carte</label>
                <input
                    type="text"
                    id="card-number"
                    name="card-number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="**** **** **** ****"
                    required
                />

                <label htmlFor="expiry">Date d'expiration</label>
                <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/AA"
                    required
                />

                <label htmlFor="cvv">Cryptogramme visuel (CVV)</label>
                <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="..."
                    required
                />

                <button type="submit">Payer</button>
            </form>
        </div>
    );
};

export default PaymentForm;
