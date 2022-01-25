/** @jsx h */

import { Container, Label } from './utils';
import { h, render } from '../src';

it('It renders a container', () => {
  const container = render(<Container />);

  expect(container).toBeInstanceOf(Container);
});

it('It adds classes to a container', () => {
  const container = render(<Container class="test1 test2" />);

  expect(container.classes).toContain('test1');
  expect(container.classes).toContain('test2');
});

it('It appends childWidgets to a container', () => {
  const container = render(
    <Container>
      <Label />
    </Container>
  );
  expect(container.childWidgets[0]).toBeInstanceOf(Label);
});
