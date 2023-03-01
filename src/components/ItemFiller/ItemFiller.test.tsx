import {render} from '@testing-library/react';
import ItemFiller from './ItemFiller';
import React from 'react';

describe('ItemFiller Component', () => {
  it('should not render without an index', () => {
    const {queryByRole} = render(<ItemFiller />);

    expect(queryByRole('img', {})).toBeNull();
  });

  it('should render with an index', () => {
    const {getByRole} = render(<ItemFiller index={1} />);

    expect(getByRole('img', {})).toBeTruthy();
  });
});
