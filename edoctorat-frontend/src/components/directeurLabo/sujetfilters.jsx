export default function Sujetfilters({ onChange }) {
  const [filters, setFilters] = React.useState({ name: "" });

  const handleChange = (e) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    setFilters(updated);
    onChange(updated);
  };

  return (
    <div className="row g-2 mb-3">
      <div className="col-md-4">
        <input
          className="form-control"
          placeholder="Filter by name"
          name="name"
          value={filters.name}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
