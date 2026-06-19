import {
  FaChartLine,
  FaHandshake,
  FaUserPlus,
  FaPercentage,
  FaDollarSign,
} from "react-icons/fa";
import "./StatCard.css";

const icons = {
  revenue: FaDollarSign,
  deals: FaHandshake,
  leads: FaUserPlus,
  conversion: FaPercentage,
  default: FaChartLine,
};

const StatCard = ({ label, value, change, trend, icon = "default" }) => {
  const Icon = icons[icon] || icons.default;
  const trendClass = trend === "up" ? "stat-trend-up" : "stat-trend-down";

  return (
    <div className="stat-card card">
      <div className="stat-card-icon">
        <Icon />
      </div>
      <div className="stat-card-content">
        <span className="stat-card-label">{label}</span>
        <span className="stat-card-value">{value}</span>
        <span className={`stat-card-change ${trendClass}`}>{change}</span>
      </div>
    </div>
  );
};

export default StatCard;
