/** @jsx taljsx */

import { Container, Label } from './utils';
import { render } from '../src';

it("Doesn't render null", () => {
  const container = render(
    <Container>
      {null}
      <Label />
    </Container>
  );

  expect(container.childWidgets.length).toBe(1);
  expect(container.childWidgets[0]).toBeInstanceOf(Label);
});

it('Allows conditional rendering', () => {
  const active = false;
  const container = render(<Container>{active ? <Label /> : null}</Container>);

  expect(container.childWidgets.length).toBe(0);
});

it('Allows the `something && something.something` way of conditionally rendering', () => {
  const container = render(<Container>{false && <Label>hi</Label>}</Container>);

  expect(container.childWidgets.length).toBe(0);
});
