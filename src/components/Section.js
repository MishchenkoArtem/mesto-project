export default class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItem(cards) {
    if (cards.length > 1) {
      cards.forEach(item => this._renderer(item));
    } else {
      this._renderer(cards);
    }
  };
  
  setItem(element) {
    this._container.append(element);
  }
}