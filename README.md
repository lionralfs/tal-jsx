# tal-jsx

> Update (2023-01-07): TAL is being deprecated, so I archived this repository and deprecated the npm package.

> _Making TAL more declarative_

![build status](https://github.com/lionralfs/tal-jsx/actions/workflows/main.yml/badge.svg)
[![npm version](https://badge.fury.io/js/tal-jsx.svg)](https://www.npmjs.com/package/tal-jsx)


## Installation

```
npm install tal-jsx --save
```

or include the following script in your page:

```html
<script src="https://unpkg.com/tal-jsx@latest/dist/taljsx.umd.js"></script>
```

in which case the library is exposed on `window` (`window.taljsx.render` and `window.taljsx.h`).

In your `.babelrc`:

```json
{
  "plugins": [
    [
      "transform-react-jsx",
      {
        "pragma": "h"
      }
    ]
  ]
}
```

## Usage

First, make sure `h` and `render` are available (`import { h, render } from 'tal-jsx'`).

```js
// create a widget by rendering some jsx:
const loginBox = render(
  <Container class="loginbox">
    <Label class="loginbox__title">Please log in!</Label>
    <Button onClick={() => console.log('clicked')}>
      <Label>Cancel</Label>
    </Button>
  </Container>
);

// then, you can use the widget as before:
this.appendChildWidget(loginBox);
```

## But why?

For readability purposes mostly. A deeply nested widget
tree becomes very difficult to read.

#### An example

Take a look at this:

```js
const wrapper = new Container();
wrapper.addClass('wrapper');

const textbox = new Container();
textbox.addClass('textbox');

const title = new Label('Example title');
title.addClass('title');

const desc = new Label('Some text');
desc.addClass('description');

textbox.appendChildWidget(title);
textbox.appendChildWidget(desc);

const button = new Button();
button.appendChildWidget(new Label('OK'));

wrapper.appendChildWidget(button);
```

This could now be written as:

```js
const wrapper = render(
  <Container class="wrapper">
    <Container class="textbox">
      <Label class="title">Example title</Label>
      <Label class="desc">Some text</Label>
    </Container>
    <Button>
      <Label>OK</Label>
    </Button>
  </Container>
);
```

Much nicer, right?

## Limitations

* You need Babel (alternatively, you could write the transformed JSX by hand).
* This was mainly built for static content. There is no such thing as state updates or a diffing algorithm.

## Carousels

To render [Carousels](https://bbc.github.io/tal/widgets/carousel.html), you can use `<Carousel>` like this:

```js
const handler = new ActivateFirstHandler(); // or any other KeyHandler

const myCarousel = render(
  <Carousel orientation="horizontal" handler={handler}>
    <Button>
      <Label>Item 1</Label>
    </Button>
    <Button>
      <Label>Item 2</Label>
    </Button>
  </Carousel>
);
```

The `orientation` can be either `horizontal` or `vertical`.

It also accepts the widget lengths as attributes:

```js
<Carousel lengths={300}>...</Carousel>
```

## Events

To bind event listeners to widgets, you can use one (or more) of the following attributes:

* onClick
* onKeyDown
* onKeyPress
* onKeyUp
* onSelectedItemChange
* onFocus
* onFocusDelay
* onBlur
* onBeforeDataBind
* onDataBound
* onDataBindingError
* onBeforeAlign
* onAfterAlign
* onBeforeSelectedItemChange
* onSelectedItemChange

## DOM JSX

You can also use DOM JSX inside a `<Label>`. For example:

```js
let label = render(
  <Label>
    <a href="#">
      <div />
    </a>
    <p>TEST</p>
    <div>
      <strong>ok</strong>
    </div>
  </Label>
);
```

Be careful with mixing TAL JSX and DOM JSX though, as you **won't** be able to:
* Go back to using TAL components/widgets inside DOM elements
* Use DOM JSX outside of a `<Label>` element.

## License

[MIT](LICENSE) © Lion Ralfs
