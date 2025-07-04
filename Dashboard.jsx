import { useEffect, useState } from "react";
import "./Dashboard.css"; 

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);


  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);


  const today = new Date().toISOString().split("T")[0];

  // Categorize events
  const pastEvents = events.filter(event => event.date < today);
  const ongoingEvents = events.filter(event => event.date === today);
  const upcomingEvents = events.filter(event => event.date > today);

  return (
    <div className="dashboard">
       <h1>Event Dashboard</h1>
       <br></br>
      {loading ? <p>Loading events...</p> : (
        <>
          {/* Ongoing Events Section */}
          <h2>Ongoing Events</h2>
          <div className="events-container">
            {ongoingEvents.length > 0 ? ongoingEvents.map(event => (
              <EventCard key={event._id} event={event} setSelectedEvent={setSelectedEvent} />
            )) : <p>No ongoing events.</p>}
          </div>
            <br></br><br></br>
          {/* Upcoming Events Section */}
          <h2>Upcoming Events</h2>
          <div className="events-container">
            {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
              <EventCard key={event._id} event={event} setSelectedEvent={setSelectedEvent} />
            )) : <p>No upcoming events.</p>}
          </div>
            <br></br><br></br>
          {/* Past Events Section */}
          <h2>Past Events</h2>
          <div className="events-container">
            {pastEvents.length > 0 ? pastEvents.map(event => (
              <EventCard key={event._id} event={event} setSelectedEvent={setSelectedEvent} />
            )) : <p>No past events.</p>}
          </div>
        </>
      )}

   
      {selectedEvent && (
        <div className="event-popup">
          <div className="event-popup-content">
            <span className="close-btn" onClick={() => setSelectedEvent(null)}>&times;</span>
            <h2 className="popup-title">{selectedEvent.title}</h2> 
            
          <img 
          src={`http://localhost:5000${selectedEvent.imageUrl}`} 
          alt="Event" 
          className="popup-event-image" 
          />
          
          
            <p className="popup-description">{selectedEvent.description}</p>
            {selectedEvent.eventLink && (
        <p className="popup-link">
          <a href={selectedEvent.eventLink} target="_blank" rel="noopener noreferrer">
            Click here to Register
          </a>
        </p>
      )}
          </div>
        </div>
      )}
    </div>
  );
};

// Event Card Component
const EventCard = ({ event, setSelectedEvent }) => (
  <div className="event-card">
    <h3>{event.title}</h3>
  
    <img src={`http://localhost:5000${event.imageUrl}`} alt={event.title} className="event-image" />
    <div className="event-details">
      
      <button onClick={() => setSelectedEvent(event)}>Register</button>
    </div>
  </div>
);

export default Dashboard;
