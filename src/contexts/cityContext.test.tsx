import { renderHook } from '@testing-library/react-native'

import { CityProvider } from '@contexts/CityContext';
import { useCity } from '@hooks/useCity';

describe('Context: CityContext', () => {
  it('should change the selected city', () => {
    const { result } = renderHook(() => useCity(), {
      wrapper: CityProvider,
    });
    console.log(result.current);
  });
});
