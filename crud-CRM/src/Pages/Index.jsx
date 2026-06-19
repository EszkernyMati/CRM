import { Routes, Route } from "react-router-dom";
import LoadingScreen from "../Components/LoadingScreen/loadingScreen";
import Layout from "../Components/Layout/Layout";
import ProtectedRoute from "../Components/Auth/ProtectedRoute";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Contacts from "./Contacts";
import Leads from "./Leads";
import Deals from "./Deals";
import Companies from "./Companies";
import Tasks from "./Tasks";
import Calendar from "./Calendar";
import Reports from "./Reports";
import Settings from "./Settings";

const App = () => {
  return (
    <LoadingScreen>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="leads" element={<Leads />} />
          <Route path="deals" element={<Deals />} />
          <Route path="companies" element={<Companies />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </LoadingScreen>
  );
};

export default App;
