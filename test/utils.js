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
    this.enableHTML = !!enableHTML;

    this.text = text;
  }

  setText(text) {
    this.text = text;
  }
}
