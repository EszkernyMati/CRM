import { useState } from "react";
import { FaPlus, FaCheck, FaEdit, FaTrash } from "react-icons/fa";
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
  spotkanie: "📅",
  email: "✉️",
  telefon: "📞",
  zadanie: "📋",
};

const Tasks = () => {
  const { items: taskList, add, update, delete: removeTask } = useCRUD("crm_tasks", initialTasks);
  const [filter, setFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { showToast } = useToast();

  const filtered = taskList.filter((t) => {
    if (filter === "all") return true;
    if (filter === "pending") return t.status !== "ukończone";
    return t.status === filter;
  });

  const toggleComplete = (id) => {
    const task = taskList.find((t) => t.id === id);
    update(id, {
      status: task.status === "ukończone" ? "oczekujące" : "ukończone",
    });
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
        { value: "spotkanie", label: "📅 Spotkanie" },
        { value: "email", label: "✉️ Email" },
        { value: "telefon", label: "📞 Telefon" },
        { value: "zadanie", label: "📋 Zadanie" },
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

  return (
    <div className="page-content">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Zadania i aktywności</h1>
          <p className="page-subtitle">{pendingCount} zadań do wykonania</p>
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

      <div className="task-filters">
        {[
          { key: "all", label: "Wszystkie" },
          { key: "pending", label: "Oczekujące" },
          { key: "w toku", label: "W toku" },
          { key: "ukończone", label: "Ukończone" },
        ].map((f) => (
          <button
            key={f.key}
            className={`btn btn-sm ${filter === f.key ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="tasks-list">
        {filtered.map((task) => (
          <div
            key={task.id}
            className={`task-item card ${task.status === "ukończone" ? "task-completed" : ""}`}
          >
            <button
              className={`task-checkbox ${task.status === "ukończone" ? "checked" : ""}`}
              onClick={() => toggleComplete(task.id)}
              aria-label="Oznacz jako ukończone"
            >
              {task.status === "ukończone" && <FaCheck />}
            </button>
            <div className="task-content">
              <div className="task-header">
                <span className="task-type">{typeIcons[task.type]} {task.type}</span>
                <span className={`badge ${priorityBadge[task.priority]}`}>{task.priority}</span>
              </div>
              <h3>{task.title}</h3>
              <div className="task-meta">
                <span>{task.assignee}</span>
                <span>·</span>
                <span>Termin: {formatDate(task.dueDate)}</span>
                {task.related !== "—" && (
                  <>
                    <span>·</span>
                    <span className="task-related">{task.related}</span>
                  </>
                )}
              </div>
            </div>
            <span className={`badge ${statusBadge[task.status]}`}>{task.status}</span>
            <div className="task-actions">
              <button
                className="btn-icon"
                onClick={() => {
                  setEditingId(task.id);
                  setFormOpen(true);
                }}
                title="Edytuj"
              >
                <FaEdit />
              </button>
              <button
                className="btn-icon btn-icon-danger"
                onClick={() => {
                  removeTask(task.id);
                  showToast("Zadanie usunięte.", "success");
                }}
                title="Usuń"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
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
        submitLabel={editingId ? "Zapisz" : "Dodaj"}
      />
    </div>
  );
};

export default Tasks;
