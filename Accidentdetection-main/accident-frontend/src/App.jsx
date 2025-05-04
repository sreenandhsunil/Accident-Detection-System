// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LiveFeedPage from "./pages/LiveFeedPage";
import IncidentsPage from "./pages/IncidentsPage";
import StatsPage from "./pages/StatsPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Routes>
  <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
  <Route path="/livefeed" element={user ? <LiveFeedPage /> : <Navigate to="/login" />} />
  <Route path="/incidents" element={user ? <IncidentsPage /> : <Navigate to="/login" />} />
  <Route path="/stats" element={user ? <StatsPage /> : <Navigate to="/login" />} />
  <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
</Routes>
    </Router>
  );
}export default App;