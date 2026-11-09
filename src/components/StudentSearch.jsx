
import { useEffect, useState } from "react";

function StudentSearch({ searchTerm, setSearchTerm }) {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchTerm]);

  return (
    <section className="search-section">
      <h2>Search Students</h2>

      <input
        type="text"
        placeholder="Search by name, email or course..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
    </section>
  );
}

export default StudentSearch;
