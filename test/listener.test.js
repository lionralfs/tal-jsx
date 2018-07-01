/** @jsx h */

import { Button } from './utils';
import { h, render } from '../src';

it('Adds onClick event listeners', () => {
  const handler = () => {};
  const res = render(<Button onClick={handler} />);
  expect(res.listeners['select'][0]).toBe(handler);
});

it('Adds onKeyPress event listeners', () => {
  const handler = () => {};
  const res = render(<Button onKeyPress={handler} />);
  expect(res.listeners['keypress'][0]).toBe(handler);
});

it('Adds onKeyDown event listeners', () => {
  const handler = () => {};
  const res = render(<Button onKeyDown={handler} />);
  expect(res.listeners['keydown'][0]).toBe(handler);
});

it('Adds onKeyUp event listeners', () => {
  const handler = () => {};
  const res = render(<Button onKeyUp={handler} />);
  expect(res.listeners['keyup'][0]).toBe(handler);
});
