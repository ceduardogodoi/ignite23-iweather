import { getStorageCity } from '@libs/asyncStorage/cityStorage';

describe('Storage: cityStorage', () => {
  it('should return null when it does not have a city stored', async () => {
    const response = await getStorageCity();
    console.log(JSON.stringify(response, null, 2));
  });
});