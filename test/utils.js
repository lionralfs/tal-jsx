export class Widget {
  constructor() {
    this.classes = [];
  }

  addClass(className) {
    this.classes.push(className);
  }
}

export class Container extends Widget {
  constructor() {
    super();
    this.childWidgets = [];
  }

  appendChildWidget(widget) {
    this.childWidgets.push(widget);
  }
}

export class Button extends Container {}

export class Label extends Widget {
  constructor(id, text, enableHTML) {
    super(id);
    this.id = id;
    this._enableHTML = !!enableHTML;

    this.text = text;
  }

  setText(text) {
    // see browserdevice.js#setElementContent why this is being done
    if (this._enableHTML) {
      const temp = document.createElement('div');
      temp.innerHTML = text;
      this.text = temp.innerHTML;
    } else {
      this.text = text;
    }
  }
}

export class Carousel extends Container {
  static get orientations() {
    return {
      VERTICAL: { orientation: 'vertical' },
      HORIZONTAL: { orientation: 'horizontal' }
    };
  }

  constructor(id, orientation) {
    super(id);

    this._orientation = orientation || Carousel.orientations.VERTICAL;
  }
}
