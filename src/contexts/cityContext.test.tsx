import { act, renderHook, waitFor } from '@testing-library/react-native'

import { CityProvider } from '@contexts/CityContext';
import { useCity } from '@hooks/useCity';

describe('Context: CityContext', () => {
  it('should change the selected city', async () => {
    const { result } = renderHook(() => useCity(), {
      wrapper: CityProvider,
    });

    await waitFor(() => act(() => {
      console.log(result.current);
    }));
  });
});
