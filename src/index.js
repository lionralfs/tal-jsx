export const render = ({ el, attributes, children }) => {
  let instance;

  // it is a horizontalprogress widget
  if (attributes && attributes.showLabel) {
    instance = new el(attributes.id, true);
  } else if (attributes && attributes.enableHTML) {
    // it is a label, text content will be set later
    instance = new el(attributes.id, '', true);
  } else if (isCarousel(el) && attributes) {
    let orientation = false;
    if (
      attributes.orientation === 'horizontal' ||
      attributes.orientation === 'vertical'
    ) {
      orientation = el.orientations[attributes.orientation.toUpperCase()];
    }
    instance = new el(attributes.id, orientation);
    if (isKeyHandler(attributes.handler)) {
      attributes.handler.attach(instance);
    }

    if (attributes.lengths) {
      instance.setWidgetLengths(attributes.lengths);
    }
  } else if (typeof el === 'function') {
    const widget = Object.create(el.prototype);
    widget.props = attributes;
    instance = el.call(widget, attributes && attributes.id) || widget;
  } else {
    const html = renderHTML({ el, attributes, children });
    const tmp = document.createElement('div');
    tmp.appendChild(html);
    return tmp.innerHTML;
  }

  let classesToAdd = [];

  if (attributes) {
    if (typeof attributes.class === 'string') {
      classesToAdd = attributes.class.split(' ');
    }

    if (
      typeof attributes.src === 'string' &&
      typeof instance.setSrc === 'function'
    ) {
      instance.setSrc(attributes.src);
    }

    if (
      attributes.background &&
      typeof instance.setBackgroundImage === 'function'
    ) {
      instance.setBackgroundImage(attributes.background);
    }

    for (const attribute in attributes) {
      if (typeof events[attribute] === 'string') {
        instance.addEventListener(events[attribute], attributes[attribute]);
      }
    }

    if (typeof attributes.ref === 'function') {
      attributes.ref(instance);
    }
  }

  if (children) {
    let setTextLater = '';
    children.forEach(child => {
      if (child === null || (typeof child === 'boolean' && !child)) {
        return;
      }
      // we can't call `new` on el
      if (typeof child.el !== 'function') {
        // the instance is a Label
        if (typeof instance.setText === 'function') {
          // the child is more nested jsx
          if (typeof child === 'object') {
            // recursive render call, but set it as text on the Label
            setTextLater += render(child);
          } else {
            // just set it as text
            setTextLater += child.toString();
          }
        } else {
          throw new TypeError(
            "You're trying to set text content on an element other than a Label or a DOM-Node."
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

    if (setTextLater) {
      // TODO: find a better way than changing a "private" field
      instance._enableHTML = true;
      instance.setText(setTextLater);
    }
  }

  // add classes
  classesToAdd.forEach(item => instance.addClass(item));
  return instance;
};

export const taljsx = (el, attributes, ...args) => {
  let children = args.length ? [].concat(...args) : null;

  return { el, attributes, children };
};

/**
 * Shoutout to Jason Miller (@_developit)
 * https://jasonformat.com/wtf-is-jsx/
 */
const renderHTML = vnode => {
  // Strings just convert to #text Nodes:
  if (vnode.split) return document.createTextNode(vnode);

  // create a DOM element with the nodeName of our VDOM element:
  let n = document.createElement(vnode.el);

  // copy attributes onto the new node:
  let a = vnode.attributes || {};
  Object.keys(a).forEach(k => n.setAttribute(k, a[k]));

  // render (build) and then append child nodes:
  (vnode.children || []).forEach(c => n.appendChild(renderHTML(c)));

  return n;
};

const events = {
  onClick: 'select',
  onKeyDown: 'keydown',
  onKeyPress: 'keypress',
  onKeyUp: 'keyup',
  onSelectedItemChange: 'selecteditemchange',
  onFocus: 'focus',
  onFocusDelay: 'focusdelay',
  onBlur: 'blur',
  onBeforeDataBind: 'beforedatabind',
  onDataBound: 'databound',
  onDataBindingError: 'databindingerror',
  onBeforeAlign: 'beforealign',
  onAfterAlign: 'afteralign',
  onBeforeSelectedItemChange: 'beforeselecteditemchange',
  onSelectedItemChange: 'selecteditemchange'
};

const isCarousel = constructor => {
  if (!constructor) return false;
  if (!constructor.orientations) return false;
  if (typeof constructor.orientations['HORIZONTAL'] !== 'object') return false;
  if (typeof constructor.orientations['VERTICAL'] !== 'object') return false;

  return true;
};

const isKeyHandler = instance => {
  if (!instance) return false;
  if (typeof instance.attach !== 'function') return false;
  if (typeof instance.setAnimationOptions !== 'function') return false;

  return true;
};

if (typeof window !== 'undefined') {
  window.render = render;
  window.taljsx = taljsx;
}
