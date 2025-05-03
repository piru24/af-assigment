const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
export default function FilterBar({ onFilter }) {
  return (
    <select
      className="border rounded px-4 py-2 ml-0 md:ml-4 w-full md:w-48 mb-4"
      onChange={e => onFilter(e.target.value)}
    >
      <option value="">All Regions</option>
      {regions.map(region => (
        <option key={region} value={region}>{region}</option>
      ))}
    </select>
  );
}
