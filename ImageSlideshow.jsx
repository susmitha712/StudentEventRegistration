import React, { useState, useEffect } from "react";
import "./ImageSlideshow.css";

const images = [
"/videos/img2.jpg",
  "/videos/img1.jpg", 
  "/videos/img9.jpg",
  "/videos/img4.jpg",
  "/videos/img5.jpg",
  "/videos/img8.jpg",
  "/videos/img9.jpg",
  "/videos/img10.jpg",
  "/videos/img11.jpg",
  "/videos/img12.jpg"
];

const ImageSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      <img src={images[currentImageIndex]} alt="Slideshow" className="slideshow-image" />
    </div>
  );
};

export default ImageSlideshow;
