import React, { useEffect, useState } from "react";  
import api from "../services/api";  

const ReviewProposal = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProposals = async () => {
    try {
      const res = await api.get("/events/pending");
      setProposals(res.data);
    } catch (error) {
      console.error("Error fetching proposals:", error);
      
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProposals();
  }, []);

  const handleAction = async (eventId, action) => {
    try {
      await api.post(`/events/${eventId}/${action}`);
     
      // Refresh the list
      fetchProposals();
    } catch (error) {
      console.error(`${action} error:`, error);
      
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading proposals...
      </div>
    );
  }

  if (proposals.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        No pending proposals.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">Review Event Proposals</h1>
      <div className="grid gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 w-full max-w-6xl mx-auto">
        {proposals.map((event) => (
          <div key={event._id} className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-gray-500 text-sm">Date & Time: {new Date(event.dateTime).toLocaleString()}</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleAction(event._id, "approve")}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded flex-1"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(event._id, "reject")}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded flex-1"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewProposal;
