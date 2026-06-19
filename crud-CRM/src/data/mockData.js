export const dashboardMetrics = [
  { id: 1, label: "Przychód miesięczny (MRR)", value: "842 300 zł", change: "+18.4%", trend: "up", icon: "revenue" },
  { id: 2, label: "Aktywne transakcje (Pipeline)", value: "64", change: "+12", trend: "up", icon: "deals" },
  { id: 3, label: "Nowe leady (Inbound)", value: "412", change: "+42%", trend: "up", icon: "leads" },
  { id: 4, label: "Wskaźnik konwersji", value: "28.9%", change: "+3.5%", trend: "up", icon: "conversion" },
];

export const recentActivity = [
  { id: 1, type: "deal", message: "Kontrakt „Enterprise Core LLM” przeniesiony do etapu Negocjacji", user: "Aleksander Wenta", time: "4 min temu" },
  { id: 2, type: "contact", message: "Dodano nowego foundera: Maksymilian Thor (Aether Labs)", user: "Elena Rostova", time: "18 min temu" },
  { id: 3, type: "task", message: "Zadanie „Pitch deck dla Y Combinator VCs” oznaczone jako ukończone", user: "Wiktor Krajewski", time: "1 godz. temu" },
  { id: 4, type: "lead", message: "Lead „Vortex Aerospace” zakwalifikowany jako SQL (Gorący)", user: "Aleksander Wenta", time: "2 godz. temu" },
  { id: 5, type: "meeting", message: "Zaplanowano techniczne demo architektury z NeuralStack", user: "Elena Rostova", time: "3 godz. temu" },
];

export const pipelineSummary = [
  { stage: "Kwalifikacja", count: 24, value: "1 120 000 zł", color: "hsl(199, 89%, 48%)" },
  { stage: "Oferta", count: 14, value: "2 480 000 zł", color: "hsl(217, 91%, 60%)" },
  { stage: "Negocjacje", count: 7, value: "4 150 000 zł", color: "hsl(38, 92%, 50%)" },
  { stage: "Zamknięte", count: 12, value: "3 890 000 zł", color: "hsl(150, 100%, 33%)" },
];

export const contacts = [
  { id: 1, name: "Aleksander Wenta", email: "a.wenta@neonstack.io", phone: "+48 732 981 221", company: "NeonStack AI", role: "Head of AI Research", status: "active", lastContact: "2026-06-18" },
  { id: 2, name: "Maksymilian Thor", email: "m.thor@aetherlabs.dev", phone: "+48 501 882 334", company: "Aether Labs", role: "Co-Founder & CEO", status: "active", lastContact: "2026-06-19" },
  { id: 3, name: "Elena Rostova", email: "e.rostova@vortex.space", phone: "+48 667 345 112", company: "Vortex Aerospace", role: "VP of Engineering", status: "lead", lastContact: "2026-06-15" },
  { id: 4, name: "Dorian Gray", email: "d.gray@cyberprotect.net", phone: "+48 603 998 776", company: "CyberProtect Inc.", role: "CISO", status: "active", lastContact: "2026-06-14" },
  { id: 5, name: "Ida Kasprzyk", email: "i.kasprzyk@biocore.eu", phone: "+48 884 567 110", company: "BioCore Technologies", role: "Procurement Director", status: "inactive", lastContact: "2026-05-28" },
  { id: 6, name: "Wiktor Krajewski", email: "w.krajewski@quantumflow.io", phone: "+48 791 678 009", company: "QuantumFlow", role: "Product Architect", status: "active", lastContact: "2026-06-19" },
];

export const leads = [
  { id: 1, name: "Vortex Aerospace", contact: "Elena Rostova", source: "Product Hunt", stage: "nowy", score: 96, value: "450 000 zł", owner: "Aleksander Wenta", created: "2026-06-16" },
  { id: 2, name: "Hyperion Robotics", contact: "Bruno Lang", source: "LinkedIn Outbound", stage: "kontakt", score: 64, value: "280 000 zł", owner: "Elena Rostova", created: "2026-06-14" },
  { id: 3, name: "Apex Capital", contact: "Fryderyk rousseau", source: "Polecenie VC", stage: "kwalifikacja", score: 98, value: "1 200 000 zł", owner: "Wiktor Krajewski", created: "2026-06-11" },
  { id: 4, name: "Synthetix Node", contact: "Aria Vance", source: "Strona www", stage: "kontakt", score: 71, value: "185 000 zł", owner: "Aleksander Wenta", created: "2026-06-17" },
  { id: 5, name: "Ghost Network", contact: "Anonimowy Founder", source: "Cold inbound", stage: "nowy", score: 40, value: "650 000 zł", owner: "Elena Rostova", created: "2026-06-18" },
  { id: 6, name: "ChronoData", contact: "Sonia Gellar", source: "Webinar Tech", stage: "kwalifikacja", score: 88, value: "390 000 zł", owner: "Wiktor Krajewski", created: "2026-06-09" },
];

