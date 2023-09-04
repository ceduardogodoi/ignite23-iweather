import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@__tests__/utils/customRender';
import { Dashboard } from '@screens/Dashboard';
import { api } from '@services/api';
import { saveStorageCity } from '@libs/asyncStorage/cityStorage';
import { mockWeatherAPIResponse } from '@__tests__/mocks/api/mockWeatherAPIResponse';
import { mockCityAPIResponse } from '@__tests__/mocks/api/mockCityAPIResponse';

describe('Screen: Dashboard', () => {
  it('should show a city weather', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockWeatherAPIResponse });

    const city = {
      id: '1',
      name: 'Rio do Sul',
      latitude: 123,
      longitude: 456,
    };

    await saveStorageCity(city);

    render(
      <Dashboard />
    );

    const cityName = await waitFor(() => screen.findByText(/rio do sul/i));
    expect(cityName).toBeTruthy();
  });

  it('should show another selected city weather', async () => {
    const city = {
      id: '1',
      name: 'Rio do Sul',
      latitude: 123,
      longitude: 456,
    };

    await saveStorageCity(city);

    // 1 - Busca informações do clima da cidade selecionada.
    // 2 - Busca informações da cidade.
    // 3 - Busca informações do clima da nova cidade selecionada.
    jest.spyOn(api, 'get')
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse })
      .mockResolvedValueOnce({ data: mockCityAPIResponse })
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse });

    render(<Dashboard />);

    await waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

    const cityName = 'São Paulo';

    await waitFor(() => act(() => {
      const search = screen.getByTestId('search-input');
      fireEvent.changeText(search, cityName);
    }));

    await waitFor(() => act(() => {
      fireEvent.press(screen.getByText(cityName, { exact: false }));
    }));

    expect(screen.getByText(cityName, { exact: false })).toBeTruthy();
  });
});
