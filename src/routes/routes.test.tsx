import { render } from '@testing-library/react-native';

import { Routes } from '.';

describe('Routes', () => {
  it('should render Search screen when there is no city selected', () => {
    const { debug } = render(
      <Routes />
    );

    debug();
  });
});
