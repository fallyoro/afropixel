const CLE_STOCKAGE = "afropixel-panier";

const quantites = JSON.parse(localStorage.getItem(CLE_STOCKAGE)) || {};

function sauvegarderPanier() {
  localStorage.setItem(CLE_STOCKAGE, JSON.stringify(quantites));
}

export function modifierQuantite(id, changement, container = document) {
  const actuelle = quantites[id] || 0;
  const nouvelle = actuelle + changement;

  if (nouvelle <= 0) {
    delete quantites[id];
  } else {
    quantites[id] = nouvelle;
  }

  sauvegarderPanier();
  mettreAJourAffichage(container);
}

export function mettreAJourAffichage(container = document) {
  const cartes = container.querySelectorAll(".carte");

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

export function activerBoutons(container = document) {
  const cartes = container.querySelectorAll(".carte");

  for (const carte of cartes) {
    const id = carte.dataset.id;
    const btnPlus = carte.querySelector(".btn-plus");
    const btnMoins = carte.querySelector(".btn-moins");

    btnPlus.addEventListener("click", () => modifierQuantite(id, 1, container));
    btnMoins.addEventListener("click", () => modifierQuantite(id, -1, container));
  }
}