export const leadStages = [
  { key: "nowy", label: "Nowy Inbound", color: "badge-info" },
  { key: "kontakt", label: "Rozmowa", color: "badge-warning" },
  { key: "kwalifikacja", label: "SQL / SQL Premium", color: "badge-success" },
  { key: "konwersja", label: "Przekazano do Pipeline", color: "badge-neutral" },
];

export const deals = [
  { id: 1, title: "Wdrożenie LLM Enterprise", company: "NeonStack AI", value: 1450000, stage: "negocjacje", probability: 85, owner: "Aleksander Wenta", closeDate: "2026-07-10" },
  { id: 2, title: "Kwantowa Infrastruktura Chmurowa", company: "QuantumFlow", value: 890000, stage: "oferta", probability: 70, owner: "Elena Rostova", closeDate: "2026-06-30" },
  { id: 3, title: "Audyt Zero-Trust Network", company: "CyberProtect Inc.", value: 240000, stage: "kwalifikacja", probability: 45, owner: "Wiktor Krajewski", closeDate: "2026-08-15" },
  { id: 4, title: "System Autonomiczny v4", company: "Hyperion Robotics", value: 3100000, stage: "oferta", probability: 50, owner: "Aleksander Wenta", closeDate: "2026-09-01" },
  { id: 5, title: "Integracja API Real-Time Vector", company: "Aether Labs", value: 150000, stage: "zamknięte", probability: 100, owner: "Elena Rostova", closeDate: "2026-06-12" },
  { id: 6, title: "Migracja Multi-Cloud Sharding", company: "Apex Capital", value: 720000, stage: "negocjacje", probability: 80, owner: "Wiktor Krajewski", closeDate: "2026-06-28" },
  { id: 7, title: "Analiza Algorytmów Predykcyjnych", company: "ChronoData", value: 195000, stage: "kwalifikacja", probability: 35, owner: "Aleksander Wenta", closeDate: "2026-08-30" },
  { id: 8, title: "Bezpieczeństwo Biometryczne", company: "BioCore Technologies", value: 1680000, stage: "kwalifikacja", probability: 30, owner: "Elena Rostova", closeDate: "2026-11-01" },
];

export const dealStages = [
  { key: "kwalifikacja", label: "Scoping techniczny" },
  { key: "oferta", label: "Propozycja wartości" },
  { key: "negocjacje", label: "Negocjacje prawne/NDA" },
  { key: "zamknięte", label: "Wygrana (Closed Won)" },
];

export const companies = [
  { id: 1, name: "NeonStack AI", industry: "SaaS / Artificial Intelligence", employees: 140, revenue: "68 mln zł", website: "neonstack.io", city: "Warszawa", contacts: 4, deals: 2, status: "klient" },
  { id: 2, name: "Aether Labs", industry: "DeepTech / Web3 Infrastrucutre", employees: 35, revenue: "14 mln zł", website: "aetherlabs.dev", city: "Wrocław", contacts: 2, deals: 1, status: "klient" },
  { id: 3, name: "Vortex Aerospace", industry: "SpaceTech", employees: 290, revenue: "110 mln zł", website: "vortex.space", city: "Kraków", contacts: 1, deals: 1, status: "lead" },
  { id: 4, name: "QuantumFlow", industry: "Quantum Computing", employees: 55, revenue: "19 mln zł", website: "quantumflow.io", city: "Gdańsk", contacts: 3, deals: 1, status: "prospect" },
  { id: 5, name: "CyberProtect Inc.", industry: "Cybersecurity", employees: 420, revenue: "145 mln zł", website: "cyberprotect.net", city: "Poznań", contacts: 2, deals: 1, status: "klient" },
  { id: 6, name: "Apex Capital", industry: "FinTech / VC", employees: 90, revenue: "310 mln zł", website: "apex.capital", city: "Warszawa", contacts: 2, deals: 2, status: "prospect" },
];

