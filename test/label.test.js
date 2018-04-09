/** @jsx taljsx */

const { Container, Label } = require('./utils');
const { taljsx, render } = require('../src');

it('It sets enableHTML correctly', () => {
  let label = render(<Label enableHTML />);
  expect(label.enableHTML).toBe(true);

  label = render(<Label />);
  expect(label.enableHTML).toBe(false);

  label = render(<Label enableHTML={true} />);
  expect(label.enableHTML).toBe(true);

  label = render(<Label enableHTML={0} />);
  expect(label.enableHTML).toBe(false);
});

it('It works by setting both enableHTML and content', () => {
  let label = render(<Label enableHTML>{'<p>Test</p>'}</Label>);
  expect(label.enableHTML).toBe(true);
  expect(label.text).toBe('<p>Test</p>');
});

it('It sets the id correctly', () => {
  let label = render(
    <Label id={'my-id'} enableHTML>
      {'<p>Test</p>'}
    </Label>
  );

  expect(label.id).toBe('my-id');
});
