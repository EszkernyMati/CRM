import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaAddressBook,
  FaUserPlus,
  FaHandshake,
  FaBuilding,
  FaTasks,
  FaCalendarAlt,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { navItems } from "../../data/mockData";
import "./Sidebar.css";

const iconMap = {
  dashboard: FaTachometerAlt,
  contacts: FaAddressBook,
  leads: FaUserPlus,
  deals: FaHandshake,
  companies: FaBuilding,
  tasks: FaTasks,
  calendar: FaCalendarAlt,
  reports: FaChartBar,
  settings: FaCog,
};

const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <>
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
                }
                onClick={() => window.innerWidth < 768 && onToggle()}
              >
                <Icon className="sidebar-link-icon" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
      {isOpen && <div className="sidebar-backdrop" onClick={onToggle} />}
    </>
  );
};

export default Sidebar;
