/** @jsx h */

import { Label, Button } from './utils';
import { h, render } from '../src';

it('It sets enableHTML correctly', () => {
  let label = render(<Label enableHTML />);
  expect(label._enableHTML).toBe(true);

  label = render(<Label />);
  expect(label._enableHTML).toBe(false);

  label = render(<Label enableHTML={true} />);
  expect(label._enableHTML).toBe(true);

  label = render(<Label enableHTML={0} />);
  expect(label._enableHTML).toBe(false);
});

it('It works by setting both enableHTML and content', () => {
  let label = render(<Label enableHTML>{'<p>Test</p>'}</Label>);
  expect(label._enableHTML).toBe(true);
  expect(label.text).toBe('<p>Test</p>');
});

it('It sets the id correctly', () => {
  let label = render(
    <Label id="my-id" enableHTML>
      {'<p>Test</p>'}
    </Label>
  );

  expect(label.id).toBe('my-id');
});

it('It works by setting a number as content', () => {
  let label = render(<Label>{123}</Label>);

  expect(label.text).toBe('123');
});

it('It works with nested html elements', () => {
  let label1 = render(
    <Label>
      <p>
        <span>without enableHTML</span>
      </p>
    </Label>
  );

  let label2 = render(
    <Label enableHTML>
      <p>
        <span>with enableHTML</span>
      </p>
    </Label>
  );

  expect(label1.text).toBe('<p><span>without enableHTML</span></p>');
  expect(label2.text).toBe('<p><span>with enableHTML</span></p>');
});

it('It works with sibling elements', () => {
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

  expect(label.text).toBe(
    '<a href="#"><div></div></a><p>TEST</p><div><strong>ok</strong></div>'
  );
});

it('Automatically sets enableHTML when jsx content is detected', () => {
  let label = render(
    <Label>
      <p>
        <div>{'test'}</div>
      </p>
      <span />
    </Label>
  );

  expect(label._enableHTML).toBe(true);
  expect(label.text).toBe('<p></p><div>test</div><p></p><span></span>');
});

it('Throws an error when trying to render text to anything else than a Label', () => {
  expect(() => render(<Button>text</Button>)).toThrowError(TypeError);
});
