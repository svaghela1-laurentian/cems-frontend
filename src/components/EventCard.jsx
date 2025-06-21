import React from "react";

const EventCard = ({ title, description, dateTime, status }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>{description}</p>
      <p className="text-gray-600">Date: {new Date(dateTime).toLocaleString()}</p>
      <span className={`rounded p-1 mt-2 inline-block ${status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
        {status}
      </span>
    </div>
  );
};

export default EventCard;
