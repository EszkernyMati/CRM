import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { deals as initialDeals, dealStages, formatCurrency, formatDate } from "../data/mockData";
import FormModal from "../Components/Shared/FormModal";
import { useCRUD } from "../hooks/useCRUD";
import { useToast } from "../context/ToastContext";
import "./Deals.css";

const Deals = () => {
  const { items: deals, add, update, delete: removeDeal } = useCRUD("crm_deals", initialDeals);
  const [view, setView] = useState("kanban");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { showToast } = useToast();

  const dealsByStage = dealStages.map((stage) => ({
    ...stage,
    deals: deals.filter((d) => d.stage === stage.key),
    total: deals.filter((d) => d.stage === stage.key).reduce((sum, d) => sum + d.value, 0),
  }));

  const handleAddDeal = (data) => {
    add({
      title: data.title || "Nowa transakcja",
      company: data.company || "",
      value: parseInt(data.value) || 0,
      stage: data.stage || "kwalifikacja",
      probability: parseInt(data.probability) || 50,
      owner: data.owner || "Ja",
      closeDate: data.closeDate || new Date().toISOString().split("T")[0],
    });
    showToast("Transakcja dodana.", "success");
    setFormOpen(false);
  };

  const handleEditDeal = (data) => {
    update(editingId, {
      title: data.title,
      company: data.company,
      value: parseInt(data.value),
      stage: data.stage,
      probability: parseInt(data.probability),
      owner: data.owner,
      closeDate: data.closeDate,
    });
    showToast("Transakcja zaktualizowana.", "success");
    setFormOpen(false);
    setEditingId(null);
  };

  const dealFields = [
    { name: "title", label: "Tytuł", type: "text", required: true },
    { name: "company", label: "Firma", type: "text", required: true },
    { name: "value", label: "Wartość (PLN)", type: "number", required: true },
    {
      name: "stage",
      label: "Etap",
      type: "select",
      options: dealStages.map((s) => ({ value: s.key, label: s.label })),
    },
    { name: "probability", label: "Prawdopodobieństwo (%)", type: "number" },
    { name: "owner", label: "Opiekun", type: "text" },
    { name: "closeDate", label: "Data zamknięcia", type: "date", required: true },
  ];

  return (
    <div className="page-content">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Transakcje</h1>
          <p className="page-subtitle">
            {deals.length} aktywnych transakcji · wartość łączna {formatCurrency(deals.reduce((s, d) => s + d.value, 0))}
          </p>
        </div>
        <div className="view-toggle">
          <button
            className={`btn btn-sm ${view === "kanban" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setView("kanban")}
          >
            Kanban
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
            <FaPlus /> Nowa transakcja
          </button>
        </div>
      </div>

      {view === "kanban" ? (
        <div className="deals-kanban">
          {dealsByStage.map((stage) => (
            <div key={stage.key} className="kanban-column card">
              <div className="kanban-column-header">
                <h3>{stage.label}</h3>
                <span className="kanban-total">{formatCurrency(stage.total)}</span>
              </div>
              <div className="kanban-cards">
                {stage.deals.map((deal) => (
                  <div key={deal.id} className="deal-card">
                    <h4>{deal.title}</h4>
                    <p className="deal-company">{deal.company}</p>
                    <p className="deal-value">{formatCurrency(deal.value)}</p>
                    <div className="deal-progress">
                      <div className="deal-progress-bar">
                        <div className="deal-progress-fill" style={{ width: `${deal.probability}%` }} />
                      </div>
                      <span className="deal-probability">{deal.probability}%</span>
                    </div>
                    <div className="deal-footer">
                      <span>{deal.owner.split(" ")[0]}</span>
                      <span>{formatDate(deal.closeDate)}</span>
                    </div>
                    <div className="deal-actions">
                      <button
                        className="btn-icon"
                        onClick={() => {
                          setEditingId(deal.id);
                          setFormOpen(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-icon btn-icon-danger"
                        onClick={() => {
                          removeDeal(deal.id);
                          showToast("Transakcja usunięta.", "success");
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
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
                  <th>Tytuł</th>
                  <th>Firma</th>
                  <th>Wartość</th>
                  <th>Etap</th>
                  <th>Prawdopodobieństwo</th>
                  <th>Data zamknięcia</th>
                  <th>Opiekun</th>
                  <th style={{ width: "100px" }}>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal) => {
                  const stage = dealStages.find((s) => s.key === deal.stage);
                  return (
                    <tr key={deal.id}>
                      <td className="cell-name">{deal.title}</td>
                      <td>{deal.company}</td>
                      <td>{formatCurrency(deal.value)}</td>
                      <td><span className="badge badge-info">{stage?.label}</span></td>
                      <td>{deal.probability}%</td>
                      <td>{formatDate(deal.closeDate)}</td>
                      <td>{deal.owner}</td>
                      <td>
                        <div className="table-actions">
                          <button className="btn-icon" onClick={() => { setEditingId(deal.id); setFormOpen(true); }}>
                            <FaEdit />
                          </button>
                          <button
                            className="btn-icon btn-icon-danger"
                            onClick={() => {
                              removeDeal(deal.id);
                              showToast("Transakcja usunięta.", "success");
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
        onSubmit={editingId ? handleEditDeal : handleAddDeal}
        title={editingId ? "Edytuj transakcję" : "Dodaj nową transakcję"}
        fields={dealFields}
        initialData={editingId ? deals.find((d) => d.id === editingId) || {} : {}}
        submitLabel={editingId ? "Zapisz" : "Dodaj"}
      />
    </div>
  );
};

export default Deals;
