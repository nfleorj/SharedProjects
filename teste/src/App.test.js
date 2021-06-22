import { render, screen } from '@testing-library/react';
import App from './App';
import Index from './locadora/Index';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders learn react link', () => {
  render(<Index />);
  const linkElement = screen.getByText('nome');
  expect(linkElement).toBeInTheDocument();
});
