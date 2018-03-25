# tal-jsx

[![Build Status](https://travis-ci.org/lionralfs/tal-jsx.svg?branch=master)](https://travis-ci.org/lionralfs/tal-jsx)

## Installation

```
npm install tal-jsx --save
```

or include the following script in your page:

```html
<script src="https://unpkg.com/tal-jsx/dist/global.min.js"></script>
```

in which case the library exposes itself on `window` (`window.render` and `window.taljsx`).

In your `.babelrc`:

```json
{
  "plugins": [
    [
      "transform-react-jsx",
      {
        "pragma": "taljsx"
      }
    ]
  ]
}
```

## Usage

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

## License

[MIT](LICENSE) © Lion Ralfs
