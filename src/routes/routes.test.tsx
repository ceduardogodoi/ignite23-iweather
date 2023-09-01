import { Text } from 'react-native';

import { act, render, screen, waitFor } from '@__tests__/utils/customRender';
import { CityProps } from '@services/getCityByNameService';
import { api } from '@services/api';
import { saveStorageCity } from '@libs/asyncStorage/cityStorage';
import { Routes } from '.';
import { mockWeatherAPIResponse } from '@__tests__/mocks/api/mockWeatherAPIResponse';

describe('Routes', () => {
  it('should render Search screen when there is no city selected', async () => {
    render(<Routes />);

    const title: Text = await waitFor(() => {
      return screen.findByText(/^escolha um local/i);
    });

    expect(title).toBeTruthy();
  });

  it('should render Dashboard when it has a city selected', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({
      data: mockWeatherAPIResponse,
    });

    const city: CityProps = {
      id: '1',
      name: 'São Paulo',
      latitude: 123,
      longitude: 456,
    };

    await saveStorageCity(city);

    await act(() => waitFor(() => render(<Routes />)));

    const title: Text = screen.getByText(city.name);
    expect(title).toBeTruthy();
  });
});
