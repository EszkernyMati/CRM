import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle, FaCog, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import SearchBar from "../Shared/SearchBar";
import "./header.css";

const Header = ({ onMenuToggle }) => {
  const [search, setSearch] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast("Wylogowano pomyślnie.", "info");
    navigate("/login", { replace: true });
  };

  return (
    <header className="top-title">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onMenuToggle} aria-label="Menu">
          <span className="menu-icon" />
        </button>
        <Link to="/">
          <h1>CRM</h1>
        </Link>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Szukaj kontaktów, firm, transakcji..." />
      <div className="header-actions">
        <button className="header-action-btn" aria-label="Powiadomienia">
          <FaBell />
          <span className="notification-dot" />
        </button>
        <div className="header-user-menu">
          <button
            className="header-user"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            aria-label="Menu użytkownika"
          >
            <FaUserCircle />
            <span className="header-user-name">{user?.avatar}</span>
            <FaChevronDown className="header-user-chevron" />
          </button>
          {userMenuOpen && (
            <>
              <div className="header-user-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">{user?.avatar}</div>
                  <div className="dropdown-user-info">
                    <p className="dropdown-user-name">{user?.name}</p>
                    <p className="dropdown-user-role">{user?.role}</p>
                  </div>
                </div>
                <div className="dropdown-divider" />
                <Link to="/settings" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                  <FaCog /> Ustawienia
                </Link>
                <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                  <FaSignOutAlt /> Wyloguj się
                </button>
              </div>
              <div
                className="header-user-backdrop"
                onClick={() => setUserMenuOpen(false)}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
