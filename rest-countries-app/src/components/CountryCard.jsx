import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import api from "../api/api";

export default function CountryCard({ country, onSelect }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setIsFavorite(false);
      try {
        const res = await api.get("/favorites");
        setIsFavorite(res.data.includes(country.name.common));
      } catch {
        setIsFavorite(false);
      }
    };
    checkFavorite();
  }, [country.name.common]);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      if (window.confirm("You need to log in to add favorites. Login now?")) {
        window.location.href = "/login";
      }
      return;
    }
    try {
      const res = await api.post("/favorites/toggle", {
        countryName: country.name.common,
      });
      setIsFavorite(res.data.isFavorite);
    } catch {}
  };

  return (
    <div
      onClick={() => onSelect(country.cca3)}
      className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 p-5 cursor-pointer flex flex-col items-center text-gray-800 group relative"
    >
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 text-red-500 hover:scale-110 transition"
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
      <img
        src={country.flags.svg}
        alt={country.name.common}
        className="w-28 h-16 object-contain rounded mb-4"
      />
      <h2 className="text-lg font-bold mb-1 text-blue-900 text-center">
        {country.name.common}
      </h2>
      <p className="text-sm text-gray-600">
        Population: {country.population.toLocaleString()}
      </p>
      <p className="text-sm text-gray-600">Region: {country.region}</p>
      <div className="mt-3 text-sm text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        View details →
      </div>
    </div>
  );
}
