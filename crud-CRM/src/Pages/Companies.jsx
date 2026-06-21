import { useState } from "react";
import { FaPlus, FaExternalLinkAlt, FaEdit, FaTrash, FaInfoCircle, FaBuilding, FaUsers, FaHandshake } from "react-icons/fa";
import Modal from "../Components/Shared/Modal";
import FormModal from "../Components/Shared/FormModal";
import SearchBar from "../Components/Shared/SearchBar";
import { companies as initialCompanies } from "../data/mockData";
import { useCRUD } from "../hooks/useCRUD";
import { useToast } from "../context/ToastContext";
import "./Companies.css";

const statusBadge = {
  klient: "badge-success",
  prospect: "badge-warning",
  lead: "badge-info",
};

const statusLabel = {
  klient: "Klient",
  prospect: "Prospect",
  lead: "Lead",
};

const Companies = () => {
  const { items: companies, add, update, delete: removeCompany } = useCRUD("crm_companies", initialCompanies);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { showToast } = useToast();

  // Filtrowanie firm po nazwie, branży lub mieście
  const filtered = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCompany = (data) => {
    add({
      name: data.name || "Nowa firma",
      industry: data.industry || "",
      employees: parseInt(data.employees) || 0,
      revenue: data.revenue || "0 zł",
      website: data.website || "",
      city: data.city || "",
      contacts: 0,
      deals: 0,
      status: data.status || "prospect",
    });
    showToast("Firma została dodana.", "success");
    setFormOpen(false);
  };

  const handleEditCompany = (data) => {
    update(editingId, {
      name: data.name,
      industry: data.industry,
      employees: parseInt(data.employees),
      revenue: data.revenue,
      website: data.website,
      city: data.city,
      status: data.status,
    });
    showToast("Dane firmy zostały zaktualizowane.", "success");
    setFormOpen(false);
    setEditingId(null);
    setSelected(null);
  };

  const companyFields = [
    { name: "name", label: "Nazwa firmy", type: "text", required: true },
    { name: "industry", label: "Branża", type: "text" },
    { name: "city", label: "Miasto", type: "text" },
    { name: "employees", label: "Liczba pracowników", type: "number" },
    { name: "revenue", label: "Przychód", type: "text" },
    { name: "website", label: "Strona www", type: "text" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "klient", label: "Klient" },
        { value: "prospect", label: "Prospect" },
        { value: "lead", label: "Lead" },
      ],
    },
  ];

  return (
    <div className="page-content">
      {/* NAGŁÓWEK */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Firmy</h1>
          <p className="page-subtitle">{companies.length} firm w systemie</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingId(null);
            setFormOpen(true);
          }}
        >
          <FaPlus /> Dodaj firmę
        </button>
      </div>

      {/* WYSZUKIWARKA */}
      <div className="page-search">
        <SearchBar 
          value={search} 
          onChange={setSearch} 
          placeholder="Szukaj po nazwie, branży lub mieście..." 
        />
      </div>

      {/* SIATKA FIRM */}
      <div className="companies-grid">
        {filtered.map((company) => (
          <div 
            key={company.id} 
            className="company-card card" 
            onClick={() => setSelected(company)}
            style={{ cursor: 'pointer' }}
          >
            <div className="company-card-header">
              <div className="company-logo">
                {company.name.charAt(0).toUpperCase()}
              </div>
              <span className={`badge ${statusBadge[company.status]}`}>
                {statusLabel[company.status]}
              </span>
            </div>
            
            <h3>{company.name}</h3>
            <p className="company-industry">{company.industry} · {company.city}</p>
            
            <div className="company-stats">
              <div>
                <span className="company-stat-value"><FaUsers size={12} /> {company.employees}</span>
                <span className="company-stat-label">Pracowników</span>
              </div>
              <div>
                <span className="company-stat-value"><FaBuilding size={12} /> {company.contacts}</span>
                <span className="company-stat-label">Kontaktów</span>
              </div>
              <div>
                <span className="company-stat-value"><FaHandshake size={12} /> {company.deals}</span>
                <span className="company-stat-label">Transakcji</span>
              </div>
            </div>
            
            {/* PRZYCISKI AKCJI - stopPropagation zapobiega otwarciu modalu przy kliknięciu w przycisk */}
            <div className="company-card-actions" onClick={(e) => e.stopPropagation()}>
              <button
                className="btn-icon"
                onClick={() => {
                  setEditingId(company.id);
                  setFormOpen(true);
                }}
                title="Edytuj"
              >
                <FaEdit />
              </button>
              <button
                className="btn-icon btn-icon-danger"
                onClick={() => {
                  if(window.confirm("Czy na pewno chcesz usunąć tę firmę?")) {
                    removeCompany(company.id);
                    showToast("Firma została usunięta.", "success");
                  }
                }}
                title="Usuń"
              >
                <FaTrash />
              </button>
              <button
                className="btn-icon"
                onClick={() => setSelected(company)}
                title="Szczegóły"
              >
                <FaInfoCircle />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="no-results">Nie znaleziono żadnych firm.</p>}
      </div>

      {/* MODAL SZCZEGÓŁÓW */}
      <Modal
        isOpen={!!selected && !formOpen}
        onClose={() => setSelected(null)}
        title={selected?.name}
        size="md"
      >
        {selected && (
          <div className="company-details">
            <div className="detail-grid">
              <span className="detail-label">Branża</span>
              <span className="detail-value">{selected.industry}</span>
              
              <span className="detail-label">Miasto</span>
              <span className="detail-value">{selected.city}</span>
              
              <span className="detail-label">Przychód</span>
              <span className="detail-value">{selected.revenue}</span>
              
              <span className="detail-label">Pracownicy</span>
              <span className="detail-value">{selected.employees}</span>
              
              <span className="detail-label">Strona www</span>
              <span className="detail-value">
                {selected.website ? (
                  <a href={`https://${selected.website}`} target="_blank" rel="noreferrer" className="link-external">
                    {selected.website} <FaExternalLinkAlt size={12} />
                  </a>
                ) : (
                  "-"
                )}
              </span>
              
              <span className="detail-label">Status</span>
              <span className="detail-value">
                <span className={`badge ${statusBadge[selected.status]}`}>
                  {statusLabel[selected.status]}
                </span>
              </span>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
               <button className="btn btn-secondary" onClick={() => setSelected(null)}>Zamknij</button>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL FORMULARZA */}
      <FormModal
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingId(null);
        }}
        onSubmit={editingId ? handleEditCompany : handleAddCompany}
        title={editingId ? "Edytuj dane firmy" : "Dodaj nową firmę"}
        fields={companyFields}
        initialData={editingId ? companies.find((c) => c.id === editingId) || {} : {}}
        submitLabel={editingId ? "Zapisz zmiany" : "Dodaj firmę"}
      />
    </div>
  );
};

export default Companies;