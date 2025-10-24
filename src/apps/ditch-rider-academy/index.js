// Integration wrapper for Ditch Rider Academy Angular app
// This allows the Angular app to be embedded in the main React outpost

import React, { useEffect, useRef } from "react";

const DitchRiderAcademy = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Set up communication with Angular app
    const handleMessage = (event) => {
      if (event.origin !== "http://localhost:4200") return;

      // Handle navigation messages from Angular app
      if (event.data.type === "ANGULAR_NAVIGATION") {
        console.log("Navigation from Angular:", event.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="ditch-rider-academy-container">
      <div className="academy-header">
        <h2>🌊 Ditch Rider Academy</h2>
        <p>Master Angular pipes and data flow in the digital frontier</p>
      </div>

      <div className="academy-content">
        <iframe
          ref={iframeRef}
          src="http://localhost:4200"
          title="Ditch Rider Academy"
          width="100%"
          height="800px"
          frameBorder="0"
          style={{
            border: "2px solid #8B4513",
            borderRadius: "15px",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
          }}
        />
      </div>

      <div className="academy-footer">
        <p>💡 Make sure the Angular dev server is running on port 4200</p>
        <button
          onClick={() => window.open("http://localhost:4200", "_blank")}
          className="btn-desert"
        >
          Open in New Tab
        </button>
      </div>
    </div>
  );
};

export default DitchRiderAcademy;
