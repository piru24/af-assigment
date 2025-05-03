import React, { useEffect, useState } from "react";
import api from "../api/api";
import CountryCard from "../components/CountryCard";
import Navbar from "../components/Navbar";
import TopNoticeBar from "../components/TopNoticeBar";
import HeroBanner from "../components/HeroBanner";

const FavoritesPage = () => {
  const [favoriteNames, setFavoriteNames] = useState([]);
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get("/favorites");
        setFavoriteNames(res.data);
      } catch (err) {
        setFavoriteNames([]);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      if (favoriteNames.length === 0) {
        setFavoriteCountries([]);
        setLoading(false);
        return;
      }

      try {
        const countryPromises = favoriteNames.map((name) =>
          fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`)
            .then((res) => res.json())
            .then((data) => data[0])
        );

        const countryDetails = await Promise.all(countryPromises);
        setFavoriteCountries(countryDetails.filter(Boolean));
      } catch (err) {
        setFavoriteCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [favoriteNames]);

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white fixed top-0 left-0 w-full h-full overflow-y-auto">
        <TopNoticeBar/>
            <Navbar />
   
     
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">❤️ Your Favorite Countries</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : favoriteCountries.length === 0 ? (
        <p className="text-center text-gray-600">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoriteCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              onSelect={(code) => {
                // Optional: Navigate to details
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
