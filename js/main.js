import { ImageCardList } from "./ImageCardList.js";
import { activerBoutons, mettreAJourAffichage } from "./panier.js";

const catalogue = document.getElementById("catalogue");

async function chargerProduits() {
  try {
    const reponse = await fetch("pictures.json");
    if (!reponse.ok) {
      throw new Error(`HTTP ${reponse.status}`);
    }
    const produits = await reponse.json();

    const liste = new ImageCardList(catalogue, produits);
    liste.render();

    activerBoutons(catalogue);
    mettreAJourAffichage(catalogue);
  } catch (erreur) {
    catalogue.textContent = "Impossible de charger les images";
  }
}

chargerProduits();
