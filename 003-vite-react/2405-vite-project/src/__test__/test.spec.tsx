import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Test from './test';

describe('<Test />', () => {
  it('render', () => {
    const utils = render(<Test />);
    expect(utils.getByText('0')).toBeInTheDocument();
  });

  it('render2', async () => {
    render(<Test />);

    await waitFor(() => {
      expect(screen.getByText('mock_token')).toBeInTheDocument();
    });
  });

  it('button action', async () => {
    const utils = render(<Test />);
    const user = userEvent.setup();

    await user.click(screen.getByText('add'));

    expect(utils.getByText('1')).toBeInTheDocument();
  });
});
