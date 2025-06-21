import React from "react";
import { useParams, Link } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const event = {
    id,
    title: "Freshers' Welcome",
    description: "An event to welcome new students.",
    dateTime: "2025-08-20T10:00:00Z",
    status: "approved",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">{event.title}</h1>
      <p className="text-gray-600 mt-2 text-center">{event.description}</p>
      <p className="text-gray-600 mt-2 text-center">Date: {new Date(event.dateTime).toLocaleString()}</p>
      <div className="mt-4 flex justify-center space-x-4">
        <Link to={`/event/${event.id}/register`} className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Register
        </Link>
        <Link to={`/event/${event.id}/feedback`} className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700">
          Give Feedback
        </Link>
      </div>
    </div>
  );
};

export default EventDetails;
