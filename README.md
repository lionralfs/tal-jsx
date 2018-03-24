# tal-jsx

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

## License

[MIT](LICENSE) © Lion Ralfs
