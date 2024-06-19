import TestPage from './TestPage';
import { render, screen } from '@testing-library/react';

describe('TestPage testing', () => {
  it('render', () => {
    const { getByText } = render(<TestPage />);
    expect(getByText('test')).toBeInTheDocument();
  });

  it('props test', () => {
    const text = 'this is props';
    const { getByText } = render(<TestPage text={text} />);
    expect(getByText(text)).toBeInTheDocument();
  });

  it('test role button toBeDisabled', () => {
    render(<TestPage />);
    const button = screen.getByRole('button', { name: 'test button' });
    expect(button).toBeDisabled();
  });
});