export const tasks = [
  { id: 1, title: "Prezentacja architektury bezpieczeństwa (NeonStack)", type: "spotkanie", priority: "wysoki", dueDate: "2026-06-20", status: "w toku", assignee: "Aleksander Wenta", related: "Wdrożenie LLM Enterprise" },
  { id: 2, title: "Wysłać zrewidowany tokenomics-sheet do Aether Labs", type: "email", priority: "wysoki", dueDate: "2026-06-19", status: "oczekujące", assignee: "Elena Rostova", related: "Integracja API" },
  { id: 3, title: "Zdzwonka z CISO Vortex Aerospace ws. szyfrowania", type: "telefon", priority: "średni", dueDate: "2026-06-22", status: "oczekujące", assignee: "Aleksander Wenta", related: "Vortex Aerospace" },
  { id: 4, title: "Przygotować kwartalny raport dla inwestorów (Q2 Data)", type: "zadanie", priority: "średni", dueDate: "2026-06-26", status: "oczekujące", assignee: "Wiktor Krajewski", related: "—" },
  { id: 5, title: "Ostateczne zatwierdzenie warunków finansowych", type: "spotkanie", priority: "wysoki", dueDate: "2026-06-18", status: "ukończone", assignee: "Wiktor Krajewski", related: "Migracja Multi-Cloud" },
  { id: 6, title: "Scrapowanie i czyszczenie nowych inboundów z Crunchbase", type: "zadanie", priority: "niski", dueDate: "2026-06-24", status: "w toku", assignee: "Elena Rostova", related: "—" },
];

export const calendarEvents = [
  { id: 1, title: "Deep Demo: NeonStack LLM", date: "2026-06-20", time: "14:00", duration: "1h 30min", type: "spotkanie", attendees: ["Aleksander W.", "Maksymilian T."] },
  { id: 2, title: "Sync inżynieryjny (Core Architecture)", date: "2026-06-20", time: "10:00", duration: "45min", type: "wewnętrzne", attendees: ["Dev Team"] },
  { id: 3, title: "Finalizacja kontraktu Apex Capital", date: "2026-06-21", time: "11:30", duration: "1h", type: "spotkanie", attendees: ["Wiktor K.", "Elena R."] },
  { id: 4, title: "Keynote: Przyszłość chmury obliczeniowej", date: "2026-06-23", time: "16:00", duration: "2h", type: "wydarzenie", attendees: ["Cały Zespół", "Publiczność"] },
  { id: 5, title: "Review lejka sprzedażowego i ARR", date: "2026-06-25", time: "09:30", duration: "1h", type: "wewnętrzne", attendees: ["C-Level Management"] },
  { id: 6, title: "Q&A i onboarding techniczny QuantumFlow", date: "2026-06-26", time: "13:00", duration: "1h", type: "spotkanie", attendees: ["Elena R.", "Dorian G."] },
];

export const reportData = {
  monthlyRevenue: [
    { month: "Sty", value: 410 },
    { month: "Lut", value: 490 },
    { month: "Mar", value: 580 },
    { month: "Kwi", value: 640 },
    { month: "Maj", value: 720 },
    { month: "Cze", value: 842 },
  ],
  leadsBySource: [
    { source: "Product Hunt", count: 145, percent: 35 },
    { source: "LinkedIn Outbound", count: 98, percent: 24 },
    { source: "Polecenia VC", count: 72, percent: 17 },
    { source: "Konferencje Tech", count: 55, percent: 13 },
    { source: "Inbound organiczny", count: 42, percent: 11 },
  ],
  teamPerformance: [
    { name: "Aleksander Wenta", deals: 18, revenue: "2 450 000 zł", conversion: "34%" },
    { name: "Elena Rostova", deals: 14, revenue: "1 890 000 zł", conversion: "27%" },
    { name: "Wiktor Krajewski", deals: 16, revenue: "2 120 000 zł", conversion: "31%" },
  ],
}

export const teamMembers = [
  { id: 1, name: "Aleksander Wenta", role: "VP of Global Enterprise Sales", email: "aleksander@saas-crm.io", avatar: "AW" },
  { id: 2, name: "Elena Rostova", role: "Principal Account Architect", email: "elena@saas-crm.io", avatar: "ER" },
  { id: 3, name: "Wiktor Krajewski", role: "Growth & Pipeline Lead", email: "wiktor@saas-crm.io", avatar: "WK" },
];

export const navItems = [
  { path: "/", label: "Dashboard", icon: "dashboard" },
  { path: "/contacts", label: "Kontakty Enterprise", icon: "contacts" },
  { path: "/leads", label: "Leady & SQLs", icon: "leads" },
  { path: "/deals", label: "Pipeline Transakcji", icon: "deals" },
  { path: "/companies", label: "Konta Firmowe", icon: "companies" },
  { path: "/tasks", label: "Zadania & Kolejka", icon: "tasks" },
  { path: "/calendar", label: "Kalendarz Spotkań", icon: "calendar" },
  { path: "/reports", label: "Analityka i ARR", icon: "reports" },
  { path: "/settings", label: "Konfiguracja Systemu", icon: "settings" },
];

export function formatCurrency(value) {
  return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(value);
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("pl-PL", { day: "numeric", month: "short", year: "numeric" });
}