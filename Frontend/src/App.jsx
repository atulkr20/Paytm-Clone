import { Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

function App() {
  return (
    <Routes>
      {/* Default route redirects to signin */}
      <Route path="/" element={<Navigate to="/signin" />} />

      {/* Auth routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/send" element={<SendMoney />} />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;
