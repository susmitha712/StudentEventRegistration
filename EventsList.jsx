import { useEffect, useState } from "react";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events"); // ✅ Adjust API URL if needed
        const data = await response.json();
        setEvents(data); // ✅ Save events in state
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>All Events</h2>
      <div className="events-container">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
            {event.imageUrl && (
              <img src={`http://localhost:5000/${event.imageUrl}`} alt={event.title} />
            )}
          </div>
        ))}
         {/* ✅ Display Event Link if available */}
         {event.eventLink && (
              <p>
                <strong>Event Link:</strong>{" "}
                <a href={event.eventLink} target="_blank" rel="noopener noreferrer">
                  {event.eventLink}
                </a>
              </p>
            )}
      </div>
    </div>
  );
};

export default EventsList;
