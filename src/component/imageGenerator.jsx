import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const ImageGenerator = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const fetchImages = async () => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=B-uzmoSsmaSmsnf_y6OZFxOD1FDEY_ysztZX9o_JL2s`
    );
    setImages(response.data.results);
  };

  const handleImageClick = (image) => {
    navigate("/edit", {
      state: {
        imageUrl: image.urls.regular,
        caption: image.alt_description || "No caption available",
      },
    });
  };

  return (
    <div className="app-container">
      <h1>Search Page</h1>
      <div style={{ textAlign: "left" }}>
        <p>Name: Abhishek Kumar</p>
        <p>Email: aksingh96753@gmail.com</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter your search term"
          style={{ width: "30%" }}
        />
        <button onClick={fetchImages}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
            />
          </svg>
        </button>
      </div>

      <div className="image-gallery">
        {images.map((image) => (
          <div
            className="image-card"
            key={image.id}
            style={{ marginBottom: "20px", cursor: "pointer" }}
          >
            <img
              src={image.urls.small}
              alt={image.alt_description}
              style={{ borderRadius: "8px", width: "100%", objectFit: "cover" }}
            />
            <button
              onClick={() => handleImageClick(image)}
              style={{ display: "block", margin: "auto", width: "100%" ,borderRadius:"5px"}}
            >
              Add Caption
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGenerator;
