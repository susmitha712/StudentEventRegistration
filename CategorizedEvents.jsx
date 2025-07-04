import { useEffect, useState } from "react";

const CategorizedEvents = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        const data = await response.json();

        const today = new Date();

        const past = data.filter(event => new Date(event.date) < today);
        const ongoing = data.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.toDateString() === today.toDateString(); // Same day event
        });
        const upcoming = data.filter(event => new Date(event.date) > today);

        setPastEvents(past);
        setOngoingEvents(ongoing);
        setUpcomingEvents(upcoming);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Events</h2>

      <h3>📅 Ongoing Events</h3>
      <div className="event-category">
        {ongoingEvents.length > 0 ? ongoingEvents.map(event => (
          <div key={event._id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
          </div>
        )) : <p>No ongoing events.</p>}
      </div>

      <h3>🚀 Upcoming Events</h3>
      <div className="event-category">
        {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
          <div key={event._id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
          </div>
        )) : <p>No upcoming events.</p>}
      </div>

      <h3>⏳ Past Events</h3>
      <div className="event-category">
        {pastEvents.length > 0 ? pastEvents.map(event => (
          <div key={event._id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
          </div>
        )) : <p>No past events.</p>}
      </div>
    </div>
  );
};

export default CategorizedEvents;
