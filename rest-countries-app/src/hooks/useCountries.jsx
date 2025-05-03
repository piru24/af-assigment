import { useState, useEffect } from 'react';
import { fetchAllCountries } from '../api/countriesApi';

export default function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCountries().then(data => {
      setCountries(data);
      setLoading(false);
    });
  }, []);

  return { countries, loading, setCountries };
}
