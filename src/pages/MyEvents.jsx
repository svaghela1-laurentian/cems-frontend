import React, { useEffect, useState } from "react";  
import { Link, useNavigate } from "react-router-dom";  
import api from "../services/api";  

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [feedbackDescription, setFeedbackDescription] = useState("");
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await api.get("/events/my-events");
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyEvents();
  }, [navigate]);

  useEffect(() => {
    const fetchMyRegisteredEvents = async () => {
      try {
        const response = await api.get("/registration/get-my-events");
        setRegisteredEvents(response.data.events || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyRegisteredEvents();
  }, [navigate]);

  const openFeedbackModal = (eventId) => {
    setSelectedEventId(eventId);
    setFeedbackDescription("");
    setRating(5);
    setShowFeedbackModal(true);
  };
  
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      await api.post("/feedback/submit", {
        eventId: selectedEventId,
        comment: feedbackDescription,
        rating,
      });
      alert("Feedback submitted successfully!");
      setShowFeedbackModal(false);
    } catch (error) {
      console.error(error);
      alert("Error submitting feedback.");
    }
  };
  
  if (loading) {
    return <div className="text-center p-6">Loading your events...</div>;
  }

  if (events.length === 0 && registeredEvents.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">You have no events yet.</h1>
        <button
          className="bg-blue-600 text-white rounded p-2 mt-4 hover:bg-blue-700"
          onClick={() => navigate("/student/create-event")}
        >
          Create an Event
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center">My Events</h1>

      {/* Registered Events Table */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700">Registered Events</h2>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-600 uppercase text-sm">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Venue</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {registeredEvents.map((event) => (
                <tr key={event._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{event.title}</td>
                  <td className="py-3 px-4">{event.description}</td>
                  <td className="py-3 px-4">{event.venueName}</td>
                  <td className="py-3 px-4">{event.dateTime}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => openFeedbackModal(event._id)}
                      className="bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700"
                    >
                      Give Feedback
                    </button>
                  </td>
                </tr>
              ))}
              {registeredEvents.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No registered events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Proposals Table */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700">My Event Proposals</h2>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-600 uppercase text-sm">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{event.title}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`rounded p-1 inline-block ${event.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {event.status !== "approved" && (
                      <Link
                        to={`/event/${event._id}/edit`}
                        className="bg-yellow-600 text-white rounded px-3 py-1 hover:bg-yellow-700"
                      >
                        Edit
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No event proposals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="bg-white rounded p-6 max-w-sm w-full space-y-4">
            <h2 className="text-xl font-bold">Give Feedback</h2>
            <textarea
              className="w-full p-2 rounded border"
              placeholder="Enter your feedback..."
              value={feedbackDescription}
              onChange={(e) => setFeedbackDescription(e.target.value)}
              required
            />
            <div>
              <label className="block font-medium">Rating (1–5):</label>
              <input
                className="w-full p-2 rounded border"
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="bg-gray-300 rounded p-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
