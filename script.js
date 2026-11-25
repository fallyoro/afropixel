const CLE_STOCKAGE = "afropixel-panier";

class ImageCard {
  constructor(id, title, price, url) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.url = url;
  }

  render() {
    return `
      <article class="carte" data-id="${this.id}">
        <img src="${this.url}" alt="${this.title}">
        <h3>${this.title}</h3>
        <p class="prix">${this.price} CFA</p>
        <div class="commandes">
          <button class="btn-plus">+</button>
          <span class="quantite">0</span>
          <button class="btn-moins">-</button>
        </div>
      </article>
    `;
  }
}

class ImageCardList {
  constructor(container, products) {
    this.container = container;
    this.cards = products.map((p) => new ImageCard(p.id, p.nom, p.prix, p.url));
  }

  render() {
    let html = "";
    for (const card of this.cards) {
      html += card.render();
    }
    this.container.innerHTML = html;
  }
}

// --- Gestion du panier ---

const catalogue = document.getElementById("catalogue");
let quantites = JSON.parse(localStorage.getItem(CLE_STOCKAGE)) || {};

function sauvegarderPanier() {
  localStorage.setItem(CLE_STOCKAGE, JSON.stringify(quantites));
}

function modifierQuantite(id, changement) {
  const actuelle = quantites[id] || 0;
  const nouvelle = actuelle + changement;

  if (nouvelle <= 0) {
    delete quantites[id];
  } else {
    quantites[id] = nouvelle;
  }

  sauvegarderPanier();
  mettreAJourAffichage();
}

function mettreAJourAffichage() {
  const cartes = document.querySelectorAll(".carte");

  for (const carte of cartes) {
    const id = carte.dataset.id;
    const qte = quantites[id] || 0;

    const span = carte.querySelector(".quantite");
    const btnMoins = carte.querySelector(".btn-moins");

    span.textContent = qte;
    span.hidden = qte === 0;
    btnMoins.disabled = qte === 0;
  }
}

function activerBoutons() {
  const cartes = document.querySelectorAll(".carte");

  for (const carte of cartes) {
    const id = carte.dataset.id;
    const btnPlus = carte.querySelector(".btn-plus");
    const btnMoins = carte.querySelector(".btn-moins");

    btnPlus.addEventListener("click", () => modifierQuantite(id, 1));
    btnMoins.addEventListener("click", () => modifierQuantite(id, -1));
  }
}


async function chargerProduits() {
  try {
    const reponse = await fetch("pictures.json");
    const produits = await reponse.json();

    const liste = new ImageCardList(catalogue, produits);
    liste.render();

    activerBoutons();
    mettreAJourAffichage();
  } catch (erreur) {
    catalogue.textContent = "Impossible de charger les images";
  }
}

chargerProduits();

