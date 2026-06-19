import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { calendarEvents } from "../data/mockData";
import "./Calendar.css";

const DAYS = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];
const MONTHS = [
  "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień",
];

const eventTypeColors = {
  spotkanie: "event-meeting",
  wewnętrzne: "event-internal",
  wydarzenie: "event-public",
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return calendarEvents.filter((e) => e.date === dateStr);
  };

  const today = 18;
  const isCurrentMonth = month === 5 && year === 2026;

  const cells = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push(<div key={`empty-${i}`} className="calendar-cell empty" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const events = getEventsForDay(day);
    cells.push(
      <div
        key={day}
        className={`calendar-cell ${isCurrentMonth && day === today ? "today" : ""} ${events.length ? "has-events" : ""}`}
      >
        <span className="cell-day">{day}</span>
        <div className="cell-events">
          {events.slice(0, 2).map((e) => (
            <span key={e.id} className={`cell-event ${eventTypeColors[e.type]}`}>
              {e.time} {e.title}
            </span>
          ))}
          {events.length > 2 && (
            <span className="cell-more">+{events.length - 2} więcej</span>
          )}
        </div>
      </div>
    );
  }

  const upcoming = calendarEvents
    .filter((e) => new Date(e.date) >= new Date("2025-06-18"))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="page-content">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Kalendarz</h1>
          <p className="page-subtitle">Zaplanowane spotkania i wydarzenia</p>
        </div>
        <button className="btn btn-primary">
          <FaPlus /> Nowe wydarzenie
        </button>
      </div>

      <div className="calendar-layout">
        <div className="card calendar-main">
          <div className="calendar-nav">
            <button className="btn btn-secondary btn-sm" onClick={prevMonth}>
              <FaChevronLeft />
            </button>
            <h2>{MONTHS[month]} {year}</h2>
            <button className="btn btn-secondary btn-sm" onClick={nextMonth}>
              <FaChevronRight />
            </button>
          </div>
          <div className="calendar-grid">
            {DAYS.map((d) => (
              <div key={d} className="calendar-day-header">{d}</div>
            ))}
            {cells}
          </div>
        </div>

        <div className="card calendar-sidebar">
          <div className="card-header">
            <h3>Nadchodzące wydarzenia</h3>
          </div>
          <div className="upcoming-list">
            {upcoming.map((event) => (
              <div key={event.id} className="upcoming-item">
                <div className={`upcoming-dot ${eventTypeColors[event.type]}`} />
                <div>
                  <p className="upcoming-title">{event.title}</p>
                  <span className="upcoming-meta">
                    {new Date(event.date).toLocaleDateString("pl-PL", { day: "numeric", month: "short" })} · {event.time} · {event.duration}
                  </span>
                  <span className="upcoming-attendees">
                    {event.attendees.join(", ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
