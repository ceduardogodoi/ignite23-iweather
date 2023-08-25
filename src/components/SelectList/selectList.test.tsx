import { render, screen, fireEvent } from '@testing-library/react-native';

import { SelectList } from '@components/SelectList';

describe('Component: SelectList', () => {
  it('should return the selected city details', () => {
    const data = [
      {
        id: '1',
        name: 'Campinas',
        latitude: 123,
        longitude: 456,
      },
      {
        id: '2',
        name: 'Campo Grande',
        latitude: 789,
        longitude: 987,
      },
    ];

    const onPress = jest.fn();

    render(
      <SelectList
        data={data}
        onChange={() => { }}
        onPress={onPress}
      />
    );

    const selectedCity = screen.getByText(/campo/i);
    fireEvent.press(selectedCity);

    expect(onPress).toBeCalledTimes(1);
  });
});
