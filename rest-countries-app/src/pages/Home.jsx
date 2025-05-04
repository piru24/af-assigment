// Home.js
import { useState, useMemo } from "react";
import useCountries from "../hooks/useCountries";
import CountryDetail from "../components/CountryDetail";
import CountryList from "../components/CountryList";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import TopNoticeBar from "../components/TopNoticeBar";

// Pagination component
function Pagination({ total, perPage, page, setPage }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 mx-1 rounded border border-blue-900 text-blue-900 font-bold bg-white shadow disabled:opacity-50"
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 mx-1 rounded border font-bold shadow ${
            page === i + 1
              ? "bg-blue-900 text-white border-blue-900"
              : "bg-white text-blue-900 border-blue-900"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 mx-1 rounded border border-blue-900 text-blue-900 font-bold bg-white shadow disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

function Home() {
  const { countries, loading } = useCountries();
  const [selectedCode, setSelectedCode] = useState(null);

  // --- New State for Search and Filter ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const perPage = 18;

  // --- Filtering and Searching Logic ---
  const filteredCountries = useMemo(() => {
    let result = countries;
    if (selectedRegion) {
      result = result.filter(
        (c) => c.region && c.region.toLowerCase() === selectedRegion.toLowerCase()
      );
    }
    if (searchQuery) {
      result = result.filter(
        (c) =>
          c.name &&
          c.name.common &&
          c.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [countries, searchQuery, selectedRegion]);

  // Paginate after filtering
  const start = (page - 1) * perPage;
  const currentCountries = filteredCountries.slice(start, start + perPage);

  // --- Handlers ---
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleFilter = (region) => {
    setSelectedRegion(region);
    setPage(1);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-medium">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white fixed top-0 left-0 w-full h-full overflow-y-auto">
      <TopNoticeBar />
      <Navbar
        onLogout={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        onSearch={handleSearch}
      />
      <HeroBanner />
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 drop-shadow-md">
          🌍 REST Countries Explorer
        </h1>
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <SearchBar onSearch={handleSearch} />
          <FilterBar onFilter={handleFilter} />
        </div>
        <div>
          {selectedCode ? (
            <CountryDetail code={selectedCode} onBack={() => setSelectedCode(null)} />
          ) : (
            <>
              <CountryList countries={currentCountries} onSelect={setSelectedCode} />
              <Pagination
                total={filteredCountries.length}
                perPage={perPage}
                page={page}
                setPage={setPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
