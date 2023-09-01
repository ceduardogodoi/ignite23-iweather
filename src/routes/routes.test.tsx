import { Text } from 'react-native';
import { render, screen, waitFor } from '@__tests__/utils/customRender';

import { Routes } from '.';
import { saveStorageCity } from '@libs/asyncStorage/cityStorage';
import { CityProps } from '@services/getCityByNameService';

describe('Routes', () => {
  it('should render Search screen when there is no city selected', async () => {
    render(<Routes />);

    const title: Text = await waitFor(() => {
      return screen.findByText(/^escolha um local/i)
    });

    expect(title).toBeTruthy();
  });

  it('should render Dashboard when it has a city selected', async () => {
    const city: CityProps = {
      id: '1',
      name: 'São Paulo',
      latitude: 123,
      longitude: 456,
    };

    await saveStorageCity(city);

    render(<Routes />);

    screen.debug();
  });
});
