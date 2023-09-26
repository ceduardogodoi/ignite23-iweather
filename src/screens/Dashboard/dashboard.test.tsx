import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@__tests__/utils/customRender';
import { mockWeatherAPIResponse } from '@__tests__/mocks/api/mockWeatherAPIResponse';
import { mockCityAPIResponse } from '@__tests__/mocks/api/mockCityAPIResponse';
import { Dashboard } from '@screens/Dashboard';
import { api } from '@services/api';
import { saveStorageCity } from '@libs/asyncStorage/cityStorage';

describe('Screen: Dashboard', () => {
  beforeAll(async () => {
    const city = {
      id: '1',
      name: 'Rio do Sul',
      latitude: 123,
      longitude: 456,
    };

    await saveStorageCity(city);
  });

  it('should show a city weather', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockWeatherAPIResponse });

    render(
      <Dashboard />
    );

    const cityName = await waitFor(() => screen.findByText(/rio do sul/i, {}, {
      timeout: 3000,
    }));
    expect(cityName).toBeTruthy();
  });

  it('should show another selected city weather', async () => {
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
