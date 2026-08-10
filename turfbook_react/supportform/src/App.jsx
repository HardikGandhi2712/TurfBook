import { Routes, Route } from "react-router-dom";
import SupportForm from "./SupportForm";
import AdminDashboard from "./AdminDashboard";
import CourtRegistrationForm from "./CourtRegistrationForm";
import CenterDashboard from "./CenterDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SupportForm />} />
      <Route path="/court" element={<CourtRegistrationForm />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/court" element={<CenterDashboard />} />
    </Routes>
  );
}

export default App;
