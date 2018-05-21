export class Widget {
  constructor(id) {
    this.id = id || 'random-id';
    this.classes = [];
    this.listeners = {};
  }

  addClass(className) {
    this.classes.push(className);
  }

  addEventListener(event, fn) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(fn);
  }
}

export class Container extends Widget {
  constructor(id) {
    super(id);
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

  /**
   * length can be an array or a number
   */
  setWidgetLengths(length) {
    this.lengths = length;
  }
}

export class KeyHandler {
  attach(carousel) {
    this._carousel = carousel;
  }

  setAnimationOptions() {}
}

export class Image extends Container {
  constructor(id) {
    super(id);
    this.source = undefined;
  }

  setSrc(source) {
    this.source = source;
  }
}
