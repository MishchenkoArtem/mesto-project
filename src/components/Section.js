import { Card } from "./Card";

export class Section {
  constructor({ data }, selector) {
    this._renderedItems = data;
    this._container = document.querySelector(selector);
  }

  renderItem() {
    this._renderedItems.forEach(item => {
      const cards = new Card(item, '.template__card');
      const cardElement = cards.generate();
      this.setItem(cardElement);
    });
  };
  
  setItem(element) {
    this._container.append(element);
  }
}