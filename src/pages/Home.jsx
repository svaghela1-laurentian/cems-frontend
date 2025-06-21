import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../services/api";

const Home = () => {
  const { role } = useSelector((state) => state.auth.user) || {};
  const [counts, setCounts] = useState({ total: 0, my: 0 });

  useEffect(() => {
    api.get("/events/counts")
      .then(res => setCounts(res.data))
      .catch(() => setCounts({ total: 0, my: 0 }));
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 text-center">Welcome to your Dashboard</h1>
      <p className="text-gray-600 mt-2">You are logged in as: {role}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 w-full max-w-3xl">
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Total Events</h2>
          <Link to="/events" className="text-3xl text-blue-600 hover:underline">{counts.totalEvents}</Link>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">My Events</h2>
          <Link to="/student/my-events" className="text-3xl text-blue-600 hover:underline">{counts.myEventsCount}</Link>
        </div>
      
      </div>
      <div className="mt-6 space-y-4">
        {role === "student" && (
          <Link to="/student/create-event" className="bg-white p-3 rounded shadow hover:shadow-lg block">Create Event Proposal</Link>
        )}

        {role === "faculty" && (
          <Link to="/faculty/review" className="bg-white p-3 rounded shadow hover:shadow-lg block">Review Event Proposals</Link>
        )}
        {role === "admin" && (
          <Link to="/admin/dashboard" className="bg-white p-3 rounded shadow hover:shadow-lg block">Admin Dashboard</Link>
        )}
      </div>
    </div>
  );
};

export default Home;
