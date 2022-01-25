/** @jsx h */

import { Carousel, Button, KeyHandler, Label } from './utils';
import { h, render } from '../src';

describe('Carousel items', () => {
  it('Appends items the carousel', () => {
    const res = render(
      <Carousel>
        <Button>
          <Label>One</Label>
        </Button>
        <Button>
          <Label>Two</Label>
        </Button>
        <Button>
          <Label>Three</Label>
        </Button>
      </Carousel>
    );

    expect(res.childWidgets.length).toBe(3);
  });
});

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

describe('Carousel handler', () => {
  it('Attaches the handler', () => {
    const handler = new KeyHandler();
    const res = render(<Carousel handler={handler} />);

    expect(handler._carousel).toBe(res);
  });

  it("Doesn't attach anything that isn't a keyhandler (setAnimationOptions missing)", () => {
    class FakeHandler {
      constructor() {
        this.calledTimes = 0;
      }
      attach() {
        this.calledTimes++;
      }
    }

    const handler = new FakeHandler();
    render(<Carousel handler={handler} />);

    expect(handler.calledTimes).toBe(0);
  });

  it("Doesn't attach anything that isn't a keyhandler (attach missing)", () => {
    class FakeHandler {
      constructor() {
        this.calledTimes = 0;
      }
      setAnimationOptions() {
        this.calledTimes++;
      }
    }

    const handler = new FakeHandler();
    render(<Carousel handler={handler} />);

    expect(handler.calledTimes).toBe(0);
  });
});

describe('Carousel lengths', () => {
  it('Sets the widget length when given a number', () => {
    const res = render(<Carousel lengths={300} />);

    expect(res.lengths).toBe(300);
  });

  it('Sets the widget length when given an array', () => {
    const res = render(<Carousel lengths={[300, 200, 300, 0]} />);

    expect(res.lengths).toEqual([300, 200, 300, 0]);
  });
});
