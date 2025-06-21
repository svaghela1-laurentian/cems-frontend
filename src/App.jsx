import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import EventList from "./pages/EventList";
import CreateEventProposal from "./pages/CreateEventProposal";
import MyEvents from "./pages/MyEvents";
import EventDetails from "./pages/EventDetails";
import EditEvent from "./pages/EditEvent";
import ReviewProposal from "./pages/ReviewEventProposals";
import './App.css';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); 
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><EventList /></ProtectedRoute>} />
        <Route path="/student/my-events" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
        <Route path="/student/create-event" element={<ProtectedRoute><CreateEventProposal /></ProtectedRoute>} />
        <Route path="/event/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
        <Route path="/event/:id/edit" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
        <Route path="/faculty/review" element={<ProtectedRoute><ReviewProposal /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
