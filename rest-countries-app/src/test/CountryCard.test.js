import { render, screen } from '@testing-library/react';
import CountryCard from '../components/CountryCard';

test('renders country card', () => {
  const country = {
    cca3: 'USA',
    name: { common: 'United States' },
    population: 331000000,
    region: 'Americas',
    capital: ['Washington D.C.'],
    flags: { svg: 'https://restcountries.com/data/usa.svg' }
  };
  render(<CountryCard country={country} onSelect={() => {}} />);
  expect(screen.getByText(/United States/i)).toBeInTheDocument();
  expect(screen.getByText(/Americas/i)).toBeInTheDocument();
});
