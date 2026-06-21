import { useState, useRef } from "react";
import { teamMembers as initialTeam } from "../data/mockData";
import { useToast } from "../context/ToastContext";
import { 
  FaUser, FaUsers, FaShieldAlt, 
  FaUserPlus, FaEdit, FaTimes, FaCheck, FaUpload
} from "react-icons/fa"; 
import { FiTrash2 } from "react-icons/fi";

import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { showToast } = useToast();
  const fileInputRef = useRef(null); // Ref dla ukrytego inputu pliku profilu
  const teamFileInputRef = useRef(null); // Ref dla ukrytego inputu pliku w modalu zespołu

  // --- STAN 1: Profil Użytkownika ---
  const [profile, setProfile] = useState({
    name: "Anna Kowalska",
    email: "anna@crm.pl",
    role: "Sales Manager",
    phone: "+48 600 123 456",
    avatar: "AK" 
  });

  // Funkcja generująca inicjały z imienia i nazwiska
  const getInitials = (name) => {
    return name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "??";
  };

  // Obsługa wgrania zdjęcia profilowego z dysku
  const handleProfileAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
        showToast("Zdjęcie profilowe zostało wgrane.", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    showToast("Zapisano zmiany w profilu.", "success");
  };

  // --- STAN 2: Zespół (Dane + Modale) ---
  const [team, setTeam] = useState(initialTeam || []);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "Sales Agent", avatar: "" });

  const handleOpenAddModal = () => {
    setEditingMember(null);
    setNewMember({ name: "", email: "", role: "Sales Agent", avatar: "" });
    setIsTeamModalOpen(true);
  };

  const handleOpenEditModal = (member) => {
    setEditingMember(member);
    setNewMember({ name: member.name, email: member.email, role: member.role, avatar: member.avatar });
    setIsTeamModalOpen(true);
  };

  // Obsługa wgrania pliku zdjęcia w modalu zespołu
  const handleTeamAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMember(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveTeamMember = (e) => {
    e.preventDefault();
    
    if (editingMember) {
      setTeam(prev => prev.map(m => m.id === editingMember.id ? { 
        ...m, 
        role: newMember.role, 
        name: newMember.name, 
        email: newMember.email,
        avatar: newMember.avatar // Zapisuje Base64 lub pusty ciąg (wtedy renderują się inicjały)
      } : m));
      showToast("Zaktualizowano dane pracownika.", "success");
    } else {
      const created = {
        id: Date.now(),
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        avatar: newMember.avatar
      };
      setTeam(prev => [...prev, created]);
      showToast(`Użytkownik ${newMember.name} został dodany.`, "success");
    }
    setIsTeamModalOpen(false);
  };

  const handleRemoveMember = (id, name) => {
    setTeam(prev => prev.filter(m => m.id !== id));
    showToast(`Usunięto użytkownika ${name} z zespołu.`, "error");
  };

  // --- STAN 3: Bezpieczeństwo ---
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      showToast("Wypełnij wszystkie pola hasła.", "error");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("Nowe hasła nie są identyczne.", "error");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showToast("Nowe hasło musi mieć minimum 6 znaków.", "error");
      return;
    }

    showToast("Hasło zostało pomyślnie zmienione.", "success");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const tabs = [
    { key: "profile", label: "Profil", icon: <FaUser className="tab-icon" /> },
    { key: "team", label: "Zespół", icon: <FaUsers className="tab-icon" /> },
    { key: "security", label: "Bezpieczeństwo", icon: <FaShieldAlt className="tab-icon" /> },
  ];

  // Inteligentny pomocnik renderowania awatara (obrazek Base64/URL lub inicjały tekstowe)
  const renderAvatarContent = (avatarValue, name) => {
    if (avatarValue && (avatarValue.startsWith("data:image") || avatarValue.startsWith("http"))) {
      return <img src={avatarValue} alt="Avatar" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />;
    }
    return <div className="avatar-initials">{getInitials(name || avatarValue)}</div>;
  };

  return (
    <div className="page-content">
      <h1 className="page-title">Ustawienia</h1>
      <p className="page-subtitle">Zarządzaj profilem, preferencjami i zespołem</p>

      <div className="settings-layout">
        {/* Lewy Sidebar Nawigacyjny */}
        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`settings-tab ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Prawy Kontener Treści */}
        <div className="settings-content">
          
          {/* TAB 1: PROFIL */}
          {activeTab === "profile" && (
            <div className="settings-panel">
              <h2>Profil użytkownika</h2>
              <div className="profile-header" style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
                <div className="profile-avatar" style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", border: "2px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {renderAvatarContent(profile.avatar, profile.name)}
                </div>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: "none" }} 
                  accept="image/*" 
                  onChange={handleProfileAvatarChange}
                />

                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => fileInputRef.current.click()}>
                    <FaUpload style={{ marginRight: 6 }} /> Wgraj zdjęcie
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setProfile(prev => ({ ...prev, avatar: getInitials(prev.name) }))}>
                    Użyj inicjałów
                  </button>
                </div>
              </div>

              <form className="settings-form" onSubmit={handleProfileSubmit}>
                <div className="form-row">
                  <label>
                    Imię i nazwisko
                    <input 
                      type="text" 
                      value={profile.name} 
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </label>
                  <label>
                    Email
                    <input 
                      type="email" 
                      value={profile.email} 
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Stanowisko
                    <input 
                      type="text" 
                      value={profile.role} 
                      onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
                    />
                  </label>
                  <label>
                    Telefon
                    <input 
                      type="tel" 
                      value={profile.phone} 
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">Zapisz zmiany</button>
              </form>
            </div>
          )}

          {/* TAB 2: ZESPÓŁ */}
          {activeTab === "team" && (
            <div className="settings-panel">
              <div className="panel-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={{ margin: 0 }}>Członkowie zespołu</h2>
                <button className="btn btn-primary btn-sm" onClick={handleOpenAddModal}>
                  <FaUserPlus className="btn-icon-left" style={{ marginRight: 6 }} /> Zaproś do CRM
                </button>
              </div>

              <div className="team-list">
                {team.map((member) => (
                  <div key={member.id} className="team-member">
                    <div className="team-avatar" style={{ width: 50, height: 50, borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {renderAvatarContent(member.avatar, member.name)}
                    </div>
                    <div className="team-info">
                      <span className="team-name">{member.name}</span>
                      <span className="team-role">{member.role}</span>
                      <span className="team-email">{member.email}</span>
                    </div>
                    <div className="team-actions" style={{ display: "flex", gap: 8 }}>
                      <button 
                        className="btn btn-secondary btn-sm" 
                        onClick={() => handleOpenEditModal(member)}
                        title="Edytuj dane"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="btn-icon btn-icon-danger"
                        onClick={() => handleRemoveMember(member.id, member.name)}
                        title="Usuń z zespołu"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BEZPIECZEŃSTWO */}
          {activeTab === "security" && (
            <div className="settings-panel">
              <h2>Zabezpieczenia i autoryzacja</h2>
              <form className="settings-form" onSubmit={handlePasswordChange}>
                <label>
                  Aktualne hasło logowania
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  />
                </label>
                <div className="form-row">
                  <label>
                    Nowe bezpieczne hasło
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    />
                  </label>
                  <label>
                    Powtórz nowe hasło
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">Zaktualizuj hasło uwierzytelniające</button>
              </form>
              <div className="security-info" style={{ marginTop: 24, padding: 16, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
                <p><strong>Status ochrony konta:</strong> Aktywny</p>
                <p>Ostatnia zmiana konfiguracji bezpieczeństwa: 18 cze 2026, 08:42</p>
                <p>Zarejestrowane aktywne sesje robocze: 2 urządzenia</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DYNAMICZNY MODAL MODERACJI CZŁONKÓW ZESPOŁU */}
      {isTeamModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsTeamModalOpen(false)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingMember ? "Edytuj dane pracownika" : "Zaproś nowego członka"}</h3>
              <button className="modal-close-btn" onClick={() => setIsTeamModalOpen(false)}>
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSaveTeamMember} className="settings-form" style={{ marginTop: 16 }}>
              {/* Sekcja awatara wewnątrz modalu */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, padding: 16, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
                <div className="team-avatar" style={{ width: 60, height: 60, borderRadius: "50%", overflow: "hidden", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {renderAvatarContent(newMember.avatar, newMember.name)}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => teamFileInputRef.current.click()}>
                    <FaUpload style={{ marginRight: 6 }} /> Wgraj plik
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setNewMember(prev => ({...prev, avatar: ""}))}>
                    Reset do inicjałów
                  </button>
                </div>
              </div>

              <input 
                type="file" 
                ref={teamFileInputRef} 
                style={{ display: "none" }} 
                accept="image/*" 
                onChange={handleTeamAvatarChange} 
              />
              
              <label>
                Imię i nazwisko
                <input 
                  type="text" 
                  value={newMember.name} 
                  onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))} 
                  placeholder="np. Jan Kowalski"
                  required 
                />
              </label>
              
              <label>
                Adres E-mail
                <input 
                  type="email" 
                  value={newMember.email} 
                  onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))} 
                  placeholder="name@crm.pl"
                  required 
                />
              </label>
              
              <label>
                Stanowisko / Rola
                <select 
                  value={newMember.role} 
                  onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                  required
                >
                  <option value="Sales Agent">Sales Agent</option>
                  <option value="Senior Sales Agent">Senior Sales Agent</option>
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </label>

              <div className="modal-actions" style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsTeamModalOpen(false)}>
                  Anuluj
                </button>
                <button type="submit" className="btn btn-primary">
                  <FaCheck style={{ marginRight: 6 }} /> Zapisz w CRM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;