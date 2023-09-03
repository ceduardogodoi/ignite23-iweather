import { render, screen, waitFor } from '@__tests__/utils/customRender';
import { Dashboard } from '@screens/Dashboard';
import { api } from '@services/api';
import { mockWeatherAPIResponse } from '@__tests__/mocks/api/mockWeatherAPIResponse';
import { saveStorageCity } from '@libs/asyncStorage/cityStorage';

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
});
