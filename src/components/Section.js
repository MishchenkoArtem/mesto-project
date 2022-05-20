import { Card } from './card.js'

export default class Section {
    constructor({ items, renderer }, selector) {
        this._initialArray = items;
        this._renderer = renderer;
      
        this._container = document.querySelector(selector);
  }

  // Перебирает массив данных
  renderItems() {
    this._initialArray.forEach((item) => {
        this._renderer(item);
    });
  }

  // Вставка контейнера в разметку
  setItems(element) {
      this._container.prepend(element);
  }
}