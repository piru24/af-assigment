import { useEffect, useState } from 'react';
import { fetchCountryByCode } from '../api/countriesApi';

export default function CountryDetail({ code, onBack }) {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (code) {
      fetchCountryByCode(code).then(data => setCountry(data[0]));
    }
  }, [code]);

  if (!country) return <div className="text-center text-gray-600">Loading country details...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto text-gray-800">
      <button
        onClick={onBack}
        className="mb-6 px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-600 transition-all"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-full md:w-80 h-auto rounded shadow border object-contain"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-extrabold mb-4 text-blue-900">
            {country.name.common}
          </h1>
          <ul className="space-y-2 text-sm md:text-base">
            <li><strong className="text-gray-700">Capital:</strong> {country.capital?.[0] || 'N/A'}</li>
            <li><strong className="text-gray-700">Region:</strong> {country.region}</li>
            <li><strong className="text-gray-700">Population:</strong> {country.population.toLocaleString()}</li>
            <li>
              <strong className="text-gray-700">Languages:</strong>{' '}
              {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
