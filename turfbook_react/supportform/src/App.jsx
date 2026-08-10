import { Routes, Route } from "react-router-dom";
import SupportForm from "./SupportForm";
import AdminDashboard from "./AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SupportForm />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;