/** @jsx taljsx */

import { Image } from './utils';
import { render } from '../src';

it('Sets the image source on an image', () => {
  const image = render(<Image src="some-image-path.png" />);

  expect(image.source).toBe('some-image-path.png');
});
