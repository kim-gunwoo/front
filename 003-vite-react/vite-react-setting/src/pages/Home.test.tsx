import { fireEvent, render, screen } from '@/__test__/render';
import Home from './Home';

describe('<Home />', () => {
  it('render', () => {
    const utils = render(<Home />);
    expect(utils.getByText('0')).toBeInTheDocument();
  });

  // it('count', () => {
  //   render(<Home />);
  //   const button = screen.getAllByRole('button', { name: 'test' })[0];
  //   fireEvent.click(button);
  //   expect(screen.getByText('1')).toBeInTheDocument();
  // });

  it('role add-count count', () => {
    render(<Home />);
    const button = screen.getByRole('add-count');
    fireEvent.click(button);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
