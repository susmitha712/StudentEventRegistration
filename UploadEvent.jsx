// import { useState } from "react";
// import "./UploadEvent.css";
// import { useNavigate } from "react-router-dom";

// const UploadEvent = ({ onEventAdded }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState("");
//   const [image, setImage] = useState(null);
//   const [eventLink, setEventLink] = useState(""); 
//   const navigate = useNavigate();

//  const handleUpload = async (e) => {
//   e.preventDefault();

//   const formData = new FormData();
//   formData.append("title", title);
//   formData.append("description", description);
//   formData.append("date", date);
//   formData.append("image", image);
//   formData.append("eventLink", eventLink.trim());

//   try {
//     const response = await fetch("http://localhost:5000/api/events/create", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {

//       alert("Event Uploaded Successfully!");
//       onEventAdded();
//       navigate("/dashboard");
//     } else {
//       let data = {};
//       try {
//         data = await response.json();
//       } catch (err) {
//         console.warn("No JSON response body:", err);
//       }
//       alert(`Error: ${data.message || 'Something went wrong'}`);
//     }
//   } catch (error) {
//     console.error("Upload Error:", error);
//     alert("Network Error: Failed to upload event.");
//   }
// };


//   return (
//     <div>
//      <div className="video-background">
//             <video autoPlay loop muted playsInline className="background-video">
//               <source src="/videos/background2.mp4" type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             </div>
//     <div className="form-container">
      
//       <form onSubmit={handleUpload}>
//         <input 
//           type="text" 
//           placeholder="Event Title" 
//           value={title} 
//           onChange={(e) => setTitle(e.target.value)} 
//           required 
//         />
//         <textarea 
//           placeholder="Event Description" 
//           value={description} 
//           onChange={(e) => setDescription(e.target.value)} 
//           required 
//         />
//         <input 
//           type="date" 
//           value={date} 
//           onChange={(e) => setDate(e.target.value)} 
//           required 
//         />
       
//         <input 
//           type="text" 
//           placeholder="Enter Event Link" 
//           value={eventLink} 
//           onChange={(e) => setEventLink(e.target.value)} 
//         />


//         <label htmlFor="file-upload" className="custom-file-upload">
//   Upload Poster
// </label>
// <input 
//   id="file-upload"
//   type="file" 
//   onChange={(e) => setImage(e.target.files[0])}
//   style={{ display: "none" }}
// />

       
//         <button type="submit">Upload Event</button>
//       </form>

//       {eventLink && (
//         <p>
//           <strong>Event Link:</strong>{" "}
//           <a href={eventLink} target="_blank" rel="noopener noreferrer">
//             {eventLink}
//           </a>
//         </p>
//       )}
//     </div>
//     </div>
//   );
// };

// export default UploadEvent;

import { useState } from "react";
import "./UploadEvent.css";
import { useNavigate } from "react-router-dom";

const UploadEvent = ({ onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [eventLink, setEventLink] = useState("");
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("image", image);
    formData.append("eventLink", eventLink.trim());

//     try {
//       const response = await fetch("http://localhost:5000/api/events/create", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         onEventAdded();
// navigate("/dashboard");
// setTimeout(() => {
//   alert("Event Uploaded Successfully!");
// }, 100);

//       } else {
//         // Safely handle non-OK responses
//         const text = await response.text();
//         let message = text;
//         try {
//           const data = JSON.parse(text);
//           message = data.message || message;
//         } catch (err) {
//           console.warn("Non-JSON error response:", err);
//         }
//         alert(`Error: ${message}`);
//       }
//     } catch (error) {
//       console.error("Upload Error:", error);
//       alert("Network Error: Failed to upload event.");
//     }

try {
  const response = await fetch("http://localhost:5000/api/events/create", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    alert("Event Uploaded Successfully!");

    try {
      onEventAdded(); // if this throws, it won’t be mistaken as network error
    } catch (e) {
      console.error("onEventAdded() error:", e);
    }

    try {
      navigate("/dashboard"); // isolate navigation error
    } catch (e) {
      console.error("Navigation error:", e);
    }

  } else {
    const text = await response.text();
    let message = text;
    try {
      const data = JSON.parse(text);
      message = data.message || message;
    } catch (err) {
      console.warn("Non-JSON error response:", err);
    }
    alert(`Error: ${message}`);
  }
} catch (error) {
  console.error("Upload Error:", error);
  alert("Network Error: Failed to upload event.");
}

  };

  return (
    <div>
      <div className="video-background">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/videos/background2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="form-container">
        <b style={{marginRight:80}}>Create Event</b>
        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Event Link"
            value={eventLink}
            onChange={(e) => setEventLink(e.target.value)}
          /><br></br>
          <label htmlFor="file-upload" className="custom-file-upload">
            Upload Poster
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: "none" }}
          />

          {/* <div className="qr-section"> */}
  {/* <p>Scan to Pay (if it's a paid event):</p>
  <img
    src="/assets/QRcode.jpg"
    alt="QR Code for Payment"
    style={{ width: "200px", height: "200px", border: "1px solid #ccc" }}
  />
</div> */}
          <button type="submit">Upload Event</button>
        </form>

        {eventLink && (
          <p>
            <strong>Event Link:</strong>{" "}
            <a href={eventLink} target="_blank" rel="noopener noreferrer" style={{color:"white"}}>
              {eventLink}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadEvent;
