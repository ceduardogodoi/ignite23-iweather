import { Text } from 'react-native';
import { render, screen, waitFor } from '@testing-library/react-native';

import { Routes } from '.';

describe('Routes', () => {
  it('should render Search screen when there is no city selected', async () => {
    render(
      <Routes />
    );

    const title: Text = await waitFor(() => {
      return screen.findByText(/^escolha um local/i)
    });

    expect(title).toBeTruthy();
  });
});
