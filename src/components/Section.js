export class Section {
    constructor(containerSelector, renderer) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    renderItem(items) {
        this._renderedItems = items;
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
    addItem(element) {
        this._container.prepend(element);
    }
}