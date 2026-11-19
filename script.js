const CLE_STOCKAGE = "afropixel-panier";

const catalogue = document.getElementById("catalogue");

let produits = [];
let quantites = chargerPanier();

function chargerPanier() {
  try {
    return JSON.parse(localStorage.getItem(CLE_STOCKAGE)) || {};
  } catch {
    return {};
  }
}

function sauvegarderPanier() {
  try {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(quantites));
  } catch {
  }
}

async function chargerProduits() {
  try {
    const reponse = await fetch("pictures.json");
    if (!reponse.ok) throw new Error("HTTP " + reponse.status);
    produits = await reponse.json();
    afficherCatalogue();
    majCartes();
  } catch (erreur) {
    catalogue.textContent = "Impossible de charger les images";
    console.error(erreur);
  }
}

function formatPrix(valeur) {
  return valeur + " CFA";
}

function creerCarte(produit) {
  const carte = document.createElement("article");
  carte.className = "carte";
  carte.dataset.id = produit.id;

  const img = document.createElement("img");
  img.src = produit.url;
  img.alt = produit.nom;
  img.loading = "lazy";

  const nom = document.createElement("p");
  nom.className = "nom";
  nom.textContent = produit.nom;

  const prix = document.createElement("p");
  prix.className = "prix";
  prix.textContent = formatPrix(produit.prix);

  const controles = document.createElement("div");
  controles.className = "controles";

  const plus = document.createElement("button");
  plus.type = "button";
  plus.textContent = "+";
  plus.setAttribute("aria-label", "Ajouter " + produit.nom + " au panier");
  plus.addEventListener("click", () => modifierQuantite(produit.id, 1));

  const qte = document.createElement("span");
  qte.className = "quantite";
  qte.hidden = true;

  const moins = document.createElement("button");
  moins.type = "button";
  moins.textContent = "-";
  moins.setAttribute("aria-label", "Retirer " + produit.nom + " du panier");
  moins.addEventListener("click", () => modifierQuantite(produit.id, -1));

  controles.append(plus, qte, moins);
  carte.append(img, nom, prix, controles);
  return carte;
}

function afficherCatalogue() {
  catalogue.replaceChildren(...produits.map(creerCarte));
}


function majCartes() {
  catalogue.querySelectorAll(".carte").forEach(carte => {
    const q = quantites[carte.dataset.id] || 0;
    const span = carte.querySelector(".quantite");
    span.textContent = q;
    span.hidden = q === 0;
    carte.querySelector("button:last-of-type").disabled = q === 0;
  });
}

chargerProduits();
