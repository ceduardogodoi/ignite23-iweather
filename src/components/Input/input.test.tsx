import { render, screen } from '@testing-library/react-native';

import { Input } from '@components/Input';

describe('Component: Input', () => {
  it('should render without activity indicator when isLoading is absent', () => {
    render(<Input />);

    const activityIndicator = screen.queryByTestId('activity-indicator');
    expect(activityIndicator).toBeNull();
  });

  it('should render activity indicator when isLoading is present', () => {
    render(<Input isLoading />);

    const activityIndicator = screen.queryByTestId('activity-indicator');
    expect(activityIndicator).toBeTruthy();
  });
});
