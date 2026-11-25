import { ImageCard } from "./ImageCard.js";

export class ImageCardList {
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
