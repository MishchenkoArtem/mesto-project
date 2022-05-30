export default class Section {
  constructor(renderer, selector, getUserCallback) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
    this._getUserCallback = getUserCallback;
  }

  renderItem(cards) {
    this._getUserCallback()
        .then (res => {
          if (cards.length > 1) {
            cards.forEach(item => this._renderer(item, res._id));
          } else {
            this._renderer(cards, res._id);
          }
        });
  };
  
  setItem(element) {
    this._container.prepend(element);
  }
}