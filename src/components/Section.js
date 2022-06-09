export default class Section {
    constructor({ renderItems }, containerSelector) {
        this._renderer = renderItems
        this._container = document.querySelector(containerSelector)
    }

    renderItems(items) {
        if (Array.from(items).length <= 0) {
            this._renderer(items)
        } else {
            items.forEach((item) => {
                this._renderer(item)
            })
        }
    }

    addItem(element) {
        this._container.prepend(element)
    }
}
