// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act, fireEvent, render, screen, waitFor } from '@/__test__/render';
import SearchPage from './SearchPage';

describe('<SearchPage />', () => {
  it('SearchPage render', () => {
    render(<SearchPage />);
    expect(screen.getByRole('sort', { name: 'desc' })).toBeChecked();
    expect(screen.getByRole('sort', { name: 'asc' })).not.toBeChecked();
    expect(screen.getByRole('duplicate', { name: '전체' })).toBeChecked();
    expect(screen.getByRole('duplicate', { name: 'yes' })).toBeChecked();
    expect(screen.getByRole('duplicate', { name: 'no' })).toBeChecked();
    expect(screen.getByPlaceholderText('키워드를 입력해주세요.')).toBeInTheDocument();
  });

  it('SearchPage change value', () => {
    render(<SearchPage />);
    const keyword = screen.getByPlaceholderText('키워드를 입력해주세요.');
    const allCheckbox = screen.getByRole('duplicate', { name: '전체' });

    const value = 'test text change';
    fireEvent.change(keyword, { target: { value } });
    fireEvent.click(allCheckbox);
    expect(keyword).toHaveValue(value);
    expect(allCheckbox).not.toBeChecked();
    expect(screen.getByRole('duplicate', { name: 'yes' })).not.toBeChecked();
    expect(screen.getByRole('duplicate', { name: 'no' })).not.toBeChecked();
  });

  it('SearchPage fetching data test onSubmitAxios', async () => {
    render(<SearchPage />);
    // const submit = screen.getByRole('submit-search', { name: 'onSubmitAxios' });
    const submit = screen.getByRole('submit-search', { name: 'axios' });

    fireEvent.click(submit);

    await waitFor(async () => {
      expect(screen.getByText('name-a')).toBeInTheDocument();
      expect(screen.getByText('name-b')).toBeInTheDocument();
    });
  });

  it('SearchPage fetching data test onSubmitQuery', async () => {
    render(<SearchPage />);
    const submit = screen.getByRole('submit-search', { name: 'query' });

    fireEvent.click(submit);

    await waitFor(async () => {
      expect(screen.getByText('name-a')).toBeInTheDocument();
      expect(screen.getByText('name-b')).toBeInTheDocument();
    });
  });

  it('fetch test ', async () => {
    render(<SearchPage />);
    const axiosBtn = screen.getByRole('submit-search', { name: 'axios' });
    const queryBtn = screen.getByRole('submit-search', { name: 'query' });

    act(() => {
      fireEvent.click(axiosBtn);
      fireEvent.click(queryBtn);
    });

    await waitFor(async () => {
      expect(screen.getByText('name-a')).toBeInTheDocument();
      expect(screen.getByText('name-b')).toBeInTheDocument();
    });

    const dataB = screen.getByRole('query-data', { name: 'name-b' });

    fireEvent.click(dataB);

    await waitFor(async () => {
      expect(dataB).toHaveTextContent('isSelected');
    });

    const dataA = screen.getAllByText('name-a')[1];

    fireEvent.click(dataA);

    await waitFor(async () => {
      expect(dataA.parentElement).toHaveTextContent('isSelected');
      expect(dataA).not.toHaveTextContent('isSelected');
      expect(dataB).not.toHaveTextContent('isSelected');
    });
  });

  it('fetch data event test ', async () => {
    render(<SearchPage />);
    const queryBtn = screen.getByRole('submit-search', { name: 'query' });

    fireEvent.click(queryBtn);

    await waitFor(async () => {
      expect(screen.getByText('name-a')).toBeInTheDocument();
      expect(screen.getByText('name-b')).toBeInTheDocument();
    });

    const dataA = await screen.findByText(/name-a/i);
    const dataB = await screen.findByText(/name-b/i);

    fireEvent.click(dataB);

    await waitFor(async () => {
      expect(dataA).not.toHaveTextContent('isSelected');
      expect(dataB.parentElement).toHaveTextContent('isSelected');
    });

    fireEvent.click(dataA);

    await waitFor(async () => {
      // expect(dataA).toHaveTextContent('isSelected');
      expect(dataA.parentElement).toHaveTextContent('isSelected');
      expect(dataB).not.toHaveTextContent('isSelected');
    });
  });
});
