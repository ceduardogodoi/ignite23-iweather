import { renderHook } from '@testing-library/react-native'

import { useCity } from '@hooks/useCity';

describe('Context: CityContext', () => {
  it('should change the selected city', () => {
    const { result } = renderHook(() => useCity());
    console.log(result.current.city);
  });
});
