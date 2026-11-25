export class ImageCard {
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
