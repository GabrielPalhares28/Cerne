import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import TicketForm from "./pages/TicketForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/new-ticket" element={<TicketForm />} />
    </Routes>
  );
};

export default App;
