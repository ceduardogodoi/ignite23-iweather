import { getStorageCity, removeStorageCity, saveStorageCity } from '@libs/asyncStorage/cityStorage';
import { CityProps } from '@services/getCityByNameService';

const newCity: CityProps = {
  id: '1',
  latitude: 123,
  longitude: 456,
  name: 'São Paulo',
};

describe('Storage: cityStorage', () => {
  it('should return null when it does not have a city stored', async () => {
    const response = await getStorageCity();
    expect(response).toBeNull();
  });

  it('should return the stored city', async () => {
    await saveStorageCity(newCity);

    const response = await getStorageCity();
    expect(response).toEqual(newCity);
  });

  it('should remove the city from the storage', async () => {
    await saveStorageCity(newCity);

    await removeStorageCity();

    const response = await getStorageCity();
    expect(response).toBeNull();
  });
});
