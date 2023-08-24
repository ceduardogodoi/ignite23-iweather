import { render, screen } from '@testing-library/react-native';

import { Input } from '@components/Input';

describe('Component: Input', () => {
  it('should render without activity indicator if isLoading is absent', () => {
    render(<Input />);

    const activityIndicator = screen.getByTestId('activity-indicator');
    console.log(activityIndicator);
  });
});
