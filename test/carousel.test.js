/** @jsx taljsx */

import { Carousel, Button } from './utils';
import { render } from '../src';

describe('Carousel orientation', () => {
  it('Sets the orientation to vertical when specified', () => {
    const res = render(<Carousel orientation="vertical" />);

    expect(res._orientation.orientation).toBe('vertical');
  });

  it('Sets the orientation to horizontal when specified', () => {
    const res = render(<Carousel orientation="horizontal" />);

    expect(res._orientation.orientation).toBe('horizontal');
  });

  it('Sets the orientation to vertical when misspelled', () => {
    let res = render(<Carousel orientation="horizontall" />);
    expect(res._orientation.orientation).toBe('vertical');

    res = render(<Carousel orientation="HORIZONTAL" />);
    expect(res._orientation.orientation).toBe('vertical');
  });

  it('Sets the orientation to vertical when omitted', () => {
    let res = render(<Carousel />);
    expect(res._orientation.orientation).toBe('vertical');
  });
});
