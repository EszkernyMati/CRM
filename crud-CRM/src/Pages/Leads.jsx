import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { leads as initialLeads, leadStages } from "../data/mockData";
import FormModal from "../Components/Shared/FormModal";
import { useCRUD } from "../hooks/useCRUD";
import { useToast } from "../context/ToastContext";
import "./Leads.css";

const Leads = () => {
  const { items: leads, add, update, delete: removeLead } = useCRUD("crm_leads", initialLeads);
  const [view, setView] = useState("pipeline");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { showToast } = useToast();

  const leadsByStage = leadStages.map((stage) => ({
    ...stage,
    leads: leads.filter((l) => l.stage === stage.key),
  }));

  const handleAddLead = (data) => {
    add({
      name: data.name || "Nowy lead",
      contact: data.contact || "",
      source: data.source || "Inne",
      stage: data.stage || "nowy",
      score: parseInt(data.score) || 50,
      value: data.value || "0 zł",
      owner: data.owner || "Ja",
      created: new Date().toISOString().split("T")[0],
    });
    showToast("Lead dodany.", "success");
    setFormOpen(false);
  };

  const handleEditLead = (data) => {
    update(editingId, {
      name: data.name,
      contact: data.contact,
      source: data.source,
      stage: data.stage,
      score: parseInt(data.score),
      value: data.value,
      owner: data.owner,
    });
    showToast("Lead zaktualizowany.", "success");
    setFormOpen(false);
    setEditingId(null);
  };

  const leadFields = [
    { name: "name", label: "Nazwa firmy", type: "text", required: true },
    { name: "contact", label: "Kontakt", type: "text", required: true },
    { name: "source", label: "Źródło", type: "text" },
    {
      name: "stage",
      label: "Etap",
      type: "select",
      options: leadStages.map((s) => ({ value: s.key, label: s.label })),
    },
    { name: "score", label: "Score (0-100)", type: "number" },
    { name: "value", label: "Wartość", type: "text" },
    { name: "owner", label: "Opiekun", type: "text" },
  ];

  return (
    <div className="page-content">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Leady</h1>
          <p className="page-subtitle">Zarządzaj lejkiem pozyskiwania klientów</p>
        </div>
        <div className="view-toggle">
          <button
            className={`btn btn-sm ${view === "pipeline" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setView("pipeline")}
          >
            Pipeline
          </button>
          <button
            className={`btn btn-sm ${view === "table" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setView("table")}
          >
            Tabela
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingId(null);
              setFormOpen(true);
            }}
          >
            <FaPlus /> Nowy lead
          </button>
        </div>
      </div>

      {view === "pipeline" ? (
        <div className="leads-pipeline">
          {leadsByStage.map((stage) => (
            <div key={stage.key} className="pipeline-column card">
              <div className="pipeline-column-header">
                <h3>{stage.label}</h3>
                <span className="pipeline-count">{stage.leads.length}</span>
              </div>
              <div className="pipeline-cards">
                {stage.leads.map((lead) => (
                  <div key={lead.id} className="lead-card">
                    <h4>{lead.name}</h4>
                    <p className="lead-contact">{lead.contact}</p>
                    <div className="lead-meta">
                      <span className="lead-value">{lead.value}</span>
                      <span className={`lead-score ${lead.score >= 70 ? "score-high" : lead.score >= 50 ? "score-mid" : "score-low"}`}>
                        {lead.score}%
                      </span>
                    </div>
                    <div className="lead-footer">
                      <span className="lead-source">{lead.source}</span>
                      <span className="lead-owner">{lead.owner.split(" ")[0]}</span>
                    </div>
                    <div className="lead-actions">
                      <button
                        className="btn-icon"
                        onClick={() => {
                          setEditingId(lead.id);
                          setFormOpen(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-icon btn-icon-danger"
                        onClick={() => {
                          removeLead(lead.id);
                          showToast("Lead usunięty.", "success");
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
                {stage.leads.length === 0 && (
                  <p className="pipeline-empty">Brak leadów</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Firma</th>
                  <th>Kontakt</th>
                  <th>Źródło</th>
                  <th>Etap</th>
                  <th>Score</th>
                  <th>Wartość</th>
                  <th>Opiekun</th>
                  <th style={{ width: "100px" }}>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const stage = leadStages.find((s) => s.key === lead.stage);
                  return (
                    <tr key={lead.id}>
                      <td className="cell-name">{lead.name}</td>
                      <td>{lead.contact}</td>
                      <td>{lead.source}</td>
                      <td><span className={`badge ${stage?.color}`}>{stage?.label}</span></td>
                      <td>{lead.score}%</td>
                      <td>{lead.value}</td>
                      <td>{lead.owner}</td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="btn-icon"
                            onClick={() => {
                              setEditingId(lead.id);
                              setFormOpen(true);
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn-icon btn-icon-danger"
                            onClick={() => {
                              removeLead(lead.id);
                              showToast("Lead usunięty.", "success");
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <FormModal
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingId(null);
        }}
        onSubmit={editingId ? handleEditLead : handleAddLead}
        title={editingId ? "Edytuj lead" : "Dodaj nowy lead"}
        fields={leadFields}
        initialData={editingId ? leads.find((l) => l.id === editingId) || {} : {}}
        submitLabel={editingId ? "Zapisz" : "Dodaj"}
      />
    </div>
  );
};

export default Leads;
