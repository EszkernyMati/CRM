import { useSearchParams, Link } from "react-router-dom";
import * as mockData from "../../data/mockData";
import { FaBuilding, FaClipboardList, FaUserAlt, FaBriefcase } from "react-icons/fa";
import "./SearchResults.css";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const leads = mockData.leads || [];
  const tasks = mockData.tasks || [];
  const contacts = mockData.contacts || []; 
  const deals = mockData.deals || [];       

  const filteredLeads = query 
    ? leads.filter(item => item.name?.toLowerCase().includes(query) || item.contact?.toLowerCase().includes(query))
    : [];

  const filteredTasks = query 
    ? tasks.filter(item => item.title?.toLowerCase().includes(query) || item.assignee?.toLowerCase().includes(query))
    : [];

  const filteredContacts = query 
    ? contacts.filter(item => item.name?.toLowerCase().includes(query) || item.email?.toLowerCase().includes(query))
    : [];

  const filteredDeals = query 
    ? deals.filter(item => item.name?.toLowerCase().includes(query) || item.client?.toLowerCase().includes(query))
    : [];

  const hasResults = filteredLeads.length > 0 || filteredTasks.length > 0 || filteredContacts.length > 0 || filteredDeals.length > 0;

  return (
    <div className="page-content search-results-page">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Wyniki wyszukiwania</h1>
          <p className="page-subtitle">Szukana fraza: "<strong>{query}</strong>"</p>
        </div>
      </div>

      {!query && (
        <div className="search-empty">
          <p>Wpisz frazę w polu wyszukiwania powyżej, aby rozpocząć przeszukiwanie systemu.</p>
        </div>
      )}

      {query && !hasResults && (
        <div className="search-empty">
          <p>Brak wyników pasujących do frazy "<strong>{query}</strong>". Spróbuj wpisać coś innego.</p>
        </div>
      )}

      {query && hasResults && (
        <div className="search-grid">
          
          {filteredLeads.length > 0 && (
            <div className="search-section">
              <div className="search-section-header">
                <FaBuilding className="icon-lead" />
                <h2>Leady ({filteredLeads.length})</h2>
              </div>
              <ul className="search-list">
                {filteredLeads.map(lead => (
                  <li key={lead.id} className="search-item">
                    <Link to="/leads">
                      <span className="search-item-title">{lead.name}</span>
                      <span className="search-item-meta">Kontakt: {lead.contact} | Wartość: {lead.value}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {filteredDeals.length > 0 && (
            <div className="search-section">
              <div className="search-section-header">
                <FaBriefcase className="icon-deal" />
                <h2>Interesy / Transakcje ({filteredDeals.length})</h2>
              </div>
              <ul className="search-list">
                {filteredDeals.map(deal => (
                  <li key={deal.id} className="search-item">
                    <Link to="/deals">
                      <span className="search-item-title">{deal.name}</span>
                      <span className="search-item-meta">Klient: {deal.client} | Wartość: {deal.value}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {filteredTasks.length > 0 && (
            <div className="search-section">
              <div className="search-section-header">
                <FaClipboardList className="icon-task" />
                <h2>Zadania ({filteredTasks.length})</h2>
              </div>
              <ul className="search-list">
                {filteredTasks.map(task => (
                  <li key={task.id} className="search-item">
                    <Link to="/tasks">
                      <span className="search-item-title">{task.title}</span>
                      <span className="search-item-meta">Przypisane do: {task.assignee} | Termin: {task.dueDate}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {filteredContacts.length > 0 && (
            <div className="search-section">
              <div className="search-section-header">
                <FaUserAlt className="icon-contact" />
                <h2>Kontakty ({filteredContacts.length})</h2>
              </div>
              <ul className="search-list">
                {filteredContacts.map(contact => (
                  <li key={contact.id} className="search-item">
                    <Link to="/contacts">
                      <span className="search-item-title">{contact.name}</span>
                      <span className="search-item-meta">Email: {contact.email} | Telefon: {contact.phone}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default SearchResults;