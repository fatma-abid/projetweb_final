import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Importez Navigate pour la redirection
import Accueil from "./components/Accueil";
import Visage from "./components/visage";
import Cheveux from "./components/cheveux";
import Solaire from "./components/solaire";
import Contact from "./components/contact";
import Connexion from "./components/connexion";
import Paiement from "./components/paiement";
import Register from "./components/register";
import Panier from "./components/panier";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirection de la route racine ("/") vers la page de connexion */}
        <Route path="/" element={<Navigate to="/connexion" />} />
        
        <Route path="/accueil" element={<Accueil />} />  {/* Page d'accueil */}
        <Route path="/visage" element={<Visage />} />   {/* Page Visage */}
        <Route path="/cheveux" element={<Cheveux />} />
        <Route path="/solaire" element={<Solaire />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/paiement" element={<Paiement />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/panier" element={<Panier />} />
      </Routes>
    </Router>
  );
}

export default App;
