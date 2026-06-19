import { useState } from "react";
import { teamMembers } from "../data/mockData";
import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    deals: true,
    tasks: false,
    weekly: true,
  });

  const tabs = [
    { key: "profile", label: "Profil" },
    { key: "preferences", label: "Preferencje" },
    { key: "team", label: "Zespół" },
    { key: "security", label: "Bezpieczeństwo" },
  ];

  return (
    <div className="page-content">
      <h1 className="page-title">Ustawienia</h1>
      <p className="page-subtitle">Zarządzaj profilem, preferencjami i zespołem</p>

      <div className="settings-layout">
        <div className="settings-tabs card">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`settings-tab ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="settings-content card">
          {activeTab === "profile" && (
            <div className="settings-panel">
              <h2>Profil użytkownika</h2>
              <div className="profile-header">
                <div className="profile-avatar">AK</div>
                <button className="btn btn-secondary btn-sm">Zmień zdjęcie</button>
              </div>
              <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <label>
                    Imię i nazwisko
                    <input type="text" defaultValue="Anna Kowalska" />
                  </label>
                  <label>
                    Email
                    <input type="email" defaultValue="anna@crm.pl" />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Stanowisko
                    <input type="text" defaultValue="Sales Manager" />
                  </label>
                  <label>
                    Telefon
                    <input type="tel" defaultValue="+48 600 123 456" />
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">Zapisz zmiany</button>
              </form>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="settings-panel">
              <h2>Preferencje</h2>
              <div className="preference-group">
                <h3>Powiadomienia</h3>
                {[
                  { key: "email", label: "Powiadomienia email" },
                  { key: "deals", label: "Aktualizacje transakcji" },
                  { key: "tasks", label: "Przypomnienia o zadaniach" },
                  { key: "weekly", label: "Cotygodniowy raport" },
                ].map((item) => (
                  <label key={item.key} className="toggle-label">
                    <span>{item.label}</span>
                    <input
                      type="checkbox"
                      checked={notifications[item.key]}
                      onChange={(e) =>
                        setNotifications((prev) => ({
                          ...prev,
                          [item.key]: e.target.checked,
                        }))
                      }
                    />
                    <span className="toggle-switch" />
                  </label>
                ))}
              </div>
              <div className="preference-group">
                <h3>Regionalizacja</h3>
                <div className="form-row">
                  <label>
                    Język
                    <select defaultValue="pl">
                      <option value="pl">Polski</option>
                      <option value="en">English</option>
                    </select>
                  </label>
                  <label>
                    Strefa czasowa
                    <select defaultValue="europe-warsaw">
                      <option value="europe-warsaw">Europa/Warszawa (UTC+2)</option>
                      <option value="europe-london">Europa/Londyn (UTC+1)</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="settings-panel">
              <h2>Zespół</h2>
              <div className="team-list">
                {teamMembers.map((member) => (
                  <div key={member.id} className="team-member">
                    <div className="team-avatar">{member.avatar}</div>
                    <div className="team-info">
                      <span className="team-name">{member.name}</span>
                      <span className="team-role">{member.role}</span>
                    </div>
                    <span className="team-email">{member.email}</span>
                    <button className="btn btn-secondary btn-sm">Edytuj</button>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" style={{ marginTop: 16 }}>
                Zaproś członka zespołu
              </button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="settings-panel">
              <h2>Bezpieczeństwo</h2>
              <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
                <label>
                  Aktualne hasło
                  <input type="password" placeholder="••••••••" />
                </label>
                <div className="form-row">
                  <label>
                    Nowe hasło
                    <input type="password" placeholder="••••••••" />
                  </label>
                  <label>
                    Potwierdź hasło
                    <input type="password" placeholder="••••••••" />
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">Zmień hasło</button>
              </form>
              <div className="security-info">
                <p>Ostatnie logowanie: 18 cze 2026, 08:42</p>
                <p>Aktywne sesje: 2 urządzenia</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
