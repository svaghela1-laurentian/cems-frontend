// import React, { useState, useEffect } from "react";  
// import { useNavigate } from "react-router-dom";  
// import api from "../services/api";  

// const CreateEventProposal = () => {
//   const [title, setTitle] = useState("");  
//   const [description, setDescription] = useState("");  
//   const [dateTime, setDateTime] = useState("");  
//   const [venueId, setVenueId] = useState("");  
//   const [venues, setVenues] = useState([]);  
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch available venues
//     const fetchVenues = async () => {
//       try {
//         const response = await api.get("/venues");  
//         setVenues(response.data);
//       } catch (error) {
//         console.error("Error fetching venues:", error);
//         alert("Unable to load venues. Try again later.");  
//       }
//     };
//     fetchVenues();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!venueId) {
//       alert("Please select a venue.");
//       return;
//     }
//     try {
//       await api.post("/events/create", {
//         title,
//         description,
//         dateTime,
//         venueId,
//       });  
//       alert("Event proposal submitted successfully!");  
//       navigate("/student/my-events");  
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("Failed to create event proposal.");  
//     }
//   };  

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
//       <h1 className="text-3xl font-bold text-gray-800 text-center">Create Event Proposal</h1>  
//       <form
//         className="bg-white rounded p-6 mt-4 space-y-4 max-w-lg mx-auto shadow"
//         onSubmit={handleSubmit}
//       >
//         <input
//           className="w-full p-2 rounded border"
//           placeholder="Event Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <textarea
//           className="w-full p-2 rounded border"
//           placeholder="Event Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//         <input
//           className="w-full p-2 rounded border"
//           type="datetime-local"
//           value={dateTime}
//           onChange={(e) => setDateTime(e.target.value)}
//           required
//         />
//         <select
//           className="w-full p-2 rounded border"
//           value={venueId}
//           onChange={(e) => setVenueId(e.target.value)}
//           required
//         >
//           <option value="">-- Select a Venue --</option>
//           {venues.map((venue) => (
//             <option key={venue._id} value={venue._id}>
//               {venue.name}
//             </option>
//           ))}
//         </select>
//         <button className="w-full p-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">
//           Submit Proposal
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateEventProposal;



import React, { useState, useEffect } from "react";  
import { useNavigate, useParams } from "react-router-dom";  
import api from "../services/api";  

const CreateEventProposal = () => {
  const [title, setTitle] = useState("");  
  const [description, setDescription] = useState("");  
  const [dateTime, setDateTime] = useState("");  
  const [venueId, setVenueId] = useState("");  
  const [venues, setVenues] = useState([]);
  const { id: eventId } = useParams();
  const isEditMode = Boolean(eventId);
  const navigate = useNavigate();

  useEffect(() => {
    // 1️⃣ Fetch available venues
    const fetchVenues = async () => {
      try {
        const response = await api.get("/venues");  
        setVenues(response.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };
    fetchVenues();

    // 2️⃣ If in Edit Mode, fetch the existing event
    const fetchEvent = async () => {
      if (!eventId) return;
      try {
        const response = await api.get(`/events/${eventId}`);
        const event = response.data;
        setTitle(event.title);
        setDescription(event.description);
        setDateTime(event.dateTime.slice(0, 16)); // Format for datetime-local
        setVenueId(event.venueId);
      } catch (error) {
        console.error("Error fetching event:", error);
         
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!venueId) {
     
      return;
    }
    try {
      if (isEditMode) {
        // Edit Event
        await api.put(`/events/${eventId}`, {
          title,
          description,
          dateTime,
          venueId,
        });  
        
      } else {
        // Create New Event
        await api.post("/events/create", {
          title,
          description,
          dateTime,
          venueId,
        });  
       
      }
      navigate("/student/my-events");  
    } catch (error) {
      console.error(isEditMode ? "Update error:" : "Submission error:", error);
        
    }
  };  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        {isEditMode ? "Edit Event Proposal" : "Create Event Proposal"}
      </h1>  
      <form
        className="bg-white rounded p-6 mt-4 space-y-4 max-w-lg mx-auto shadow"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full p-2 rounded border"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 rounded border"
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className="w-full p-2 rounded border"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
        />
        <select
          className="w-full p-2 rounded border"
          value={venueId}
          onChange={(e) => setVenueId(e.target.value)}
          required
        >
          <option value="">-- Select a Venue --</option>
          {venues.map((venue) => (
            <option key={venue._id} value={venue._id}>
              {venue.name}
            </option>
          ))}
        </select>
        <button className="w-full p-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">
          {isEditMode ? "Update Event" : "Submit Proposal"}
        </button>
      </form>
    </div>
  );
};

export default CreateEventProposal;
