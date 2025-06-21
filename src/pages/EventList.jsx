import React, { useEffect, useState } from "react";  
import { Link } from "react-router-dom";  
import api from "../services/api";  
import { FaMapMarkerAlt, FaCalendarAlt, FaStar } from "react-icons/fa";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");  
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    try {
      await api.post("/registration/register", { eventId });  
      alert("Registered successfully!");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Try again later.");
    }
  };
  
  const computeAverageRating = (feedback) => {
    if (!feedback || feedback.length === 0) return null;
    const total = feedback.reduce((sum, item) => sum + (item.rating || 0), 0);
    return (total / feedback.length).toFixed(1);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 text-center">Available Events</h1>
      <div className="grid gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3 w-full max-w-6xl">
        {events.map((event) => {
            const averageRating = computeAverageRating(event.feedback);
            return (
              <div
                key={event._id}
                className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition space-y-3"
              >
                <Link
                  to={`/event/${event._id}`}
                  className="text-2xl font-bold text-blue-600 hover:underline"
                >
                  {event.title}
                </Link>

                <p className="text-gray-600">{event.description}</p>

                <div className="flex items-center text-gray-600 space-x-4">
                  <div className="flex items-center space-x-1">
                    <FaMapMarkerAlt />
                    <span>{event.venueId?.name || "TBA"}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaCalendarAlt />
                    <span>{new Date(event.dateTime).toLocaleString()}</span>
                  </div>
                </div>

                {averageRating && (
                  <div
                    className="flex items-center space-x-1 text-yellow-500 font-semibold cursor-pointer hover:underline"
                    onClick={() => setSelectedFeedback(event.feedback)}
                  >
                    <FaStar />
                    <span>{averageRating}/5</span>
                  </div>
                )}

                <div className="mt-4">
                  <button
                    className="bg-blue-600 text-white rounded-lg p-2 w-full hover:bg-blue-700"
                    onClick={() => handleRegister(event._id)}
                  >
                    Register
                  </button>
                </div>
              </div>
            );
        })}
      </div>

      {/* Feedback Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/60 z-50 p-4">
          <div className="bg-white rounded p-6 max-w-md w-full space-y-4">
            <h2 className="text-2xl font-bold">Feedback</h2>
            {selectedFeedback.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {selectedFeedback.map((item) => (
                  <div key={item._id} className="border rounded p-3 space-y-1">
                    <div className="flex items-center space-x-1 text-yellow-500 font-bold">
                      <FaStar /> <span>{item.rating}/5</span>
                    </div>
                    <p>{item.comment || "No comment provided."}</p>
                    <span className="text-gray-500 text-sm">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No feedback available for this event.</p>
            )}
            <div className="flex justify-end">
              <button
                className="bg-gray-300 rounded p-2 hover:bg-gray-400"
                onClick={() => setSelectedFeedback(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
