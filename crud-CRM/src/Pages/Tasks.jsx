import { useState } from "react";
import { 
  FaPlus, 
  FaCheck, 
  FaEdit, 
  FaTrash, 
  FaCalendarAlt, 
  FaEnvelope,    
  FaPhone,       
  FaClipboardList,
  FaChevronDown,
  FaUser,
  FaLink,
  FaExclamationCircle
} from "react-icons/fa";
import { tasks as initialTasks, formatDate } from "../data/mockData";
import FormModal from "../Components/Shared/FormModal";
import { useCRUD } from "../hooks/useCRUD";
import { useToast } from "../context/ToastContext";
import "./Tasks.css";

const priorityBadge = {
  wysoki: "badge-error",
  średni: "badge-warning",
  niski: "badge-neutral",
};

const statusBadge = {
  "w toku": "badge-info",
  oczekujące: "badge-warning",
  ukończone: "badge-success",
};

const typeIcons = {
  spotkanie: <FaCalendarAlt />,
  email: <FaEnvelope />,
  telefon: <FaPhone />,
  zadanie: <FaClipboardList />,
};

const Tasks = () => {
  const { items: taskList, add, update, delete: removeTask } = useCRUD("crm_tasks", initialTasks);
  const [filter, setFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [expandedTaskId, setExpandedTaskId] = useState(null); // Menu szczegółów
  const { showToast } = useToast();

  const filtered = taskList.filter((t) => {
    if (filter === "all") return true;
    if (filter === "pending") return t.status !== "ukończone";
    return t.status === filter;
  });

  const toggleComplete = (id, e) => {
    e.stopPropagation(); // Zapobiega otwieraniu menu szczegółów przy kliknięciu checkboxa
    const task = taskList.find((t) => t.id === id);
    update(id, {
      status: task.status === "ukończone" ? "oczekujące" : "ukończone",
    });
  };

  const toggleExpandTask = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  const handleAddTask = (data) => {
    add({
      title: data.title || "Nowe zadanie",
      type: data.type || "zadanie",
      priority: data.priority || "średni",
      dueDate: data.dueDate || new Date().toISOString().split("T")[0],
      status: "oczekujące",
      assignee: data.assignee || "Ja",
      related: data.related || "—",
    });
    showToast("Zadanie dodane.", "success");
    setFormOpen(false);
  };

  const handleEditTask = (data) => {
    update(editingId, {
      title: data.title,
      type: data.type,
      priority: data.priority,
      dueDate: data.dueDate,
      assignee: data.assignee,
      related: data.related,
    });
    showToast("Zadanie zaktualizowane.", "success");
    setFormOpen(false);
    setEditingId(null);
  };

  const taskFields = [
    { name: "title", label: "Tytuł zadania", type: "text", required: true },
    {
      name: "type",
      label: "Typ",
      type: "select",
      options: [
        { value: "spotkanie", label: "Spotkanie" },
        { value: "email", label: "Email" },
        { value: "telefon", label: "Telefon" },
        { value: "zadanie", label: "Zadanie" },
      ],
    },
    {
      name: "priority",
      label: "Priorytet",
      type: "select",
      options: [
        { value: "wysoki", label: "Wysoki" },
        { value: "średni", label: "Średni" },
        { value: "niski", label: "Niski" },
      ],
    },
    { name: "dueDate", label: "Termin", type: "date", required: true },
    { name: "assignee", label: "Przypisane do", type: "text" },
    { name: "related", label: "Powiązane z", type: "text" },
  ];

  const pendingCount = taskList.filter((t) => t.status !== "ukończone").length;
  const completedCount = taskList.filter((t) => t.status === "ukończone").length;

  return (
    <div className="page-content tasks-page">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Zadania & Kolejka</h1>
          <p className="page-subtitle">Zarządzanie bieżącymi operacjami i aktywnościami</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingId(null);
            setFormOpen(true);
          }}
        >
          <FaPlus /> Nowe zadanie
        </button>
      </div>

      <div className="tasks-layout">
        {/* Lewy Sidebar - Panel Statystyk i Filtrów */}
        <div className="tasks-sidebar">
          <div className="sidebar-stats-card">
            <div className="stat-box">
              <span className="stat-value text-warning">{pendingCount}</span>
              <span className="stat-label">Oczekujące</span>
            </div>
            <div className="stat-box">
              <span className="stat-value text-success">{completedCount}</span>
              <span className="stat-label">Ukończone</span>
            </div>
          </div>

          <div className="sidebar-filters-group">
            <h3>Filtruj zadania</h3>
            {[
              { key: "all", label: "Wszystkie aktywności" },
              { key: "pending", label: "Do zrobienia" },
              { key: "w toku", label: "W realizacji" },
              { key: "ukończone", label: "Ukończone" },
            ].map((f) => (
              <button
                key={f.key}
                className={`filter-row-btn ${filter === f.key ? "active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Prawy panel - Główna lista zadań */}
        <div className="tasks-main-list">
          {filtered.length === 0 ? (
            <div className="tasks-empty-state">
              <p>Brak zadań pasujących do wybranego filtru.</p>
            </div>
          ) : (
            filtered.map((task) => {
              const isExpanded = expandedTaskId === task.id;
              return (
                <div
                  key={task.id}
                  className={`task-row-card ${task.status === "ukończone" ? "task-completed" : ""} ${isExpanded ? "expanded" : ""}`}
                  onClick={() => toggleExpandTask(task.id)}
                >
                  <div className="task-row-main">
                    <button
                      className={`task-row-checkbox ${task.status === "ukończone" ? "checked" : ""}`}
                      onClick={(e) => toggleComplete(task.id, e)}
                      aria-label="Status zadania"
                    >
                      {task.status === "ukończone" && <FaCheck />}
                    </button>

                    <div className="task-row-icon-type" data-type={task.type}>
                      {typeIcons[task.type]}
                    </div>

                    <div className="task-row-details">
                      <h3>{task.title}</h3>
                      <div className="task-row-badges">
                        <span className={`task-badge badge-prio-${task.priority}`}>{task.priority}</span>
                        <span className={`task-badge badge-status-${task.status.replace(" ", "-")}`}>{task.status}</span>
                        <span className="task-row-date">Termin: {formatDate(task.dueDate)}</span>
                      </div>
                    </div>

                    <div className={`task-row-chevron ${isExpanded ? "rotate" : ""}`}>
                      <FaChevronDown />
                    </div>
                  </div>

                  {/* Rozwijane Menu Szczegółów (Zainspirowane Twoim pięknym UI) */}
                  {isExpanded && (
                    <div className="task-row-dropdown" onClick={(e) => e.stopPropagation()}>
                      <div className="dropdown-details-grid">
                        <div className="detail-item">
                          <FaUser className="detail-icon" />
                          <div>
                            <span className="detail-label">Odpowiedzialny</span>
                            <span className="detail-value">{task.assignee}</span>
                          </div>
                        </div>
                        <div className="detail-item">
                          <FaLink className="detail-icon" />
                          <div>
                            <span className="detail-label">Powiązanie</span>
                            <span className="detail-value">{task.related !== "—" ? task.related : "Brak powiązania"}</span>
                          </div>
                        </div>
                        <div className="detail-item">
                          <FaExclamationCircle className="detail-icon" />
                          <div>
                            <span className="detail-label">Typ operacji</span>
                            <span className="detail-value text-capitalize">{task.type}</span>
                          </div>
                        </div>
                      </div>

                      <div className="dropdown-actions-row">
                        <button
                          className="btn-dropdown action-edit"
                          onClick={() => {
                            setEditingId(task.id);
                            setFormOpen(true);
                          }}
                        >
                          <FaEdit /> Edytuj zadanie
                        </button>
                        <button
                          className="btn-dropdown action-delete"
                          onClick={() => {
                            removeTask(task.id);
                            showToast("Zadanie usunięte.", "success");
                          }}
                        >
                          <FaTrash /> Usuń 
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <FormModal
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingId(null);
        }}
        onSubmit={editingId ? handleEditTask : handleAddTask}
        title={editingId ? "Edytuj zadanie" : "Dodaj nowe zadanie"}
        fields={taskFields}
        initialData={editingId ? taskList.find((t) => t.id === editingId) || {} : {}}
        submitLabel={editingId ? "Zapisz zmiany" : "Utwórz zadanie"}
      />
    </div>
  );
};

export default Tasks;