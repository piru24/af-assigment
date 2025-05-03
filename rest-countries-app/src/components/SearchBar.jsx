export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by country name..."
      className="border rounded px-4 py-2 w-full md:w-1/2 mb-4"
      onChange={e => onSearch(e.target.value)}
    />
  );
}
