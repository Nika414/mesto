import { Card } from "./Card.js";

export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    renderItem() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
          });
    }
    addItem(element) {
        this._container.prepend(element);
    }
}