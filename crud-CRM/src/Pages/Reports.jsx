import { reportData } from "../data/mockData";
import "./Reports.css";

const Reports = () => {
  const maxRevenue = Math.max(...reportData.monthlyRevenue.map((m) => m.value));

  return (
    <div className="page-content">
      <h1 className="page-title">Raporty i analityka</h1>
      <p className="page-subtitle">Przegląd wyników sprzedaży i efektywności zespołu</p>

      <div className="grid-2 reports-top">
        <div className="card">
          <div className="card-header">
            <h2>Przychód miesięczny (tys. zł)</h2>
          </div>
          <div className="card-body">
            <div className="bar-chart">
              {reportData.monthlyRevenue.map((item) => (
                <div key={item.month} className="bar-group">
                  <div className="bar-container">
                    <div
                      className="bar"
                      style={{ height: `${(item.value / maxRevenue) * 100}%` }}
                    >
                      <span className="bar-value">{item.value}</span>
                    </div>
                  </div>
                  <span className="bar-label">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Leady wg źródła</h2>
          </div>
          <div className="card-body">
            <div className="source-list">
              {reportData.leadsBySource.map((item) => (
                <div key={item.source} className="source-item">
                  <div className="source-header">
                    <span>{item.source}</span>
                    <span className="source-count">{item.count} ({item.percent}%)</span>
                  </div>
                  <div className="source-bar-track">
                    <div
                      className="source-bar-fill"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card reports-team">
        <div className="card-header">
          <h2>Wydajność zespołu</h2>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Handlowiec</th>
                <th>Zamknięte transakcje</th>
                <th>Przychód</th>
                <th>Konwersja</th>
                <th>Wydajność</th>
              </tr>
            </thead>
            <tbody>
              {reportData.teamPerformance.map((member) => {
                const perfWidth = parseInt(member.conversion);
                return (
                  <tr key={member.name}>
                    <td className="cell-name">{member.name}</td>
                    <td>{member.deals}</td>
                    <td>{member.revenue}</td>
                    <td>{member.conversion}</td>
                    <td>
                      <div className="perf-bar-track">
                        <div
                          className="perf-bar-fill"
                          style={{ width: `${perfWidth * 3}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-3 reports-summary">
        <div className="summary-card card">
          <span className="summary-value">2.33 mln zł</span>
          <span className="summary-label">Przychód YTD</span>
        </div>
        <div className="summary-card card">
          <span className="summary-value">24.8%</span>
          <span className="summary-label">Średnia konwersja</span>
        </div>
        <div className="summary-card card">
          <span className="summary-value">47 dni</span>
          <span className="summary-label">Średni cykl sprzedaży</span>
        </div>
      </div>
    </div>
  );
};

export default Reports;
