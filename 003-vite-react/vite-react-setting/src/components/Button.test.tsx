import Button from './Button';
import useRender from '@/__test__/useRender';
import { fireEvent, render, screen } from '@/__test__/render';
// import { render } from '@testing-library/react';

describe('<Button> ', () => {
  it('button @/__test__/ useRender', () => {
    const children = 'this is button';
    const { getByText } = useRender(<Button>{children}</Button>);
    expect(getByText(children)).toBeInTheDocument();
  });

  it('button @/__test__/ render', () => {
    const children = 'this is button';
    render(<Button>{children}</Button>);
  });

  test('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText(/click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
