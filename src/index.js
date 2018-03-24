export const render = ({ el, attributes, children }) => {
  let instance;

  // it is a horizontalprogress widget
  if (attributes && attributes.showLabel) {
    instance = new el(null, true);
  } else {
    instance = new el();
  }

  let classesToAdd = [];

  if (attributes) {
    if (typeof attributes.class === 'string') {
      classesToAdd = attributes.class.split(' ');
    }

    if (attributes.onClick && typeof attributes.onClick === 'function') {
      instance.addEventListener('select', attributes.onClick);
    }

    if (attributes.onKeyPress && typeof attributes.onKeyPress === 'function') {
      instance.addEventListener('keypress', attributes.onKeyPress);
    }

    if (
      attributes.src &&
      typeof attributes.src === 'string' &&
      typeof instance.setSrc === 'function'
    ) {
      instance.setSrc(attributes.src);
    }

    if (attributes.ref && typeof attributes.ref === 'function') {
      attributes.ref(instance);
    }

    if (
      attributes.background &&
      typeof instance.setBackgroundImage === 'function'
    ) {
      instance.setBackgroundImage(attributes.background);
    }
  }

  if (children) {
    children.forEach(child => {
      if (typeof child === 'string' || typeof child === 'number') {
        if (typeof instance.setText === 'function') {
          instance.setText(child.toString());
        } else {
          throw new TypeError(
            "You're trying to set text content on a non-Label element"
          );
        }
      } else {
        if (instance.setContent) {
          instance.setContent(render(child));
        } else {
          instance.appendChildWidget(render(child));
        }
      }
    });
  }

  // add classes
  classesToAdd.forEach(item => instance.addClass(item));
  return instance;
};

export const taljsx = (el, attributes, ...args) => {
  let children = args.length ? [].concat(...args) : null;

  return { el, attributes, children };
};

if (typeof window !== 'undefined') {
  window.render = render;
  window.taljsx = taljsx;
}
