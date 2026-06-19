import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = ({ value, onChange, placeholder = "Szukaj..." }) => {
  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Szukaj"
      />
    </div>
  );
};

export default SearchBar;
