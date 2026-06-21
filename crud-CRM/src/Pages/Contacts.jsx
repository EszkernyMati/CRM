import { useState } from "react";
import { FaPlus, FaEnvelope, FaPhone, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../Components/Shared/Modal";
import FormModal from "../Components/Shared/FormModal";
import SearchBar from "../Components/Shared/SearchBar";
import { useCRUD } from "../hooks/useCRUD";
import { useToast } from "../context/ToastContext";
import { contacts as initialContacts, formatDate } from "../data/mockData";
import "./Contacts.css";

const statusBadge = {
  active: "badge-success",
  lead: "badge-info",
  inactive: "badge-neutral",
};

const statusLabel = {
  active: "Aktywny",
  lead: "Lead",
  inactive: "Nieaktywny",
};

const Contacts = () => {
  const { items: contacts, add, update, delete: removeContact } = useCRUD("crm_contacts", initialContacts);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { showToast } = useToast();

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddContact = (data) => {
    add({
      name: data.name || "Nowy kontakt",
      email: data.email || "",
      phone: data.phone || "",
      company: data.company || "",
      role: data.role || "",
      status: data.status || "active",
      lastContact: new Date().toISOString().split("T")[0],
    });
    showToast("Kontakt dodany.", "success");
    setFormOpen(false);
  };

  const handleEditContact = (data) => {
    update(editingId, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      role: data.role,
      status: data.status,
    });
    showToast("Kontakt zaktualizowany.", "success");
    setFormOpen(false);
    setEditingId(null);
    setSelected(null);
  };

  const handleDeleteContact = () => {
    removeContact(selected.id);
    showToast("Kontakt usunięty.", "success");
    setSelected(null);
  };

  const handleEditClick = (contact) => {
    setEditingId(contact.id);
    setFormOpen(true);
  };

  const contactFields = [
    { name: "name", label: "Imię i nazwisko", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Telefon", type: "tel" },
    { name: "company", label: "Firma", type: "text" },
    { name: "role", label: "Stanowisko", type: "text" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "active", label: "Aktywny" },
        { value: "lead", label: "Lead" },
        { value: "inactive", label: "Nieaktywny" },
      ],
    },
  ];

  return (
    <div className="page-content">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Kontakty</h1>
          <p className="page-subtitle">{contacts.length} kontaktów w bazie</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingId(null);
            setFormOpen(true);
          }}
        >
          <FaPlus /> Dodaj kontakt
        </button>
      </div>

      <div className="page-search">
        <SearchBar value={search} onChange={setSearch} placeholder="Szukaj po nazwie, firmie lub email..." />
      </div>

      <div className="card contacts-table-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Imię i nazwisko</th>
                <th>Firma</th>
                <th>Stanowisko</th>
                <th>Email</th>
                <th>Status</th>
                <th>Ostatni kontakt</th>
                <th style={{ width: "100px" }}>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact) => (
                <tr key={contact.id} className="table-row-clickable">
                  <td className="cell-name" onClick={() => setSelected(contact)}>{contact.name}</td>
                  <td onClick={() => setSelected(contact)}>{contact.company}</td>
                  <td onClick={() => setSelected(contact)}>{contact.role}</td>
                  <td onClick={() => setSelected(contact)}>{contact.email}</td>
                  <td onClick={() => setSelected(contact)}>
                    <span className={`badge ${statusBadge[contact.status]}`}>
                      {statusLabel[contact.status]}
                    </span>
                  </td>
                  <td onClick={() => setSelected(contact)}>{formatDate(contact.lastContact)}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn-icon"
                        onClick={() => handleEditClick(contact)}
                        title="Edytuj"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-icon btn-icon-danger"
                        onClick={() => {
                          setSelected(contact);
                          handleDeleteContact();
                        }}
                        title="Usuń"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <FormModal
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingId(null);
        }}
        onSubmit={editingId ? handleEditContact : handleAddContact}
        title={editingId ? "Edytuj kontakt" : "Dodaj nowy kontakt"}
        fields={contactFields}
        initialData={editingId ? contacts.find((c) => c.id === editingId) || {} : {}}
        submitLabel={editingId ? "Zapisz" : "Dodaj"}
      />

      <Modal
        isOpen={!!selected && !formOpen}
        onClose={() => setSelected(null)}
        title={selected?.name}
        size="md"
      >
        {selected && (
          <>
            <div className="contact-modal-header">
              <div className="contact-avatar">{selected.name.split(" ").map((n) => n[0]).join("")}</div>
              <div>
                <p className="contact-modal-role">{selected.role}</p>
                <p className="contact-modal-company">{selected.company}</p>
              </div>
            </div>
            <div className="detail-grid">
              <span className="detail-label">Email</span>
              <span className="detail-value">{selected.email}</span>
              <span className="detail-label">Telefon</span>
              <span className="detail-value">{selected.phone}</span>
              <span className="detail-label">Status</span>
              <span className="detail-value">
                <span className={`badge ${statusBadge[selected.status]}`}>
                  {statusLabel[selected.status]}
                </span>
              </span>
              <span className="detail-label">Ostatni kontakt</span>
              <span className="detail-value">{formatDate(selected.lastContact)}</span>
            </div>
            
             
            
          </>
        )}
      </Modal>
    </div>
  );
};

export default Contacts;
