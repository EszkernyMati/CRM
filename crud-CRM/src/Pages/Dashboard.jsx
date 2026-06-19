import {
  FaUser,
  FaHandshake,
  FaTasks,
  FaUserPlus,
  FaCalendar,
} from "react-icons/fa";
import StatCard from "../Components/Shared/StatCard";
import {
  dashboardMetrics,
  recentActivity,
  pipelineSummary,
} from "../data/mockData";
import "./Dashboard.css";

const activityIcons = {
  deal: FaHandshake,
  contact: FaUser,
  task: FaTasks,
  lead: FaUserPlus,
  meeting: FaCalendar,
};

const Dashboard = () => {
  const maxPipeline = Math.max(...pipelineSummary.map((p) => p.count));

  return (
    <div className="page-content">
      <h1 className="page-title">Panel główny</h1>
      <p className="page-subtitle">Przegląd kluczowych wskaźników i ostatniej aktywności</p>

      <div className="grid-4 dashboard-metrics">
        {dashboardMetrics.map((metric) => (
          <StatCard key={metric.id} {...metric} />
        ))}
      </div>

      <div className="grid-2 dashboard-panels">
        <div className="card">
          <div className="card-header">
            <h2>Podsumowanie lejka sprzedaży</h2>
          </div>
          <div className="card-body">
            <div className="pipeline-chart">
              {pipelineSummary.map((stage) => (
                <div key={stage.stage} className="pipeline-bar-group">
                  <div className="pipeline-bar-label">
                    <span>{stage.stage}</span>
                    <span className="pipeline-bar-meta">{stage.count} · {stage.value}</span>
                  </div>
                  <div className="pipeline-bar-track">
                    <div
                      className="pipeline-bar-fill"
                      style={{
                        width: `${(stage.count / maxPipeline) * 100}%`,
                        backgroundColor: stage.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Ostatnia aktywność</h2>
          </div>
          <div className="card-body activity-list">
            {recentActivity.map((item) => {
              const Icon = activityIcons[item.type] || FaTasks;
              return (
                <div key={item.id} className="activity-item">
                  <div className="activity-icon">
                    <Icon />
                  </div>
                  <div className="activity-content">
                    <p className="activity-message">{item.message}</p>
                    <span className="activity-meta">
                      {item.user} · {item.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
