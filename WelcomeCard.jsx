import React, { useState, useEffect } from "react";
import "./WelcomeCard.css";

const WelcomeCard = () => {
  const words = ["SMART",  "INNOVATOR", "CODER", "DEVELOPER"];
  const colors = ["blue", "red"]; // Alternate colors
  const [text, setText] = useState("");
  const [colorIndex, setColorIndex] = useState(0);
  let wordIndex = 0;
  let charIndex = 0;

  useEffect(() => {
    const typeEffect = () => {
      if (charIndex <= words[wordIndex].length) {
        setText(words[wordIndex].slice(0, charIndex));
        charIndex++;
      } else {
        setTimeout(() => {
          wordIndex = (wordIndex + 1) % words.length;
          setColorIndex(wordIndex % 2); // Toggle between 0 and 1
          charIndex = 0;
        }, 1000);
      }
    };

    const typingInterval = setInterval(typeEffect, 200);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="card-container">
      <div className="card">
        <h1 className="typing-text">
          WELCOME{" "}
          <span className={colorIndex === 0 ? "blue-text" : "red-text"}>
            {text}
          </span>
          <span className="cursor">|</span>
        </h1>
      </div>
    </div>
  );
};

export default WelcomeCard;
