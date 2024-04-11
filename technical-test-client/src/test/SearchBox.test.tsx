import React, { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppRoutes from '../routes/AppRoutes';
import SearchBox from '../components/SearchBox/SearchBox';

interface RouterWrapperProps {
  children: ReactNode;
}

const RouterWrapper: React.FC<RouterWrapperProps> = ({ children }) => (
  <Router>
    {children}
    <AppRoutes />
  </Router>
);

describe('SearchBox Component', () => {
  test('renders SearchBox component', () => {
    render(<SearchBox />, { wrapper: RouterWrapper });
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nunca dejes de buscar')).toBeInTheDocument();
  });

  test('updates search query state on input change', () => {
    render(<SearchBox />, { wrapper: RouterWrapper });
    const searchInput = screen.getByPlaceholderText('Nunca dejes de buscar');
    userEvent.type(searchInput, 'iphone');
    expect(searchInput).toHaveValue('iphone');
  });

  test('search input should be accessible', () => {
    render(<SearchBox />, { wrapper: RouterWrapper });
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.tab();
    expect(searchInput).toHaveFocus();
  });

  test('navigates to search results page on form submit using Enter key', async () => {
    render(<SearchBox />, { wrapper: RouterWrapper });
    const searchInput = screen.getByPlaceholderText('Nunca dejes de buscar');
  
    userEvent.type(searchInput, 'celular{enter}');
  
    await waitFor(() => {
      expect(window.location.pathname).toBe('/items');
      expect(window.location.search).toBe('?search=celular');
    });
  });
});
